import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#0f172a'
        }}>
          <Result
            status="error"
            title={<span style={{ color: '#fff' }}>Unexpected System Error</span>}
            subTitle={<span style={{ color: 'rgba(255,255,255,0.6)' }}>
              {this.state.error?.message || 'An unexpected error occurred. Please reload the page or contact the administrator.'}
            </span>}
            extra={[
              <Button type="primary" key="reload" onClick={this.handleReload} style={{ background: '#e30613', borderColor: '#e30613' }}>
                Reload Page
              </Button>
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
