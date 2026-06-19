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
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#8BC34A",
              "#E91E63",
              "#03A9F4",
              "#FFC107",
            ],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 20,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="text-center text-primary mb-4">
          📊 Expense Analytics
        </h1>

        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      size: 14,
                    },
                    padding: 20,
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;