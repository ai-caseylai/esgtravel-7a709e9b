<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/helloworld">Hello World</router-link> |
    <router-link to="/signup">Signup</router-link>
  </div>
<!-- <router-view v-slot="{ Component }">
  <transition name="route" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view> -->

</template>
<!--
<script>
import SignupForm from './components/SignupForm.vue';

import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    SignupForm,
    Home,
    HelloWorld
  }
}
</script>
-->

<style>
#app, #modals {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:center;
  color: blueviolet;
  font-weight: normal;
  background: red;
}
.page{
  position: relative;
  top: 0px;
}
h1{
  border-bottom: 0px solid #ddd;
  display: inline-block;
  padding-bottom: 0px;
}

#nav {
  padding: 30px;
  background: #f3f3f3;
  border-bottom: 1px solid #ddd;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
}
#nav a.router-link-exact-active {
  color: red;
}
.route-enter-from{
  opacity: 0;
  transform: translateX(100%px);
}
.route-enter-active{
  transition: ass 0.3s ease-out;
}
.route-leave-to{
  opacity: 0;
  transform: translateX(-100px)
}
.route-enter-active{
  transition: all 0.3s
}
</style>
