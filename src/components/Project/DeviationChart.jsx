import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DeviationChart = () => {
  const data = [
    { month: 'Jan', planned: 10, actual: 8, deviation: -2 },
    { month: 'Feb', planned: 20, actual: 18, deviation: -2 },
    { month: 'Mar', planned: 35, actual: 30, deviation: -5 },
    { month: 'Apr', planned: 50, actual: 45, deviation: -5 },
    { month: 'May', planned: 65, actual: 55, deviation: -10 },
    { month: 'Jun', planned: 80, actual: 65, deviation: -15 },
  ];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="planned" 
            fill="#3498db" 
            name="Planned"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="actual" 
            fill="#2ecc71" 
            name="Actual"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviationChart;