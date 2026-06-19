import { useState } from "react";
import API from "../services/api";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(err);
      alert("Failed to Add Expense");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          maxWidth: "700px",
          margin: "auto",
          borderRadius: "20px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">
            💸 Add Expense
          </h1>

          <p className="text-muted">
            Record your daily spending easily
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Expense Title
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter expense title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Amount (₹)
            </label>

            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select form-select-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Health">❤️ Health</option>
              <option value="Education">📚 Education</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-bold btn-lg shadow"
            style={{
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
              border: "none",
            }}
          >
            ➕ Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;