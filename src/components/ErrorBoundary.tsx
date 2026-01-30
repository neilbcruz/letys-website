// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Optional: Send to error tracking service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onReset?.();
  };

  override render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = import.meta.env.DEV;

      // Default error UI
      return (
        <div className="flex justify-center items-center px-4 min-h-screen bg-gray-50">
          <div className="w-full max-w-2xl">
            <div className="p-8 text-center bg-white rounded-2xl shadow-xl">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="flex justify-center items-center w-20 h-20 bg-red-100 rounded-full">
                  <AlertCircle className="w-10 h-10 text-red-600" aria-hidden="true" />
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="mb-6 text-lg text-gray-600">
                We're sorry for the inconvenience. An unexpected error occurred.
              </p>

              {/* Error details (only in development) */}
              {isDevelopment && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="mb-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                    Technical details (for developers)
                  </summary>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="mb-2 font-mono text-sm text-red-600">
                      {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="overflow-auto max-h-40 text-xs text-gray-700">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <button
                  onClick={this.handleReset}
                  className="flex gap-2 justify-center items-center btn-primary"
                  aria-label="Try again"
                >
                  <RefreshCw size={20} aria-hidden="true" />
                  Try Again
                </button>

                <a
                  href="/"
                  className="flex gap-2 justify-center items-center btn-secondary"
                  aria-label="Go to homepage"
                >
                  <Home size={20} aria-hidden="true" />
                  Go to Homepage
                </a>
              </div>

              {/* Support link */}
              <p className="mt-6 text-sm text-gray-500">
                If this problem persists, please{' '}
                <a
                  href="/contact"
                  className="font-medium underline text-primary-2 hover:text-primary-3"
                >
                  contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}