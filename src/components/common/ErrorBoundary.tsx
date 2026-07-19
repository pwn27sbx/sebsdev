import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('ErrorBoundary caught:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex items-center justify-center text-center px-6 transition-colors duration-500">
          <div>
            <h1 className="font-anton text-6xl uppercase tracking-tighter text-[#111] dark:text-white">Oops!</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md text-sm">Something went wrong. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()}
              className="mt-8 px-8 py-4 bg-[#00A889] text-white rounded-full font-anton text-sm uppercase tracking-widest hover:bg-[#00c5a1] transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
