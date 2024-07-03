
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

  //console.log("email startCountdown");
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


async function handleSubmit() {
    if(onprocess.value == false)
    {
        //console.log( email.value);
        onprocess.value = true;
        //console.log('handleSubmit');
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (re.test(email.value)) {
            error.value = false;
            store.commit('setOTPEmail', email.value);
            store.commit('setOTPMethod', 'email');
            //console.log('valid email ' + email.value);
            await RequestOTP();
            router.push('/otpform');
        } else {
            store.commit('setOTPEmail', '');
            //console.log('invalid email');
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
  //console.log(email.value);
  
  
  try {
      const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

      if (res.status == 200) {
        const result = res.data;
        
        //console.log(res.data);
        
        store.commit("setIsCountDown", true);
        store.commit("setCountDown", 29);
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
  //console.log(store.state.logininfo + ' ' + store.state.hashcode);
  store.commit('setOTPEmail', '');
  startCountdown();  
})

</script>

<template>
    
    <div class="login">
    <form @submit.prevent="handleSubmit"><br><br>
            <table>
            <tr>
                <td colspan="2" style="width:100%;border:0px solid #ced4da;text-align:center;"><label style=" font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 24px; line-height: 0px; letter-spacing: 0px; padding-top: 0px;">Send OTP By Email</label></td>

            </tr>
            <tr>
                <td style="width:100%;border:0px solid #ced4da;"><br><br>
                    <input required v-model="email" type="email" maxlength="100"><br>
                    <label v-if="error" style="font-family: Arial, Verdana, Helvetica, sans-serif;color: red; font-weight:normal; font-size: 14px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{ error_txt}}</label><br>

                </td>
            </tr>
            </table>
            
            <div style="display: flex;  justify-content: center;  align-items: center; width:100%; left:0%;  border:0px solid #ced4da;" v-if="!onprocess"> 
                <button type="submit" @click="handleSubmit()" style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;" :disabled="store.state.countdown > 0" >
                <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown<=0">Submit</label>
                <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown>0">Resend OTP in {{ store.state.countdown }}</label>
                </button>
            </div>
        </form>
    </div>

</template>
<style>
 .login {
        min-height: 100vh;
        display: flex;
        border: 0px solid #ccc;
        width: 100%;

        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        border: 0px solid #e92a2a;
        width: 80vw;
        
    }
    label {
        font-weight: 500;
        font-family:Arial, Helvetica, sans-serif;
        color: #1B78B5;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        width: 100%;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: #333;
        color: #fff;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
    
     h1, h3 {
        text-align: center;
    }
</style>