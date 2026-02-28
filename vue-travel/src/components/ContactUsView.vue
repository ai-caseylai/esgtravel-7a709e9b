
<script setup>

import {nextTick, ref, watchEffect, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const header_txt = ref('Contact Us');
const contact_txt = ref('Contact: + 852 1234-5678');
const email_txt = ref('Email: info@starsdg.com');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');

function loadSiteContent()
{
    header_txt.value = store.state.sitecontent.contactus;
    contact_txt.value = store.state.sitecontent.contact;
    email_txt.value = store.state.sitecontent.email;
    
    footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
    footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
    footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
}
function onClickBack() {
        console.log('onClickBack');
        router.push('/OTPForm');
    }

onMounted(() => {
    loadSiteContent();
})
</script>

<template>
    <div class="contactbackground">
        
        <div style="position: absolute; top:0vh; width: 100%; border:1px solid #ced4da; display: flex; justify-content: center;  text-align: center; align-items: center; align-content: center; border: 0px solid #ced4da;  ">  
            <img src="/images/icon_m.png" alt="Logo" style="width: 94px; height: 107px; scale: 65%;">  
        </div>
        
        <div class="inputemailheader-container">  
            <button @click="onClickBack()" :style="{scale:'50%',backgroundImage: 'url(/images/btn_back.png)'}"></button>
        </div>

      
        <div style="position: absolute; top:30vh; width: 100%; left:0%; border:0px solid #ced4da;text-align: center;">  
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 24px; line-height: 5px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{header_txt}}</label><br>
            <br>
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 18px; line-height: 5px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{contact_txt}}</label><br>

            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 18px; line-height: 5px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{email_txt}}</label><br>

        </div>
        <div class="inputemailfooter-container">
        <router-link :to=store.state.homepath class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footerhome_txt}} | </text></router-link>
        <router-link to="/passport" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footerpassport_txt}} | </text></router-link>
        <router-link to="/contactus" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footercontactus_txt}}</text></router-link>
        

         <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
            <component :is="Component" />
            </transition>
        </router-view>
      </div>
    </div>  
</template>

<style>

.contactbackground {
background: #ffffff;
background-color: #ffffff;
height: 100vh;
width: 100vw;
align-content: top;
align-items: top;
  border: 0px solid #ced4da;  
}

</style>