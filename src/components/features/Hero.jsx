import config from '../../lib/config'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Launch Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Business Website
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            {config.app.tagline}. Get a professional website with built-in lead capture,
            booking tools, and AI automation — set up in hours, not weeks.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#lead-capture"
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              See Features
            </a>
          </div>
        </div>
      </div>
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
    </section>
  )
}