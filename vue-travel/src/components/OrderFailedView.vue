<template>

    <div class="failedbackground">
        <div style="position: absolute; top:10vh;  width: 90%; left: 5%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #1B78B5;">
            <img :src="'/images/icon_failed.png'" style="width:60%;" @click="onClickRanking(rank.mark_id)" > <br>
        </div>

        
        <div style="position: absolute; top:40vh;  width: 70%; left: 15%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5;background: #1B78B5;">
            <h1 style=" color: #ffffff; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:bold; font-size: 24px; padding: 5px 5px; line-height: 30px; text-align: center; ">{{message_txt}}</h1>
         </div>
         <div style="position: absolute; top:45vh;  width: 80%; left: 10%; text-align: center; align-items:center;align-content: center; border:0px solid #1B78B5; background: #1B78B5;">
        
            <h1 style=" color: #ffffff; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:normal; font-size: 18px; padding: 5px 5px; line-height: 20px; text-align: center; ">{{content_txt}}</h1>
        </div>  
        
        <div class="failedsection-container">
          <div class="button-container">
            <button @click="onClickHome" class="whitebtn"><text style="color: #000000; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:normal;font-size: 18px; ">{{home_txt}}</text></button><br>
          </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import { computed } from 'vue'  
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const route = useRoute();
const message_txt = ref('Minting Failed');
const content_txt = ref('Your booking could not be processed at this time. Please try again later.');
const home_txt = ref('HOME');

const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');
function onClickHome()
{
  router.push('/?badge_id=' + store.state.badge_id);
}

onMounted(() => {
  //if(store.state.orderinfo == 'failed')
  //  router.push('/');
  
  LoadSiteTextContent();
  updatePaymentStatus();
  //console.log(route.query.lang);
})

onUnmounted(() => {
    console.log('HomeView.onUnmounted');
    store.commit('setSaveBadgeID','');
    store.commit('setOrderInfo', '');
    store.commit('setOrderStaus', false);
})


async function LoadSiteTextContent()
{
  console.log('HomeView.LoadSiteTextContent');
  const formData = new FormData();
  formData.append('ActionType', 'GetSiteContent');
  formData.append('lang', route.query.lang);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data.sitecontent;
        console.log(result);
        store.commit('setSiteContent', result);
        
        console.log(store.state.sitecontent);
        home_txt.value = store.state.sitecontent.support;
        message_txt.value = store.state.sitecontent.failedtitle;
        content_txt.value = store.state.sitecontent.faileddesc;
        
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
  formData.append('payment_status', '2');
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

.failedbackground {
background: #1B78B5;
background-color: #1B78B5;
height: 100vh;
width: 100vw;
align-content: top;
align-items: top;
}



.failedsection-container {  
  position: absolute;  
  background-color: #1B78B5;
  width: 100%;  
  top: 55vh;  
  text-align: center;
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
}  

.button-container {  
  position: absolute;  
  background: white;
  background-color: #1B78B5;
  top: 7vh;  
  width: 100%;  
  height: 7vh;
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
}  
</style>