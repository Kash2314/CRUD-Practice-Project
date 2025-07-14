/** @format */

import React, { useState } from "react";

const Home = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });
  const [TableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTableData = TableData;
      Object.assign(tempTableData[editIndex], input);
      setTableData([...tempTableData]);
      setEditClick(false);
      setTableData([...TableData, input]);
      setInput({
        name: "",
        email: "",
      });
    } else {
      setTableData([...TableData, input]);
      setInput({
        name: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const FilterData = TableData.filter((item, i) => i !== index);
    setTableData(FilterData);
  };
  const handleEdit = (index) => {
    const changeData = TableData[index];
    setInput({
      name: changeData.name,
      email: changeData.email,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div>
      <h1>CRUD</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={input.name} onChange={handleChange} />
          </div>

          <div>
            <label>E-mail</label>
            <input name="email" value={input.email} onChange={handleChange} />
          </div>
          <button type="submit">{editClick ? "Update" : "Add"}</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {TableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
