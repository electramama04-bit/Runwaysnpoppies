import { DOCUMENTS, LINKS, type DocEntry, type Format } from "./catalog";

/** Explicit content types — don't rely on the asset server guessing .ics or .docx. */
const CONTENT_TYPES: Record<Format, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ics: "text/calendar; charset=utf-8",
  png: "image/png",
  zip: "application/zip",
};

const DOCS_BY_ID = new Map(DOCUMENTS.map((doc) => [doc.id, doc]));

/** Cache successful JSON and file responses at the edge for an hour. */
const CACHE_CONTROL = "public, max-age=3600";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": status === 200 ? CACHE_CONTROL : "no-store",
    },
  });
}

/**
 * Build a Content-Disposition value that survives non-ASCII titles.
 * Falls back to a plain ASCII name, then offers the exact name via RFC 5987.
 */
function contentDisposition(filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

/** A download filename built from the title, so saved files are self-describing. */
function downloadName(doc: DocEntry): string {
  const slug = doc.title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  return `${slug}.${doc.format}`;
}

async function handleDownload(id: string, request: Request, env: Env): Promise<Response> {
  const doc = DOCS_BY_ID.get(id);
  if (!doc) {
    return json({ error: "No document with that id.", id }, 404);
  }

  // Pull the file out of the static asset bundle.
  const assetUrl = new URL(`/files/${doc.file}`, request.url);
  const asset = await env.ASSETS.fetch(new Request(assetUrl, { method: "GET" }));

  if (!asset.ok) {
    console.error(
      JSON.stringify({
        message: "catalog entry points at a missing file",
        id: doc.id,
        file: doc.file,
        status: asset.status,
      }),
    );
    return json({ error: "That file is listed but not uploaded yet.", id: doc.id }, 404);
  }

  // Stream the body through rather than buffering it into Worker memory.
  return new Response(asset.body, {
    status: 200,
    headers: {
      "content-type": CONTENT_TYPES[doc.format],
      "content-disposition": contentDisposition(downloadName(doc)),
      "cache-control": CACHE_CONTROL,
    },
  });
}

export default {
  async fetch(request, env, _ctx): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    console.log(
      JSON.stringify({ message: "request", method: request.method, path: pathname }),
    );

    if (request.method !== "GET" && request.method !== "HEAD") {
      return json({ error: "Method not allowed." }, 405);
    }

    try {
      if (pathname === "/api/documents") {
        return json({ documents: DOCUMENTS });
      }

      if (pathname === "/api/links") {
        return json({ links: LINKS });
      }

      if (pathname.startsWith("/download/")) {
        const id = decodeURIComponent(pathname.slice("/download/".length));
        return await handleDownload(id, request, env);
      }

      // Anything else is a static asset (or the 404 page).
      return await env.ASSETS.fetch(request);
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "unhandled error",
          path: pathname,
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      return json({ error: "Something went wrong on our end." }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
