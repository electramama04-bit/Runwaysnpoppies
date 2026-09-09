# Put downloadable files here

Every file in this folder is published at `/files/<name>` and served through
`/download/<id>` with a proper "Save as" filename.

To add a document:

1. Drop the file in this folder (e.g. `hours-log-template.xlsx`).
2. Add or update its entry in `src/catalog.ts` — match `file` to the filename exactly.
3. Fill in the real `sizeLabel` and `updated` date.
4. `npm run deploy`

The `id` in the catalog becomes the public URL, so once you have shared a link,
don't change that id.
