import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 border border-zinc-200 rounded-2xl bg-white shadow-sm flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-bold text-sm select-none">
              !
            </div>
            <h2 className="text-xl font-medium text-[#111111] text-balance">
              Something went wrong
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed text-pretty">
              An unexpected error occurred while rendering this section. You can reload or return to the overview.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                Reload page
              </button>
              <button
                onClick={() => {
                  window.location.href = '/'
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-200 text-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                Go to homepage
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
