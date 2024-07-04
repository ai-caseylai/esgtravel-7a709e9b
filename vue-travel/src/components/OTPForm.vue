
<script setup>
import {ref,   onMounted  } from 'vue';
import { useRoute } from 'vue-router'  

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const route = useRoute();

const router = useRouter();
const store = useStore();
const code = ref([]);
const email = ref('');
const onprocess = ref(false);
const header_txt = ref('OTP verification');
const title_txt = ref('A One Time Password (OTP) has been generated and sent to your email. You should receive it within(30 seconds). In case you have not received it, please use the resend link below to send the OTP again.');

const error_txt = ref('OTP is invalid. Please try again.');
const resend_txt = ref('Resend OTP');
const sendother_txt = ref('Try other verification');
const contactus_txt = ref('Need help? Contact us');

const submitbtn_txt = ref('VERIFY OTP');
const error = ref(false);
const allowInput = ref(true);
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');



function onClickBack() {
    if(store.state.otpmethod == 'email')
        router.push('/inputemail');
    else if(store.state.otpmethod == 'sms')
        router.push('/inputSMS');
    else
    router.push(store.state.homepath);
}


async function LoadSiteTextContent()
{
  const formData = new FormData();
  formData.append('ActionType', 'GetSiteContent');
  formData.append('lang', store.state.language);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.sitecontent;
        store.commit('setSiteContent', result);
        header_txt.value = store.state.sitecontent.otpheader;
        if(store.state.otpmethod == 'email')
            title_txt.value = store.state.sitecontent.otpdescemail;
        else
            title_txt.value = store.state.sitecontent.otpdescsms;

        error_txt.value = store.state.sitecontent.otpinvalid;
        sendother_txt.value = store.state.sitecontent.tryother;
        contactus_txt.value = store.state.sitecontent.needhelp;
        submitbtn_txt.value = store.state.sitecontent.verifyotp;
        resend_txt.value = store.state.sitecontent.resendotp;
        
        footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
        footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
        footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }

          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when loading text content:', err);
      isNetworkError.value = true;
  }

}

async function handleSubmit(){

    if(onprocess.value == false)
    {
        onprocess.value = true;
        //console.log('=======' + store.state.otpemail);   
        const formData = new FormData();
        formData.append('ActionType', 'CheckOTP');
        formData.append('email', store.state.otpemail);
        formData.append('mobile', store.state.otpmobile);
        formData.append('countrycode', store.state.otpcountrycode);
        formData.append('method', store.state.otpmethod);
        formData.append('otpcode', code.value[0]+code.value[1]+code.value[2]+code.value[3]+code.value[4]+code.value[5]);
        try {
            const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

            if (res.status == 200) {
                const result = res.data;
                //console.log(result.otpresult);
                console.log(result.hashcode);
                //resultdata = result.otpresult;
                //console.log(res.data.otpresult);
                
                //store.commit('setLoginInfo',  result.otpresult);
                
                //console.log(store.state.logininfo.status);
                switch (res.data.otpresult) {
                    case 'otpcode_failed':
                        console.log('otpcode_failed');
                        error.value = true;
                        resetCode(false);
                        error_txt.value = store.state.sitecontent.otpinvalid;
                        store.commit('setOTPEmail', '');
                        store.commit('setOTPMobile', '');
                        store.commit('setOTPCountryCode', '');
                        store.commit('setLoginInfo', '');
                        store.commit('setHashCode', '');
                        break;
                    case 'otpcode_again':
                        console.log('otpcode_again');
                        error.value = true;
                        resetCode(true);
                        error_txt.value = store.state.sitecontent.otpinvalid;
                        store.commit('setLoginInfo', '');
                        store.commit('setHashCode', '');
                        break;
                        
                    case 'otpcode_expired':
                        console.log('otpcode_expired');
                        error.value = true;
                        resetCode(true);
                        error_txt.value = store.state.sitecontent.otpexpired;
                        store.commit('setLoginInfo', '');
                        store.commit('setHashCode', '');
                        break;
                    case 'otpcode_ok':
                        error.value = false;
                        store.commit('setLoginInfo', result.userinfo);
                        store.commit('setHashCode', result.userinfo.hashcode);
                        store.commit('setSaveLanguage', result.userinfo.language);
                        LoadSiteTextContent();
                        console.log(result.userinfo);
                        console.log(result.userinfo.hashcode);
                        router.push('/passport');
                        break;
                }
            } else {
                const errorType = result.error_type;

                if (!errorType) {
                    return;
                }

                console.log('errorType: ' + errorType);
            }
        } catch (err) {
            console.log('There was an error when input OTP:', err);
            isNetworkError.value = true;
        }
        onprocess.value = false;
    }
}



function tryother(){
    
    //store.commit("setIsCountDown", true);
    //store.commit("setCountDown", 59);
    router.push('/inputSMS');
}


function resend(){
    
    //store.commit("setIsCountDown", true);
    //store.commit("setCountDown", 59);
    router.push('/inputemail');
}
function contactus(){
    //console.log('contactus');
    router.push('/contactus');
}

function checkCode(id){
        if(id<5 && (code.value[id]>-1 || code.value[id]!=''))
        {
            code.value[id+1]='';
            document.getElementById("code_"+(id+1)).focus();  
        }
        if (code.value[id]> -1) {  
            code.value[id] = String(code.value[id]).substring(0,1);

            
        //console.log(document.getElementById("code_"+(id)).value);
    }  
}

function resetCode($stat)
{
    for (let i = 0; i < 6; i++) {
        code.value[i] = '';
    }
    document.getElementById("code_0").focus();  
    allowInput.value = $stat;

}


onMounted(() => {
    if(store.state.otpemail == '' && store.state.otpmobile == '')
    {
        router.push('/inputemail');
    }else{
        resetCode(true);
    
    }
    LoadSiteTextContent();
})


</script>

<template>
    
    <div class="background">

        <div class="inputemailheader-container">  
            <button @click="onClickBack()" :style="{scale:'50%',backgroundImage: 'url(/images/btn_back.png)'}"></button>

        </div>

        <!-- <div style="position: absolute; top:15vh; width: 70%; left:15%; border:0px solid #ced4da;text-align: center; ">

               <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{header_txt}}</label><br>
            
        </div>
        
        <div style="position: absolute; top:20vh; width: 90%; left:5%; border:1px solid #ced4da;" v-if="error">

            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: red; font-weight:normal; font-size: 14px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;">{{error_txt}}</label><br>
            
        </div> -->
        <div style="display: flex;  position: absolute; top:10vh; width:100%; left:0%;  border:0px solid #ced4da;"> 
            <form class="optform" @submit.prevent="handleSubmit">
                
                <div style="display: flex;  justify-content: center;  align-items: center; position: absolute; top:0vh; width:90%; left:5%;  border:0px solid #ced4da;" v-if="allowInput"> 

                    <table style="width: 80%;">  
                        <tr>
                            <td colspan="6"><label style=" display: flex;  justify-content: center; font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:bold; font-size: 28px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;"> {{header_txt}}</label><br></td>
                        </tr>
                        <tr v-if="error == true">
                            <td colspan="6"><label style="display: flex;  justify-content: center; font-family: Arial, Verdana, Helvetica, sans-serif;color: red; font-weight:normal; font-size: 14px; line-height: 40px; letter-spacing: 0px; padding-top: 10px;">{{error_txt}}</label><br></td>
                        </tr>
                        <tr>  
                            <td>
                                <input required v-model="code[0]" type="number" max="9" @input="checkCode(0)" id="code_0">
                            </td>  
                            <td>
                                <input required v-model="code[1]" type="number" maxlength="9" @input="checkCode(1)" id="code_1">
                            </td>  
                            <td>
                                <input required v-model="code[2]" type="number" maxlength="9" @input="checkCode(2)" id="code_2">
                            </td>  
                            <td>
                                <input required v-model="code[3]" type="number" maxlength="9" @input="checkCode(3)" id="code_3">
                            </td>  
                            <td>
                                <input required v-model="code[4]" type="number" maxlength="9" @input="checkCode(4)" id="code_4">
                            </td>  
                            <td>
                                <input required v-model="code[5]" type="number" maxlength="9" @input="checkCode(5)" id="code_5">
                            </td>  
                        </tr>  
                        <tr>
                            <td colspan="6" style="border: 0px solid #ced4da; text-align: center; vertical-align: middle;"><br><label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 16px; line-height: 10px; letter-spacing: 0px; padding-top: 10px;"> {{title_txt}}</label><br></td>
                        </tr>
                        <tr>
                            <td colspan="6" style="border: 0px solid #ced4da; text-align: center; vertical-align: middle;"><br>
                                <button type="submit" @click="handleSubmit()" style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;" v-if="allowInput">
                                    <label style="font-family: Arial, Verdana, Helvetica, sans-serif; align-content: center; align-items: center; color: #ffffff; font-weight:normal; font-size: 20px; line-height: 20px; letter-spacing: 0px; padding-left: 0px; padding: 10px;">{{submitbtn_txt}}</label>
                                </button>    
                            </td>
                        </tr>
                    </table> 
                </div>
                <!-- <div style="position: absolute; top:10vh; width: 90%; left:5%; border:0px solid #ced4da;text-align: center; ">

                    <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 16px; line-height: 10px; letter-spacing: 0px; padding-top: 10px;"> {{title_txt}}</label><br>

                </div>

                <div style="display: flex;  justify-content: center;  align-items: center; position: absolute; top:28vh; width:90%; left:5%;  border:0px solid #ced4da;" v-if="allowInput"> 
                    <button type="submit" @click="handleSubmit()" style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;">
                    <label style="font-family: Arial, Verdana, Helvetica, sans-serif; align-content: center; align-items: center; color: #ffffff; font-weight:normal; font-size: 20px; line-height: 20px; letter-spacing: 0px; padding-left: 0px; padding: 10px;">{{submitbtn_txt}}</label>
                    </button>
                </div> -->
            </form>
        </div>

        <div style="align-items: center; position: absolute; top:75vh; width:90%; left:5%;  border:0px solid #ced4da;text-align: center; ">
            <label @click="resend()"  style="font-family: Verdana, Arial,  Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 10px;"> {{resend_txt}}</label><br>
            <label @click="tryother()"  style="font-family: Verdana, Arial,  Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 10px;"> {{sendother_txt}}</label><br>
            
            <label  v-if="store.state.language ==1" style="font-family: Verdana, Arial, Helvetica, sans-serif;color: #000000; font-weight:bold; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 0px;"> {{contactus_txt.split(' ')[0] + " " +contactus_txt.split(' ')[1]}}</label>
            <label  v-if="store.state.language ==1" @click="contactus()" style="font-family: Verdana, Arial,  Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 0px;"> {{" " +contactus_txt.split(' ')[2]+ " " +contactus_txt.split(' ')[3]}}</label>

            <label v-if="store.state.language !=1" style="font-family: Verdana, Arial, Helvetica, sans-serif;color: #000000; font-weight:bold; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 0px;"> {{contactus_txt.split(' ')[0] }}</label>
            <label  v-if="store.state.language !=1" @click="contactus()" style="font-family: Verdana, Arial,  Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 14px; line-height: 10px; letter-spacing: 0px; padding-top: 0px;"> {{contactus_txt.split(' ')[1]}}</label>
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

.optform input{
  font-family: Arial, Verdana, Helvetica, sans-serif;
    font-size: 18px;
    width: 40px;
    height: 50px;
    text-align: center;
    font-size: 26px;
    border: 0px solid #ced4da;
    border-radius: 5px;
    margin: 0px 5px;
    background: rgb(165, 165, 165);
    color: #ffffff;


}

.inputemailheader-container {  
  position: absolute;
  top: 0px;  
  left: 0%;
  width: 100%;
  display: flex;
  justify-content: space-around;
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
  top: 85vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  
</style>