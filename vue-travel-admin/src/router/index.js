import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MobileOTPView.vue')
      //component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/mobileotp',
      name: 'mobileotp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MobileOTPView.vue')
    },
    {
      path: '/emailotp',
      name: 'emailotp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EmailOTPView.vue')
    },
    {
      path: '/agentorderlistreport',
      name: 'agentorderlistreport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AgentOrderListReportView.vue')
    },
    {
      path: '/agentlist',
      name: 'agentlist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AgentListView.vue')
    },
    {
      path: '/editagent',
      name: 'editagent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditAgentView.vue')
    },
    {
      path: '/agentreport',
      name: 'agentreport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AgentReportView.vue')
    },
    {
      path: '/companybadgelistreport',
      name: 'companybadgelistreport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CompanyBadgeListReportView.vue')
    },
    {
      path: '/agentbadgereport',
      name: 'agentbadgereport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AgentBadgeReportView.vue')
    },
    {
      path: '/badgereport',
      name: 'badgereport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BadgeOrderReportView.vue')
    },
    {
      path: '/addnewagent',
      name: 'addnewagent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddNewAgentView.vue')
    },
    {
      path: '/addnewcompany',
      name: 'addnewcompany',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddNewCompanyView.vue')
    },
    {
      path: '/admincompany',
      name: 'admincompany',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminCompanyView.vue')
    },
    {
      path: '/admincompanymodify',
      name: 'admincompanymodify',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminCompanyModifyView.vue')
    },
    {
      path: '/otpform',
      name: 'otpform',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/OTPFormView.vue')
    }
  ]
})

export default router
