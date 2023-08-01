<template>
  <div class="card col-md-6 offset-md-3 mt-5">
    <div class="card-body">
      <h5 class="card-title">Confirm Deletion</h5>
      <p class="card-text">Are you sure you want to delete the employee with ID {{ props.selectedEmployee.id }}?</p>
      <div class="d-flex justify-content-end">
        <button class="ui inverted red button m-1" @click="confirmed">Delete</button>
        <button class="ui inverted secondary button m-1" @click="canceled">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['selectedEmployee'])
const emit = defineEmits()

const confirmed = () => {
  emit('confirmed')
}

const canceled = () => {
  emit('canceled')
}
</script>