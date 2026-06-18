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
      <h1 className="mb-4">Dashboard</h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h4>Total Expense</h4>
              <h2>₹{data.total_expense}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h4>Monthly Budget</h4>
              <h2>₹{data.monthly_budget}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h4>Remaining Balance</h4>
              <h2>₹{data.remaining_balance}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;