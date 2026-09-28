import { useEffect, useState } from 'react';
import { Check, Monitor, Moon, Save, Sun } from 'lucide-react';

const defaultSettings = {
  displayName: 'Aditya',
  email: 'founder@example.com',
  theme: 'dark',
  emailNotifications: true,
  aiRecommendations: true,
  marketAlerts: true,
  compactMode: false,
  reduceMotion: false
};

function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('ai-startup-studio-settings');

    if (storedSettings) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings({
          ...defaultSettings,
          ...JSON.parse(storedSettings)
        });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  function updateSetting(field, value) {
    setSettings((current) => ({
      ...current,
      [field]: value
    }));

    setSaved(false);
  }

  function saveSettings(event) {
    event.preventDefault();

    localStorage.setItem(
      'ai-startup-studio-settings',
      JSON.stringify(settings)
    );

    document.documentElement.dataset.theme = settings.theme;

    if (settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-sm font-medium text-cyan-300">Configuration</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          Settings
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Manage your profile, workspace preferences, notifications, and accessibility options.
        </p>
      </header>

      <form onSubmit={saveSettings} className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Profile</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm text-slate-300">
                Display name
              </span>
              <input
                value={settings.displayName}
                onChange={(event) =>
                  updateSetting('displayName', event.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm text-slate-300">
                Email
              </span>
              <input
                type="email"
                value={settings.email}
                onChange={(event) =>
                  updateSetting('email', event.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Theme</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['dark', 'Dark', Moon],
              ['light', 'Light', Sun],
              ['system', 'System', Monitor]
            ].map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateSetting('theme', value)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left ${
                  settings.theme === value
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>

          <div className="mt-5 space-y-3">
            {[
              ['emailNotifications', 'Email notifications', 'Receive important workspace updates.'],
              ['aiRecommendations', 'AI recommendations', 'Receive suggested next actions.'],
              ['marketAlerts', 'Market alerts', 'Receive market and competitor changes.']
            ].map(([field, label, description]) => (
              <label
                key={field}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <span>
                  <span className="block text-sm font-medium text-slate-200">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {description}
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={settings[field]}
                  onChange={(event) =>
                    updateSetting(field, event.target.checked)
                  }
                  className="h-5 w-5 accent-indigo-500"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Accessibility and layout</h2>

          <div className="mt-5 space-y-3">
            {[
              ['compactMode', 'Compact mode', 'Reduce spacing in dense workspace views.'],
              ['reduceMotion', 'Reduce motion', 'Minimize transitions and animated effects.']
            ].map(([field, label, description]) => (
              <label
                key={field}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <span>
                  <span className="block text-sm font-medium text-slate-200">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {description}
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={settings[field]}
                  onChange={(event) =>
                    updateSetting(field, event.target.checked)
                  }
                  className="h-5 w-5 accent-indigo-500"
                />
              </label>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          {saved ? (
            <span className="inline-flex items-center gap-1 text-sm text-emerald-300">
              <Check size={16} />
              Saved
            </span>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            <Save size={16} />
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;