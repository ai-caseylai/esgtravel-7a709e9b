<script setup>
import {ref,watchEffect, onMounted } from 'vue';

import { computed } from 'vue';  
import {useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
const dateList = ref([]);
//const orderList = ref([]);
//const badgeList = ref([]);
const isloading = ref(false);
const recordDate = ref('');
const badge_id = ref(-1);
const badgeinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);
const orderlist = ref([]);


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


async function getBadgeInfo()
{
    const formData = new FormData();
    formData.append('ActionType', 'GetBadgeInfo');
    formData.append('badge_id', badge_id.value);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);
        if (res.status == 200) {
            const result = res.data;
           // console.log(result);
           badgeinfo.value = result.badgeinfo;
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


async function loadOrderList(page){
    let date = new Date(recordDate.value);  
    const formData = new FormData();
    formData.append('ActionType', 'GetBadgeOrderListByCompanyID');
    formData.append('year', date.getFullYear());
    formData.append('month', date.getMonth()+1);
    formData.append('company_id', store.state.logininfo.company_id);
    formData.append('badge_id', badge_id.value);
    formData.append('from', page*pagesize.value);
    formData.append('to', pagesize.value);
    formData.append('hashcode', store.state.hashcode);
    //console.log(badge_id.value);
    orderlist.value = [];
    recordcount.value = 0;
    currentpage.value = page;
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

        if (res.status == 200) {
            const result = res.data;
            //console.log(result);
             if(result.orderlist !=null)
            {
                orderlist.value = result.orderlist;
                recordcount.value = orderlist.value.length;
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

function OnClickLink(agent_id){
    
    //router.push({ path: '/redemption', query: { tempid: eggId } });
    //router.push({ path: '/agentbadgereport', query: { agent_id: agent_id, recorddate: recordDate.value } });
}

onMounted(() => {
    currentpage.value = 0;
    badge_id.value = route.query.badge_id;
    recordDate.value = route.query.recorddate;
    if(dateList.value.length == 0)
    {
        loadDateList();
    }
    if(orderlist.value.length == 0)
    {
        loadOrderList(0);
    }
    getBadgeInfo();
})
</script>

<template>
    <div class="company" v-if="isloading == false">
            
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td colspan="2" style="border: 0px solid #ccc;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Badge Report: {{ badgeinfo.badge_name }}</label>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <label>Date: <select required v-model="recordDate" style="width:80%;  margin-left: 0%; background-color: #ffffff; height: 35px; border-radius: 5px;" @change="loadOrderList(0)">
                            <option v-for="orderdate in dateList" :key="orderdate.orderdate" :value="orderdate.orderdate">{{String(orderdate.orderdate).split('-')[0]+"-"+String(orderdate.orderdate).split('-')[1]}}</option>
                        </select>
                    </label>
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
         <div v-if="orderlist !=''">
            <table>
                <tr>
                    <td style="width:35%;text-align: center;border: 0px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderList(currentpage-1)">Pervious</label></td>
                    <td style="width:30%;text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage +1 }}</label></td>
                    <td style="width:35%;text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderList(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Agent</label></td>
                    <td style="width:3%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Price</label></td>
                    <td style="width:35%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Extra</label></td>
                </tr>
                <tr v-for="order in orderlist" :key="order.agent_id">
                    <td><label v-if="orderlist !=''" style="width:35%;cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.contactname }}</label></td>
                    <td style="text-align: center;"><label v-if="orderlist !=''" style="width:30%;cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.price }}</label></td>
                    <td style="text-align: center;"><label v-if="orderlist !=''" style="width:35%;cursor:pointer;" @click=OnClickLink(order.agent_id)>{{ order.extra_help }}</label></td>
                </tr>
                <tr>
                    <td style="text-align: center;border: 0px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderList(currentpage-1)">Pervious</label></td>
                    <td style="text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderList(currentpage+1)">Next</label></td>
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