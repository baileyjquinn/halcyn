const features = [
  {
    title: 'AI Chatbots',
    description:
      'Add intelligent chatbots that answer customer questions, qualify leads, and book appointments 24/7.',
    icon: '🤖',
  },
  {
    title: 'Lead Capture',
    description:
      'Built-in forms that store inquiries directly in your database with automated follow-up sequences.',
    icon: '📋',
  },
  {
    title: 'Smart Scheduling',
    description:
      'Let customers book appointments online with automatic calendar sync and reminders.',
    icon: '📅',
  },
  {
    title: 'SEO Optimized',
    description:
      'Every template ships with semantic HTML, meta tags, and fast loading for great search rankings.',
    icon: '🔍',
  },
  {
    title: 'Mobile First',
    description:
      'Responsive design that looks stunning on phones, tablets, and desktops out of the box.',
    icon: '📱',
  },
  {
    title: 'Easy Customization',
    description:
      'Modular components you can mix, match, and extend. Change colors, layout, or content in minutes.',
    icon: '🎨',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The Halcyn Stack gives small businesses a complete digital toolkit — no
            technical skills required.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                {f.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}