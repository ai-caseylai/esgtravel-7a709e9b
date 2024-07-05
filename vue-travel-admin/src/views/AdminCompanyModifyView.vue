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

const country = ref('');
const ccode = ref('');
const mobile = ref('');
const tel = ref('');
const company_id = ref('');
const companyname = ref('');
const address1 = ref('');
const address2 = ref('');
const address3 = ref('');
const status = ref(false);
const emailstatus = ref(true);
const mobilestatus = ref(true);
const telstatus = ref(true);
const isEditMode = ref(true);
const companyinfo = ref([]);

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
//console.log(contactname.value);
    const formData = new FormData();
    formData.append('ActionType', 'UpdateCompanyInfo');
    formData.append('companyname', companyname.value);
    formData.append('contactname', contactname.value);
    formData.append('country', country.value);
    formData.append('countrycode', ccode.value);
    formData.append('mobile', mobile.value);
    formData.append('email', email.value);
    formData.append('tel', tel.value);
    formData.append('address_1', address1.value);
    formData.append('address_2', address2.value);
    formData.append('address_3', address3.value);
    formData.append('status', status.value);
    formData.append('company_id', company_id.value);
    console.log(status.value);
  try {
      const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

      if (res.status == 200) {
        const result = res.data;
        console.log(result);
        if(result.updatestatus == true){
            isEditMode.value = false;
        }else{
            if(result.emailstatus == false){
                emailstatus.value = false;
            }
            if(result.mobilestatus == false){
                mobilestatus.value = false;
            }
            if(result.telstatus == false){
                telstatus.value = false;
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

async function getCompanyInfo()
{
    const formData = new FormData();
    formData.append('ActionType', 'GetCompanyInfoByCompanyID');
    formData.append('company_id', company_id.value);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            companyinfo.value = result.companyinfo;
            companyname.value = companyinfo.value.companyname;
            contactname.value = companyinfo.value.contactname;
            country.value = companyinfo.value.country;
            ccode.value = companyinfo.value.countrycode;
            mobile.value = companyinfo.value.mobile;
            tel.value = companyinfo.value.tel;
            email.value = companyinfo.value.email;
            address1.value = companyinfo.value.address_1;
            address2.value = companyinfo.value.address_2;
            address3.value = companyinfo.value.address_3;
            if(companyinfo.value.status == '1')
                status.value = true;
            else
                status.value = false;
        } else {
            const errorType = result.error_type;

            if (!errorType) {
                return;
            }

            console.log('errorType: ' + errorType);
        }
    } catch (err) {
        console.log('There was an error when loading agent info:', err);
        isNetworkError.value = true;
    }

}

function onClickBack() {
    router.push('/admincompany');
}

onMounted(() => {
    isEditMode.value = true;
    company_id.value = route.query.company_id;
    getCompanyInfo();
    if(companyinfo == null)
    {
        router.push('/admincompany');
    }else{
        if(store.state.countrycodes==null)
            loadCountryCodeList();
    }
})


</script>

<template>
    <div class="modifycompany" v-if="isEditMode == true">
       
        <form class="newform">
            <table>
            <tr>
                <td colspan="2" style="text-align: center; justify-content: center;"><label style="color:#000;">Modify Company Information</label></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;"></label>Company Name :</td>
                <td style="width:60%;"><input required v-model="companyname" maxlength="50" style="width: 80%;"></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;"></label>Contact Name :</td>
                <td style="width:60%;"><input required v-model="contactname" maxlength="50" style="width: 80%;"></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;"></label>Country :</td>
                <td style="width:60%;"><input required v-model="country" maxlength="50" style="width: 80%;"></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;"></label>Country Code :</td>
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
                <td style="width:40%; text-align:right; "><label style="color:#000;">Tel :</label></td>
                <td style="width:60%;"><input required v-model="tel" maxlength="10" style="width: 80%;" type="number"></td>
            </tr>
            <tr v-if="telstatus == false">
                <td style="width:40%; text-align:right; "></td>
                <td style="width:60%;"><label style="color: red;">Tel. number already exist.</label></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Email :</label></td>
                <td style="width:60%;"><input required v-model="email" maxlength="30" style="width: 80%;" type="email"></td>
            </tr>
            <tr v-if="emailstatus == false">
                <td style="width:40%; text-align:right; "></td>
                <td style="width:60%;"><label style="color: red;">Email already exist.</label></td>
            </tr>
            <tr>
                <td style="width:40%; text-align:right; "><label style="color:#000;">Status :</label></td>
                <td style="width:10%;display: flex; align-items: center;"><input style="height: 2vh;" type="checkbox" v-model="status" > </td>
            </tr>
        </table>
        <table style="border: 0px solid #ccc;">
            <tr style="border: 0px solid #ccc;">
                <td style="width:50%; text-align:right; vertical-align:middle;border: 0px solid #ccc;"><button name="Clear" @click="onClickBack" style="color: #ffffff;background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;">Back</button></td>
                <td style="width:50%; text-align:left; vertical-align:middle;border: 0px solid #ccc;"><button name="Submit" @click="handleSubmit" style="color: #ffffff;background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;">Submit</button></td>
            </tr>
        </table>
        </form>
    </div><br>
    <div class="modifycompany" v-if="isEditMode == false">
        <table style="height: 100%;border: 0px solid #ccc;">
            <tr style="border: 0px solid #ccc;">
                <td style="text-align: center; justify-content: center;height: 50%;border: 0px solid #ccc;"><label style="color: #1B78B5;background:#ffffff;width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #000;">Record has been updated.</label><br><br></td>
            </tr>
            <tr style="border: 0px solid #ccc;">
                <td style="text-align: center; justify-content: center;height: 50%;border: 0px solid #ccc;"><button style="color: #ffffff;background:#1B78B5; width:180px; height:40px; border-radius: 12px;border: 0px solid #ced4da;color: #fff;" name="Submit"  @click="onClickBack">Back To Company List</button></td>
            </tr>
        </table>
    </div>
</template>


<style scroped>

    .modifycompany {
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