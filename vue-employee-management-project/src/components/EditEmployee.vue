<template>
  <div class="container">
    <div>
      <h2 class="text-center mt-5 mb-5">Update Employee</h2>
      <div class="card col-md-6 offset-md-3">
        <div class="card-body">
          <form @submit.prevent="updateEmployee">
            <div class="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                class="form-control"
                v-model="employee.firstName"
              />
            </div>

            <div class="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                class="form-control"
                v-model="employee.lastName"
              />
            </div>

            <div class="form-group">
              <label htmlFor="emailId">Email Id</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                class="form-control"
                v-model="employee.emailId"
              />
            </div>

            <button type="submit" class="ui inverted green button m-1">
              Save
            </button>
            <button class="ui inverted red button" @click="cancelEdit">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, getCurrentInstance } from 'vue'
import EmployeeService from '@/services/EmployeeService'

// Define a ref to hold the employee data
const employee = ref({})

// Props from the parent component (Employee.vue)
const { employeeId } = defineProps(['employeeId'])

// Get the router instance
const router = getCurrentInstance().proxy.$router

// Fetch the employee data from the backend API based on the employeeId prop
onMounted(async () => {
  try {
    const response = await EmployeeService.getEmployeeById(employeeId)
    employee.value = response.data
  } catch (error) {
    console.error('Error fetching employee data:', error)
  }
})

const updateEmployee = async () => {
  try {
    await EmployeeService.updateEmployee(employee.value)
    console.log('Successfully updated employee:', employee.value)

    // Redirect back to the employee list page (Employee.vue)
    router.push({ name: 'employee' })
  } catch (error) {
    console.error('Error updating employee:', error)
  }
}

const cancelEdit = () => {
  // Navigate back to the Employee list page without updating
  router.push({ name: 'employee' })
}
</script>