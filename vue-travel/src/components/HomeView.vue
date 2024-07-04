
<script setup>
import { ref,  onMounted  } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { convertSpeed, getDistance } from 'geolib';  
import axios from 'axios';
//import { set } from 'cypress/types/lodash';
import FooterComponent from './footer.vue';  

const route = useRoute();
const router = useRouter();
const image = ref('/images/page_mask.jpg');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');
const header_txt = ref('VISITKOCHI');
const subheader_txt = ref('The blessings of nature');
const tmp = ref('/images/face_bule0.png');
const title_txt = ref('Kochi Japan Tourism Board');
const desc_txt = ref('Verified Impact Authorizer');
const boardHead_txt = ref('Become');
const boardTitle_txt = ref('Sustainable Travel Ambassador');
const boardDesc_txt = ref('Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.');
const support_txt = ref('SUPPORT & GET A BADGE');
const passport_txt = ref('BADGE PASSPORT');
const website_txt = ref('OFFICIAL WEBSITE');
const ranking_txt = ref('Reactions by other supporters');
const loginstatus = ref(false);
const store = useStore();
const lat = ref(0);
const lon = ref(0);
const isClose = ref(null);  
const gpslocations = ref([]);
const contentIsLoaded = ref(false);
const badgeIsLoaded = ref(false);

function getCurrentGPSLocation() {  
  if (navigator.geolocation) {  
    navigator.geolocation.getCurrentPosition(  
      (position) => {  
        lat.value = position.coords.latitude;
        lon.value = position.coords.longitude;
      },  
      (error) => {  
        console.error(error);  
        location.value = null;  
      }  
    );  
  } else {  
    console.log("Geolocation is not supported by this browser.");  
    location.value = null;  
  }  
};  

async function LoadGPSLocations()
{
  getCurrentGPSLocation();
  let id= -1;
  const formData = new FormData();
  formData.append('ActionType', 'GetLocationsGPS');
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.gpslocations;
        gpslocations.value = result;
        for (let i = 0; i < gpslocations.value.length; i++) {  
          if(getDistance({ latitude: lat.value, longitude: lon.value }, { latitude: gpslocations.value[i].lat, longitude: gpslocations.value[i].lon }) < 1000){
            isClose.value = true;
            console.log(gpslocations.value[i].lat + " "+gpslocations.value[i].lon+ " "+gpslocations.value[i].badge_id);  
            //console.log(' ');  
            store.commit('setSaveBadgeID', gpslocations.value[i].badge_id);
          }
        }
      
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

async function LoadBadgeTextContent()
{
  const formData = new FormData();
  formData.append('ActionType', 'GetBadgeInfo');
 
  formData.append('badge_id',store.state.badge_id);
  formData.append('lang', store.state.language);
  
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.badgeinfo;
        //console.log(result);
        if(result == null)
        {
          window.location.href = "https://www.starsdg.com/notfound";
          return;
        }else{
          console.log(res.data);
          header_txt.value = result.homeheader;
          title_txt.value = result.title;
          boardDesc_txt.value = result.content;
          store.commit('setBadgeInfo', result);
          badgeIsLoaded.value = true;
        }
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

async function LoadSiteTextContent()
{
  const formData = new FormData();
  formData.append('ActionType', 'GetSiteContent');
  formData.append('lang', store.state.language);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.sitecontent;
        console.log(result);
        store.commit('setSiteContent', result);
        subheader_txt.value = store.state.sitecontent.subheader;
        desc_txt.value = store.state.sitecontent.description;
        boardHead_txt.value = store.state.sitecontent.boardheader;
        boardTitle_txt.value = store.state.sitecontent.boardtitle;
        support_txt.value = store.state.sitecontent.support;
        passport_txt.value = store.state.sitecontent.passport;
        website_txt.value = store.state.sitecontent.website;
        
        footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
        footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
        footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
        contentIsLoaded.value = true;
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

async function UpdateLanguage()
{
  if(store.state.logininfo == null)
    return;
  const formData = new FormData();
  formData.append('ActionType', 'UpdateLanguage');
  formData.append('language', store.state.language);
  formData.append('email', store.state.logininfo.email);
  formData.append('hashcode', store.state.logininfo.hashcode);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.status;
        console.log(res.data);
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


onMounted(() => {

  document.body.style.backgroundColor = '#ffffff'; 
  if(route.query.logout =='1')
  {
    store.commit('setSaveBadgeID',-1);
    store.commit('setSaveLanguage',-1);
    store.commit('setCompanyID',-1);
    store.commit('setAgentID',-1);
    store.commit('setState');
    store.commit('setHomePath','/');
  }
  //store.commit('setState');
  if(route.query.badge_id>-1)
  {
    if(route.query.company_id!='')
      store.commit('setCompanyID', route.query.company_id);
    
    if(route.query.agent_id!='')
      store.commit('setAgentID', route.query.agent_id);

    store.commit('setSaveBadgeID', route.query.badge_id);
    if(store.state.language=='-1')
      setDefaultLanguage();

    store.commit('setHomePath','/?badge_id='+route.query.badge_id+'&company_id='+route.query.company_id+'&agent_id='+route.query.agent_id);
    onClickLanguage(store.state.language);
  }else{

    //store.commit('setSaveBadgeID',-1);
    //router.push('/notfound');
    store.commit('setHomePath','/');
    window.location.href = "https://www.starsdg.com/notfound";

    return;
  }
  
  //LoadGPSLocations();
})


function setDefaultLanguage()
{
  let language = navigator.language || navigator.userLanguage;

  let lang_id = '1';
  switch(language.split('-')[0]){
    case 'zh':
      lang_id = '0';
      break;
    case 'jp':
      lang_id= '2';
      break;
    default:
      lang_id = '1';
      break;
  }
  console.log('setDefaultLanguage ' + lang_id);
  store.commit('setSaveLanguage', lang_id);

}


function CheckGPS(){
  const status = true;
  return status;
}

function onClickSupport(){
  
  const id=19;
  if(CheckGPS() == false){
    router.push('/notfound');
  }else{
    router.push('/payment');
    //router.push({ name: 'PaymentView', params: { id } }) // -> /user/123
  }
  
}


function clearData()
{
  store.commit('setState');

}
 function onClickPassport(){
  //clearData();

  router.push('/passport');
}

function onClickWebsite(){
  //console.log(store.state.badgeinfo.website);
  window.open(store.state.badgeinfo.website, '_blank');
}

function onClickLanguage(value){
  contentIsLoaded.value = false;
  badgeIsLoaded.value = false;
  store.commit('setSaveLanguage', value);
  //LoadBadgeTextContent();
  UpdateLanguage();
  LoadSiteTextContent();
  LoadBadgeTextContent();
  //router.push('/how_to_play');
}

function getImageName(badge_id){
    return '/badgebackground/home_bg_' + badge_id + '.jpg';
}

</script>

<template>
  <div class="background" v-if="contentIsLoaded && badgeIsLoaded">
  <div class="image-container">
    <img :src=getImageName(store.state.badge_id) alt="Background" class="background-image">

    <div class="header-container">
      <text>
        <h1 style="color: white; font-weight:500; font-size: 22px; letter-spacing: 4px;">{{header_txt}}</h1>
        <h1 style="text-align: center; font-size: 12px; line-height: 5px;">{{subheader_txt}}</h1>
       
      </text>
    </div>
    <div class="title-container">
      <text>
          <h1 style=" font-family: Arial, Verdana, Helvetica, sans-serif; color: white; font-weight:500; font-size: 26px; letter-spacing: 0px;">{{title_txt}}</h1>
          <h1 style=" font-family: Arial, Verdana, Helvetica, sans-serif; text-align: center; font-size: 18px; line-height: 5px;">{{desc_txt}}</h1>
      </text>
    </div>
    <div class="language-container">
      <button @click="onClickLanguage('0')" v-bind:style="{backgroundImage: 'url(/images/language02.png)'}"></button>
      <button @click="onClickLanguage('1')" v-bind:style="{backgroundImage: 'url(/images/language01.png)'}"></button>
      <button @click="onClickLanguage('2')" v-bind:style="{backgroundImage: 'url(/images/language03.png)'}"></button>
    </div>
    
    <div style="position: absolute;  top:30vh; width: 100vw; border: 0px solid #ced4da;  ">
      <div class="overlay-container">
       
            <h1 style="color: #1B78B5; font-weight:500; font-size: 20px;padding: 5px 20px; line-height: 25px; ">{{boardHead_txt}}</h1>
            
            <h1 style="color: #1B78B5; font-weight:bold; font-size: 22px; padding: 5px 20px; line-height: 25px; ">{{boardTitle_txt}}</h1> 
            <hr class="my-line">
            <h1 style="color: black;  font-size: 14px; padding: 5px 24px;  line-height: 20px;">{{boardDesc_txt.substring(0,200)}}</h1>

      </div>

        <div class="section-container">
          <div class="button-containerA">
            <button @click="onClickSupport" class="bluebtn"><text style="color: #ffffff; ">{{support_txt}}</text></button><br>
          </div>
          <div class="button-containerB">
            <button @click="onClickPassport" class="whitebtn"><text style="color: #000000;  ">{{passport_txt}}</text></button><br>
          </div>
          <div class="button-containerC">
            <button @click="onClickWebsite" class="whitebtn"><text style="color: #000000;   ">{{website_txt}}</text></button><br>
          </div>
          <div class="ranking-container">
            <ranking-page></ranking-page>
          </div>
          <div class="homefooter-container">
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
    </div>
  </div>
</template>


<style>
.background {
  background: #ffffff;
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  align-content: top;
  align-items: top;
}

.image-container {  
  position: absolute;  
  background: white ;
  width: 100vw;
  margin: auto;  
  
}  
  
.background-image {  
  width: 100%;  
}  
  
.overlay-container{
  position: absolute;  
  background: white;
  top: 0vh;
  width: 80%;  
  height: 250px;
  left:10%;
  padding: 1em 0;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  text-align: center;
  border:1px solid #000000;
}

.overlay-text {  
  position: absolute;  
  top: 0px;  
  left: 0px;  
  width: 50%;  
  display: flex;  
  justify-content: center;  /* align horizontally in the center */  
  align-items: center;      /* align vertically in the center */  
  color: white;         /* change text color as needed */  
  text-align: center;
}  


.my-line {  
  border: none;  
  height: 4px; /* or whatever thickness you want */  
  width: 30%;
  padding-left: 0px;  
  background-color: #70afda; /* or whatever color you want */  
}  


.language-container {  
  position: absolute;  
  top: -20px;  
  width: 100%;  
  display: flex;  
  justify-content: flex-end;  
  padding: 1em 0;  
  border:0px solid #ced4da;
}  

.language-container button {  
  border:0px solid #ced4da;
  padding: 0px 0px;  
  cursor: pointer;  
  background: none, no-repeat;
  width: 40px;
  height: 40px;
  scale: 0.65;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 10px;  
  margin-left:0px; 
}  



.section-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 50vh;
  top: 40vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  

.button-containerA {  
  position: absolute;  
  background: white;
  top: 0vh;  
  height: 8vh;
  width: 100%;  
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
}  
.button-containerB {  
  position: absolute;  
  background: white;
  top: 8vh;  
  width: 100%;  
  height: 8vh;
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
}  

.button-containerC {  
  position: absolute;  
  background: white;
  top: 16vh;  
  width: 100%;  
  height: 8vh;
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
}  

.bluebtn{
  background-color: #1B78B5;
  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: white;
  border: none;
  padding: 15px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 20px;
  width: 70%;

}
.whitebtn{
  background-color: #ffffff;
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: white;
  border: none;
  padding: 15px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 20px;
  border:1px solid #1B78B5;
  width: 70%;

}

.ranking_text-container {  
  position: absolute;  
  top: 100vh;  
  left: 0px;  
  width: 100%;  
  padding: 1em 0;  
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
}  
  
  
.ranking-container button {  
  border:0px solid #ced4da;
  cursor: pointer;  
  scale: 0.65;
  width: 87px;
  height: 87px;
}  

  
.ranking-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 10px;  
  cursor: pointer;  
  font-size: 1em;  
}

.header-container {  
  position: absolute;  
  top: 2vh;  
  left: 0;  
  width: 100%;  
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;
  border: 0px solid #ced4da;  

}  
.header-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 10px;  
  font-size: 1em;  
}  
  
.title-container {  
  position: absolute;  
  top: 13vh;  
  width: 100%;  
  text-align: center;
  border: 0px solid #ced4da;  
  

}  
  
.title-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 10px;  
  font-size: 1em;  
  font-weight: bold;
}  

.homefooter-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 40vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  

.ranking-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 15vh;
  top: 25vh;  
  border: 0px solid #ced4da;  
  padding:0px 0px;  
  margin-top: 0px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
}  


/* Adjust button size on smaller screens */  
@media (max-width: 755px) {  
  .button-container button {  
    font-size: 0.8em;  
  }  
}  

</style>


