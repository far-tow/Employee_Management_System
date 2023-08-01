import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the employee id from the URL params

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((res) => {
        const { firstName, lastName, emailId } = res.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmailId(emailId);
      })
      .catch((error) => {
        console.log('Error fetching employee data:', error);
        // Handle error scenario (e.g., set a state variable to indicate error)
      });
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };
    console.log('employee => ', employee);

    // Use the updateEmployee function from the service to update the employee
    EmployeeService.updateEmployee(id, employee).then(() => {
      navigate('/employees');
    });
  };

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Update Employee</h2>
      <div className="card col-md-6 offset-md-3">
        <div className="card-body">
          <form action="">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailId">Email Id</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                className="form-control"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <button className="btn btn-success m-1" onClick={updateEmployee}>
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate('/employees')}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeComponent;