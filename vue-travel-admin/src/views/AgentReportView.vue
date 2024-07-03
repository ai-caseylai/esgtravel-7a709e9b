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
const orderList = ref([]);
const isloading = ref(false);
const recordDate = ref('');
const agent_id = ref('');
const agentinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);

const ordersum =  ref([]);

async function loadDateList(){
    
    isloading.value = true;
    const formData = new FormData();
    formData.append('ActionType', 'GetOrderDateListByAgentID');
    formData.append('agent_id', agent_id.value);
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

async function loadOrderList(page = 0){
    let date = new Date(recordDate.value);  
    //console.log(date.getFullYear());
    //console.log(date.getMonth());
    const formData = new FormData();
    formData.append('ActionType', 'GetOrderListByAgentID');
    formData.append('year', date.getFullYear());
    formData.append('month', date.getMonth()+1);
    formData.append('agent_id', agent_id.value);
    formData.append('from', (page*pagesize.value));
    formData.append('to', pagesize.value);
    formData.append('hashcode', store.state.hashcode);
    currentpage.value = page;
    orderList.value = [];
    //console.log(store.state.logininfo.user_id + ' ' + store.state.hashcode);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api_admin.php", formData);

        if (res.status == 200) {
            const result = res.data;
            if(result.orderlist !=null)
            {
                orderList.value = result.orderlist;
                ordersum.value = result.ordersum;
                recordcount.value = orderList.value.length;
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

async function getAgentInfo()
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

function OnClickLink(badge_id){
    //console.log("badge_id " + badge_id);
    //router.push({ path: '/badgereport', query: { badge_id: badge_id, recorddate: recordDate.value } });
}


onMounted(() => {
    if(dateList.value.length == 0)
    {
        if(store.state.logininfo.usertype == 1)
            agent_id.value = route.query.agent_id;
        else
            agent_id.value = store.state.logininfo.agent_id;

        recordDate.value = route.query.recorddate;
        loadDateList();
        loadOrderList();
        getAgentInfo();
        //console.log("agent id " + agent_id.value);
        //console.log("recordDate " + recordDate.value);
    }
})
</script>

<template>
    <div class="agent" v-if="isloading == false">
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Agent Report : {{ agentinfo.contactname }}</label>
                    </td>
                </tr>
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <select required v-model="recordDate" style="width:100%;  margin-left: 0%; background-color: #ffffff; height: 35px; border-radius: 5px;" @change="loadOrderList(0)">
                            <option v-for="orderdate in dateList" :key="orderdate.orderdate" :value="orderdate.orderdate">{{String(orderdate.orderdate).split('-')[0]+"-"+String(orderdate.orderdate).split('-')[1]}}</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
        <br>
        
        <div v-if="orderList !=''">
            <table>
                <tr>
                    <td  style="text-align: center;border: 0px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderList(currentpage-1)">Pervious</label></td>
                    <td colspan="3" style="text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td  style="text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderList(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:10%;text-align: center; background-color: greenyellow;"><label style="color:#000;">Order ID</label></td>
                    <td style="width:30%;text-align: center; background-color: greenyellow;"><label style="color:#000;">Badge Name</label></td>
                    <td style="width:20%;text-align: center; background-color: greenyellow;"><label style="color:#000;">Price</label></td>
                    <td style="width:20%;text-align: center; background-color: greenyellow;"><label style="color:#000;">Extra</label></td>
                    <td style="width:10%;text-align: center; background-color: greenyellow;"><label style="color:#000;">Payment Status</label></td>
                </tr>
                <tr v-for="order in orderList" :key="order.order_id">
                
                    <td><label style="cursor:pointer;" v-if="orderList !=''" @click="OnClickLink(order.badge_id)">{{order.order_id}}</label></td>
                    <!-- <td v-if="orderList !=''">{{order.badge_id}}</td> -->
                    <td><label style="cursor:pointer;" v-if="orderList !=''" @click="OnClickLink(order.badge_id)">{{order.badge_name}}</label></td>
                    <!-- <td v-if="orderList !=''">{{order.orderdate}}</td> -->
                
                    <td style="text-align: center;"><label style="cursor:pointer;" v-if="orderList !=''" @click="OnClickLink(order.badge_id)">{{order.price}}</label></td>
                    <td style="text-align: center;"><label style="cursor:pointer;" v-if="orderList !=''" @click="OnClickLink(order.badge_id)">{{order.extra_help}}</label></td>
                    
                    <td style="text-align: center;">
                        <label v-if="orderList !=''" @click="OnClickLink(order.badge_id)">  
                            <span v-if="order.payment_status ==1">Paid</span>  
                            <span v-else>Pending</span>  
                        </label> 
                    </td>

                </tr>
                
                <tr>
                    <td colspan="5" style="text-align: center;border: 1px solid #ccc;font-size: 10px;">*<br>*<br>*</td>
                </tr>

                <tr v-if="ordersum != null">
                    <td colspan="2" style="text-align: right;border: 1px solid #ccc;"><label style="font-weight:bold;">Total :</label></td>
                    <td style="text-align: center;border: 1px solid #ccc;"><label style="font-weight:bold;">{{ ordersum.pricesum }}</label></td>
                    <td style="text-align: center;border: 1px solid #ccc;"><label style="font-weight:bold;">{{ ordersum.extra_helpsum }}</label></td>
                    <td style="text-align: center;border: 1px solid #ccc;"></td>
                </tr>
                <tr>
                    <td  style="text-align: center;border: 0px solid #ccc;"><label v-if="currentpage > 0" @click="loadOrderList(currentpage-1)">Pervious</label></td>
                    <td colspan="3" style="text-align: center;border: 0px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td  style="text-align: center;border: 0px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadOrderList(currentpage+1)">Next</label></td>
                </tr>
            </table>
            <br>
        </div>
    </div>

</template>

<style scroped>

    .agent {
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