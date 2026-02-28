

<script setup>
import { ref, watch, onMounted } from 'vue';

const image = ref('/images/page_mask.jpg');

const logo = ref('/images/logo_vsjk.png');
const header_txt = ref('Kochi Japan Tourism Board');

const subheader_txt = ref('Page Not Found');
const message1_txt = ref('Sorry!');
const message2_txt = ref('Page not found');


function getImageName(badge_id){
    return '/badgebackground/payment_bg_' + badge_id + '.png';
}   

onMounted(() => {
   console.log('NotFoundView.onMounted');
})

</script>

<template>
     <div class="background">
        <div class="image-container">  
            <img :src='getImageName(5)' alt="Background" class="paymentbackground-image">  
        </div>
        <div class="nheader-container">  

            <text style="color: red; font-weight:bold; font-size: 22px; line-height: 28px; letter-spacing: 2px;">
                {{ message1_txt }}<br>
                {{ message2_txt }}
            </text>
        </div>
      </div>
</template>
<style>

.nheader-container {  
  position: absolute;  
  top: 50vh;  
  left: 0;  
  width: 100%;  
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;

}  
.nheader-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 10px;  
  font-size: 1em;  
}  
  
.image-container {  

  position: absolute;  
  background: white ;
  width: 100vw;
  margin: auto;  
  
}  

.notfoundbackground-image {  
position: absolute;  
  width: 100vw;
height: 698px;  
object-fit: cover;  
}  

.notfoundoverlay{
  position: absolute;  
  background: white;
  top: 625px;  
  left: 30%;  
  width: 300px;  
  height: 147px;
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  text-align: center;
}

</style>