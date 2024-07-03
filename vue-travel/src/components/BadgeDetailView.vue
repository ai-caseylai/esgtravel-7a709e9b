
<script setup >

import { ref, nextTick, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios'; 
const store = useStore();
const router = useRouter();
const image = ref('/images/pic.png');
const tab_idx = ref();
const eventtab_idx = ref();
const badgeinfo = ref([]);
const sdglist = ref([]);
const badgeContent_txt = ref('badge Content');
const eventContent_txt = ref('event Content');

const impactrecord_txt = ref('Impact Record');
const impactContent_txt = ref('Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content Impact Content ');
const badge_btn_txt = ref('Travel Ambassador');
const active_txt = ref('Active');
const showDialog = ref(false);
const impact_txt = ref('Impact');
const badge_txt = ref('Badge');
const event_txt = ref('Event');
const summary_txt = ref('Summary');
const detail_txt = ref('Detail');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');

function loadSiteContent()
{
  impact_txt.value = store.state.sitecontent.impact;
  badge_txt.value = store.state.sitecontent.badge;
  event_txt.value = store.state.sitecontent.event;
  badge_btn_txt.value = store.state.sitecontent.travelambassador;
  impactrecord_txt.value = store.state.sitecontent.impactrecord;
  summary_txt.value = store.state.sitecontent.summary;
  detail_txt.value = store.state.sitecontent.detail;
  footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
  footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
  footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
}


function selectTab(idx) {
  tab_idx.value= idx;
  /*switch(idx){
    case 0:
      loadBadgeImpact();
      break;
    case 1:
      loadBadgeContent();
      break;
    case 2:
      loadEventContent();
      break;
  }*/
}


function selectEventTab(idx) {
  eventtab_idx.value= idx;
}
function onClickBack() {
        console.log('onClickBack');
        router.push('/passport');
    }


async function loadSDGList(){
  const formData = new FormData();
  formData.append('ActionType', 'GetSDGList');
  formData.append('badge_id',store.state.loadbadge_id);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        sdglist.value = result.sdglist;
        console.log('SDG list loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      isNetworkError.value = true;
      console.error('There was an error when doing registration:', err);
  }
}

async function loadBadgeEvent(){
  const formData = new FormData();
  formData.append('ActionType', 'GetBadgeEvent');
  formData.append('badge_id',store.state.loadbadge_id);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        impactContent_txt.value = result.impactarea;
        //ranking.value = result.ranks;
        console.log('Badge impact loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      isNetworkError.value = true;
      console.error('There was an error when doing registration:', err);
  }
}

async function loadBadgeContent(){
  const formData = new FormData();
  formData.append('ActionType', 'GetBadgeContent');
  formData.append('badge_id',store.state.loadbadge_id);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        impactContent_txt.value = result.impactarea;
        //ranking.value = result.ranks;
        console.log('Badge impact loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      isNetworkError.value = true;
      console.error('There was an error when doing registration:', err);
  }
}

async function loadBadgeImpact(){
  const formData = new FormData();
  formData.append('ActionType', 'GetBadgeImpact');
  formData.append('badge_id',store.state.loadbadge_id);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        impactContent_txt.value = result.impactarea;
        //ranking.value = result.ranks;
        console.log('Badge impact loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when adding rank:', err);
      isNetworkError.value = true;
      console.error('There was an error when doing registration:', err);
  }
}


async function loadBadgeOrderInfo(){

  const formData = new FormData();
  formData.append('ActionType', 'GetBadgeOrderInfo');
  formData.append('order_id',store.state.order_id);
  formData.append('badge_id',store.state.loadbadge_id);
  formData.append('user_id',store.state.logininfo.user_id);
  formData.append('lang',store.state.language);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        badgeinfo.value = result.badgeinfo;
        
        
        console.log('Badge impact loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      isNetworkError.value = true;
      console.error('There was an error when doing registration:', err);
  }
}


function getBadgeImageName(badge_id){
  //console.log('/badgeimg/badge_image_' + badge_id + '.png');
    return '/badgeimg/badge_image_' + badge_id + '.png';
}   

function getBadgeBGName(badge_id){
  //console.log('/badgebackground/home_bg_' + badge_id + '.jpg');
    return '/badgebackground/event_bg_' + badge_id +  '.jpg';
}   
function geLogoName(badge_id){
  //console.log('/badgebackground/home_bg_' + badge_id + '.jpg');
    return '/badgebackground/logo_' + badge_id +  '.png';
}   

function getReplaceString(value, pio, name, date){

  return value.replace('{0}', "#POIP"+pio).replace('{1}', name).replace('{2}', date);
}

onMounted(() => {
  
  selectTab(1);
  selectEventTab(0)
  loadBadgeOrderInfo();
  loadSiteContent()
  loadSDGList();
  showDialog.value = true;
});

function getImageName(sdg_id){
  //console.log('/sdg/icon_' + sdg_id + '.jpg');
    return '/sdg/icon_' + sdg_id + '.jpg';
}
</script>


<template>
    <div class="detailbackground">
        <div class="badgedetailheader-container">  
            <button @click="onClickBack()" v-bind:style="{backgroundImage: 'url(/images/btn_back2.png)'}"></button>
        </div>
        <div class="tab-container">
          <button @click="selectTab(1)" ><label v-bind:class="{'tab-label_on':  tab_idx ==1, 'tab-label_off':  tab_idx !=1 }">{{badge_txt}}</label></button>
          <button @click="selectTab(0)" ><label v-bind:class="{'tab-label_on':  tab_idx ==0, 'tab-label_off':  tab_idx !=0 }">{{impact_txt}}</label></button>
          <button @click="selectTab(2)" ><label v-bind:class="{'tab-label_on':  tab_idx ==2, 'tab-label_off':  tab_idx !=2 }">{{event_txt}}</label></button>
        </div>
       

        <div style="position: absolute;  top: 70px;" v-if="tab_idx==0">  
          <div class="dialog">  
            <div class="scroll-view">  
              <!--<div v-html="badgeinfo.impact"  class="info-container"></div>-->
              <table style="position:absolute;top:5vh; left: 5%;width:90%; border: 0px solid #ced4da; justify-content: center;">  
                <tr v-for="n in Math.ceil(sdglist.length / 3)" :key="n">  
                  <td v-for="(sdg, index) in sdglist.slice((n - 1) * 3, n * 3)" :key="index">
                    <img :src=getImageName(sdg.sdg_id) :alt="'Image ' + (index + 1)" style="width: 100px;height: 100px;">
                  </td>  
                </tr>  
              </table>  
            </div>  
          </div>  
        </div>  
        
        <div style="position: absolute;  top: 70px;" v-if="tab_idx==1">  
          <div class="dialog">  
            <div class="scroll-view">  
              <div  class="badgeinfo-container">
                <!--<div style="display: flex;  position: absolute;top: 2vh;width:50%; left:25%;text-align: center;">
                  <label style="color: #1b78b5 ; font-size: 16px;font-family: Arial, Verdana, Helvetica, sans-serif;">{{ badgeinfo.header }}</label>
                </div>-->
                <div  v-if="badgeinfo !=''"  style="display: flex;  position: absolute; border:0px solid #ced4da; top: 3vh; width:80%; left:10%;text-align: center; justify-content: center;  ">
                    <img :src="getBadgeImageName(badgeinfo.badge_id)" alt="Logo" style="width: 215px; height: 215px;">  
                </div>
                <div style="display: flex;  position: absolute;top: 35vh;width:80%; left:10%;text-align: center; justify-content: center;">
                  <label style="color: #cd533e ; font-size: 20px; font-weight:bold; font-family: Arial, Verdana, Helvetica, sans-serif;">{{ badgeinfo.title }}</label>
                </div>
                <div style="display: flex;  position: absolute; border:0px solid #ced4da; top: 43vh; width:80%; left:10%;text-align: center; justify-content: center;  ">
                    <button @click="onClickPassport" class="badgebluebtn"><text style="color: #ffffff; font-family: Arial, Verdana, Helvetica, sans-serif; ">{{ badge_btn_txt }}</text></button>
                </div>
                
                <div style="display: flex; position: absolute;top: 50vh;width:50%; left:25%; text-align: center;justify-content: center; padding: 0em 0;">
                  <text>
                    <h1 style="color: #000000 ; font-size: 16px;font-family: Arial, Verdana, Helvetica, sans-serif;padding: 0em 0;  ">{{ impactrecord_txt}}</h1>
                    <hr class="badgemy-line">
                  </text>
                </div>
                <!--<div style="display: flex; position: absolute;top:67vh;width:50%; left:25%; text-align: center;justify-content: center;  ">
                  <img src="/images/icon_m.png" alt="Logo" style="width: 94px; height: 107px; scale: 50%;">
               </div> 
               <div style="display: flex; position: absolute;top:70vh;width:50%; left:25%; text-align: center;justify-content: center;  ">
                <label style="color: #1b78b5 ; font-size:16px; font-weight:bold; font-family: Arial, Verdana, Helvetica, sans-serif;"> {{ active_txt }}</label>
               </div> -->
               <div  v-if="badgeinfo !=''"  style="display: flex; position: absolute;top:55vh;width:100%; left:0%; text-align: center;justify-content: center; border: 0px solid #ced4da;  ">
                <div v-html="getReplaceString(badgeinfo.impactrecord, badgeinfo.order_id, store.state.logininfo.displayname, badgeinfo.orderdate)"></div>
               </div> 
              </div>
            </div>  
          </div>  
        </div> 

        <div style="position: absolute;  top: 10vh;" v-if="tab_idx==2">
          
          <div class="dialog">

            <div class="scroll-view">
              <div v-if="badgeinfo !=''">  
                <img :src="getBadgeBGName(badgeinfo.badge_id)" class="background-image">  
              </div>
              <div>
                <label style="color: #cd533e ; font-size: 20px; font-weight:bold; font-family: Arial, Verdana, Helvetica, sans-serif;">{{ badgeinfo.title }}</label>
              </div>
              
              <div class="eventtab-container">
                <button @click="selectEventTab(0)" ><label v-bind:class="{'eventtab-label_on':  eventtab_idx ==0, 'eventtab-label_off':  eventtab_idx !=0 }">{{summary_txt}}</label></button>
                <button @click="selectEventTab(1)"><label v-bind:class="{'eventtab-label_on':  eventtab_idx ==1, 'eventtab-label_off':  eventtab_idx !=1 }">{{detail_txt}}</label></button>
              </div>

              <div v-html="badgeinfo.summary"  class="info-container" v-if="eventtab_idx ==0"></div>
              <div v-html="badgeinfo.details"  class="info-container" v-if="eventtab_idx ==1"></div>

            </div>  
          </div>  
        </div> 
        
      <div class="badgedetailsfooter-container">
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

.eventimage-container {  
  position: absolute;  
  background: white ;
  width: vw;  
  margin: auto;  
  height: 85vh;
}  
.badgemy-line {  
  border: none;  
  height: 4px; /* or whatever thickness you want */  
  width: 100%;
  padding-left: 0px;  
  padding-top: 0px;
  background-color: #70afda; /* or whatever color you want */  
}  

.badgebluebtn{
  background-color: #1B78B5;
  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: white;
  border: none;
  padding: 7px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
  width: 70%;

}

.detailbackground {
  
  position: absolute;  
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  align-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ced4da;  
}

.badgedetailsfooter-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 90vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  

.tab-container {  
  position: absolute;  
  top: 2vh;  
  left:10%;  
  width: 80%;  
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;
  border:0px solid #ced4da;
}  

.tab-container button{ 
  border:0px solid #ced4da; 
  background: #ffffff;
  cursor: pointer; 
  width: 220px; 
  height: 35px; 
  margin-top: 0;  
  margin-right: 0px;  
  margin-bottom: 10px;  
  margin-left:0%; 
  padding: 0px 0px; 
}
.tab-label_on{
  color: #cd533e; 
  font-weight:bold; 
  font-size: 18px;
  padding: 5px 10px; 
  line-height: 25px; 
  cursor: pointer;
  text-underline-offset: 0.2em;
  text-underline-position: below; 
  text-decoration: underline;
  text-decoration-thickness: 4px;
}  

.tab-label_off{
  color: #1B78B5; 
  font-weight:normal; 
  font-size: 18px;
  padding: 5px 10px; 
  line-height: 25px; 
  cursor: pointer;
}  


.eventtab-container {  
  top: 55vh;  
  left:0%;  
  width:100%;  
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;
  border:0px solid #ffffff;
}  

.eventtab-container button{ 
  border:0px solid #ffffff; 
  background: #ffffff;
  cursor: pointer; 
  width: 120px; 
  height: 35px; 
  margin-top: 0;  
  margin-right: 0px;  
  margin-bottom: 10px;  
  margin-left:5%; 
  padding: 1px 0px; 
}
.eventtab-label_on{
  background: #e2adad;
  color: #cd533e; 
  font-weight:bold; 
  font-size: 18px;
  padding: 5px 20px; 
  line-height: 25px; 
  cursor: pointer;
  border-radius: 5px;
  width: 120px; 
  
}  

.eventtab-label_off{
  background: #e6e6e6;
  color: #88898a; 
  font-weight:normal; 
  font-size: 18px;
  padding: 5px 20px; 
  line-height: 25px; 
  cursor: pointer;
  border-radius: 5px;
  width: 120px; 
  
}  

.badgedetailheader-container {  
  position: absolute;
  top: 0px;  
  left:10%;
  width: 80%;
  display: flex;
  justify-content: space-around;
  padding: 1em 0;
  text-align: center;
  border:0px solid #ced4da;
}  

.badgedetailheader-container button{  

  position: absolute;  
  top: 40px;  
  left: -70px;  
  width: 55px;  
  height: 42px;
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  margin-top: -5%;  
  margin-right: 0px;  
  margin-bottom: 10px;  
  margin-left:10%; 
  text-align: center;
  cursor: pointer;  
  background: rgba(255, 255, 255, 0.5);
  border: 0px solid #ced4da;
  scale: 0.65;
}

.info-container {  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: #000000;
  position: relative;  
  top: 0px;  
  left: 0%;  
  width: 100%;  
  padding: 0em 0;  
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  text-align: left;
  padding: 15px;  
}

.badgeinfo-container {  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: #000000;
  position: relative;  
  top: 0px;  
  left: 0%;  
  width: 100%;  
  padding: 0em 0;  
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  text-align: center;
}


.eventinfo-container {  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: #000000;
  position: relative;  
  top: 0px;  
  left: 0%;  
  width: 100%;  
  padding: 0em 0;  
  display: flex;  
  justify-content: center;  
  border:1px solid #ced4da;
  text-align: left;
}

.dialog {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 100vw;  
  height: 80vh;  
  background: rgba(255, 255, 255, 1);  
  display: flex;  
  justify-content: center;  
  align-items: top;  
  padding: 0px;  
  box-sizing: border-box;  
    border: 0px solid #ced4da;
}  
  
.scroll-view {  
  top: 0px;
  width: 100%; 
  height: 100%; 
  background: white;  
  padding: 0px;  
  box-sizing: border-box;  
  overflow-y: auto; 
}  

</style>