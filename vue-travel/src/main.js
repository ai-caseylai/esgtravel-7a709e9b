import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import createPersistedState from "vuex-persistedstate";  
import footerPage from './components/footer.vue'
import rankingPage from './components/RankingView.vue'
//import VueSession from 'vue-session'  
//import 'bootstrap/dist/css/bootstrap.css'
//import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import { createStore } from 'vuex'

const store = new createStore({  
    // ...  
    plugins: [createPersistedState()],  
    
    state(){
        
        return {
            loadbadge_id: -1,
            badge_id: -1,
            order_id: -1,
            language: '1',
            ranking:[],
            countrycodes:[],
            sitecontent:[],
            extraamount: 0,
            error:'',
            otpemail:'',
            logininfo:[],
            badgeinfo:[],
            countdown: 0,
            iscountdown: false,
            otpmobile: '',
            otpcountrycode: '',
            otpmethod: '',
            hashcode: '',
            orderinfo: [],
            orderstatus: false,
            mark_id: -1,
            agent_id:'0',
            company_id:'0',
            homepath: '/',
        } 
    },
    mutations:{
        setLoadBadgeID(state, loadbadge_id){
            state.loadbadge_id = loadbadge_id
        },
        setSaveBadgeID(state, badge_id){
            state.badge_id = badge_id
        },
        setSaveOrderID(state, order_id){
            state.order_id = order_id
        },
        setSaveLanguage(state, language){
            state.language = language
        },
        setOTPMethod(state, otpmethod){
            state.otpmethod = otpmethod
        },
        setRanks(state, ranks) {
          state.ranking = ranks;
        },
        setCountryCodes(state, countrycodes) {
          state.countrycodes = countrycodes;
        },
        setLoginInfo(state, logininfo) {
          state.logininfo = logininfo;
        },
        setBadgeInfo(state, badgeinfo) {
          state.badgeinfo = badgeinfo;
        },
        setExtraAmount(state, extraamount) {
          state.extraamount = extraamount;
        },
        setOTPEmail(state, otpemail) {
          state.otpemail = otpemail;
        },
        setOTPMethod(state, otpmethod) {
          state.otpmethod = otpmethod;
        },
        setOTPMobile(state, otpmobile) {
          state.otpmobile = otpmobile;
        },
        setHashCode(state, hashcode) {
          state.hashcode = hashcode;
        },
        setOTPCountryCode(state, countrycode) {
          state.otpcountrycode = countrycode;
        },
        setIsCountDown(state, iscountdown) {
          state.iscountdown = iscountdown;
        },
        setCountDown(state, countdown) {
          state.countdown = countdown;
        },
        setOrderInfo(state, orderinfo) {
          state.orderinfo = orderinfo;
        },
        setOrderStaus(state, orderstatus) {
          state.orderstatus = orderstatus;
        },
        setMarkID(state, mark_id) {
          state.mark_id = mark_id;
        },
        setSiteContent(state, sitecontent) {
          state.sitecontent = sitecontent;
        },
        setAgentID(state, agent_id) {
          state.agent_id = agent_id;
        },
        setHomePath(state, homepath) {
          state.homepath = homepath;
        },
        setCompanyID(state, company_id) {
          state.company_id = company_id;
        },
        setState(state){
            state.loadbadge_id= -1
            state.badge_id= -1
            state.order_id= -1
            state.language= '1'
            state.ranking = []
            state.error = ''
            state.extraamount = 0
            state.countrycodes = []
            state.logininfo = []
            state.badgeinfo = []
            state.otpemail=''
            state.countdown = 0
            state.iscountdown = false
            state.otpmobile=''
            state.otpcountrycode=''
            state.otpmethod=''
            state.hashcode=''
            state.orderinfo = []
            state.orderstatus = false
            state.mark_id = -1
            state.sitecontent = []
            state.agent_id = '0'
            state.company_id = '0'
            state.homepath = '/'
        }
    }
  });  

//Vue.use(VueSession)  
//this.$session.start()  
const app = createApp(App)
//app.use(bootstrap)

app.use(router)
app.use(store)
app.component('footer-page', footerPage)
app.component('ranking-page', rankingPage)
.mount('#app')

