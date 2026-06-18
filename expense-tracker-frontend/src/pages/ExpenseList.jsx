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

      <h1 className="mb-4">Expense List</h1>

      {expenses.length === 0 ? (
        <h3>No expenses found</h3>
      ) : (
        expenses.map((expense) => (
          <div className="card shadow mb-3" key={expense.id}>

            <div className="card-body">

              <h4>{expense.title}</h4>

              <h5 className="text-success">
                ₹{expense.amount}
              </h5>

              <p>{expense.category}</p>

              <Link
                to={`/edit-expense/${expense.id}`}
                className="btn btn-warning me-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;