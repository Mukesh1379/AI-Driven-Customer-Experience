'use client';

import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { format, subDays } from 'date-fns';
import { 
  BellIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  MapPinIcon, 
  ArrowTrendingUpIcon,
  GlobeAmericasIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FraudDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'High-risk transaction detected', severity: 'high', time: '2 minutes ago', location: 'New Delhi, IND' },
    { id: 2, message: 'Unusual login pattern observed', severity: 'medium', time: '15 minutes ago', location: 'Mumbai, IND' },
    { id: 3, message: 'Multiple failed verification attempts', severity: 'low', time: '1 hour ago', location: 'Chennai, IND' },
  ]);
  const [riskScore, setRiskScore] = useState(24);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateDates = () => {
    return Array.from({ length: 7 }).map((_, i) => 
      format(subDays(new Date(), 6 - i), 'MMM dd')
    );
  };

  const lineData = {
    labels: generateDates(),
    datasets: [
      {
        label: 'Fraud Risk Score',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderColor: 'rgba(79, 70, 229, 0.8)',
        tension: 0.4,
      },
      {
        label: 'Average Industry Score',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        borderColor: 'rgba(16, 185, 129, 0.8)',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ],
  };

  const barData = {
    labels: ['Identity Theft', 'Payment Fraud', 'Account Takeover', 'Synthetic Identity', 'Other'],
    datasets: [
      {
        label: 'Current Period',
        data: [45, 32, 28, 19, 12],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
      {
        label: 'Previous Period',
        data: [38, 28, 24, 15, 10],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      }
    ],
  };

  const doughnutData = {
    labels: ['Verified', 'Suspicious', 'Blocked'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const radarData = {
    labels: ['Device Trust', 'Location', 'Behavior', 'Transaction', 'Identity', 'Network'],
    datasets: [
      {
        label: 'Risk Factors',
        data: [85, 65, 75, 90, 82, 70],
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 0.8)',
        pointBackgroundColor: 'rgba(79, 70, 229, 0.8)',
        pointBorderColor: '#fff',
      }
    ]
  };

  const geoData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [
      {
        label: 'Fraud Attempts by Region',
        data: [420, 380, 290, 180, 120, 90],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(192, 132, 252, 0.8)',
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const handleAlertDismiss = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />,
      title: 'Total Claims',
      value: '1,234',
      change: '+12.5% from last month',
      changeColor: 'text-emerald-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />,
      title: 'Flagged Claims',
      value: '56',
      change: '-8% from last month',
      changeColor: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: <BellIcon className="h-8 w-8 text-emerald-600" />,
      title: 'Risk Score',
      value: `${riskScore.toFixed(1)}%`,
      change: 'Updated live',
      changeColor: 'text-gray-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: <GlobeAmericasIcon className="h-8 w-8 text-blue-600" />,
      title: 'Active Regions',
      value: '28',
      change: '+3 new regions',
      changeColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />,
      title: 'Prevented Fraud',
      value: '$2.8M',
      change: 'Last 30 days',
      changeColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-purple-600" />,
      title: 'Users Protected',
      value: '89.2K',
      change: '+2.3K this week',
      changeColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="glass-card rounded-2xl shadow-xl p-4 md:p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
            Fraud Detection Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring and analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefreshData}
            className={`p-2 rounded-lg transition-all hover:bg-gray-100 ${isLoading ? 'animate-spin' : ''}`}
            disabled={isLoading}
          >
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex gap-2">
            {['week', 'month'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedTimeframe === timeframe
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card flex items-center p-4 hover:scale-[1.02]">
            <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm ${stat.changeColor}`}>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-inner h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Risk Score Trends</h3>
          <div className="h-[calc(100%-2rem)]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-inner h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Risk Assessment Radar</h3>
          <div className="h-[calc(100%-2rem)]">
            <Radar data={radarData} options={{ ...chartOptions, aspectRatio: 1 }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-inner h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Transaction Status</h3>
          <div className="h-[calc(100%-2rem)]">
            <Doughnut data={doughnutData} options={{ ...chartOptions, aspectRatio: 1 }} />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-inner h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
          <div className="h-[calc(100%-2rem)]">
            <Bar data={geoData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-inner h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Fraud Distribution</h3>
          <div className="h-[calc(100%-2rem)]">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-inner h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Alerts</h3>
            <span className="text-sm text-gray-500">{alerts.length} active alerts</span>
          </div>
          <div className="space-y-3 h-[calc(100%-3rem)] overflow-y-auto custom-scrollbar">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded-lg ${getSeverityColor(
                  alert.severity
                )} transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center space-x-3">
                  <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{alert.message}</p>
                    <div className="flex items-center text-xs opacity-75 space-x-2 mt-1">
                      <span>{alert.time}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>{alert.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAlertDismiss(alert.id)}
                  className="text-xs font-medium hover:underline ml-2"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDashboard;