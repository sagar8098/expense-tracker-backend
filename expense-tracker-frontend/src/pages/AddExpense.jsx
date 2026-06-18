import { useState } from "react";
import API from "../services/api";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/expense",
        {
          title,
          amount: parseFloat(amount),
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Expense Added Successfully");

      setTitle("");
      setAmount("");
      setCategory("");

    } catch (err) {
      alert("Failed to Add Expense");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">Add Expense</h2>

        <input
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={addExpense}
        >
          Add Expense
        </button>

      </div>
    </div>
  );
}

export default AddExpense;