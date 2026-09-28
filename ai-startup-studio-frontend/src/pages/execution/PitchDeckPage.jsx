import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Pencil,
  Play,
  Plus,
  Presentation,
  RefreshCw,
  Share2,
  Trash2,
  X
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getPitchDeckData } from '@/services/executionService.js';
import {
  copyToClipboard,
  downloadJson,
  downloadMarkdown
} from '@/utils/downloadFile.js';

function getDeckStorageKey(startupId) {
  return `ai-startup-studio-pitch-deck-${startupId}`;
}

function slidesToMarkdown(slides) {
  return slides
    .map(
      (slide, index) =>
        `## ${index + 1}. ${slide.title}\n\n${slide.content}\n\n_${slide.description}_`
    )
    .join('\n\n---\n\n');
}

function SlideEditor({ slide, onSave, onCancel }) {
  const [form, setForm] = useState(slide);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave(form);
      }}
      className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-indigo-300">Slide editor</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Edit slide
          </h2>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label="Close slide editor"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Slide title
          </span>
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Main content
          </span>
          <textarea
            value={form.content}
            onChange={(event) => updateField('content', event.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none focus:border-indigo-400"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Speaker notes / description
          </span>
          <textarea
            value={form.description}
            onChange={(event) =>
              updateField('description', event.target.value)
            }
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none focus:border-indigo-400"
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
        >
          Save slide
        </button>
      </div>
    </form>
  );
}

function PitchDeckPage() {
  const { startupId = 'default-startup' } = useParams();

  const { data = [], isLoading } = useQuery({
    queryKey: ['pitch-deck', startupId],
    queryFn: getPitchDeckData,
    staleTime: 5 * 60 * 1000
  });

  const [slides, setSlides] = useState([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [presentationMode, setPresentationMode] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const storedDeck = window.localStorage.getItem(
            getDeckStorageKey(startupId)
        );

        if (storedDeck) {
            try {
            const parsedDeck = JSON.parse(storedDeck);

            // External-storage hydration is intentionally performed here.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSlides(parsedDeck);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedId(parsedDeck[0]?.id || null);
            } catch {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSlides(data);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedId(data[0]?.id || null);
            }
        } else if (data.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSlides(data);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedId(data[0]?.id || null);
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasLoadedStorage(true);
    }, [startupId, data]);

  useEffect(() => {
    if (!hasLoadedStorage || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      getDeckStorageKey(startupId),
      JSON.stringify(slides)
    );
  }, [startupId, slides, hasLoadedStorage]);

  const selectedSlide = useMemo(
    () => slides.find((slide) => slide.id === selectedId) || slides[0],
    [slides, selectedId]
  );

  if (isLoading && !slides.length) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  function updateSlide(updatedSlide) {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === updatedSlide.id ? updatedSlide : slide
      )
    );

    setEditingSlide(null);
  }

  function addSlide() {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      content: 'Add your main pitch message here.',
      description: 'Add speaker notes or supporting context.'
    };

    setSlides((current) => [...current, newSlide]);
    setSelectedId(newSlide.id);
    setEditingSlide(newSlide);
  }

  function deleteSlide(slideId) {
    if (slides.length <= 1) {
      return;
    }

    const index = slides.findIndex((slide) => slide.id === slideId);
    const nextSlides = slides.filter((slide) => slide.id !== slideId);

    setSlides(nextSlides);

    if (selectedId === slideId) {
      const fallbackSlide = nextSlides[Math.max(index - 1, 0)];
      setSelectedId(fallbackSlide?.id || null);
    }
  }

  function moveSlide(index, direction) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= slides.length) {
      return;
    }

    const nextSlides = [...slides];
    const [movedSlide] = nextSlides.splice(index, 1);
    nextSlides.splice(nextIndex, 0, movedSlide);

    setSlides(nextSlides);
  }

  function regenerateSlide() {
    if (!selectedSlide) {
      return;
    }

    updateSlide({
      ...selectedSlide,
      content: `${selectedSlide.content} Refined with clearer founder-focused messaging.`,
      description: `${selectedSlide.description} This is a mock regeneration and should be reviewed before use.`
    });
  }

  function handleExportJson() {
    downloadJson(
      {
        startupId,
        exportedAt: new Date().toISOString(),
        slides
      },
      `${startupId}-pitch-deck.json`
    );
  }

  function handleExportMarkdown() {
    downloadMarkdown(
      `# ${startupId} Pitch Deck\n\n${slidesToMarkdown(slides)}`,
      `${startupId}-pitch-deck.md`
    );
  }

  function handlePrint() {
    window.print();
  }

  async function handleShare() {
    const shareUrl = `${window.location.origin}/startups/${startupId}/pitch-deck?shared=true`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${startupId} Pitch Deck`,
          text: 'View this startup pitch deck.',
          url: shareUrl
        });
        setShareMessage('Share dialog opened.');
      } else {
        await copyToClipboard(shareUrl);
        setShareMessage('Share link copied to clipboard.');
      }
    } catch {
      setShareMessage('Sharing was cancelled.');
    }

    setTimeout(() => setShareMessage(''), 2500);
  }

  if (presentationMode) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-5 md:p-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-sm text-cyan-300">Presentation mode</p>
            <p className="mt-1 text-sm text-slate-500">
              {slides.indexOf(selectedSlide) + 1} of {slides.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPresentationMode(false)}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Exit presentation
          </button>
        </div>

        <div className="mx-auto mt-10 flex min-h-[70vh] max-w-6xl items-center">
          <div className="w-full rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 p-8 md:p-16">
            <Pill tone="info">AI Startup Studio</Pill>

            <h1 className="mt-8 text-4xl font-semibold text-white md:text-7xl">
              {selectedSlide?.title}
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-10 text-slate-300 md:text-3xl">
              {selectedSlide?.content}
            </p>

            <p className="mt-12 max-w-3xl text-sm leading-7 text-slate-500">
              {selectedSlide?.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setSelectedId(slide.id)}
                  className={`rounded-lg px-3 py-2 text-xs ${
                    slide.id === selectedSlide?.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Launch"
        title="Pitch deck builder"
        description="Create, edit, reorder, export, and present your startup pitch. Generated content remains editable and advisory."
        action={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPresentationMode(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
            >
              <Play size={16} />
              Present
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
            >
              <Share2 size={16} />
              Share
            </button>

            <Pill tone="info">
              <Presentation size={13} className="mr-1 inline" />
              Draft deck
            </Pill>
          </div>
        }
      />

      {shareMessage ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          {shareMessage}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[290px_1fr]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Slides
              </p>
              <h2 className="mt-1 font-semibold text-white">
                {slides.length} slides
              </h2>
            </div>

            <button
              type="button"
              onClick={addSlide}
              className="rounded-lg bg-indigo-500 p-2 text-white hover:bg-indigo-400"
              aria-label="Add slide"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`rounded-xl border p-3 ${
                  selectedSlide?.id === slide.id
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(slide.id)}
                  className="w-full text-left"
                >
                  <span className="text-xs text-slate-500">
                    Slide {index + 1}
                  </span>
                  <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-200">
                    {slide.title}
                  </p>
                </button>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveSlide(index, -1)}
                      className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white"
                      aria-label={`Move ${slide.title} up`}
                    >
                      <ChevronUp size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveSlide(index, 1)}
                      className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white"
                      aria-label={`Move ${slide.title} down`}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteSlide(slide.id)}
                    className="rounded p-1 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                    aria-label={`Delete ${slide.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          {editingSlide ? (
            <SlideEditor
              slide={editingSlide}
              onSave={updateSlide}
              onCancel={() => setEditingSlide(null)}
            />
          ) : null}

          {selectedSlide ? (
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-sm text-slate-500">Slide preview</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {selectedSlide.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSlide(selectedSlide)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={regenerateSlide}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    <RefreshCw size={15} />
                    Regenerate
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 p-8 md:p-14">
                <Pill tone="info">AI-generated draft</Pill>

                <h3 className="mt-8 text-4xl font-semibold text-white md:text-6xl">
                  {selectedSlide.title}
                </h3>

                <p className="mt-8 max-w-4xl text-xl leading-9 text-slate-300 md:text-3xl">
                  {selectedSlide.content}
                </p>

                <p className="mt-10 max-w-3xl text-sm leading-7 text-slate-500">
                  {selectedSlide.description}
                </p>
              </div>
            </article>
          ) : null}

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                <Download size={15} />
                Export JSON
              </button>

              <button
                type="button"
                onClick={handleExportMarkdown}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                <Download size={15} />
                Export Markdown
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                <Presentation size={15} />
                Print / Save PDF
              </button>

              <button
                type="button"
                onClick={async () => {
                  const markdown = `# ${startupId} Pitch Deck\n\n${slidesToMarkdown(slides)}`;
                  const copied = await copyToClipboard(markdown);
                  setShareMessage(
                    copied
                      ? 'Pitch deck content copied.'
                      : 'Unable to copy pitch deck content.'
                  );

                  setTimeout(() => setShareMessage(''), 2500);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                <Copy size={15} />
                Copy content
              </button>
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}

export default PitchDeckPage;