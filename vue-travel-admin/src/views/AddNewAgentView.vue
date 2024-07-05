<script setup>
import {ref,watchEffect, onMounted, vModelCheckbox } from 'vue';

import { computed } from 'vue';  
import {useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
const contactname = ref('');
const email = ref('');

const ccode = ref('');
const mobile = ref('');
const status = ref(false);
const emailstatus = ref(true);
const mobilestatus = ref(true);
const isEditMode = ref(true);

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

async function handleSubmit() {
    // console.log('submit');
     console.log(contactname.value);
    // console.log(ccode.value);
    // console.log(mobile.value);
    // console.log(email.value);
    // console.log(status.value);
    
    const formData = new FormData();
    formData.append('ActionType', 'AddNewAgent');
    formData.append('contactname', contactname.value);
    formData.append('ccode', ccode.value);
    formData.append('mobile', mobile.value);
    formData.append('email', email.value);
    formData.append('status', status.value);
    formData.append('company_id', store.state.logininfo.company_id);
    
  try {
      const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        console.log(result.emailstatus);
        console.log(result.mobilestatus);
        if(result.addstatus == true){
            //router.push('/agentlistreport');
            isEditMode.value = false;
        }else{
            if(result.emailstatus == false){
                emailstatus.value = false;
                console.log('emailstatus: ' + emailstatus.value);
            }
            if(result.mobilestatus == false){
                mobilestatus.value = false;
                console.log('mobilestatus: ' + mobilestatus.value);
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
      console.log('There was an error when loading country code list:', err);
      isNetworkError.value = true;
  }
}

function onClickBack() {
    router.push('/agentlist');
}

function onClickAddNew() {
    ClearData();
    isEditMode.value =true;
}

function ClearData() {
    contactname.value ='';
    email.value ='';
    ccode.value ='';
    mobile.value ='';
    status.value ='';
    emailstatus.value =true;
    mobilestatus.value =true;
}

onMounted(() => {
    if(store.state.countrycodes==null)
        loadCountryCodeList();
})


</script>

<template>
    <div class="addnewagent" v-if="isEditMode == true">
        <form class="newform">
            <table>
            <tr>
                <td colspan="2" style="text-align: center; justify-content: center;"><label style="color:#1B78B5;">Add New Agent</label></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Agent Name :</label></td>
                <td style="width:60%;"><input required v-model="contactname" maxlength="50" style="width: 80%;"></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Country Code :</label></td>
                <td style="width:60%;"><select required v-model="ccode" style="width:30%; background-color: #ffffff; height: 35px;" >
                  
                  <option v-for="countrycode in store.state.countrycodes" :key="countrycode.id" :value="countrycode.country_code">{{countrycode.country_code}}</option>
                  
                  </select></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Mobile :</label></td>
                <td style="width:60%;"><input required v-model="mobile" maxlength="10" style="width: 80%;" type="number"></td>
            </tr>
            <tr v-if="mobilestatus == false">
                <td style="width:40%; text-align:right; "></td>
                <td style="width:60%;"><label style="color: red;">Mobile already exist.</label></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Email :</label></td>
                <td style="width:60%;"><input required v-model="email" maxlength="30" style="width: 80%;" type="email"></td>
            </tr>
            <tr v-if="mobilestatus == false">
                <td style="width:40%; text-align:right; "></td>
                <td style="width:60%;"><label style="color: red;">Email already exist.</label></td>
            </tr>
            <!-- <tr>
                <td style="width:40%; text-align:right; ">Status :</td>
                <td style="width:10%;display: flex; align-items: center;"><input style="height: 2vh;" type="checkbox" v-model="status" > </td>
            </tr> -->
        </table>
        <table style="border: 0px solid #ccc;">
            <tr style="border: 0px solid #ccc;">
                <td style="width:50%; text-align:right; vertical-align:middle;border: 0px solid #ccc;"><button name="Clear" @click="onClickBack" style="color: #ffffff;background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;">Back</button></td>
                <td style="width:50%; text-align:left; vertical-align:middle;border: 0px solid #ccc;"><button name="Submit" @click="handleSubmit" style="color: #ffffff;background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;">Submit</button></td>
            </tr>
        </table>
        </form>
    </div>
    
    <div class="modifyagent" v-if="isEditMode == false">
        <table style="height: 100%;border: 0px solid #ccc;width: 100%;">
            <tr style="border: 0px solid #ccc;">
                <td style="text-align: center; justify-content: center;height: 50%;border: 0px solid #ccc;"><label style="width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #000;">Record has been added.</label><br><br></td>
            </tr>
            <tr style="border: 0px solid #ccc;">
                <td style="text-align: center; justify-content: center;height: 50%;border: 0px solid #ccc;"><button style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;" name="Submit"  @click="onClickBack">Back To Agent List</button></td>
            </tr>
            <tr style="border: 0px solid #ccc;">
                <td style="text-align: center; justify-content: center;height: 50%;border: 0px solid #ccc;"><button style="background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;" name="Submit"  @click="onClickAddNew">Add New Agent</button></td>
            </tr>
        </table>
    </div>
</template>


<style scroped>

    .addnewagent {
        min-height: 100vh;
        flex-direction: column;
        display: flex;
        justify-content: top;
        align-content: center;
        border: 0px solid #ccc;
        align-items: center;
        background: #ffffff;
        background-color: #ffffff;
        }
    
    .newform label {
        font-family:Arial, Helvetica, sans-serif;
        color: #1B78B5;
    }
    .newform table {
        width: 90vw;
        border-collapse: collapse;
        border: 0px solid #ccc;
        
    }
    .newform tr{
        border: 0px solid #ccc;
    }
    .newform td{
        border: 0px solid #ccc;
        height: 6vh;
        padding: 1%;
    }
    
    .newform input, select{
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
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: top;
        align-content: top;
        border: 0px solid #ccc;

    }
</style>