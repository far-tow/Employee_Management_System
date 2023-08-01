import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Card, Icon } from 'semantic-ui-react';

const ViewEmployeeComponent = ({ employeeId, onClose }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch the employee data based on the employeeId prop
    EmployeeService.getEmployeeById(employeeId)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        // Handle any errors that occur during data fetching
      });

    // Return a cleanup function to set employee to null when unmounted
    return () => {
      setEmployee(null);
    };
  }, [employeeId]);

  const handleClose = () => {
    // Call the onClose function passed from the parent component to close the view
    onClose();
  };

  if (!employee) {
    // If there is no employee, do not render the card
    return null;
  }

  return (
    <div>
      <Card color="violet">
        <Card.Content>
          <Card.Header>Information:</Card.Header>
          <Card.Description>
            <p>
              <strong>Employee's ID number:</strong> {employee.id}
            </p>
            <p>
              <strong>Employee's First Name:</strong> {employee.firstName}
            </p>
            <p>
              <strong>Employee's Last Name:</strong> {employee.lastName}
            </p>
            <p>
              <strong>Email:</strong> {employee.emailId}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <button className="ui button red" onClick={handleClose}>
            <Icon name="close" />
            Close
          </button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ViewEmployeeComponent;