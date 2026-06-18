import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/expense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle(response.data.title);
      setAmount(response.data.amount);
      setCategory(response.data.category);

    } catch (err) {
      console.log(err);
    }
  };

  const updateExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/expense/${id}`,
        {
          title,
          amount,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Expense Updated Successfully");

      navigate("/expenses");

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div>
      <h1>Edit Expense</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <br /><br />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <br /><br />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <br /><br />

      <button onClick={updateExpense}>
        Update Expense
      </button>
    </div>
  );
}

export default EditExpense;