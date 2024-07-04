<script setup>

import {ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router' ;
import { useStore } from 'vuex';
import axios from 'axios';
const router = useRouter();
const store = useStore();

const onprocess = ref(false);
const mobile = ref('');
const ccode = ref('');
const error_txt = ref('invalid mobile no.: Please try another mobile no.');
const error = ref(false);
let timer = null;  

const startCountdown = () => {  

    //console.log("sms startCountdown");
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


async function loadCountryCodeList(){
  const formData = new FormData();
  formData.append('ActionType', 'GetCountryCode');
  try {
      const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        console.log('Country Code loaded successfully ');
        
        store.commit('setCountryCodes',  result.countrycodes);
        store.commit("setOTPMethod", 'sms');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }

          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when loading country code list:', err);
      isNetworkError.value = true;
  }
}


async function handleSubmit() {
    if(ccode.value == '' || mobile.value == '')
    {
        error.value = true;
        return;
    }
    if(onprocess.value == false)
    {
        onprocess.value = true;
        //console.log('handleSubmit');
        //console.log(ccode.value + mobile.value);
    
        error.value = false;
        store.commit('setOTPMobile', mobile.value);
        store.commit('setOTPCountryCode', ccode.value);
        store.commit('setOTPMethod', 'sms');
        //console.log('valid mobile ' + ccode.value+mobile.value);
        await RequestOTP();
        router.push('/otpform');
        onprocess.value = false;
    }
}


async function RequestOTP(){
  const formData = new FormData();
  //console.log(ccode.value);
  //console.log(mobile.value);
  formData.append('ActionType', 'GetOTP');
  formData.append('countrycode', ccode.value);
  formData.append('mobile', mobile.value);
  formData.append('method', 'sms');
  try {
      const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
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

function limitInputLength() {  
  //console.log(String(mobile.value).length);
  if (String(mobile.value).length > 10) {  
    mobile.value = String(mobile.value).substring(0,10);
    }  
  }  

onMounted(() => {
   //store.commit('setState');
   
    store.commit('setOTPMobile', '');
    store.commit('setOTPCountryCode', '');
    startCountdown();  
   
    if(store.state.countrycodes.length == 0 || store.state.countrycodes.length == 'undefined')
        loadCountryCodeList();
})

</script>

<template>
    <div class="login">
        <form @submit.prevent="handleSubmit"><br><br>
            <table style="width:80%;border:0px solid #ced4da;">
            <tr>
                <td colspan="2" style="width:100%;border:0px solid #ced4da;text-align: center;vertical-align: middle;"><label style="vertical-align: middle;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 24px; line-height: 0px; letter-spacing: 0px; padding-top: 0px;">Send OTP By SMS</label></td>

            </tr>
            <tr>
                <td style="width:30%;border:0px solid #ced4da;vertical-align: middle;"><br><br>
                <select required v-model="ccode" style="width:100%;  margin-left: 2%;background-color: #ffffff; height: 35px;border-radius: 5px;border: 1px solid #ccc;">
                <option v-for="countrycode in store.state.countrycodes" :key="countrycode.id" :value="countrycode.country_code">{{countrycode.country_code}}</option>
                </select>
                </td>
                <td style="width:70%;border:0px solid #ced4da;vertical-align: top;"><br><br>
                <input required v-model="mobile" style="vertical-align: top;width: 100%; margin-left: 2%;border-radius: 5px; height: 35px;" maxlength="10" type="number" @input="limitInputLength()"><br>
                </td>
            </tr>
            </table>
            
            <label v-if="error" style="font-family: Arial, Verdana, Helvetica, sans-serif;color: red; font-weight:normal; font-size: 14px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{ error_txt}}</label><br>
            <div style="display: flex;  justify-content: center;  align-items: center; width:100%; left:0%;  border:0px solid #ced4da;" v-if="!onprocess"> 
                <button type="submit" @click="handleSubmit()" style="color: #ffffff;background:#1B78B5; width:200px; height:40px; border-radius: 12px;border: 0px solid #ced4da;" :disabled="store.state.countdown > 0" >
                <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown<=0">Submit</label>
                <label style="font-family: Arial, Verdana, Helvetica, sans-serif;  color: #ffffff; font-weight:normal; font-size: 20px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 10px;" v-if="store.state.countdown>0">Resend OTP in {{ store.state.countdown }}</label>
                </button>
            </div>
        </form>
    </div>
</template>

<style scroped>

    .login {
        min-height: 100vh;
        display: flex;
        border: 0px solid #ccc;
        width: 100%;
        display: flex;
        justify-content: center;
        background: #ffffff;
        background-color: #ffffff;
    }
    
    form {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        border:0px solid #e92a2a;
        width: 90%;
        
    }
    label {
        font-family:Arial, Helvetica, sans-serif;
        color: #1B78B5;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
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