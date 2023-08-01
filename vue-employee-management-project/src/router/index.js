import { createRouter, createWebHistory } from 'vue-router'
import EmployeeVue from '../components/Employee.vue'
import EditEmpolyeeVue from '../components/EditEmployee.vue'
import CreateEmployeeVue from '../components/CreateEmployee.vue'
import EmployeeCardVueVue from '../components/EmployeeCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'employee',
      component: EmployeeVue
    },
    {
      path: '/edit/:employeeId', 
      name: 'editEmployee', 
      component: EditEmpolyeeVue,
      props: true,
    },
    {
      path: '/createEmployee',
      name: 'createEmployee',
      component: CreateEmployeeVue,
    },
    {
      path: '/employee/:employeeId',
      name: 'employeeCard',
      component: EmployeeCardVueVue,
      props: true,
    }
  ]
})

export default router