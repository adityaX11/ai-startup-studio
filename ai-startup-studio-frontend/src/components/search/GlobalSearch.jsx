import { useEffect, useMemo, useState } from 'react';
import { Command, FileText, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { searchItems } from '@/mock/searchData.js';

function GlobalSearch() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function openSearch() {
      setIsOpen(true);
    }

    function handleKeyboard(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('search:open', openSearch);
    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('search:open', openSearch);
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return searchItems;
    }

    return searchItems.filter((item) =>
      `${item.type} ${item.title} ${item.description}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query]);

  if (!isOpen) {
    return null;
  }

  function closeSearch() {
    setIsOpen(false);
    setQuery('');
  }

  function openResult(href) {
    closeSearch();
    navigate(href);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/80 px-4 pt-[10vh] backdrop-blur-sm">
      <button
        type="button"
        onClick={closeSearch}
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-search-title"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-800 px-4">
          <Search className="text-slate-500" size={19} />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search startups, competitors, documents..."
            className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
            aria-label="Search application"
          />

          <kbd className="hidden rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-400 sm:inline">
            ESC
          </kbd>

          <button
            type="button"
            onClick={closeSearch}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
            aria-label="Close search"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          <div className="mb-3 flex items-center gap-2 px-2">
            <Command size={14} className="text-indigo-300" />
            <h2 id="global-search-title" className="text-xs uppercase tracking-wide text-slate-500">
              Search results
            </h2>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="mx-auto text-slate-600" size={26} />
              <p className="mt-3 text-sm text-slate-400">No results found.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openResult(item.href)}
                  className="flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-slate-800"
                >
                  <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-300">
                    <FileText size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.type} · {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default GlobalSearch;