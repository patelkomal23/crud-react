import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [expense, setExpense] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(-1);
  const editBtnRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();

    if (editId === -1) {
      const newList = [...expenses, { ...expense, id }];
      setExpenses(newList);
      localStorage.setItem("expenses", JSON.stringify(newList));
    } else {
      const updated = expenses.map((exp) =>
        exp.id === editId ? { ...expense, id: editId } : exp
      );
      setExpenses(updated);
      localStorage.setItem("expenses", JSON.stringify(updated));
      setEditId(-1);
      editBtnRef.current.innerText = "Add Expense";
    }

    setExpense({});
  };

  const handleDelete = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
    localStorage.setItem("expenses", JSON.stringify(filtered));
  };

  const handleEdit = (id) => {
    const selected = expenses.find((exp) => exp.id === id);
    setExpense(selected);
    setEditId(id);
    editBtnRef.current.innerText = "Update Expense";
    focusRef.current.focus();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center"> Daily Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={expense.date || ""}
            onChange={handleChange}
            ref={focusRef}
            required
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={expense.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={expense.amount || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={expense.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button ref={editBtnRef} type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, idx) => (
            <tr key={exp.id}>
              <td>{idx + 1}</td>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>{exp.description}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(exp.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App