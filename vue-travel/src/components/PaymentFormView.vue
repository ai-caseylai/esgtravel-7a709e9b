<script setup>
import { ref,  onMounted } from 'vue';
import { useStore } from 'vuex';

import { useRouter } from 'vue-router';
import axios from 'axios';
import { StripeCheckout } from '@vue-stripe/vue-stripe';  
  


const router = useRouter();
const store = useStore();
const isProcessing = ref(false);
const name = ref('');
const email = ref('');
const confirmemail = ref('');
const mobile = ref('');
const ccode = ref('');
const extrahelpid = ref('');
const slideValue = ref(0);
const terma = ref(false);
const termb = ref(false);
const emailerror = ref(false);
const nameerror = ref(false);
const mobileerror = ref(false);
const header_txt = ref('I hereby committed');
const bufferhigh = ref(0);
const termbufferhigh = ref(0);
const slider = ref(false);
const isNewUser = ref(false);
const tempName = ref('');
const tempEmail = ref('');
const tempMobile = ref('');
const tempCcode = ref('');
const submit_txt = ref('SUBMIT');

const desc_txt = ref('to support the sustainable development of Kochis city and be a committed ambassador for their sustainability mission.');
const reaction_txt = ref('Choose your reaction');
const tnc_txt = ref('Term and Conditions:');
const terma_txt = ref('*I confirm that I have read, understood and agreed to the <a href="https://www.example.com" target="_blank"> Event\'s Terms and Conditions</a>, and <a href="https://www.example.com" target="_blank">Japan Tourism Board\'s Privacy Policy</a>.');
const termb_txt = ref('I agree to the use and transfer of personal data for Japan Tourism Board\'s direct marketing.');
const emailerror_txt = ref('Email must be the same');
const nameerror_txt = ref('Invalid Name');
const mobileerror_txt = ref('Invalid Mobile Phone No.');
const termerror = ref(false);
const termerror_txt = ref('Please accept the terms and conditions');
const errorduplicate_txt = ref('Email or Mobile already exist');
const email_txt = ref('Email:');
const confirmemail_txt = ref('Confirm Email:');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');

const name_txt = ref('Name:');
const language = ref('en');

const mobile_txt = ref('Mobile Phone No.:');
const errorduplicate = ref(false);
const mobiltype = ref('string');
const lineItems = [
      {  
        price: 'price_1PLcwvKoT0FBRG3bNOn0hCpI',  
        quantity: 1,  
      } 
      ];


const publishableKey = 'pk_test_51P8JxFKoT0FBRG3bykjICxUsdmnmCHUr7XpJ4bLMrWqPdglj4emfwiOV5pjenJH7FvOLsmu0a9oY9LIy91tFpPsR00qFp3KuCI';

const successURL = ref('https://www.starsdg.com/thankyou?lang='+ store.state.language+'&badge_id='+ store.state.badge_id+'&hash='+ store.state.hash+'&order_id='+ store.state.orderinfo.order_id);
const cancelURL = ref('https://www.starsdg.com/orderfailed?lang='+ store.state.language+'&hash='+ store.state.hash+'&order_id='+ store.state.orderinfo.order_id);

function loadSiteContent()
{
  reaction_txt.value = store.state.sitecontent.reaction;
  desc_txt.value = store.state.sitecontent.formdesc;
  tnc_txt.value = store.state.sitecontent.formterm;
  terma_txt.value = store.state.sitecontent.formtnc;
  termb_txt.value = store.state.sitecontent.formmarketing;
  email_txt.value = store.state.sitecontent.formemail;
  confirmemail_txt.value = store.state.sitecontent.formconfirmemail;
  name_txt.value = store.state.sitecontent.formname;
  mobile_txt.value = store.state.sitecontent.formmobile;
  submit_txt.value = store.state.sitecontent.submit;
  emailerror_txt.value = store.state.sitecontent.emailerror;
  nameerror_txt.value = store.state.sitecontent.nameerror;
  mobileerror_txt.value = store.state.sitecontent.mobileerror;
  errorduplicate_txt.value = store.state.sitecontent.duplicateerror;
  termerror_txt.value = store.state.sitecontent.termerror;
  footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
  footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
  footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
}

function handleSubmit() {
  console.log("isProcessing =" + isProcessing.value);
  if(isProcessing.value == true){
    return;
  }
  
    isProcessing.value = true;
    console.log('submit');
    bufferhigh.value = 0;
    termbufferhigh.value = 0;
    emailerror.value = false;
    mobileerror.value = false;
    nameerror.value = false;
    termerror.value = false;
    //console.log(emailerror.value);
    if(email.value ==''){
       emailerror.value = true;
       bufferhigh.value += 3;
       slideValue.value = 0;
       slider.value = false;
    }else if(email.value != confirmemail.value){
       emailerror.value = true;
       bufferhigh.value += 3;
       slideValue.value = 0;
       slider.value = false;
    }
    if(terma.value == false){
      termerror.value = true;
      termbufferhigh.value += 3;
      slideValue.value = 0;
      slider.value = false;
      console.log('term error');
    }

    if(name.value =='')
    {
     // console.log('name error');
      nameerror.value = true;
      bufferhigh.value += 3;
      slideValue.value = 0;
      slider.value = false;
    }
    //console.log(String(mobile.value).length);
    if(String(mobile.value).length<8 || ccode.value == '')
    {
      console.log('mobile error');
      mobileerror.value = true;
      bufferhigh.value += 3;
      slideValue.value = 0;
      slider.value = false;
    }
    if(emailerror.value || mobileerror.value || nameerror.value || termerror.value){
      //adjustHeight();
      //adjusFooterTop();
      isProcessing.value = false;
      //return;
    }else{
      onSubmit();
    }

}



async function loadCountryCodeList(){
  const formData = new FormData();
  formData.append('ActionType', 'GetCountryCode');
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        
        store.commit('setCountryCodes',  result.countrycodes);
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

function onAcceptTermA(event){
  console.log('Accept terms A');
}

function onAcceptTermB(event){
  console.log('Accept terms B');
}

function onSlide(event){

  
  if(slideValue.value == 100){
    slider.value = true;
    //console.log(" done " +slideValue.value);
  }else{
    slider.value = false;
    //console.log(" not done " +slideValue.value);
  }
}
onMounted(() => {

    if(store.state.countrycodes.length == 0 || store.state.countrycodes.length == 'undefined')
        loadCountryCodeList();
    isProcessing.value=false;
    loadSiteContent();
    loadItems();

})

function limitInputLength() {  
  //console.log(String(mobile.value).length);
  if (String(mobile.value).length > 10) {  
      mobile.value = String(mobile.value).substring(0,10);
  }  
  for(var i = 0; i < String(mobile.value).length; i++){
    if(String(mobile.value)[i] < '0' || String(mobile.value)[i] > '9'){
      mobile.value = String(mobile.value).substring(0,i) + String(mobile.value).substring(i+1);
    }
  }
  if(String(mobile.value).length >= 8)
    CheckMobile();
  }  

  
async function CheckEmail(){

if(String(email.value).indexOf('@') == -1 || String(email.value).indexOf('.') == -1){
    return;
}
const formData = new FormData();
formData.append('ActionType', 'GetUserByEmail');
formData.append('email', email.value);

  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);
      const result = res.data;

      if (res.status == 200) {
        if(result.userinfo == null)
        {
          isNewUser.value = true;
          name.value = "";
          confirmemail.value = "";
          mobile.value='';
          ccode.value = '';
          tempName.value = "";
          tempCcode.value = "";
          tempMobile.value = "";
          tempEmail.value = "";
          console.log('User not found');
        }else{
          isNewUser.value = false;
          tempName.value = result.userinfo.displayname;
          tempCcode.value = result.userinfo.countrycode;
          tempMobile.value = result.userinfo.mobile;
          tempEmail.value = result.userinfo.email;
          
          name.value = result.userinfo.displayname;
          confirmemail.value = result.userinfo.email;
          ccode.value = result.userinfo.countrycode;
          mobile.value='';
          for(var i = 0; i < result.userinfo.mobile.length; i++){
            if(i < 5){
              mobile.value += result.userinfo.mobile[i];
            }else{
              mobile.value += '*';
            }
          }
          //mobile.value = result.userinfo.mobile;
          //ccode.value = result.userinfo.countrycode;
          //fillUserDetails(result.userinfo.displayname, result.userinfo.email, result.userinfo.mobile, result.userinfo.countrycode);
          
        }
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when checking email:', err);
      isNetworkError.value = true;
      store.state.error = err;
  }
}

async function CheckMobile(){

return;
if(ccode.value == '' || mobile.value == ''){
    return;
}
const formData = new FormData();
formData.append('ActionType', 'GetUserByMobile');
formData.append('countrycode', ccode.value);
formData.append('mobile', mobile.value);;

  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);
      const result = res.data;

      if (res.status == 200) {
        if(result.userinfo == null)
        {
          isNewUser.value = true;
          name.value = "";
          email.value = "";
          confirmemail.value = "";
          tempName.value = "";
          tempCcode.value = "";
          tempMobile.value = "";
          tempEmail.value = "";
          console.log('User not found');
        }else{
          isNewUser.value = false;
          tempName.value = result.userinfo.displayname;
          tempCcode.value = result.userinfo.countrycode;
          tempMobile.value = result.userinfo.mobile;
          tempEmail.value = result.userinfo.email;
          
          name.value = result.userinfo.displayname;
          email.value = String(result.userinfo.email).split('@')[0] + '@' + "**********";
          confirmemail.value = String(result.userinfo.email).split('@')[0] + '@' + "**********";
          mobile.value = result.userinfo.mobile;
          ccode.value = result.userinfo.countrycode;
          //fillUserDetails(result.userinfo.displayname, result.userinfo.email, result.userinfo.mobile, result.userinfo.countrycode);
          console.log('User found ' + isNewUser.value);
        }
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when check mobile & country code:', err);
      isNetworkError.value = true;
      store.state.error = err;
  }
}



async function onSubmit(){

const formData = new FormData();
formData.append('ActionType', 'OrderBadge');

if(isNewUser.value == true){
  formData.append('email', email.value);
  formData.append('countrycode', ccode.value);
  formData.append('mobile', mobile.value);
  //store.commit("setEmail",  email.value);
}else{
  formData.append('email', tempEmail.value);
  formData.append('countrycode', tempCcode.value);
  formData.append('mobile', tempMobile.value);
  //store.commit("setEmail",  tempEmail.value);
}
formData.append('company_id', store.state.company_id);
formData.append('agent_id', store.state.agent_id);
formData.append('mark_id', store.state.mark_id);
formData.append('displayname', name.value);
formData.append('badge_id', store.state.badge_id);
formData.append('tc', terma.value);
formData.append('marketing', termb.value);
formData.append('language',store.state.language);
formData.append('isnewuser',isNewUser.value);
formData.append('extrahelp', store.state.extraamount);
formData.append('badgeamount', "8");
// console.log(ccode.value);
// console.log(mobile.value);
// console.log(store.state.mark_id);
// console.log(name.value);
// console.log(store.state.badge_id);
// console.log(terma.value);
// console.log( termb.value);
// console.log(store.state.language);
// console.log(isNewUser.value);
// console.log("confirm extra help :" +store.state.extraamount);
// console.log( tempMobile.value);
// console.log( 8);
//successURL.value = 'https://www.starsdg.com/thankyou?lang='+ store.state.language;

  try {
     
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);
      const result = res.data;
      console.log(res);
      successURL.value = 'https://www.starsdg.com/thankyou?lang='+ store.state.language+'&badge_id='+ store.state.badge_id+'&hashcode='+ result.orderinfo.hashcode+'&order_id='+ result.orderinfo.order_id;
      cancelURL.value =  'https://www.starsdg.com/orderfailed?lang='+ store.state.language+'&hashcode='+ result.orderinfo.hashcode+'&order_id='+ result.orderinfo.order_id;
      if(result.orderfailed == true)
      {
        errorduplicate.value = true;
        bufferhigh.value += 3;
        store.commit("setOrderInfo", '');
        console.log('Order failed');
        
      }else{
        store.commit("setOrderInfo", result.orderinfo);
        //console.log('Order successful : ' + result.orderinfo.hashcode);
        submitCheckout();
      }
      isProcessing.value = false;
      console.log('Is processing : ' + isProcessing);
  } catch (err) {
      isProcessing.value = false;
      console.log('There was an error when sumbit order form:', err);
      isNetworkError.value = true;
      store.state.error = err;
  }
  
}

function changeType($type){
    mobiltype.value ='change type ' + $type;
    document.getElementById("mobile").type=$type;
}

const checkoutRef = ref(null);    

function submitCheckout()
{
    checkoutRef.value.redirectToCheckout();
}

function adjustHeight(){
  var element = document.getElementById("paymentformbackground");  
  element.style.height = 110 + bufferhigh.value + termbufferhigh.value + 'vh';
}

function adjusFooterTop(){
  var element = document.getElementById("paymentformfooter-container");  
  element.style.top = 115 + bufferhigh.value + termbufferhigh.value + 'vh';
}



function loadItems(){

  switch(store.state.extraamount)
  {
    case 1:
      lineItems.push({price: 'price_1PLcxTKoT0FBRG3bfWcPLwRB', quantity: 1});
      break;
    case 5:
      lineItems.push({price: 'price_1PLcy7KoT0FBRG3baIrixerK', quantity: 1});
      break;
    case 10:
      lineItems.push({price: 'price_1PLcyLKoT0FBRG3bSvPfWAaZ', quantity: 1});
      break;
  }
  switch(store.state.language)
  {
    case 0:
      language.value = 'zh-HK';
      break;
      
    case 1:
      language.value = 'en';
      break;
    case 2:
      language.value = 'ja';
      break;
      
  }
}
</script>


<template>
  <div class="paymentformbackground" id="paymentformbackground">
      <div style="position: absolute; top:2vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
          <text style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: bold;  color: #1B78B5;  font-size: 20px;">{{ header_txt }}</text>
      </div>
      <div style="position: absolute; top:7vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
          <img :src="'/images/icon_hand.png'"  @click="onClickRanking(rank.mark_id)" style="scale: 60%;" > 
    </div>
    <div style="position: absolute; top:22vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
          <text style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: normal;  color: #000000;  font-size: 16px;">{{ desc_txt }}</text>
    </div>
    <div style="position: absolute; top:30vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
          <text style="font-family: Arial, Verdana, Helvetica, sans-serif; font-weight: bold; line-height: 40px; color: #1B78B5;  font-size: 20px;">{{ reaction_txt }}</text>
      </div>
      <div class="paymentranking-container">
          <ranking-page></ranking-page>
      </div>
       
        <label v-if="errorduplicate" style=" color: red; font-size: 12px;font-family: Arial, Verdana, Helvetica, sans-serif;background: #ffffff;" > {{ errorduplicate_txt }}</label><br v-if="errorduplicate">
          <form class="paymentform" @submit.prevent="handleSubmit">
           
            <div style="background: #ffffff;position: absolute;width: 90%; top: 50vh; left:5%; border:0px solid #1B78B5;">
              <label for="email">{{email_txt}}</label><br>
              <input required  v-model="email" type="email" id="inputa" v-on:keyup="CheckEmail()" ><br>
              <label v-if="emailerror" style=" color: red; font-size: 12px;font-family: Arial, Verdana, Helvetica, sans-serif;" >{{ emailerror_txt }}</label><br v-if="emailerror">
              <label for="confirmemail">{{confirmemail_txt}}</label><br>
              <input required  v-model="confirmemail" type="email"><br>
              <label for="name">{{name_txt}}</label><br>
              <input required v-model="name" type="text" maxlength="50" minlength="4"><br>
              <label v-if="nameerror" style=" color: red; font-size: 12px;font-family: Arial, Verdana, Helvetica, sans-serif;" >{{ nameerror_txt }}</label><br v-if="nameerror">
              <label>{{mobile_txt}}</label><br>
              <select required v-model="ccode" style="width:30%; background-color: #ffffff; height: 35px;" @change="CheckMobile()" >
                  
              <option v-for="countrycode in store.state.countrycodes" :key="countrycode.id" :value="countrycode.country_code">{{countrycode.country_code}}</option>
              
              </select>
              
              <input required v-model="mobile" style="width: 68%; margin-left: 2%;" id="mobile" maxlength="10" type="string" @focus="changeType('number')" @focusout="changeType('string')" @input="limitInputLength()"><br>
              
              <label v-if="mobileerror" style=" color: red; font-size: 12px;font-family: Arial, Verdana, Helvetica, sans-serif;" >{{ mobileerror_txt }}</label><br v-if="mobileerror">
            </div>
            
            <div :style="{position: 'absolute', top: (96 + bufferhigh) +'vh', left: '5%' }" >
              <label >{{tnc_txt}}</label>

            </div>



            <div :style="{position: 'absolute', width:'5%', top: (100 + bufferhigh) +'vh', left: '5%',border:'0px solid #1B78B5', justifyContent:'left'}"  >
                <input required  type="checkbox" @change="onAcceptTermA()" v-model="terma" >  
            </div>
            <div v-html="terma_txt" :style="{position: 'absolute', width: '80%', top: (100 + bufferhigh) +'vh', left: '12%', fontSize: '12px', color: '#000000', fontFamily: 'Arial, Verdana, Helvetica, sans-serif'}"></div>
            
            <div :style="{position: 'absolute', top: (102 + bufferhigh) + 'vh', left: '5%', width:'90%' }">
              <label v-if="termerror" style=" color: red; font-size: 12px;font-family: Arial, Verdana, Helvetica, sans-serif;" >{{ termerror_txt }}</label><br v-if="emailerror">
            </div>



            <div :style="{position: 'absolute', width:'5%', top: (105 + bufferhigh+termbufferhigh) + 'vh', left: '5%',border:'0px solid #1B78B5', justifyContent:'left' }" >
                <input type="checkbox" @change="onAcceptTermB()" v-model="termb" >  
            </div>

            <div v-html="termb_txt" :style="{position: 'absolute', width: '80%', top: (105 + bufferhigh+termbufferhigh) +'vh', left: '12%', fontSize: '12px', color: '#000000', fontFamily: 'Arial, Verdana, Helvetica, sans-serif'}"></div>


            <!--<div class="submit" style="position: absolute; top:80vh;">
                <button type="submit" @click="handleSubmit()">Submit</button>
            </div>-->


            <div class="slidecontainer" :style="{position: 'absolute', top: (115+ bufferhigh + termbufferhigh) + 'vh', left: '10%', width:'80%' }">
                <input type="range" min="1" max="100" v-model="slideValue" @input="onSlide" value="0" class="slider" id="myRange" style="border:0px solid #000000; background-size: 100% 100%;">
            </div>
            <!--
            <div :style="{display: 'flex', justifyContent:'center', position: 'absolute', top: (62 + bufferhigh) + 'vh', width:'90%' }"> 
              <button v-if="slider" type="submit" @click="handleSubmit()" style="background:#1B78B5; width:150px; height:40px; border-radius: 12px;border: 0px solid #ced4da;"><label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #ffffff; font-weight:normal; font-size: 14px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;">Submit</label></button>
            </div>-->
            
          <div :style="{display: 'flex', justifyContent:'center', position: 'absolute', top: (125 + bufferhigh+ termbufferhigh) + 'vh', width:'100%' }">
            <StripeCheckout v-if="store.state.language == 0"
                ref="checkoutRef"
                locale="zh-HK"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
              />
              <StripeCheckout v-if="store.state.language == 1"
                ref="checkoutRef"
                locale="en"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
              />
              <StripeCheckout v-if="store.state.language == 2"
                ref="checkoutRef"
                locale="ja"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
              />
            <button v-if="slider" type="submit" style="background:#1B78B5; width:150px; height:40px; border-radius: 12px;border: 0px solid #ced4da;"><label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #ffffff; font-weight:normal; font-size: 16px; line-height: 0px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;">{{submit_txt}}</label></button>
          </div>
          </form>


        <div class="paymentformfooter-container" id="paymentformfooter-container">
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
.paymentformbackground {
  background: #ffffff;
  background-color: #ffffff;
  height: 130vh;
  width: 100vw;
  align-content: top;
  align-items: top;
}
.slidecontainer {
  width: 100%; /* Width of the outside container */
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  background: #ffffff;
  outline: none;
  opacity:1;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-color: #ffffff;
  background-repeat: no-repeat;
  background-image: url('/images/btn_price01.png');
  border-radius: 500px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 38px; /* Set a specific slider handle width */
  height: 38px; /* Slider handle height */
  background: #ffffff; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 50px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('/images/icon_failed.png');
  border:1px solid #000;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
  border:1px solid #ee0000;
}
.paymentform{
  width: 100%;
  padding: 0px;
  margin: 10px auto;
  background: rgb(255, 255, 255);
  border-radius: 0px;
  text-align: left;
}

.paymentform label{
    color: #aaa;
  display: inline-block;
  margin-bottom: 5px;
  margin: 0px 0 0px;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
}
.paymentform input, select{
    color: #555;
  width: 100%;
  padding: 10px;
  margin: 1px 0 10px;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  border:1px solid #000000;
}

.paymentform label{
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: #1B78B5;
  font-size: 18px;
  border: none;
  padding: 0; 
}


.paymentranking-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 10vh;
  top: 35vh;  
  border: 0px solid #ced4da;  
  text-align: center; align-items:center; align-content: center;
}  

.paymentformfooter-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 135vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  
</style>