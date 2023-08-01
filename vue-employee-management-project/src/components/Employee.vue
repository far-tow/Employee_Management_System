<template>
  <div class="container-xl">
    <h1 class="text-center">Employees List</h1>
    <button class="ui inverted pink button m-1" @click="createEmployee">Add Employee</button>
    <table class="table table-dark table-striped">
      <thead>
        <tr class="text-center">
          <th>Employee ID</th>
          <th>Employee First Name</th>
          <th>Employee Last Name</th>
          <th>Employee Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.emailId }}</td>
          <td>
            <button class="ui inverted pink button m-1" @click="showDeleteConfirmation(employee)">Delete</button>
            <button class="ui inverted yellow button m-1" @click="editEmployee(employee.id)">Edit</button>
            <button class="ui inverted violet button m-1" @click="showDetails(employee.id)">Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteConfirmationCard v-if="showConfirmation" 
    :selectedEmployee="selectedEmployee" 
    @confirmed="deleteEmployee" 
    @canceled="cancelDelete" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EmployeeService from '../services/EmployeeService'
import { useRouter } from 'vue-router'

// Define a ref for employees
const employees = ref([])
const router = useRouter()

// Define a ref for selected employee and showConfirmation
const selectedEmployee = ref(null)
const showConfirmation = ref(false)

// Fetch employees data from the backend API
onMounted(async () => {
  try {
    const response = await EmployeeService.getEmployees()
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
})

const createEmployee = () => {
  // Navigate to the CreateEmployee.vue component to create a new employee
  router.push({ name: 'createEmployee' })
}

const showDeleteConfirmation = (employee) => {
  // Show the confirmation card with the selected employee
  selectedEmployee.value = employee
  showConfirmation.value = true
}

const deleteEmployee = async () => {
  const employeeId = selectedEmployee.value.id // Get the employeeId from selectedEmployee
  try {
    // Make the DELETE request using Axios
    await EmployeeService.deleteEmployee(employeeId)
    console.log(`Successfully deleted employee with ID: ${employeeId}`)

    // Hide the confirmation card after successful deletion
    showConfirmation.value = false

    // Optionally, you can also refresh the employees list after successful deletion
    const updatedEmployees = employees.value.filter((employee) => employee.id !== employeeId)
    employees.value = updatedEmployees
  } catch (error) {
    console.error(`Error deleting employee with ID: ${employeeId}`, error)
  }
}

const cancelDelete = () => {
  // Hide the confirmation card when the user cancels
  showConfirmation.value = false
}

const editEmployee = (employeeId) => {
  // Navigate to EditEmployee.vue with the employeeId as a route parameter
  router.push({ name: 'editEmployee', params: { employeeId } })
}

const showDetails = (employeeId) => {
  // Navigate to EmployeeCard.vue with the employeeId as a route parameter
  router.push({ name: 'employeeCard', params: { employeeId } })
}
</script>

<script>
// Import the DeleteConfirmationCard component
import DeleteConfirmationCard from '@/components/DeleteConfirmationCard.vue'

export default {
  components: {
    DeleteConfirmationCard,
  },
}
</script>