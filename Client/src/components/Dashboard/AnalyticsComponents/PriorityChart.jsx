import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


// Custom colors for each priority
const COLORS = ["#60a5fa", "#facc15", "#f97316"];

const PriorityPieChart = ({data}) => {

  const {LOW,MEDIUM,HIGH} = data|| {};

  const prioritydata = [
    { priority: "LOW", count: LOW },
    { priority: "MEDIUM", count: MEDIUM },
    { priority: "HIGH", count: HIGH },
  ];
  
  return (
    <div className="bg-orange-50 p-4 rounded-2xl shadow-lg w-full h-[300px]">
      <h2 className="text-md font-semibold text-gray-700 mb-4">
        Priority Analytics
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={prioritydata}
            dataKey="count"
            nameKey="priority"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={true}
            label={({ name, value }) => `${name}: ${value}`} 
          >
            {prioritydata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip showing actual count */}
          <Tooltip
            formatter={(value, name) => [`${value}`, `${name}`]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #f97316",
              borderRadius: "8px",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityPieChart;
