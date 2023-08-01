<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>