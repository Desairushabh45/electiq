import { Component } from 'react'
export default class ErrorBoundary extends Component {
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
