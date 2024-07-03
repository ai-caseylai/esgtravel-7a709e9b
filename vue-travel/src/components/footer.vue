<template>
  <div id="nav" style="background-color: white;border:0px solid #ced4da;">
    <router-link to="/" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{home_txt}} | </text></router-link>
    <router-link to="/passport" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{passport_txt}} | </text></router-link>
    <router-link to="/contactus" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{contactus_txt}}</text></router-link>
  </div>
  
<router-view v-slot="{ Component }">
  <transition name="route" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>

</template>

<script setup>

import { ref, onMounted } from 'vue';

import { useStore } from 'vuex';
const passport_txt = ref('Passport');
const home_txt = ref('HOME');
const contactus_txt = ref('CONTACT US');
const store = useStore();

function loadSiteContent(){
  home_txt.value = store.state.sitecontent.home;
  contactus_txt.value = store.state.sitecontent.contactus;
  passport_txt.value = store.state.sitecontent.passport;
}


onMounted(() => {
 // loadSiteContent();
  
})
  

</script>

<style>

.no-underline {  
  text-decoration: none;  
  text-align: center;
}  
</style>