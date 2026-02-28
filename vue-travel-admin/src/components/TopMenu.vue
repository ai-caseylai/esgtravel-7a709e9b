<script setup>
import { ref, computed, watch, onMounted } from 'vue';  
  
import { useStore } from 'vuex';
const store = useStore();



</script>

<template>
  <div style="width:100%;  justify-content: center; align-items: center; align-content: center;">
    <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/emailotp">Login</RouterLink>
    <RouterLink to="/companyreport" v-if="store.state.usertype === 'company'">Company Report</RouterLink>
    <RouterLink to="/agentreport" v-if="store.state.usertype === 'agent'"> Agent Report</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>

nav {
  width:100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  border: 0px solid var(--color-border);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>