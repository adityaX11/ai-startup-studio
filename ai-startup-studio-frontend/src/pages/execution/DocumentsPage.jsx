import { useMemo, useState } from 'react';
import { CheckCircle2, FileText, LoaderCircle, Trash2, UploadCloud } from 'lucide-react';

const initialDocuments = [
  {
    id: 'doc-1',
    name: 'founder-interviews.pdf',
    type: 'PDF',
    size: '2.4 MB',
    status: 'Indexed'
  },
  {
    id: 'doc-2',
    name: 'competitor-notes.txt',
    type: 'TXT',
    size: '18 KB',
    status: 'Ready'
  }
];

function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);

  const indexedCount = useMemo(
    () => documents.filter((document) => document.status === 'Indexed' || document.status === 'Ready').length,
    [documents]
  );

  function handleFiles(event) {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const uploadedDocuments = files.map((file) => ({
        id: `doc-${Date.now()}-${file.name}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: `${Math.max(Math.round(file.size / 1024), 1)} KB`,
        status: 'Processing'
      }));

      setDocuments((current) => [...current, ...uploadedDocuments]);
      setIsUploading(false);
    }, 700);
  }

  function deleteDocument(id) {
    setDocuments((current) => current.filter((document) => document.id !== id));
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="text-sm font-medium text-cyan-300">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Documents</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Upload research, interview notes, presentations, and other documents for future source-grounded AI answers.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Total documents</p>
          <p className="mt-2 text-3xl font-semibold text-white">{documents.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Ready or indexed</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">{indexedCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">RAG status</p>
          <p className="mt-2 text-xl font-semibold text-amber-300">Frontend placeholder</p>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 p-8 text-center">
        <UploadCloud className="mx-auto text-indigo-300" size={34} />

        <h2 className="mt-4 text-xl font-semibold text-white">Upload startup documents</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
          Supported formats: PDF, DOCX, PPTX, TXT, CSV. Files are currently handled in mock frontend state.
        </p>

        <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400">
          {isUploading ? <LoaderCircle className="animate-spin" size={16} /> : <UploadCloud size={16} />}
          {isUploading ? 'Uploading...' : 'Choose files'}
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.txt,.csv"
            onChange={handleFiles}
            className="sr-only"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-xl font-semibold text-white">Document library</h2>

        <div className="mt-5 space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 md:flex-row md:items-center"
            >
              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
                <FileText size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{document.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {document.type} · {document.size}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                  {document.status === 'Processing' ? (
                    <LoaderCircle className="animate-spin" size={12} />
                  ) : (
                    <CheckCircle2 size={12} />
                  )}
                  {document.status}
                </span>

                <button
                  type="button"
                  onClick={() => deleteDocument(document.id)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                  aria-label={`Delete ${document.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DocumentsPage;