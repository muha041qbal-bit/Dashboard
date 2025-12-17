import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SCurveChart = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="planned" 
            stroke="#3498db" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Planned %"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#2ecc71" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Actual %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SCurveChart;