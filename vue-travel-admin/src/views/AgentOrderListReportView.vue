<script setup>
import {ref,watchEffect, onMounted } from 'vue';

import { computed } from 'vue';  
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const dateList = ref([]);
const orderSummary = ref([]);
const isloading = ref(false);
const recordDate = ref('');
const companyinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);
const ordersum =  ref([]);


async function loadDateList(){
    
    isloading.value = true;
    const formData = new FormData();
    if(store.state.logininfo.usertype == 0){
        formData.append('ActionType', 'GetOrderDateListByAgentID');
        formData.append('agent_id', store.state.logininfo.user_id);
        formData.append('hashcode', store.state.logininfo.hashcode);
    }else if(store.state.logininfo.usertype == 1){

        formData.append('ActionType', 'GetOrderDateListByCompanyID');
        formData.append('company_id', store.state.logininfo.company_id);
        formData.append('hashcode', store.state.logininfo.hashcode);
    }
    //console.log(store.state.logininfo.company_id + ' ' + store.state.hashcode);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        //console.log("load date list");
        if (res.status == 200) {
            const result = res.data;
            //console.log(result);
            //console.log(result.datelist);
            dateList.value = result.datelist;
            //console.log("length "+dateList.value.length);
            isloading.value = false;
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

async function getCompanyInfo()
{
    const formData = new FormData();
    formData.append('ActionType', 'GetCompanyInfoByCompanyID');
    formData.append('company_id', store.state.logininfo.company_id);
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


async function loadOrderSummary(page = 0){
    //console.log(recordDate.value);
    let date = new Date(recordDate.value);  
    //console.log(date.getFullYear());
    //console.log(date.getMonth()+1);
    const formData = new FormData();
    formData.append('ActionType', 'GetOrderSummaryByCompanyID');
    formData.append('year', date.getFullYear());
    formData.append('month', date.getMonth()+1);
    formData.append('company_id', store.state.logininfo.company_id);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    formData.append('hashcode', store.state.hashcode);
    currentpage.value = page;
    orderSummary.value = [];
    //console.log(store.state.logininfo.company_id + ' ' + date.getFullYear() + ' ' + date.getMonth()+1);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

        if (res.status == 200) {
            const result = res.data;
            console.log(result);
            if(result.summary !=null)
            {
                orderSummary.value = result.summary;
                ordersum.value = result.ordersum;
                recordcount.value = orderSummary.value.length;
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

onMounted(() => {
    if(dateList.value.length == 0)
    {
        loadDateList();
        getCompanyInfo();   
        
    }
})

function OnClickLink(agent_id){
    //console.log(agent_id);
    //router.push({ path: '/redemption', query: { tempid: eggId } });
    router.push({ path: '/agentreport', query: { agent_id: agent_id, recorddate: recordDate.value } });
}
</script>

<template>
    <div class="company" v-if="isloading == false">
            
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Report: {{ companyinfo.companyname }}</label>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <select required v-model="recordDate" style="width:100%;  margin-left: 0%; background-color: #ffffff; height: 35px; border-radius: 5px;" @change="loadOrderSummary(0)">
                            <option v-for="orderdate in dateList" :key="orderdate.orderdate" :value="orderdate.orderdate">{{String(orderdate.orderdate).split('-')[0]+"-"+String(orderdate.orderdate).split('-')[1]}}</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
        <br>
        <div v-if="orderSummary !=''">
            <table>
                <tr>
                    <td style="width:25%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderSummary(currentpage-1)">Pervious</label></td>
                    <td colspan="2" style="width:50%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderSummary(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Contact Name</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Price</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Extra</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Modify</label></td>
                </tr>
                <tr v-for="order in orderSummary" :key="order.email">
                    <td style="width:25%;text-align: left;border: 1px solid #ccc;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.contactname }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.sprice }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.sextra_help }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="orderSummary !=''" style="cursor:pointer;color: red;" @click=O>MODIFY</label></td>
                </tr>
                <tr>
                    <td colspan="5" style="text-align: center;border: 1px solid #ccc;font-size: 10px;">*<br>*<br>*</td>
                </tr>
                <tr v-if="ordersum != null">
                    <td style="width:25%;text-align: right;border: 1px solid #ccc;"><label style="font-weight:bold;">Total :</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label style="font-weight:bold;">{{ ordersum.pricesum }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label style="font-weight:bold;">{{ ordersum.extra_helpsum }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"></td>
                </tr>
                <tr>
                    <td style="width:25%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderSummary(currentpage-1)">Pervious</label></td>
                    <td colspan="2" style="width:50%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:25%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderSummary(currentpage+1)">Next</label></td>
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