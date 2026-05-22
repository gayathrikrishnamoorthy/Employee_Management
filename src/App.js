import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
function App()
{
  const [data,setdata]=useState([]);
  const[name,setname]=useState("");
  const[email,setemail]=useState("");
  const[salary,setsalary]=useState("");
  const[dept,setdept]=useState("");
  const[edit,setedit]=useState(null);
  const[filter,setfilter]=useState("");
  const[sort,setsort]=useState("");
  const url="http://localhost:5000";
  //fetchemp
  const fetchemp= async()=>
  {
    let endpoint=`${url}/emp`;
  const query=[];
  if(filter)
  {
    query.push(`dept=${filter}`);
  }
  if(sort)
  {
    query.push(`sort=${sort}`);
  }
  if(query.length>0)
  {
    endpoint+=`?${query.join("&")}`;
  }
  const emp=await axios.get(endpoint);
  setdata(emp.data);
  }
useEffect(()=>
{
    fetchemp();
},[filter,sort])
  //add
  const submit= async(e)=>
  {
    e.preventDefault();
    if(salary<0) {
      alert("Enter valid salary");
      return;
    }
    if(edit)
    {
      await axios.put(`${url}/emp/${edit}`,{name,email,salary,dept});
      setedit(null);
    }
    else{
      await axios.post(`${url}/emp`,{name,email,salary,dept});
    }
    setname("");
    setemail("");
    setsalary("");
    setdept("");
fetchemp();
  };

  //update
  const update= (edit)=>
  {
    const emp = data.find((d)=>d.id===edit);
    setname(emp.name);
    setemail(emp.email);
    setsalary(emp.salary);
    setdept(emp.dept);
    setedit(edit);
  }

  const del = async (id) =>
  {
      await axios.delete(`${url}/emp/${id}`);
      fetchemp();
  };

  return (
  <div className="app-container">

    <h1 className="main-title">Employee Management System</h1>

    <form className="employee-form" onSubmit={submit}>

      <input
        className="input-field"
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e)=>setname(e.target.value)}
      />

      <input
        className="input-field"
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e)=>setemail(e.target.value)}
      />

      <input
        className="input-field"
        type='number'
        placeholder='Salary'
        value={salary}
        onChange={(e)=>setsalary(e.target.value)}
      />

      <select
        className="select-field"
        value={dept}
        onChange={(e)=>setdept(e.target.value)}
      >
        <option value="">Select Department</option>
        <option value="Sales">Sales</option>
        <option value="IT">IT</option>
        <option value="Cloud">Cloud</option>
        <option value="HR">HR</option>
      </select>

      <button className="submit-btn" type='submit'>
        {
          edit ? "Update Employee" : "Add Employee"
        }
      </button>

    </form>

    <br/>

    <h1 className="details-title">Employee Details</h1>

    <div className="filter-container">

      <div className="filter-box">
        <label>Filter By</label>

        <select
          className="select-field"
          value={filter}
          onChange={(e)=>setfilter(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="Cloud">Cloud</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <div className="filter-box">
        <label>Sort by Salary</label>

        <select
          className="select-field"
          value={sort}
          onChange={(e)=>setsort(e.target.value)}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

    </div>

    <div className="employee-container">

      {data.map((d)=>
      (
        <div className="employee-card" key={d.id}>

          <p><span>Name:</span> {d.name}</p>
          <p><span>Email:</span> {d.email}</p>
          <p><span>Salary:</span> {d.salary}</p>
          <p><span>Dept:</span> {d.dept}</p>

          <div className="button-group">

            <button
              className="update-btn"
              onClick={()=>update(d.id)}
            >
              Update
            </button>

            <button
              className="delete-btn"
              onClick={()=>del(d.id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>

  </div>
)
};
export default App;

