import './assets/main.css'
import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate";  
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const store = new createStore({  
    // ...  
    plugins: [createPersistedState()],  
    
    state(){
        
        return {
            loginstatus: false,
            countrycodes:[],
            logininfo:[],
            countdown: 0,
            iscountdown: false,
            otpmobile: '',
            otpcountrycode: '',
            otpmethod: '',
            otpemail:'',
            countrycodes: []

        } 
    },
    mutations:{
        setLoginStatus(state, loginstatus){
            state.loginstatus = loginstatus
        },
        setCountryCodes(state, countrycodes) {
          state.countrycodes = countrycodes;
        },
        setIsCountDown(state, iscountdown) {
          state.iscountdown = iscountdown;
        },
        setCountDown(state, countdown) {
          state.countdown = countdown;
        },
        setOTPMobile(state, otpmobile) {
          state.otpmobile = otpmobile;
        },
        setOTPCountryCode(state, countrycode) {
          state.otpcountrycode = countrycode;
        },
        setOTPEmail(state, otpemail) {
          state.otpemail = otpemail;
        },
        setLoginInfo(state, logininfo) {
          state.logininfo = logininfo;
        },
        setOTPMethod(state, otpmethod) {
          state.otpmethod = otpmethod;
        },
        setCountryCodes(state, countrycodes) {
          state.countrycodes = countrycodes;
        },
        setState(state){
            state.loginstatus = false,
            state.countrycodes = [],
            state.logininfo = [],
            state.countdown=0,
            state.iscountdown = false,
            state.otpmobile='',
            state.otpcountrycode='',
            state.otpmethod='',
            state.countrycodes=[],
            state.otpemail=''

        }
    }
  });  


const app = createApp(App)
store.state.usertype = 'agent'
app.use(store)
app.use(router)

app.mount('#app')
