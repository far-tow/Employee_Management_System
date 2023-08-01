<template>
  <div class="container">
    <div>
      <h2 class="text-center mt-5 mb-5">Add Employee</h2>
      <div class="card col-md-6 offset-md-3">
        <div class="card-body">
          <form @submit.prevent="createEmployee">
            <div class="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                class="form-control"
                v-model="employee.firstName"
                required
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
                required
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
                required
              />
            </div>

            <button type="submit" class="ui inverted green button m-1">
              Save
            </button>
            <button class="ui inverted red button" @click="cancel">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmployeeService from '@/services/EmployeeService'
import { useRouter } from 'vue-router'

// Define a ref to hold the employee data
const employee = ref({
  firstName: '',
  lastName: '',
  emailId: '',
})

const router = useRouter()

// Function to create a new employee
const createEmployee = async () => {
  try {
    await EmployeeService.createEmployee(employee.value)
    console.log('Successfully created employee:', employee.value)

    // Redirect back to the employee list page (Employee.vue)
    router.push({ name: 'employee' })
  } catch (error) {
    console.error('Error creating employee:', error)
  }
}

const cancel = () => {
  // Navigate back to the Employee list page without creating a new employee
  router.push({ name: 'employee' })
}
</script>