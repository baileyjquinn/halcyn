import config from '../../lib/config'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {config.app.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <a
              href="mailto:{config.app.supportEmail}"
              className="text-blue-600 hover:underline"
            >
              {config.app.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}