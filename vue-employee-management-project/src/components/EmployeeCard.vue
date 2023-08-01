<template>
  <div class="card col-md-6 offset-md-3">
    <div class="card-body">
      <h2 class="text-center mt-3 mb-5">{{ employee.firstName }} {{ employee.lastName }}</h2>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          class="form-control"
          v-model="editedEmployee.firstName"
          :disabled="!isEditing"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          class="form-control"
          v-model="editedEmployee.lastName"
          :disabled="!isEditing"
        />
      </div>

      <div class="form-group">
        <label for="emailId">Email Id</label>
        <input
          type="email"
          id="emailId"
          name="emailId"
          class="form-control"
          v-model="editedEmployee.emailId"
          :disabled="!isEditing"
        />
      </div>

      <div v-if="isEditing">
        <!-- Show Save and Cancel buttons while editing -->
        <button class="ui inverted green button m-1" @click="saveEmployee">Save</button>
        <button class="ui inverted red button m-1" @click="cancelEdit">Cancel</button>
      </div>
      <div v-else>
        <!-- Show Edit and Cancel buttons while not editing -->
        <button class="ui inverted violet button m-1" @click="editEmployee">Edit</button>
        <button class="ui inverted red button m-1" @click="cancelDetails">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import EmployeeService from '@/services/EmployeeService'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define a ref to hold the employee data
const employee = ref({})
const editedEmployee = ref({})

// Props from the parent component (Employee.vue)
const { employeeId } = defineProps(['employeeId'])

// Fetch the employee data from the backend API based on the employeeId prop
onMounted(async () => {
  try {
    const response = await EmployeeService.getEmployeeById(employeeId)
    employee.value = response.data
    editedEmployee.value = { ...response.data }
  } catch (error) {
    console.error('Error fetching employee data:', error)
  }
})

// Define a ref to track the edit mode
const isEditing = ref(false)

const editEmployee = () => {
  isEditing.value = true
}

const saveEmployee = async () => {
  try {
    await EmployeeService.updateEmployee(editedEmployee.value)
    console.log('Successfully updated employee:', editedEmployee.value)

    // Exit edit mode after saving
    isEditing.value = false
  } catch (error) {
    console.error('Error updating employee:', error)
  }
}

const cancelEdit = () => {
  // Exit edit mode without updating
  isEditing.value = false
}

const cancelDetails = () => {
  // Navigate back to the Employee list page without updating
  router.push({ name: 'employee' })
}
</script>