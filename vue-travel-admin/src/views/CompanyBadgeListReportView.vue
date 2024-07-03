<script setup>
import {ref,watchEffect, onMounted } from 'vue';

import { computed } from 'vue';  
import {useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();
const dateList = ref([]);
//const orderList = ref([]);
//const badgeList = ref([]);
const isloading = ref(false);
const recordDate = ref('');
const badge_id = ref(-1);
const company_id = ref('');
const companyinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);
const orderSummary = ref([]);


// async function loadBadgeList(){
    
//     isloading.value = true;
//     const formData = new FormData();
//     formData.append('ActionType', 'GetBadgeList');
  
//     //console.log(store.state.logininfo.company_id + ' ' + store.state.hashcode);
//     try {
//         const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
//         //console.log("load date list");
//         if (res.status == 200) {
//             const result = res.data;
//             badgeList.value = result.badgelist;
//             //console.log(result);
//             isloading.value = false;
//         } else {
//             const errorType = result.error_type;

//             if (!errorType) {
//                 return;
//             }

//             console.log('errorType: ' + errorType);
//         }
//     } catch (err) {
//         console.log('There was an error when loading order date list:', err);
//         isNetworkError.value = true;
//     }
// }

async function loadDateList(){
    
    isloading.value = true;
    const formData = new FormData();
    formData.append('ActionType', 'GetOrderDateListByCompanyID');
    formData.append('company_id', store.state.logininfo.company_id);
    formData.append('hashcode', store.state.logininfo.hashcode);
  
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
    let date = new Date(recordDate.value);  
    const formData = new FormData();
    formData.append('ActionType', 'GetOrderListByCompanyIDGroupByBadge');
    formData.append('year', date.getFullYear());
    formData.append('month', date.getMonth()+1);
    formData.append('company_id', store.state.logininfo.company_id);
    formData.append('badge_id', badge_id.value);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    formData.append('hashcode', store.state.hashcode);
    currentpage.value = page;
    orderSummary.value = [];
    //console.log(badge_id.value);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

        if (res.status == 200) {
            const result = res.data;
           // console.log(result);
            if(result.orderlist !=null)
            {
                orderSummary.value = result.orderlist;
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

function OnClickLink(badge_id){
    //console.log(badge_id);
    //router.push({ path: '/redemption', query: { tempid: eggId } });
    router.push({ path: '/badgereport', query: { badge_id: badge_id, recorddate: recordDate.value } });
}

onMounted(() => {
    if(dateList.value.length == 0)
    {
        loadDateList();
    }
    // if(badgeList.value.length == 0)
    // {
    //     loadBadgeList();
    // }
    getCompanyInfo();
})
</script>

<template>
    <div class="company" v-if="isloading == false">
            
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td colspan="2" style="border: 0px solid #ccc;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Report: {{ companyinfo.companyname }}</label>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <label>Date: </label><select required v-model="recordDate" style="width:80%;  margin-left: 0%; background-color: #ffffff; height: 35px; border-radius: 5px;" @change="loadOrderSummary(0)">
                            <option v-for="orderdate in dateList" :key="orderdate.orderdate" :value="orderdate.orderdate">{{String(orderdate.orderdate).split('-')[0]+"-"+String(orderdate.orderdate).split('-')[1]}}</option>
                        </select>
                    </td>
                    <td style="border: 0px solid #ccc;">
                        <!-- Badge Name: <select required v-model="badge_id" style="width:80%;  margin-left: 0%; background-color: #ffffff; height: 35px; border-radius: 5px;" @change="loadOrderSummary">
                            <option v-for="badge in badgeList" :key="badge.badge_id" :value="badge.badge_id">{{ badge.badge_name}}</option>
                        </select> -->
                    </td>
                </tr>
            </table>
        </form>
        <br>
         <div v-if="orderSummary !=''">
            <table>
                <tr>
                    <td style="width:35%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderSummary(currentpage-1)">Pervious</label></td>
                    <td style="width:30%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderSummary(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Name</label></td>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Price</label></td>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Extra</label></td>
                </tr>
                <tr v-for="order in orderSummary" :key="order.badge_id">
                    <td style="text-align: left;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.badge_id)>{{ order.badge_name }}</label></td>
                    <td style="text-align: center;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.badge_id)>{{ order.sprice }}</label></td>
                    <td style="text-align: center;"><label v-if="orderSummary !=''" style="cursor:pointer;" @click=OnClickLink(order.badge_id)>{{ order.sextra_help }}</label></td>
                </tr>
                <tr>
                    <td style="width:35%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderSummary(currentpage-1)">Pervious</label></td>
                    <td style="width:30%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderSummary(currentpage+1)">Next</label></td>
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