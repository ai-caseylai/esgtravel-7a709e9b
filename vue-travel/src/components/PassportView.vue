
<script setup>

import {ref,watchEffect, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const header_txt = ref('My Passport');
const title_txt = ref('You collected total <text style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1b78b5; font-weight:normal; font-size: 18px; ">{0}</text> badges');
const badgeList = ref([]);
const tempMonth = ref('');
const tempYear = ref('');
const badgecount = ref(0);
const badgelistcount = ref(0);
const greeting_txt = ref('Hi');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');


async function LoadSiteTextContent()
{
  console.log('HomeView.LoadSiteTextContent');
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


            header_txt.value = store.state.sitecontent.mypassport;
            title_txt.value = store.state.sitecontent.collected;
            greeting_txt.value = store.state.sitecontent.greeting;
            
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


async function loadDateList(){
    const formData = new FormData();
    formData.append('ActionType', 'GetBadgeOrderList');
    formData.append('user_id', store.state.logininfo.user_id);
    formData.append('hashcode', store.state.hashcode);
    //console.log(store.state.logininfo.user_id + ' ' + store.state.hashcode);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

        if (res.status == 200) {
            const result = res.data;
           // console.log(result);
            badgeList.value = result.badgelist;
            badgelistcount.value = result.badgelistcount;
            for(let i=0; i<result.badgelistcount; i++){
                badgecount.value += badgeList.value[i].badgecount;
            }
            adjusFooterTop();
        } else {
            const errorType = result.error_type;

            if (!errorType) {
                return;
            }

            console.log('errorType: ' + errorType);
        }
    } catch (err) {
        console.log('There was an error when loading order date list:', err);
        isNetworkError.value = true;
    }
}
/*watchEffect(() => {  
    orderDateList.value.forEach((orderdate) => {  
        //loadBadgeListByMonth(orderdate.orderdate);  
        console.log(orderdate.orderdate);
    });
});  */

async function loadBadgeListByMonth($orderdate){
    const formData = new FormData();
    formData.append('ActionType', 'GetBadgeOrderListByDate');
    formData.append('user_id', store.state.logininfo.user_id);
    formData.append('hashcode', store.state.hashcode);
    formData.append('orderdate', $orderdate);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

        if (res.status == 200) {
            const result = res.data;
            badgeList.value = result.badges;
            
        } else {
            const errorType = result.error_type;

            if (!errorType) {
                return;
            }

            console.log('errorType: ' + errorType);
        }
    } catch (err) {
        console.log('There was an error when loading badge list by month:', err);
        isNetworkError.value = true;
    }
}



function getImageName(badge_id){
    return '/badgeimg/badge_image_' + badge_id + '.png';
}   

function getEMonth(datestr){
    let date = new Date(datestr);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
}

function getCMonth(datestr){
    let date = new Date(datestr);
    const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"];
    return monthNames[date.getMonth()];
}

function getYear(datestr){
    let date = new Date(datestr);
    return date.getFullYear();
}

function setTempDate(datestr){
    let date = new Date(datestr);
    tempMonth.value = monthNames[date.getMonth()];
    tempYear.value = date.getFullYear();
}


function getTitle(badgecount){
   
    return title_txt.value.replace('{0}', "&nbsp;" +badgecount + "&nbsp;") ;
}

function GetCurrentYear(str)
{
    let stat = false;
    //console.log(tempYear.value);
    //console.log(str);
    if(tempYear.value == str)
        stat = true;
    else
        tempYear.value = str;

    return stat;
}

function onClickBadge(badge_id, order_id){
   
   // store.commit('setSaveBadgeID', badge_id);
    store.commit('setSaveOrderID', order_id);
    store.commit('setLoadBadgeID', badge_id);
    router.push('/badgedetail');
}

 function chunk(arr, size) {  
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>  
      arr.slice(i * size, i * size + size)  
    );  
  }

onMounted(() => {
    onClickPassport();
    //console.log(store.state.logininfo + ' ' + store.state.hashcode);
    // if(store.state.userinfo =='' || store.state.hashcode == '')
    //     router.push('/inputemail');
    // else
    // {
    //     //router.push('/passport');
    //     loadDateList();
    // }
    LoadSiteTextContent();
    
    
})

function adjusFooterTop(){
  //console.log('adjust height' + badgelistcount.value);
  var element = document.getElementById("passportfooter-container");  
  element.style.top = 80 + (5*badgelistcount.value) + 'vh';
  //console.log('TOP = ' + element.style.top);
}


async function onClickPassport(){
  //clearData();
  

  if(store.state.logininfo =='' || store.state.hashcode == '' || store.state.logininfo == null || store.state.hashcode == null)
    router.push('/inputSMS');
  else
  {
  

    const formData = new FormData();
    formData.append('ActionType', 'CheckLoginStatus');
    formData.append('email', store.state.logininfo.email);
    formData.append('hashcode', store.state.hashcode);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

        if (res.status == 200) {
          const result = res.data;
          //console.log(result);
          if(result.loginstatus == false){
            store.commit('setLoginInfo', '');
            store.commit('setHashcode', '');
            router.push('/inputSMS');
            
          }else{
                loadDateList();
          }
        } else {
            const errorType = result.error_type;

            if(result.loginstatus == 'false'){
              store.commit('setLoginInfo', '');
              store.commit('setHashcode', '');
              router.push('/inputSMS');
            }
            if (!errorType) {
                return;
            }

            console.log('errorType: ' + errorType);
        }
    } catch (err) {
        console.log('There was an error when checking login status:', err);
        isNetworkError.value = true;
    }
  }
}
</script>


<template>
    <div class="passportbackground">
        
        <div style="position: absolute; top:3vh; width: 90%; left:2%; border:0px solid #ced4da; text-align: left;">  
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5; font-weight:normal; font-size: 24px; line-height: 5px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{header_txt}}</label><br>
        </div>
        
        <div style="position: absolute; top:6vh; width: 35%; left:2%; border:0px solid #ced4da; text-align: left;">
            <hr class="passport-line">
        </div>
        
        <div style="position: absolute; top:10vh; width: 90%; left:5%; border:0px solid #ced4da; text-align: center;">  
            <label style="font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 24px; line-height: 5px; letter-spacing: 0px; padding-left: 0px; padding-top: 0px;"> {{greeting_txt}}, {{ store.state.logininfo.displayname}}</label><br>
          
        </div>
        <div v-html="getTitle(badgecount)" :style="{justifyContent: 'center', alignContent:'center', position: 'absolute', display:'flex', top:'13vh', color: '#000000', width: '90%', left: '5%', fontSize: '18px', border:'0px solid #ced4da', fontFamily: 'Arial, Verdana, Helvetica, sans-serif'}"></div>
        <div style="position: absolute; top:20vh; width: 90%; left:5%; border:0px solid #ced4da; text-align: center; border:0px solid #ced4da;">

            <div v-for="(list, index) in badgeList" :key="index">  
                <div >
                    <h2 style="position: absolute; width: 90%; left:0%;font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 18px; border:0px solid #ced4da; text-align: left; padding-top: 0px; line-height: 5px;">{{ getYear(list.orderdate) }}</h2>  <br>
                </div>
                <h2 v-if="store.state.language ==1" style="position: absolute; width: 90%; left:0%;font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 18px; border:0px solid #ced4da; text-align: left; padding-top: 0px; line-height: 5px;">{{ getEMonth(list.orderdate) }}</h2>
                <h2  v-if="store.state.language !=1" style="position: absolute; width: 90%; left:0%;font-family: Arial, Verdana, Helvetica, sans-serif;color: #000000; font-weight:normal; font-size: 18px; border:0px solid #ced4da; text-align: left; padding-top: 0px; line-height: 5px;">{{ getCMonth(list.orderdate) }}</h2>  <br>
                <table>
                    <tr v-for="(chunk, i) in chunk(list.badges, 6)" :key="i">
                        <td  v-for="(badge, j) in chunk" :key="j">
                            <img :src="getImageName(badge.badge_id)" class="badge-img" @click="onClickBadge(badge.badge_id, badge.order_id)" > 
                        </td>
                    </tr>
                </table>
                <br>
            </div>  
            
            <div class="passportfooter-container" id="passportfooter-container">
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
    </div>  
</template>


<style>

.passportbackground {
background: #ffffff;
background-color: #ffffff;
height: 100vh;
width: 100vw;
align-content: top;
align-items: top;
}

.passport-line {  
  border: none;  
  height: 4px; /* or whatever thickness you want */  
  width:100%;
  left:0%;
  padding-left: 0px;  
  background-color: #1B78B5; /* or whatever color you want */  
}  

.badge-img {  
    max-width: 50px;  
    height: 50px;
    background: white;
    background-color: rgb(255, 255, 255);
    border: 0px solid #ced4da;
}  

.passportfooter-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 80vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  
</style>