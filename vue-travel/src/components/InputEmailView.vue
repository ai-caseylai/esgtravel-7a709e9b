
<script setup>
import {nextTick, ref, watchEffect, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();

const router = useRouter();
const onprocess = ref(false);
const email = ref('');
const header_txt = ref('Impact Passport');
const title_txt = ref('Give Your Impact! a New meaning');
const logintitle_txt = ref('Log in to your passport:');
const error_txt = ref('invalid email: Please try another email address');
const error = ref(false);
const submitbtn_txt = ref('GET STARTED');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');
let timer = null;  

function loadSiteContent()
{
  submitbtn_txt.value = store.state.sitecontent.getstarted;
  error_txt.value = store.state.sitecontent.invildemail;
  logintitle_txt.value = store.state.sitecontent.loginemail;
  title_txt.value = store.state.sitecontent.impacttitle;
  header_txt.value = store.state.sitecontent.impactheader;
  
  footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
  footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
  footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
}

const startCountdown = () => {  

  console.log("email startCountdown");
  timer = setInterval(() => {  
  if(store.state.iscountdown == true)
  {
    if(store.state.countdown < 1)
    {
      store.commit("setCountDown", 0);  
    }else{
      store.commit("setCountDown", store.state.countdown - 1);  
    }
  }
    //console.log(store.state.countdown);
    if ( store.state.countdown <= 0) {  
        
      store.commit("setIsCountDown", false);
      clearInterval(timer);  
    }  
  }, 1000);  
};  
  
watchEffect(() => {  
  if ( store.state.countdown === 0) {  
    store.commit("setIsCountDown", false);
    clearInterval(timer);  
  }  
});  

function onClickBack() {
        console.log('onClickBack');
        router.push(store.state.homepath);
    }

async function handleSubmit() {
    if(onprocess.value == false)
    {
        console.log( email.value);
        onprocess.value = true;
        console.log('handleSubmit');
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (re.test(email.value)) {
            error.value = false;
            store.commit('setOTPEmail', email.value);
            store.commit('setOTPMethod', 'email');
            console.log('valid email ' + email.value);
            await RequestOTP();
            router.push('/OTPForm');
        } else {
            store.commit('setOTPEmail', '');
            console.log('invalid email');
            error.value = true;
        }
        onprocess.value = false;
    }
}

async function RequestOTP(){
  const formData = new FormData();
  formData.append('ActionType', 'GetOTP');
  formData.append('email', email.value);
  formData.append('method', 'email');
  console.log(email.value);
  
  
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        
        console.log(res.data);
        store.commit('setSaveLanguage', result.language);
        store.commit("setIsCountDown", true);
        store.commit("setCountDown", 29);
        console.log(store.state.language);
        startCountdown();  
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }

          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when sending email:', err);
      isNetworkError.value = true;
  }
}

onMounted(() => {
  loadSiteContent();
  console.log(store.state.logininfo + ' ' + store.state.hashcode);
  store.commit('setOTPEmail', '');
  startCountdown();  


})

</script>

<template>
    
    <div class="emailbackground">

        <div class="inputemailheader-container">  
            <button @click="onClickBack()" :style="{scale:'50%', backgroundImage: 'url(/images/btn_back.png)'}"></button>

            <text style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 24px; line-height: 28px; letter-spacing: 1px; padding-top: 10px;">
                {{header_txt}}
            </text>
            
        </div>

        <div style="position: absolute; top:20vh; width: 70%; left:20%; border:0px solid #ced4da;" v-if="store.state.language ==1">
 
           <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{title_txt.split(' ')[0]}}</label>
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{" " +title_txt.split(' ')[1] + " " +title_txt.split(' ')[2]}}</label><br>
            
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{title_txt.split(' ')[3]}}</label>
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{" " +title_txt.split(' ')[4] + " " +title_txt.split(' ')[5]}}</label><br>
            
        </div>
        
        <div style="position: absolute; top:20vh; width: 70%; left:20%; border:0px solid #ced4da;" v-if="store.state.language !=1">
 
        <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{title_txt.split(' ')[0]}}</label><br>
          
        <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;">{{title_txt.split(' ')[1].trim()}}</label><br>
          
          
        </div>
        
        <div style="display: flex;  position: absolute; top:35vh; width:80%; left:10%;  border:0px solid #ced4da;"> 
            <form class="paymentform" @submit.prevent="handleSubmit">
                <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 18px; line-height: 10px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{ logintitle_txt}}</label><br>

                <input required v-model="email" type="email" maxlength="100"><br>
                <label v-if="error" style="font-family: Arial, Verdana, Helvetica, sans-serif;color: red; font-weight:normal; font-size: 14px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{ error_txt}}</label><br>

           
                <div style="display: flex;  justify-content: center;  align-items: center; position: absolute; top:15vh; width:90%; left:5%;  border:0px solid #ced4da;" v-if="!onprocess"> 
                    <button type="submit" @click="handleSubmit()" style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;" :disabled="store.state.countdown > 0" >
                    <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown<=0">{{submitbtn_txt}}</label>
                    <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown>0">Resend OTP in {{ store.state.countdown }}</label>
                    </button>
                </div>
            </form>
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
.emailbackground {

background: #ffffff;
background-color: #ffffff;
height: 100vh;
width: 100vw;
align-content: top;
align-items: top;
}

.inputemailheader-container {  
  position: absolute;  
  top: 0px;  
  left: 0%;  
  width: 100%;  
  display: flex;  
  justify-content: center;  
  padding: 1em 0;  
  text-align: center;
  border:0px solid #ced4da;
}  


.inputemailheader-container button {  
  position: absolute;  
  top: 2vh;  
  left: 20px;  
  width: 28px;  
  height: 50px;
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;
  cursor: pointer;  
    background: rgba(255, 255, 255, 0.5);
    border: 0px solid #ced4da;
}

.inputemailfooter-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 95vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  
</style>