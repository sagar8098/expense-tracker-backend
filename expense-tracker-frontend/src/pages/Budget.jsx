import { useEffect, useState } from "react";
import API from "../services/api";

function Budget() {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [currentBudget, setCurrentBudget] = useState(null);

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentBudget(response.data.monthly_budget);
    } catch (err) {
      console.log(err);
    }
  };

  const createBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/budget",
        {
          monthly_budget: parseFloat(monthlyBudget),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Budget Created Successfully");

      fetchBudget();

    } catch (err) {
      console.log(err);
      alert("Budget already exists");
    }
  };

  return (
    <div>
      <h1>Budget</h1>

      <h3>
        Current Budget:
        ₹{currentBudget || 0}
      </h3>

      <input
        type="number"
        placeholder="Enter Monthly Budget"
        value={monthlyBudget}
        onChange={(e) =>
          setMonthlyBudget(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createBudget}>
        Save Budget
      </button>
    </div>
  );
}

export default Budget;