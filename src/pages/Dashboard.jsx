import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

const Dashboard = () => {
  // Static datasets
  const bloodPressureData = [
    { type: "Normal", Systolic: 120, Diastolic: 80 },
    { type: "Borderline", Systolic: 140, Diastolic: 90 },
  ];

  const bloodSugarData = [
    {
      id: "Blood Sugar",
      data: [
        { x: "Day 1", y: 85 },
        { x: "Day 2", y: 95 },
        { x: "Day 3", y: 90 },
        { x: "Day 4", y: 100 },
        { x: "Day 5", y: 92 },
      ],
    },
  ];

  const bodyWeightData = [
    { id: "Healthy", label: "Healthy Range", value: 65 },
    { id: "Overweight", label: "Overweight", value: 25 },
    { id: "Underweight", label: "Underweight", value: 10 },
  ];

  return (
    <div className="dashboard-container">
      <h2>📊 Health Reference Dashboard</h2>

      {/* Bar Chart - Blood Pressure */}
      <div style={{ height: "300px" }}>
        <h3>Blood Pressure (mmHg)</h3>
        <ResponsiveBar
          data={bloodPressureData}
          keys={["Systolic", "Diastolic"]}
          indexBy="type"
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "set2" }}
          axisBottom={{ legend: "Type", legendPosition: "middle", legendOffset: 32 }}
          axisLeft={{ legend: "mmHg", legendPosition: "middle", legendOffset: -50 }}
        />
        <p>Blood Pressure: “Normal: 120/80 mmHg”</p>
      </div>

      {/* Line Chart - Blood Sugar */}
      <div style={{ height: "300px", marginTop: "40px" }}>
        <h3>Blood Sugar (mg/dL)</h3>
        <p>Blood Sugar: “Normal: 70–99 mg/dL (fasting)”</p>
        <ResponsiveLine
          data={bloodSugarData}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 70, max: 120, stacked: false }}
          axisBottom={{ legend: "Days", legendPosition: "middle", legendOffset: 32 }}
          axisLeft={{ legend: "mg/dL", legendPosition: "middle", legendOffset: -50 }}
          colors={{ scheme: "category10" }}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
        />
      </div>

      {/* Pie Chart - Body Weight */}
      <div style={{ height: "300px", marginTop: "40px" }}>
        <h3>Body Weight Distribution</h3>
        <p>Body Weight: “Normal BMI: 18.5–24.9”</p>
        <ResponsivePie
          data={bodyWeightData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "set3" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 56,
              itemsSpacing: 10,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;


// import React from 'react'

// function Dashboard() {
//   return (
//     <div className='dashboard'>
//         <h1>Dashboard</h1>
//     </div>
//   )
// }

// export default Dashboard