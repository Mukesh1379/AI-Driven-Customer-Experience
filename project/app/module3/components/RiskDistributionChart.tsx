'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomerData } from '../types/churn';

interface Props {
  customerData: CustomerData[];
}

const COLORS = ['#22c55e', '#eab308', '#ef4444'];

export default function RiskDistributionChart({ customerData }: Props) {
  const riskDistribution = customerData.reduce((acc, customer) => {
    const risk = customer.riskLevel;
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'Low Risk', value: riskDistribution['Low'] || 0 },
    { name: 'Medium Risk', value: riskDistribution['Medium'] || 0 },
    { name: 'High Risk', value: riskDistribution['High'] || 0 },
  ];

  return (
    <div className="h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm font-medium text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}