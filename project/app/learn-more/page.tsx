import Link from 'next/link';

export default function LearnMore() {
  const features = [
    {
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze customer behavior patterns and predict future needs.',
      icon: '🧠',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Real-time Personalization',
      description: 'Dynamic content and recommendations that adapt to customer interactions instantly.',
      icon: '⚡',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Ethical AI Framework',
      description: 'Built-in safeguards and transparency measures to ensure responsible AI usage.',
      icon: '🛡️',
      color: 'from-green-400 to-green-600'
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
            Discover More
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed glass-text">
            Learn about the powerful features and capabilities of our AI-Driven Customer Experience platform.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300">
              <div className={`module-icon w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 bg-gradient-to-br ${feature.color} mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
              <p className="text-blue-200 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="glass-panel rounded-3xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Increased Customer Satisfaction',
                description: 'More personalized experiences leading to higher customer satisfaction scores.',
                metric: '+45%'
              },
              {
                title: 'Better Retention Rates',
                description: 'Improved customer retention through predictive analytics and personalized engagement.',
                metric: '+60%'
              },
              {
                title: 'Revenue Growth',
                description: 'Increased revenue through better targeting and personalized recommendations.',
                metric: '+30%'
              },
              {
                title: 'Operational Efficiency',
                description: 'Streamlined operations through automated personalization and decision-making.',
                metric: '+75%'
              }
            ].map((benefit, index) => (
              <div key={index} className="glass-card-dark rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <span className="text-2xl font-bold text-green-400">{benefit.metric}</span>
                </div>
                <p className="text-blue-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/get-started"
            className="inline-block glass-card px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 group"
          >
            <span className="flex items-center">
              Start Your Journey
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}