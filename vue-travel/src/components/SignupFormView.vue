<template>
  
  <div class="page">
  <form @submit.prevent="handleSubmit">
    <label for="email">Email</label>
    <input type="email" required v-model="email">
    <label for="password">Password</label>
    <input type="password" required v-model="password" maxlength="20" minlength="=8">
    <div v-if="passwordError">{{ passwordError }}</div>
    <label>Role:</label>
    <select v-model="usertype">
      <option value="admin" selected>Admin</option>
      <option value="user">User</option>
    </select>

    <label>Skills:</label>
    <input type="text" v-model="tempSkill" @keyup="addSkill">
    <div v-for="skill in skills" :key="skill" class="pill">
       <span @click="deleteSkill">{{ skill }}</span>
    </div>

    <div class="submit">
      <button type="submit">Submit</button>
    </div>

  </form>
  <p>Email: {{  email }}</p>
  <p>Password: {{  password }}</p>
  <p>usertype: {{  usertype }}</p>
  </div>  
</template>

<script>
export default {
    data(){
        return{
            email: 'devil',
            password: '',
            usertype: 'user',
            tempSkill: '',
            passwordError: '',
            skills: []
        }
    },
    methods:{
        addSkill(e){
            if(e.key===',' && this.tempSkill){
                if(!this.skills.includes(this.tempSkill.replace(',', ''))){
                    this.skills.push(this.tempSkill.replace(',', ''));
                }
                this.tempSkill = '';
            }
        },
        deleteSkill(e){
            this.skills = this.skills.filter(skill => skill !== e.target.innerText);
        },
        handleSubmit(){
            console.log('submitted');
            this.passwordError = this.password.length < 8 ? 'Password must be at least 8 characters' : '';
            this.passwordError = !this.password.includes("#") && !this.password.includes("@") ? 'xxxxxPassword must be at least 8 characters' : '';
        }
    }
}
</script>

<style>
/*
form{
  width: 400px;
  padding: 50px;
  margin: 30px auto;
  background: red;
  border-radius: 0px;
  text-align: left;
}
label{
    color: #aaa;
  display: inline-block;
  margin-bottom: 10px;
  margin: 25px 0 15px;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
}
input, select{
    color: #555;
  width: 100%;
  padding: 10px;
  margin: 10px 0 20px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
}
.pill{
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    background: #f1f1f1;
    border-radius: 20px;
    color: #333;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
}*/
</style>