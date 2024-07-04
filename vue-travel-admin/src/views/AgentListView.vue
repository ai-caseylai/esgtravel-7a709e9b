<script setup>
import {ref,watchEffect, onMounted } from 'vue';

import { computed } from 'vue';  
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const router = useRouter();

const agentlist = ref([]);
const isloading = ref(false);
const companyinfo = ref([]);
const pagesize = ref(10);
const currentpage = ref(0);
const recordcount = ref(0);

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


async function loadAgentList(page = 0){
    //console.log(recordDate.value);
    //console.log(date.getFullYear());
    //console.log(date.getMonth()+1);
    const formData = new FormData();
    formData.append('ActionType', 'GetAgentList');
    formData.append('company_id', store.state.logininfo.company_id);
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

onMounted(() => {
    loadAgentList();
    getCompanyInfo();   
        
})

function OnClickLink(agent_id){
    console.log(agent_id);
    router.push({ path: '/editagent', query: { agent_id: agent_id} });
}
</script>

<template>
    <div class="company" v-if="isloading == false">
            <br>
        <form >
            <table style="border: 0px solid #ccc;">
                <tr style="border: 0px solid #ccc;">
                    <td style="border: 0px solid #ccc;">
                        <label style="font-family: Arial, Helvetica, sans-serif; font-size: 28; text-align: center;justify-content: center; align-items: center;align-content: center;">Company Report: {{ companyinfo.companyname }}</label>
                    </td>
                </tr>
                
            </table>
        </form>
        <br>
        <div v-if="agentlist !=null">
            <table>
                <tr>
                    <td style="width:20%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadAgentList(currentpage-1)">Pervious</label></td>
                    <td colspan="3" style="width:50%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadAgentList(currentpage+1)">Next</label></td>
                </tr>
                <tr>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Name</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Email</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Mobile</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"><label style="color:#000;">Status</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc; background-color: greenyellow;"></td>
                </tr>
                <tr v-for="agent in agentlist" :key="agent.agent_id">
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="agentlist !=''" style="cursor:pointer;" @click=OnClickLink(agent.agent_id)>{{ agent.contactname }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="agentlist !=''" style="cursor:pointer;" @click=OnClickLink(agent.agent_id)>{{ agent.email }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="agentlist !=''" style="cursor:pointer;" @click=OnClickLink(agent.agent_id)>{{ agent.countrycode }}-{{ agent.mobile }}</label></td>
                    
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;">
                        <label v-if="agentlist !=''" style="cursor:pointer;" @click=OnClickLink(agent.agent_id)>
                            <span v-if="agent.status ==1">Active</span>  
                            <span v-else>In-active</span>  
                        </label>
                    </td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="agentlist !=''" style="cursor:pointer;color: red;" @click=OnClickLink(agent.agent_id)>MODIFY</label></td>
                </tr>
                <tr>
                    <td style="width:20%;text-align: center;border:1px solid #ccc;"><label v-if="currentpage > 0" @click="loadAgentList(currentpage-1)">Pervious</label></td>
                    <td colspan="3" style="width:50%;text-align: center;border: 1px solid #ccc;"><label>Page {{ currentpage+1 }}</label></td>
                    <td style="width:20%;text-align: center;border: 1px solid #ccc;"><label v-if="recordcount == pagesize" @click="loadAgentList(currentpage+1)">Next</label></td>
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