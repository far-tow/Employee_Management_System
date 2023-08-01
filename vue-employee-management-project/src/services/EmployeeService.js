import axios from "axios"

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1'

class EmployeeService {
  getEmployees() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/employees`)
  }

  getEmployeeById(employeeId) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/employees/${employeeId}`)
  }

  updateEmployee(employee) {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/employees/${employee.id}`, employee)
  }

  createEmployee(employee) {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/employees`, employee)
  }

  deleteEmployee(employeeId) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/employees/${employeeId}`)
  }
}

export default new EmployeeService()