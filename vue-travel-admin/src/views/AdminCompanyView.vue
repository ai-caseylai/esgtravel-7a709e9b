<script setup>
import {ref,watchEffect, onMounted } from 'vue';

import { computed } from 'vue';  
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const companyname = ref('');
const companyemail = ref('');
const contactname = ref('');
const agentlist = ref([]);
const companylist = ref([]);
const isloading = ref(false);
const companyinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);

async function getCompanyList(page = 0)
{
    const formData = new FormData();
    formData.append('ActionType', 'GetCompanyList');
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    currentpage.value = page;
    companylist.value = [];
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.companylist !=null)
            {
                companylist.value = result.companylist;
                recordcount.value = companylist.value.length;
            }
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

async function CompanySearchByName(page = 0)
{
    const formData = new FormData();
    formData.append('ActionType', 'CompanySearchByName');
    formData.append('companyname', companyname.value);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    currentpage.value = page;
    companylist.value = [];
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.companylist !=null)
            {
                companylist.value = result.companylist;
                recordcount.value = companylist.value.length;
            }
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

async function CompanySearchByEmail(page = 0)
{
    const formData = new FormData();
    formData.append('ActionType', 'CompanySearchByEmail');
    formData.append('email', companyemail.value);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    currentpage.value = page;
    companylist.value = [];
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.companylist !=null)
            {
                companylist.value = result.companylist;
                recordcount.value = companylist.value.length;
            }
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

async function CompanySearchByContact(page = 0)
{
    console.log(contactname.value);
    const formData = new FormData();
    formData.append('ActionType', 'CompanySearchByContact');
    formData.append('contactname', contactname.value);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    currentpage.value = page;
    companylist.value = [];
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.companylist !=null)
            {
                companylist.value = result.companylist;
                recordcount.value = companylist.value.length;
            }
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


async function getCompanyInfo(company_id)
{
    const formData = new FormData();
    formData.append('ActionType', 'GetCompanyInfoByCompanyID');
    formData.append('company_id', company_id);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
           // console.log(result);
            companyinfo.value = result.companyinfo;
            //console.log(companyinfo.value);
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


async function loadAgentList(page = 0, company_id){
    //console.log(recordDate.value);
    //console.log(date.getFullYear());
    //console.log(date.getMonth()+1);
    const formData = new FormData();
    formData.append('ActionType', 'GetAgentList');
    formData.append('company_id', company_id);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    currentpage.value = page;
    agentlist.value = [];
    //console.log(store.state.logininfo.company_id + ' ' + date.getFullYear() + ' ' + date.getMonth()+1);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.agentlist !=null)
            {
                agentlist.value = result.agentlist;
                recordcount.value = agentlist.value.length;
            }
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

async function getAgentInfo(agent_id)
{
    const formData = new FormData();
    formData.append('ActionType', 'GetAgentInfoByAgentID');
    formData.append('agent_id', agent_id.value);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
            //console.log(result);
            agentinfo.value = result.agentinfo;
            //console.log(agentinfo.value);
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

onMounted(() => {
    getCompanyList();

        
})

function OnClickLink(company_id){
    console.log(company_id);
    router.push({ path: '/admincompanymodify', query: { company_id: company_id} });
}
</script>

<template>
    <div class="company" v-if="isloading == false">
            <br>
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;width:20%;text-align: right;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Name:</label>
                    </td>
                    <td style="border: 0px solid #ccc;width: 80%;">
                        <input style="width: 80%;" required  v-model="companyname" type="email" id="inputa" v-on:keyup="CompanySearchByName()" ><br>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;width:20%;">
                    <td style="border: 0px solid #ccc;text-align: right;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Email:</label>
                    </td>
                    <td style="border: 0px solid #ccc;width: 80%;">
                        <input style="width: 80%;" required  v-model="companyemail" type="email" id="inputa" v-on:keyup="CompanySearchByEmail()" ><br>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;width:20%;">
                    <td style="border: 0px solid #ccc;text-align: right;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Contact:</label>
                    </td>
                    <td style="border: 0px solid #ccc;width: 80%;">
                        <input style="width: 80%;" required  v-model="contactname" type="email" id="inputa" v-on:keyup="CompanySearchByContact()" ><br>
                    </td>
                </tr>
                
            </table>
        </form>
        <br>
        <div v-if="companylist !=null">
            <table>
                <tr>
                    <td colspan="2" style="text-align: center;border:0px solid #ccc;"><label v-if="currentpage > 0" @click="getCompanyList(currentpage-1)">Pervious</label></td>
                    <td style="text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td colspan="3" style="text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="getCompanyList(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Company</label></td>
                    <td style="width:10%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Contact</label></td>
                    <td style="width:30%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Email</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Mobile</label></td>
                    <td style="width:10%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Country</label></td>
                    <td style="width:5%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Status</label></td>
                    <!-- <td style="width:10%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;"></label></td> -->
                </tr>
                <tr v-for="company in companylist" :key="company.company_id">
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>{{ company.companyname }}</label></td>
                    <td style="width:15%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>{{ company.contactname }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>{{ company.email }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>{{ company.countrycode }}-{{ company.mobile }}</label></td>
                    
                    <td style="width:10%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>{{ company.country }}</label></td>
                    
                    <td style="width:10%;text-align: center;border: 1px solid #ccc;">
                        <label v-if="company !=''" style="cursor:pointer;" @click=OnClickLink(company.company_id)>
                            <span v-if="company.status ==1">Active</span>  
                            <span v-else>In-active</span>  
                        </label>
                    </td>
                    <!-- <td style="width:10%;text-align: center;border: 1px solid #ccc;"><label v-if="companylist !=''" style="cursor:pointer;color: red;" @click=OnClickLink(company.company_id)>MODIFY</label></td> -->
                </tr>
                <tr>
                    <td colspan="2" style="width:40%;text-align: center;border:0px solid #ccc;"><label v-if="currentpage > 0" @click="getCompanyList(currentpage-1)">Pervious</label></td>
                    <td style="width:20%;text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td colspan="3" style="width:40%;text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="getCompanyList(currentpage+1)">Next</label></td>
                </tr>
            </table>
        </div>
    </div>

</template>

<style scroped>

    .company {
        min-height: 100vh;
        flex-direction: column;
        display: flex;
        justify-content: top;
        align-content: center;
        border: 1px solid #ccc;
        align-items: center;
    background: #ffffff;
    background-color: #ffffff;
        }
    table {
        width: 90vw;
        border-collapse: collapse;
        border: 1px solid #ccc;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: top;
        align-content: top;
        border: 0px solid #ccc;

    }
    tr{
        border: 1px solid #ccc;
    }
    td{
        border: 1px solid #ccc;
    }

    label {
        font-family:Arial, Helvetica, sans-serif;
        color: #1B78B5;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: #333;
        color: #fff;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
    
     h1, h3 {
        text-align: center;
    }
</style>