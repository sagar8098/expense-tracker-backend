import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const labels = response.data.map(
        (item) => item.category
      );

      const amounts = response.data.map(
        (item) => item.total
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            data: amounts,
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Analytics</h1>

      <div
        style={{
          width: "500px",
          margin: "auto",
        }}
      >
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default Analytics;