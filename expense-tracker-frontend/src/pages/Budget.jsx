import { useState, useEffect } from "react";
import api from "../services/api";

export default function Budget() {
  const [budget, setBudget] = useState("");
  const [currentBudget, setCurrentBudget] = useState(0);

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const res = await api.get("/budget");
      setCurrentBudget(res.data.monthly_budget);
    } catch (err) {
      console.log(err);
    }
  };

  const saveBudget = async () => {
    try {
      await api.post("/budget", {
        monthly_budget: Number(budget),
      });
      alert("Budget Saved Successfully");
      fetchBudget();
      setBudget("");
    } catch (err) {
      alert("Failed to save budget");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg mx-auto p-4"
        style={{ maxWidth: "500px", borderRadius: "20px" }}
      >
        <h2 className="text-center text-primary mb-4">
          💰 Monthly Budget
        </h2>

        <div className="card bg-light p-3 mb-4 text-center">
          <h4>Current Budget</h4>
          <h2 className="text-success">₹ {currentBudget}</h2>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Monthly Budget</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={saveBudget}
        >
          Save Budget
        </button>
      </div>
    </div>
  );
}