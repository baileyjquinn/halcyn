import config from '../../lib/config'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            A
          </span>
          {config.app.name}
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#lead-capture" className="hover:text-blue-600 transition-colors">
            Get Started
          </a>
        </nav>
      </div>
    </header>
  )
}