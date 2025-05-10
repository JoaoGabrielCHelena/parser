import * as React from 'react';

interface ErrorBoundaryProps {
  fallbackRender: (error: Error, info: React.ErrorInfo) => React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      return this.props.fallbackRender(this.state.error, this.state.errorInfo);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

