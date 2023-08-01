import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import ViewEmployeeComponent from './ViewEmployeeComponent';

const ListEmployeeComponent = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const addEmployee = () => {
    navigate('/add-employee');
  };

  const viewEmployee = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const editEmployee = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const closeViewEmployee = () => {
    setSelectedEmployeeId(null);
  };

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId)
      .then(() => {
        // After successful deletion, refresh the employee list
        EmployeeService.getEmployees().then((res) => {
          setEmployees(res.data);
        });
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
        // Handle any errors that occur during deletion
      });
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-4">Employees List</h2>
      <div>
        <button type="button" className="btn btn-primary m-3" onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <div className="row">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button onClick={() => editEmployee(employee.id)} className='ui inverted yellow button'>Update</button>
                  <button onClick={() => deleteEmployee(employee.id)} className='ui inverted red button'>Delete</button>
                  <button onClick={() => viewEmployee(employee.id)} className='ui inverted violet button'>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployeeId && (
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <ViewEmployeeComponent 
              employeeId={selectedEmployeeId}
              onClose={closeViewEmployee} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;