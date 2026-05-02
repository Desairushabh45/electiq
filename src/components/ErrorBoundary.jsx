import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary component - catches JavaScript errors in child components
 * @param {object} props - component props
 * @param {React.ReactNode} props.children - child components to wrap
 * @returns {JSX.Element} Children or fallback error UI
 */
class ErrorBoundaryBase extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return (
      <div role="alert" className="p-8 text-center text-red-600">
        <h2>Something went wrong.</h2>
        <button onClick={() => this.setState({ hasError: false })}>Try again</button>
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
