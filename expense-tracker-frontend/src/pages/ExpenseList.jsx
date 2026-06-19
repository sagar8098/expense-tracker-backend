import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense Deleted Successfully");
      fetchExpenses();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1 className="fw-bold text-primary">
          📋 Expense List
        </h1>

        <p className="text-muted">
          View and manage all your expenses
        </p>
      </div>

      {expenses.length === 0 ? (
        <div className="card shadow p-4 text-center">
          <h4>No expenses found 😔</h4>
        </div>
      ) : (
        expenses.map((expense) => (
          <div
            className="card shadow-lg border-0 mb-4"
            style={{ borderRadius: "20px" }}
            key={expense.id}
          >
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h3 className="fw-bold">
                    {expense.title}
                  </h3>

                  <h4 className="text-success">
                    ₹{expense.amount}
                  </h4>

                  <span className="badge bg-info fs-6">
                    {expense.category}
                  </span>
                </div>

                <div>
                  <Link
                    to={`/edit-expense/${expense.id}`}
                    className="btn btn-warning me-2"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                  >
                    🗑 Delete
                  </button>
                </div>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;