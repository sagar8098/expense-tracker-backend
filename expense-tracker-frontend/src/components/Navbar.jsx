import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/dashboard">
          Expense Tracker
        </Link>

        <div className="navbar-nav">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/add-expense">
            Add Expense
          </Link>

          <Link className="nav-link" to="/expenses">
            Expenses
          </Link>

          <Link className="nav-link" to="/budget">
            Budget
          </Link>

          <Link className="nav-link" to="/analytics">
            Analytics
          </Link>

          <button
            className="btn btn-danger ms-3"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;