
<script setup lang="ts">

import {nextTick, ref, watch, onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const isShowMore = ref(false);
const extraHelp = ref(false);
const extraAmount = ref(0);
const Amount = ref(8);
const image = ref('/images/pic.png');
const circle = ref('/images/whtie_circle.png');
const header_txt = ref('Select your contribution to get this badge');
const currency_txt = ref('US$');
const title_txt = ref('About this cause');
const desc_txt = ref('Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.');
const showmoretitle_txt = ref('About this cause');
const showmoredesc_txt = ref('Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation for you to become their sustainable travel ambassador and assist in advancing their sustainable mission.Kochi is extending an invitation');
const addmore_txt = ref('Add extra to help with fees');
const give_txt = ref('Give US$ ');
const footerpassport_txt = ref('Passport');
const footerhome_txt = ref('HOME');
const footercontactus_txt = ref('CONTACT US');

const showmore_txt = ref('Show more');
    function onClickBack() {
        //console.log('onClickBack');
        router.push(store.state.homepath);
    }

    function onShowMore() {
        //console.log('Show more');
        isShowMore.value = !isShowMore.value;
    }

    function closeModal() {
        //console.log('closeModal');
        isShowMore.value = false;
    }

    function onAddExtra(id){
        if(extraHelp.value === true){
            store.commit("setExtraAmount", id);
            extraAmount.value = id;
            console.log('Add extra ' +  extraAmount.value);
            console.log('Add extra id store ' +  store.state.extraamount);
        }
    
     
    }

    function onExtraHelp(event){
      console.log('Extra help ' + event.value);
        extraHelp.value = !extraHelp.value;
        if(extraHelp.value ===false){
            extraAmount.value =0;
            store.commit("setExtraAmount", "0");
        }else{
          onAddExtra(1);
        }
        console.log('Extra help ' + extraHelp.value);
    }

    
  function onClickSupport(){

    router.push('/paymentform');
  }
    
onMounted(() => {
  store.commit("setExtraAmount", "0");
  loadSiteContent();
})


function loadSiteContent()
{

  header_txt.value = store.state.sitecontent.aboutheader;
  title_txt.value = store.state.sitecontent.abouttitle;
  showmoretitle_txt.value = store.state.sitecontent.abouttitle;
  showmoredesc_txt.value = store.state.badgeinfo.showmore;
  addmore_txt.value = store.state.sitecontent.addextra;
  give_txt.value = store.state.sitecontent.giveus;
  showmore_txt.value = store.state.sitecontent.showmore;
  currency_txt.value = store.state.sitecontent.currency;
  desc_txt.value = store.state.badgeinfo.showmore;
  footerhome_txt.value = store.state.sitecontent.home.toUpperCase();
  footercontactus_txt.value = store.state.sitecontent.contactus.toUpperCase();
  footerpassport_txt.value = store.state.sitecontent.passport.toUpperCase();
}

function getImageName(badge_id){
    return '/badgebackground/payment_bg_' + badge_id + '.jpg';
}   

</script>

<template>
    
    <div class="background">
        <div class="image-container">  
            <img :src="getImageName(store.state.badge_id)" alt="Background" class="paymentbackground-image">  
        </div>
        <div class="paymentheader-container">  
            <button @click="onClickBack()" v-bind:style="{backgroundImage: 'url(/images/btn_back2.png)'}"></button>

            <text style="color: #1B78B5; font-weight:normal; font-size: 22px; line-height: 28px; letter-spacing: 2px;">
                {{ header_txt }}
            </text>
        </div>
        <div class="paymentcircleoverlay-container">  
            <img :src="circle" alt="circle">
            <text>
               {{store.state.sitecontent.currency}} 8
            </text>
        </div> 
        <div class="about-container">
            <text>
                <h1 style="color: #1B78B5; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:bold; font-size: 28px; padding: 15px 10px; line-height: 50px; text-align: center; ">{{title_txt}}</h1>
                <hr class="my-line">
                <h1 style="color: black; font-family: Arial, Verdana, Helvetica, sans-serif; font-size: 20px; padding: 15px 10px;  line-height: 26px;">{{ desc_txt.substring(0,90) }}...</h1>
            </text>
        </div>
         <!--<div class="showmore-container"> 
           <button @click="onShowMore()" v-bind:style="{backgroundImage: 'url(/images/btn_more.png)'}" ></button>
        </div>-->
        <div class="button-showmore">
            <button @click="onShowMore" class="whitebtn"><text style="color: #1B78B5; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:normal; font-size: 28px; ">{{showmore_txt}}</text></button><br>
          </div>
        <div style="position: absolute; top: 105vh; left: 10%; width: 80%; display: flex; justify-content: space-around; padding: 0em 0; align-items: center; text-align: left; align-content: center; border:0px solid #ced4da;">
            <input type="checkbox" v-model="checked" name="checkme" value="yes" @change="onExtraHelp" style=" padding: 0px 0px; top: 100%; width:10%;  align-content: center; align-items: right; border:0px solid #ced4da;">
            <h1 style="color: #000000; font-family: Arial, Verdana, Helvetica, sans-serif;font-weight:normal; font-size: 20px; padding: 0px 0px; line-height: 0px;vertical-align: top; text-align: left;  width:90%; ">{{addmore_txt}}</h1>        
        </div>
            <div style="position: absolute; background-color: #ffffff; height:6vh; top: 110vh; left: 0%; width: 100%; display: flex; justify-content: space-around; padding: 0em 0; align-items: center; text-align: left; align-content: center; border:0px solid #ced4da;">

                <button style="width:100px; height:50px;" @click="onAddExtra(1)" v-bind:disabled="extraHelp.value" :class="{ 'extrabluebtn':  extraAmount ===1, 'extrawhitebtn':  extraAmount !==1 }"><text :class="{ 'whitetext':  extraAmount ===1, 'bluetext':  extraAmount !==1 }">{{currency_txt}} 1 </text></button>
                <button style="width:100px; height:50px;" @click="onAddExtra(5)" v-bind:disabled="extraHelp.value" :class="{ 'extrabluebtn':  extraAmount ===5, 'extrawhitebtn':  extraAmount !==5 }"><text  :class="{ 'whitetext':  extraAmount ===5, 'bluetext':  extraAmount !==5 }">{{currency_txt}} 5</text></button>
                <button style="width:100px; height:50px;" @click="onAddExtra(10)" v-bind:disabled="extraHelp.value" :class="{ 'extrabluebtn':  extraAmount ===10, 'extrawhitebtn':  extraAmount !==10 }"><text  :class="{ 'whitetext':  extraAmount ===10, 'bluetext':  extraAmount !==10 }">{{currency_txt}} 10</text></button>
            </div>

            <div style="position: absolute; background-color: #ffffff; top: 120vh; height: 6vh; left: 0%; width: 100%;  padding: 0em 0; align-items: center; text-align: center; align-content: center; border:0px solid #ced4da;">
                <button  @click="onClickSupport()" class="bluebtn"><text style="color: #ffffff; ">{{give_txt}} {{currency_txt}} {{Amount + extraAmount}}</text></button><br>
            </div>

        <div class="paymentfooter-container" id="footer">
          <router-link :to=store.state.homepath class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footerhome_txt}} | </text></router-link>
            <router-link to="/passport" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footerpassport_txt}} | </text></router-link>
            <router-link to="/contactus" class="no-underline"><text style="justify-content:center;font-family: Arial, Verdana, Helvetica, sans-serif;color: #1B78B5;">{{footercontactus_txt}}</text></router-link>
          
  
            <router-view v-slot="{ Component }">
              <transition name="route" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
        </div>

        <div class="showmoredesc-container" v-if="isShowMore" @click.self="closeModal">
            <div class="showmoredesc-content" ref="myDiv" @click.self="closeModal">
                <text @click.self="closeModal" >
                    
                    <h1 style="color: #1B78B5; font-weight:bold; font-size: 18px; padding: 5px 10px; line-height: 20px; text-align: center; " @click.self="closeModal" >{{ showmoretitle_txt }}</h1>
                    <h1 style="color: black;  font-size: 14px; padding: 5px 30px;  line-height: 20px;" @click.self="closeModal" >{{ showmoredesc_txt }}</h1>

                </text>

            </div>
        </div>








    </div>
</template>


<style>


.extrabluebtn{
  background-color: #1B78B5;
  
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: white;
  border: none;
  padding: 15px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
  width: 70%;  
}

.extrawhitebtn{
  background-color: #ffffff;
  font-family: Arial, Verdana, Helvetica, sans-serif;
  color: white;
  border: none;
  padding: 15px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
  border:1px solid #1B78B5;
  width: 70%;

}

.bluetext{
  color: #1B78B5;
  font-family: Arial, Verdana, Helvetica, sans-serif;
  font-weight:normal;
  font-size: 20px;
  padding: 0px 0px;
  line-height: 18px;
  letter-spacing: 0px;
}

.whitetext{
    color: #ffffff;
    font-family: Arial, Verdana, Helvetica, sans-serif;
    font-weight:normal;
    font-size: 20px;
    padding: 0px 0px;
    line-height: 18px;
    letter-spacing: 0px;
    
}
.paymentheader-container {  
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

.about-container {  
  position: absolute;  
  top: 55vh;  
  left: 0%;  
  width: 100%;  
  display: flex;  
  justify-content: space-around;  
  padding: 0em 0;  
  text-align: center;
  border:0px solid black;
}  

.about-container text {  
  position: absolute;  
  color: #1B78B5;
  padding: 5px 5px;  
  width: 100%;  
  font-size: 28px;  
  text-align: center;
  border:0px solid black;
  justify-content: center;  /* align horizontally in the center */  
  align-items: center;      /* align vertically in the center */  
  color: white;         /* change text color as needed */  
  text-align: center;
}  

.my-line {  
  border: none;  
  height: 4px; /* or whatever thickness you want */ 
  background-color: #70afda; /* or whatever color you want */  
  margin: auto;
}  

.paymentheader-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 5px;  
  font-size: 1em;  
}  

.paymentheader-container button {  
  position: absolute;  
  top: 40px;  
  left: -70px;  
  width: 55px;  
  height: 42px;
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  margin-top: -5px;  
  margin-right: 0px;  
  margin-bottom: 10px;  
  margin-left:10%; 
  text-align: center;
  cursor: pointer;  
    background: rgba(255, 255, 255, 0.5);
    border: 0px solid #ced4da;
  scale: 0.65;
}
  
.image-container {  
  position: absolute;  
  width: 100vw;  
  margin: auto;  
  
}  

.paymentbackground-image {  
  position: relative;  
    width: 100%;  
    top: 14vh;
}  

.paymentcircleoverlay-container{
  position: absolute;  
  background: rgba(255, 255, 255, 0);
  top: 27vh;  
  left: 0%;  
  width: 100%;  
  scale: 0.5;
    display: flex;
    justify-content: center;
  align-items: center;
  border:0px solid #000000;
}
/*
.paymentcircletext {  
  position: absolute;  
  color: white;
  top: 25vh;  
  left: 0%;  
  width: 100%;  
  font-size: 1em;
  display: flex;
  justify-content: center;
  border:1px solid #000000;
}*/

.paymentcircleoverlay-container text {  
    font-family: Arial, Verdana, Helvetica, sans-serif;
  position: absolute;  
  font-weight: bold;
  color: #1B78B5;  
  padding: 0px 0px;  
  font-size: 48px;  
  display: flex;
  justify-content: center;
  text-align: center;
  border:0px solid #000000;
}   

.showmore-container{
    position: absolute;  
    top: 75vh;  
    left: 0%;  
    width: 100%;  
    display: flex;  
    justify-content: space-around;  
    padding: 1em 0;  
    text-align: center;
    border:0px solid #ced4da;
}

.showmore-container text {  
  color: white;
  border: 0px solid #ced4da;  
  padding: 5px 5px;  
}

.showmore-container button {  
  top: 0px;  
  left: 0px;  
  width: 242px;  
  height: 64px;
  display: flex;  
  justify-content: space-around;  
  padding: 1em 0;  
  text-align: center;
  cursor: pointer;  
    background: rgba(255, 255, 255, 0.0);
    border: 0px solid #ced4da;
}

.showmoredesc-container{
    position: absolute;  
  background: rgb(102, 102, 102, 0.5);
  top: 0vh;  
  width: 100%;  
  height: 140vh;
  left:0%;
  padding: 1em 0;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  border:0px solid #000000;
}

.showmoredesc-content{
    position: relative;  
  background: white;
  top: 5vh;  
  width: 90%;  
  height: 80vh;
  left:5%;
  padding: 1em 0;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  text-align: center;
  border:0px solid #000000;
}

.paymentfooter-container {  
  position: absolute;  
  height: 15vh;
  top: 135vh;
  width: 100%;  
  max-width:755px;  
  align-content: center;
  align-items: center;
  text-align: center;
  vertical-align: bottom;
  margin: auto;  
  
}  

.button-showmore {  
  position: absolute;  
  background: white;
  top: 90vh;  
  width: 100%;  
  height: 7vh;
  display: flex;  
  justify-content: center;  
  border:0px solid #ced4da;
  padding:0px 0px;  
  margin-top: 5px;  
  margin-right: 0px;  
  margin-bottom: 0px;  
  align-content: center;
  align-items: center;
  scale: 0.8;
}  
</style>