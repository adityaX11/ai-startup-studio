import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import PropTypes from 'prop-types';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
          <section
            role="alert"
            className="w-full max-w-lg rounded-2xl border border-rose-500/20 bg-slate-900 p-8 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
              <AlertTriangle size={26} />
            </div>

            <h1 className="mt-5 text-2xl font-semibold text-white">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              This screen could not be rendered. You can retry or return to the dashboard.
            </p>

            {import.meta.env.DEV && this.state.error?.message ? (
              <pre className="mt-5 overflow-auto rounded-xl bg-slate-950 p-3 text-left text-xs text-rose-300">
                {this.state.error.message}
              </pre>
            ) : null}

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
              >
                <RefreshCw size={15} />
                Try again
              </button>

              <a
                href="/dashboard"
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Dashboard
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppErrorBoundary;