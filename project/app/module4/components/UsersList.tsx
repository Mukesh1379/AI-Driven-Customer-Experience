'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, BriefcaseIcon, HomeIcon, HeartIcon, ShieldCheckIcon, AcademicCapIcon, BuildingOfficeIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    occupation: "Software Engineer",
    riskScore: 85,
    insuranceType: "Premium Health",
    location: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    specialization: "Full Stack Development"
  },
  {
    id: 2,
    name: "Sarah Smith",
    age: 28,
    occupation: "Marketing Manager",
    riskScore: 78,
    insuranceType: "Standard Health",
    location: "Los Angeles",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    specialization: "Digital Marketing"
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 45,
    occupation: "Business Owner",
    riskScore: 92,
    insuranceType: "Family Health Plus",
    location: "Chicago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    specialization: "Retail Chain"
  },
  {
    id: 4,
    name: "Emily Brown",
    age: 35,
    occupation: "Doctor",
    riskScore: 88,
    insuranceType: "Professional Health",
    location: "Boston",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    specialization: "Pediatrics"
  },
  {
    id: 5,
    name: "David Wilson",
    age: 41,
    occupation: "Architect",
    riskScore: 82,
    insuranceType: "Premium Health",
    location: "Seattle",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    specialization: "Sustainable Design"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    age: 29,
    occupation: "Teacher",
    riskScore: 75,
    insuranceType: "Education Health",
    location: "Portland",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    specialization: "Elementary Education"
  },
  {
    id: 7,
    name: "James Taylor",
    age: 38,
    occupation: "Financial Analyst",
    riskScore: 89,
    insuranceType: "Premium Plus",
    location: "Miami",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    specialization: "Investment Banking"
  },
  {
    id: 8,
    name: "Maria Garcia",
    age: 33,
    occupation: "Chef",
    riskScore: 80,
    insuranceType: "Standard Plus",
    location: "San Francisco",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    specialization: "Fine Dining"
  },
  {
    id: 9,
    name: "Robert Martinez",
    age: 47,
    occupation: "Lawyer",
    riskScore: 91,
    insuranceType: "Professional Elite",
    location: "Washington DC",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    specialization: "Corporate Law"
  },
  {
    id: 10,
    name: "Jennifer Lee",
    age: 31,
    occupation: "UX Designer",
    riskScore: 83,
    insuranceType: "Creative Pro",
    location: "Austin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    specialization: "Mobile Design"
  },
  {
    id: 11,
    name: "William Turner",
    age: 52,
    occupation: "Professor",
    riskScore: 87,
    insuranceType: "Academic Health",
    location: "Denver",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
    specialization: "Computer Science"
  },
  {
    id: 12,
    name: "Emma Wilson",
    age: 26,
    occupation: "Data Scientist",
    riskScore: 86,
    insuranceType: "Tech Pro",
    location: "San Diego",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    specialization: "Machine Learning"
  }
];

export default function UsersList({ onSelectUser }: { onSelectUser: (userId: number) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOccupation, setFilterOccupation] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOccupation = !filterOccupation || user.occupation === filterOccupation;
    return matchesSearch && matchesOccupation;
  });

  const occupations = Array.from(new Set(users.map(user => user.occupation)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Insurance Management System</h1>
          <p className="text-xl text-gray-600">Select a user to view their insurance predictions and recommendations</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-md">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by name or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={filterOccupation}
              onChange={(e) => setFilterOccupation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Occupations</option>
              {occupations.map(occupation => (
                <option key={occupation} value={occupation}>{occupation}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectUser(user.id)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full bg-gray-100"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.occupation}</p>
                    <p className="text-sm text-gray-500">{user.specialization}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <HeartIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Age</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{user.age} years</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <BriefcaseIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">Risk Score</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{user.riskScore}/100</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-600">Insurance</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{user.insuranceType}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <GlobeAmericasIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-600">Location</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{user.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}