import Link from 'next/link';

export default function Home() {
  const modules = [
    {
      id: 1,
      name: 'Customer Insights',
      description: 'Deep analysis of individual customer behavior and preferences',
      path: '/module1',
      icon: '📊',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'Recommendation Policies',
      description: 'AI-driven recommendation system for tailored policies',
      path: '/module2',
      icon: '🎯',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      name: 'Churn Prediction',
      description: 'Predicts customer churn and suggests retention strategies',
      path: '/module3',
      icon: '⚡',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 4,
      name: 'Insurance Management',
      description: 'AI-Powered Life Event Prediction & Adaptive Policy Adjustments',
      path: '/module4',
      icon: '🤝',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 5,
      name: 'Smart Task Automation',
      description: 'Handles automated follow-ups and notifications using AI',
      path: '/module5',
      icon: '🔄',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 6,
      name: 'Fraud Detection',
      description: 'Detects fraudulent insurance claims using AI models',
      path: '/module6',
      icon: '🔒',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-gray-900/40"></div>
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block animate-float">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                AI-Driven
                <br />
                Customer Experience
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed glass-text mb-12">
              Transforming customer engagement through personalized insights and intelligent recommendations
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/get-started"
                className="glass-card px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/learn-more"
                className="glass-card-dark px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Project Overview */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="glass-panel rounded-3xl p-10 mb-20 transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-4xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Project Overview
          </h2>
          <p className="text-blue-100 text-center text-xl mb-12 max-w-4xl mx-auto">
            Enhancing SBI Life's customer experience through AI-driven personalization to improve purchase propensity and retention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Goal', 'Impact', 'Scope'].map((item, index) => (
              <div key={item} className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {item}
                </div>
                <p className="text-blue-200 text-lg">
                  {index === 0 && "Leverage AI for deeper customer insights and optimized strategies"}
                  {index === 1 && "Improved customer satisfaction and increased policy retention"}
                  {index === 2 && "End-to-end personalization system with ethical AI implementation"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Modules Grid */}
        <h2 className="text-5xl font-bold text-center text-white mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Project Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.path}
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className={`module-icon w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 bg-gradient-to-br ${module.color} shadow-lg mx-auto`}>
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-400 transition-colors">
                  {module.name}
                </h3>
                <p className="text-blue-200 text-center mb-6">
                  {module.description}
                </p>
                <div className="flex items-center justify-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                  Explore Module
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}