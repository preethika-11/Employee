import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    phone: "",
    department: "HR",
    date_of_joining: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/employees", formData);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee Management System</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="form-control"
            required
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            pattern="\d{10}"
            required
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-control"
          >
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            className="form-control"
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-secondary">Reset</button>
        </div>
      </form>
      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
}

export default App;
