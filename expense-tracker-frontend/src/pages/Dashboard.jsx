import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="mb-5">
        <h1 className="fw-bold">📊 Dashboard</h1>
        <p className="text-muted">
          Track your expenses and manage your budget efficiently.
        </p>
      </div>

      <div className="row g-4">

        {/* Total Expense */}
        <div className="col-md-4">
          <div
            className="card text-white border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #007bff, #00c6ff)",
            }}
          >
            <div className="card-body p-4">
              <h5>💸 Total Expense</h5>
              <h1 className="fw-bold">
                ₹{data.total_expense || 0}
              </h1>
            </div>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="col-md-4">
          <div
            className="card text-white border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #28a745, #7bed9f)",
            }}
          >
            <div className="card-body p-4">
              <h5>💰 Monthly Budget</h5>
              <h1 className="fw-bold">
                ₹{data.monthly_budget || 0}
              </h1>
            </div>
          </div>
        </div>

        {/* Remaining Balance */}
        <div className="col-md-4">
          <div
            className="card text-white border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #ff416c, #ff4b2b)",
            }}
          >
            <div className="card-body p-4">
              <h5>🏦 Remaining Balance</h5>
              <h1 className="fw-bold">
                ₹{data.remaining_balance || 0}
              </h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;