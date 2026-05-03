import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary component - catches JavaScript errors in child components
 * @param {object} props - component props
 * @param {React.ReactNode} props.children - child components to wrap
 * @returns {JSX.Element} Children or fallback error UI
 */
class ErrorBoundaryBase extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) { 
    // Fallback if cloudLog is undefined
    const cloudLog = typeof window !== 'undefined' && window.cloudLog ? window.cloudLog : console.error;
    cloudLog(`Error: ${error.message}`, 'ERROR', info);
  }
  render() {
    if (this.state.hasError) return (
      <div className="text-center p-8">
        <h2>Something went wrong</h2>
        <button onClick={() => this.setState({hasError: false})}>Try Again</button>
      </div>
    )
    return this.props.children
  }
}

const ErrorBoundary = React.memo(ErrorBoundaryBase);
export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
