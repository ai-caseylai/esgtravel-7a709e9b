<template>

    <div class="responsive-table">  
      <table>  
        <tr>  
           <td v-for="rank in store.state.ranking" :key="rank.mark_id">
                <img :src="imageSrc(rank.mark_id)" class="responsive-img" @click="onClickRanking(rank.mark_id)" > <h1 style="color: #222222; font-weight:500; font-size: 36px; padding: 0px 0px;">{{ rank.mark }}</h1>
            </td>  
            
            <!--<td>asdfasdfasdfasdfsadfasdfas dfasdfasdfsadfasdfasdfasdfasdfsadfasdf asdfasdfasdfsadfasdfasdfasdfasdfsadfasdfas dfasdfasdfsadfasdfasdfasdfasdfsadf</td>--> 
        </tr>  
        </table> 
    </div>  
  </template>
  
<script setup>
  
import { ref,  onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
const store = useStore();
const imagex = ref('/images/face_bule0.png');
const imageon = ref([]);
imageon.value[0] = '/images/face_bule0.png';
imageon.value[1] = '/images/face_bule1.png';
imageon.value[2] = '/images/face_bule2.png';
imageon.value[3] = '/images/face_bule3.png';
imageon.value[4] = '/images/face_bule4.png';

const imageoff = ref([]);
imageoff.value[0] = '/images/face_gray01.png';
imageoff.value[1] = '/images/face_gray02.png';
imageoff.value[2] = '/images/face_gray03.png';
imageoff.value[3] = '/images/face_gray04.png';
imageoff.value[4] = '/images/face_gray05.png';

onMounted(() => {
  loadRankInfo();
})

function imageSrc(index){
  //console.log(store.state.mark_id + " " + index);
  if(store.state.mark_id === index){
    return imageon.value[index];
  }else{
    return imageoff.value[index];
  }
}

async function onClickRanking(id){

    //Remark: For temporary use//
    //store.commit('setSaveUserID', 1);

    store.commit('setMarkID', id);
    return;
    console.log(id);
    console.log(store.state.logininfo.user_id);
    console.log(store.state.badge_id);
    const formData = new FormData();
    formData.append('ActionType', 'AddRank');
    formData.append('user_id', store.state.logininfo.user_id);
    formData.append('badge_id', store.state.badge_id);
    formData.append('mark_id', id);
    try {
        const res = await axios.post("https://www.starsdg.com/api/api.php", formData);
        const result = res.data;

        if (res.status == 200) {
            console.log('Rank added successfully');
            loadRankInfo();
        } else {
            const errorType = result.error_type;

            if (!errorType) {
                return;
            }


            console.log('errorType: ' + errorType);
        }
    } catch (err) {
        console.log('There was an error when adding rank:', err);
        isNetworkError.value = true;
        store.state.error = err;
    }
}


async function loadRankInfo(){
  const formData = new FormData();
  formData.append('ActionType', 'GetRank');
  formData.append('badge_id', "1");
  try {
      const res = await axios.post("https://www.starsdg.com/api/api.php", formData);

      if (res.status == 200) {
        const result = res.data;
        

        store.commit('setRanks',  result.ranks);
        
        //ranking.value = result.ranks;
        //console.log('Rank loaded successfully ');
      } else {
          const errorType = result.error_type;

          if (!errorType) {
              return;
          }


          console.log('errorType: ' + errorType);
      }
  } catch (err) {
      console.log('There was an error when loading rank:', err);
      isNetworkError.value = true;
  }
}

  </script>
  
  <style>


  .responsive-img {  
    max-width: 87px;  
    height: 87px;
    background: white;
    background-color: rgb(255, 255, 255);
    border: 0px solid #ced4da;
}  
  .responsive-table {  
    position: absolute;
    top: -2vh;
    height: 10vh;
    width:100vw;
    background: white;
    border: 0px solid #ced4da;  
    margin: 0px auto;
    scale:0.65;
    padding: 0; 
    padding: 0em 0;  
  }  

  .responsive-table table{
    position: relative;
    padding:0px;
    width:100%;
    text-align: center;
    background: white;
    border: 0px solid #ced4da;
    display: flex;
    justify-content: center;
  }

  .responsive-table td{
    padding: 10px;
    text-align: center;
    background: white;
    border: 0px solid #ced4da;
  }
  </style>