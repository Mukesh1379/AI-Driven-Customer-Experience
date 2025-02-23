import Link from 'next/link';

export default function GetStarted() {
  const steps = [
    {
      title: 'Setup Your Environment',
      description: 'Configure your development environment and access credentials for the AI platform.',
      icon: '🔧'
    },
    {
      title: 'Data Integration',
      description: 'Connect your customer data sources and ensure proper data flow.',
      icon: '🔄'
    },
    {
      title: 'Module Configuration',
      description: 'Configure each module according to your specific requirements.',
      icon: '⚙️'
    },
    {
      title: 'Testing & Validation',
      description: 'Validate the system with test data and ensure accurate results.',
      icon: '✅'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Link 
            href="/"
            className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
            Getting Started Guide
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed glass-text">
            Follow this comprehensive guide to set up and implement the AI-Driven Customer Experience platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start gap-6">
                <div className="module-icon w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-blue-400 to-blue-600">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-blue-200">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="glass-panel rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Documentation', icon: '📚' },
              { title: 'API Reference', icon: '🔌' },
              { title: 'Best Practices', icon: '⭐' }
            ].map((resource, index) => (
              <div 
                key={index}
                className="glass-card-dark rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}