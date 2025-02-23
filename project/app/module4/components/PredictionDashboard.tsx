'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartBarIcon, UserCircleIcon, CurrencyDollarIcon, ShieldCheckIcon, ArrowTrendingUpIcon, BellIcon, CalendarIcon, ChartPieIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const generateMockData = (userId: number) => ({
  user: {
    id: userId,
    name: ["John Doe", "Sarah Smith", "Michael Johnson", "Emily Brown", "David Wilson", "Lisa Anderson", 
           "James Taylor", "Maria Garcia", "Robert Martinez", "Jennifer Lee", "William Turner", "Emma Wilson"][userId - 1],
    age: [32, 28, 45, 35, 41, 29, 38, 33, 47, 31, 52, 26][userId - 1],
    currentPolicy: ["Premium Health", "Standard Health", "Family Health Plus", "Professional Health", 
                   "Premium Health", "Education Health", "Premium Plus", "Standard Plus", "Professional Elite", 
                   "Creative Pro", "Academic Health", "Tech Pro"][userId - 1],
    monthlyPremium: [350, 250, 500, 400, 380, 280, 450, 300, 550, 320, 420, 290][userId - 1],
    coverageAmount: [500000, 300000, 750000, 600000, 550000, 320000, 680000, 420000, 800000, 450000, 600000, 380000][userId - 1],
    riskScore: [85, 78, 92, 88, 82, 75, 89, 80, 91, 83, 87, 86][userId - 1]
  },
  predictedEvents: [
    {
      type: ["parenthood", "marriage", "retirement", "newJob", "relocation", "education", 
             "business", "health", "investment", "career", "travel", "technology"][userId - 1],
      probability: [0.85, 0.75, 0.95, 0.65, 0.70, 0.80, 0.88, 0.72, 0.93, 0.78, 0.85, 0.82][userId - 1],
      predictedDate: new Date(2024, [5, 8, 3, 7, 6, 4, 9, 5, 3, 8, 4, 7][userId - 1], 1),
      financialImpact: [15000, 10000, 25000, 8000, 12000, 20000, 18000, 9000, 30000, 11000, 22000, 13000][userId - 1]
    }
  ],
  policyAdjustments: {
    eventType: ["parenthood", "marriage", "retirement", "newJob", "relocation", "education", 
                "business", "health", "investment", "career", "travel", "technology"][userId - 1],
    currentCoverage: [500000, 300000, 750000, 600000, 550000, 320000, 680000, 420000, 800000, 450000, 600000, 380000][userId - 1],
    recommendedCoverage: [750000, 500000, 1000000, 800000, 750000, 500000, 900000, 600000, 1200000, 650000, 850000, 550000][userId - 1],
    premiumChange: [150, 100, 200, 120, 130, 90, 160, 110, 250, 105, 180, 95][userId - 1],
    benefits: [
      ["Increased medical coverage", "Added child care benefits", "Education savings plan"],
      ["Spouse coverage", "Combined deductibles", "Family planning benefits"],
      ["Enhanced medical coverage", "Prescription drug benefits", "Long-term care"],
      ["Professional liability coverage", "Income protection", "Career transition support"],
      ["Relocation assistance", "Property coverage", "Temporary housing benefits"],
      ["Education cost coverage", "Student health benefits", "Career development"],
      ["Business liability", "Employee coverage", "Equipment protection"],
      ["Specialized medical care", "Wellness programs", "Preventive care"],
      ["Investment protection", "Portfolio coverage", "Financial advisory"],
      ["Professional development", "Skills training", "Career coaching"],
      ["Travel insurance", "Global coverage", "Emergency assistance"],
      ["Tech equipment coverage", "Digital asset protection", "Cyber security"]
    ][userId - 1]
  },
  savingsProjections: {
    monthly: [200, 150, 300, 250, 220, 180, 270, 190, 350, 210, 280, 170][userId - 1],
    annual: [2400, 1800, 3600, 3000, 2640, 2160, 3240, 2280, 4200, 2520, 3360, 2040][userId - 1],
    fiveYear: [12000, 9000, 18000, 15000, 13200, 10800, 16200, 11400, 21000, 12600, 16800, 10200][userId - 1],
    categories: {
      health: [40, 35, 45, 42, 38, 36, 41, 37, 46, 39, 43, 36][userId - 1],
      emergency: [30, 25, 35, 28, 32, 24, 29, 33, 34, 31, 27, 34][userId - 1],
      retirement: [20, 30, 15, 20, 22, 28, 21, 19, 12, 20, 18, 22][userId - 1],
      other: [10, 10, 5, 10, 8, 12, 9, 11, 8, 10, 12, 8][userId - 1]
    }
  }
});

export default function PredictionDashboard({ userId }: { userId: number }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState(generateMockData(userId));
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);
  const [forecastData, setForecastData] = useState([]);
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    const newData = generateMockData(userId);
    setData(newData);
    generateForecastData(newData);
  }, [userId]);

  const generateForecastData = (currentData: ReturnType<typeof generateMockData>) => {
    const baseData = [
      { 
        month: 'Current', 
        premium: currentData.user.monthlyPremium, 
        coverage: currentData.user.coverageAmount / 1000, 
        savings: currentData.savingsProjections.monthly
      }
    ];

    for (let i = 1; i <= 9; i += 3) {
      const premium = currentData.user.monthlyPremium + (i * 50);
      const coverage = (currentData.user.coverageAmount + (i * 50000)) / 1000;
      const savings = currentData.savingsProjections.monthly + (i * 30);

      baseData.push({
        month: `Month ${i}`,
        premium,
        coverage,
        savings
      });
    }

    setForecastData(baseData);
  };

  const handleSimulation = () => {
    setIsSimulating(true);
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: 'Running new risk assessment simulation...' 
    }]);

    setTimeout(() => {
      const newData = {
        ...data,
        user: {
          ...data.user,
          riskScore: Math.min(100, data.user.riskScore + Math.floor(Math.random() * 5))
        }
      };
      setData(newData);
      setIsSimulating(false);
      generateForecastData(newData);
      
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Simulation completed! Risk score updated.' 
      }]);
    }, 2000);
  };

  const handleAdjustment = () => {
    setIsAdjusting(true);
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: 'Applying policy adjustments...' 
    }]);

    setTimeout(() => {
      const newData = {
        ...data,
        user: {
          ...data.user,
          coverageAmount: data.policyAdjustments.recommendedCoverage,
          monthlyPremium: data.user.monthlyPremium + data.policyAdjustments.premiumChange
        }
      };
      setData(newData);
      setIsAdjusting(false);
      generateForecastData(newData);

      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Policy adjustments applied successfully!' 
      }]);
    }, 2000);
  };

  const renderSavingsBreakdown = () => {
    const pieData = [
      { name: 'Health', value: data.savingsProjections.categories.health },
      { name: 'Emergency', value: data.savingsProjections.categories.emergency },
      { name: 'Retirement', value: data.savingsProjections.categories.retirement },
      { name: 'Other', value: data.savingsProjections.categories.other }
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Savings Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900">Monthly Savings</h4>
              <p className="text-2xl font-bold text-blue-600">${data.savingsProjections.monthly}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900">Annual Projection</h4>
              <p className="text-2xl font-bold text-green-600">${data.savingsProjections.annual}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900">5-Year Projection</h4>
              <p className="text-2xl font-bold text-purple-600">${data.savingsProjections.fiveYear}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCoverageDetails = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Coverage Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900">Current Coverage</h4>
              <p className="text-3xl font-bold text-blue-600">${data.policyAdjustments.currentCoverage.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">Monthly Premium: ${data.user.monthlyPremium}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900">Recommended Coverage</h4>
              <p className="text-3xl font-bold text-green-600">${data.policyAdjustments.recommendedCoverage.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">Additional Premium: ${data.policyAdjustments.premiumChange}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Policy Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.policyAdjustments.benefits.map((benefit, index) => (
              <div key={index} className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-900">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Notifications */}
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="bg-blue-100 p-4 flex items-center"
              >
                <BellIcon className="w-5 h-5 text-blue-600 mr-2" />
                <p className="text-blue-900">{notification.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'predictions', 'coverage', 'savings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center px-6 py-4 border-b-2 font-medium text-sm capitalize transition-colors`}
                >
                  {tab === 'overview' && <ChartBarIcon className="w-5 h-5 mr-2" />}
                  {tab === 'predictions' && <ArrowTrendingUpIcon className="w-5 h-5 mr-2" />}
                  {tab === 'coverage' && <ShieldCheckIcon className="w-5 h-5 mr-2" />}
                  {tab === 'savings' && <CurrencyDollarIcon className="w-5 h-5 mr-2" />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AI Insurance Prediction Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Personalized insurance insights and predictions for {data.user.name}
                </p>
              </div>
              <button
                onClick={handleSimulation}
                disabled={isSimulating}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSimulating ? 'animate-pulse' : ''
                }`}
              >
                {isSimulating ? 'Simulating...' : 'Run New Simulation'}
              </button>
            </div>

            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-8"
            >
              <div className="flex items-center space-x-4">
                <UserCircleIcon className="w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-semibold">{data.user.name}</h2>
                  <p className="text-blue-100">Age: {data.user.age} • Policy: {data.user.currentPolicy}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm text-blue-100">Monthly Premium</p>
                  <p className="text-xl font-semibold">${data.user.monthlyPremium}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm text-blue-100">Coverage Amount</p>
                  <p className="text-xl font-semibold">${data.user.coverageAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm text-blue-100">Risk Score</p>
                  <p className="text-xl font-semibold">{data.user.riskScore}/100</p>
                </div>
              </div>
            </motion.div>

            {/* Content based on active tab */}
            {activeTab === 'overview' && (
              <>
                {/* Predicted Events Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Predicted Life Events</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {data.predictedEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-medium text-gray-900 capitalize">{event.type}</p>
                            <p className="text-sm text-gray-600">
                              Predicted: {event.predictedDate.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">
                              {(event.probability * 100).toFixed(0)}% Probability
                            </p>
                            <p className="text-sm text-gray-600">
                              Impact: ${event.financialImpact.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Financial Forecast */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Forecast</h2>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={forecastData}>
                        <defs>
                          <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="premium" stroke="#8884d8" fillOpacity={1} fill="url(#colorPremium)" name="Monthly Premium ($)" />
                        <Area type="monotone" dataKey="coverage" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCoverage)" name="Coverage (thousands $)" />
                        <Area type="monotone" dataKey="savings" stroke="#ffc658" fillOpacity={1} fill="url(#colorSavings)" name="Monthly Savings ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recommended Adjustments */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Policy Adjustments</h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Coverage Change</p>
                        <p className="text-lg font-medium text-gray-900">
                          ${data.policyAdjustments.currentCoverage.toLocaleString()} →{' '}
                          ${data.policyAdjustments.recommendedCoverage.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Premium Adjustment</p>
                        <p className="text-lg font-medium text-gray-900">
                          +${data.policyAdjustments.premiumChange}/month
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 mb-2">New Benefits</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.policyAdjustments.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="bg-white/50 rounded-lg p-4 text-sm text-gray-700"
                          >
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleAdjustment}
                        disabled={isAdjusting}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAdjusting ? 'Applying Changes...' : 'Apply Adjustments'}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

            {activeTab === 'predictions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Life Event Timeline</h3>
                  <div className="space-y-4">
                    {data.predictedEvents.map((event, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-medium text-gray-900 capitalize">{event.type}</h4>
                          <p className="text-sm text-gray-600">Expected: {event.predictedDate.toLocaleDateString()}</p>
                          <div className="mt-2 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${event.probability * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-medium text-gray-900">${event.financialImpact.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Financial Impact</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'coverage' && renderCoverageDetails()}
            
            {activeTab === 'savings' && renderSavingsBreakdown()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}