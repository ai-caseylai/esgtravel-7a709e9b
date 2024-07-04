<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopMenu from './components/TopMenu.vue'
import { ref, computed, watch, onMounted } from 'vue';  
  
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();

onMounted(() => {
  //store.commit("setState");
  if(store.state.logininfo == null)
  {
    console.log('logininfo is null');
    router.push('/mobileotp');
  }else{
    if(store.state.logininfo.usertype == 0)
    {
      router.push('/agentreport');
    }else if(store.state.logininfo.usertype == 1){
      router.push('/agentlist');
    }else if(store.state.logininfo.usertype == 2){
      router.push('/admincompany');
    }
  }
});
</script>

<template>
    <div class="main">  
  <nav>
    <!-- <RouterLink to="/">Home</RouterLink> -->
    <!--<RouterLink to="/emailotp">Email OTP</RouterLink>-->
    <!-- <RouterLink to="/mobileotp">Mobile OTP</RouterLink> -->
    <RouterLink to="/agentlist" v-if="store.state.logininfo.usertype == 1">Agent List</RouterLink>
    <RouterLink to="/agentorderlistreport" v-if="store.state.logininfo.usertype == 1">Order List</RouterLink>
    <RouterLink to="/companybadgelistreport" v-if="store.state.logininfo.usertype == 1">Badge List</RouterLink>
    <RouterLink to="/addnewagent" v-if="store.state.logininfo.usertype == 1">Add Agent</RouterLink>
    <RouterLink to="/agentreport" v-if="store.state.logininfo.usertype == 0">Agent Report</RouterLink>
    <RouterLink to="/agentbadgereport" v-if="store.state.logininfo.usertype == 0">Badge Report</RouterLink>
    <RouterLink to="/admincompany" v-if="store.state.logininfo.usertype == 1">Admin Company</RouterLink>
    <RouterLink to="/addnewcompany" v-if="store.state.logininfo.usertype == 1">Add Company</RouterLink>
    <!-- <RouterLink to="/about">About</RouterLink> -->
  </nav><br>
  
  <RouterView />
  </div>
</template>

<style>
  .main {
    width: 100vw;
    border: 0px solid #f11e1e;
    padding: 0 0;
    background: #ffffff;
    background-color: #ffffff;
  }

nav {
  width:100vw;
  height: 5vh;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
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
