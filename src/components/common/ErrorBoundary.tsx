import React , { ErrorInfo } from 'react'
import { useStore, useSelector } from 'react-redux'

class ErrorBoundary extends React.Component<{}, {hasError:boolean}> {
  constructor(props: {}){
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(): { hasError: boolean }{
    console.log("getDerivedStateFromError ..")
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo):void {
    console.log(error)
    console.log(errorInfo)
  }

  render () {
    if(this.state.hasError) {
      return <div className="error">エラーの発生</div>
    }
    return <div>{this.props.children}</div>
  }
}

export default ErrorBoundary
