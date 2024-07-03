<template>

    <div class="thankyoubackground">
        <div style="position: absolute; top:10vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
            <img :src="'/images/shien.png'" style="width:100%;" @click="onClickRanking(rank.mark_id)" > <br>
        </div>
        <div style="position: absolute; top:15vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
            <img :src=getBadgeImageName(route.query.badge_id) style="width:50%;" @click="onClickRanking(rank.mark_id)" > <br>
        </div>
        
        <div style="position: absolute; top:50vh;  width: 70%; left: 15%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #ffffff;">
            <h1 style=" color: #1B78B5; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:bold; font-size: 24px; padding: 5px 5px; line-height: 30px; text-align: center; ">{{message_txt}}</h1>
         </div>
         <div style="position: absolute; top:60vh;  width: 80%; left: 10%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5; background: #ffffff;">
        
            <h1 style=" color: #000000; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:normal; font-size: 18px; padding: 5px 5px; line-height: 20px; text-align: center; ">{{content_txt}}</h1>
        </div>  
        
        <div class="thankyousection-container">
         <!-- <div class="button-containerA">
            <button @click="onClickHome" class="bluebtn"><text style="color: #ffffff; ">{{support_txt}}</text></button><br>
          </div>-->
          <div class="button-containerB">
            <button @click="onClickPassport" class="bluebtn"><text style="color: #ffffff;  ">{{passport_txt}}</text></button><br>
          </div>
          <div class="button-containerC">
            <button @click="onClickWebsite" class="bluebtn"><text style="color: #ffffff;   ">{{website_txt}}</text></button><br>
          </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const route = useRoute();
const message_txt = ref('You collected');
const content_txt = ref('You can checkit out anytime in your mirai impact passport.');
const support_txt = ref('HOME');
const passport_txt = ref('BADGE PASSPORT');
const website_txt = ref('OFFICIAL WEBSITE');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');

function getBadgeImageName(badge_id){
    return '/badgeimg/badge_image_' + badge_id + '.png';
}   


function onClickHome(){
  
  router.push('/?badge_id=' + store.state.badge_id);
  
}

function onClickPassport(){
  //clearData();
  console.log('HomwView.passport ' + store.state.logininfo.displayname + ' ' + store.state.hashcode);

  if(store.state.logininfo =='' || store.state.hashcode == '' || store.state.logininfo == null || store.state.hashcode == null)
    router.push('/inputSMS');
  else
    router.push('/passport');
}

function onClickWebsite(){
  console.log('HomwView.onClickWebsite');
  window.open('http://www.google.com', '_blank');
}

onUnmounted(() => {
    console.log('HomeView.onUnmounted');
    store.commit('setSaveBadgeID','');
    store.commit('setOrderInfo', '');
    store.commit('setOrderStaus', false);
})

onMounted(() => {
  console.log(route.query.lang);
  console.log(route.query.badge_id);
  //if(store.state.badge_id ==-1 || store.state.orderinfo == null || store.state.orderinfo == undefined || store.state.orderinfo == '')
   // router.push('/');
  LoadSiteTextContent();
  
  updatePaymentStatus();
})

async function LoadSiteTextContent()
{
  console.log('HomeView.LoadSiteTextContent' + route.query.lang);
  const formData = new FormData();
  formData.append('ActionType', 'GetSiteContent');
  formData.append('lang', route.query.lang);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.sitecontent;
        console.log(result);
        store.commit('setSiteContent', result);
        
        support_txt.value = store.state.sitecontent.support;
        passport_txt.value = store.state.sitecontent.passport;
        website_txt.value = store.state.sitecontent.website;
        message_txt.value = store.state.sitecontent.successtitle;
        content_txt.value = store.state.sitecontent.successtitle;
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


async function updatePaymentStatus(){
  const formData = new FormData();
  formData.append('ActionType', 'UpdatePaymentStatus');
  formData.append('order_id', route.query.order_id);
  formData.append('hashcode', route.query.hashcode);
  formData.append('payment_status', '1');
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }

          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when update payment status:', err);
      isNetworkError.value = true;
  }
}

</script>



<style>

.thankyoubackground {
background: #ffffff;
background-color: #ffffff;
height: 90vh;
width: 100vw;
align-content: top;
align-items: top;
}



.thankyousection-container {  
  position: absolute;  
  background-color: #ffffff;
  width: 100%;  
  height: 50vh;
  top: 70vh;  
  text-align: center;
  border: 0px solid #ced4da;  
}  

</style>