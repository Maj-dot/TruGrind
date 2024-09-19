import { useState, useEffect } from "react";
import { getProgress } from "../../services/progressService";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../ProgressReportPage/ProgressReportPage.css";
import ProgressForm from "../../components/ProgressForm/ProgressForm";
import ProgressList from "../../components/ProgressList/ProgressList";


export default function ProgressReportPage() {
  const [progressEntries, setProgressEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const fetchProgressEntries = async () => {
    try {
      const data = await getProgress();
      setProgressEntries(data);
    } catch (error) {
      console.error("Error fetching progress entries:", error);
    }
  };

  const chartData = progressEntries.map((entry, index) => ({
    name: `Entry ${index + 1}`,
    currentWeight: entry.currentWeight,
    targetWeight: entry.targetWeight,
    milesRun: entry.milesRun,
    weightsLifted: entry.weightsLifted,
  }));

  useEffect(() => {
    fetchProgressEntries();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {" "}
      <h1 style={{ color: "#4A90E2", marginBottom: "20px" }}>
        Progress Reports
      </h1>{" "}
      <ProgressForm
        refreshProgress={fetchProgressEntries}
        initialData={editEntry}
      />
      {progressEntries.length > 0 ? (
        <LineChart
          width={500}
          height={300}
          data={chartData}
          style={{ margin: "0 auto" }}
        >
          <Line type="monotone" dataKey="currentWeight" stroke="#8884d8" />
          <Line type="monotone" dataKey="targetWeight" stroke="#82ca9d" />
          <Line type="monotone" dataKey="milesRun" stroke="#ffc658" />
          <Line type="monotone" dataKey="weightsLifted" stroke="#ff7300" />
          <Tooltip />
          <Legend />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      ) : (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          No progress entries available. Please add one!
        </p>
      )}
      <ProgressList
        progressEntries={progressEntries}
        setProgressEntries={setProgressEntries}
        setEditEntry={setEditEntry}
      />
    </div>
  );
}
