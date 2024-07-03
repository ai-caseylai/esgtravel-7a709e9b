
import { createRouter, createWebHistory } from 'vue-router'
import SignupFormView from '@/components/SignupFormView.vue'
import HomeView from '@/components/HomeView.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import PassportView from '@/components/PassportView.vue'
import BadgeDetailView from '@/components/BadgeDetailView.vue'
import ThankYouView from '@/components/ThankYouView.vue'
import PaymentView from '@/components/PaymentView.vue'
import PaymentFormView from '@/components/PaymentFormView.vue'
import PaymentCompleteView from '@/components/PaymentCompleteView.vue'
import PaymentFailView from '@/components/PaymentFailView.vue'
import PaymentSucessView from '@/components/PaymentSucessView.vue'
import PaymentInfoView from '@/components/PaymentInfoView.vue'
import InputEmailView from '@/components/InputEmailView.vue'
import InputSMSView from '@/components/InputSMSView.vue'
import OTPForm from '@/components/OTPForm.vue'
import NotFoundView from '@/components/NotFoundView.vue'
import RankingView from '@/components/RankingView.vue'
import LoginFailedView from '@/components/LoginFailedView.vue'
import ContactUsView from '@/components/ContactUsView.vue'
import OrderFailedView from '@/components/OrderFailedView.vue'
//import Modalcontent from '@/components/ModalContent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: HomeView,
        },{
            path: '/signup',
            name: 'SignupFormView',
            component: SignupFormView,
        },{
            path: '/orderfailed',
            name: 'OrderFailedView',
            component: OrderFailedView,
            //props: true
        },{
            //path: '/payment/:id',
            path: '/payment',
            name: 'PaymentView',
            component: PaymentView,
            //props: true,
        },{
            path: '/paymentform',
            name: 'PaymentFormView',
            component: PaymentFormView,
        },{
            path: '/paymentinfo',
            name: 'PaymentInfoView',
            component: PaymentInfoView,
        },{
            path: '/paymentcomplete',
            name: 'PaymentCompleteView',
            component: PaymentCompleteView,
        },{
            path: '/paymentsucess',
            name: 'PaymentSucessView',
            component: PaymentSucessView,
        },{
            path: '/paymentfail',
            name: 'PaymentFailView',
            component: PaymentFailView,
        },{
            path: '/inputemail',
            name: 'InputEmailView',
            component: InputEmailView,
        },{
            path: '/passport',
            name: 'PassportView',
            component: PassportView,
        },{
            path: '/badgedetail',
            name: 'BadgeDetailView',
            component: BadgeDetailView,
            //props: true,
        },{
            path: '/otpform/:failed',
            name: 'OTPForm',
            component: OTPForm,
            props:{ sysmsg: 'login failed', loginstatus: false}
        },{
            path: '/otpform',
            name: 'OTPForm',
            component: OTPForm
        },{
            path: '/inputemail',
            name: 'InputEmailView',
            component: InputEmailView,
            props: true,
        },{
            path: '/loginfailed',
            name: 'LoginFailedView',
            component: LoginFailedView,
            props: true,
        },{
            path: '/thankyou',
            name: 'ThankYouView',
            component: ThankYouView,
            //props: true,
        },{
            path: '/helloworld/:id',
            name: 'HelloWorld',
            component: HelloWorld,
            props: true,
        },
        {
            path: '/all-job',
            redirect: '/HelloWorld',
        },
        {
            path: '/ranking',
            name: 'RankingView',
            component: RankingView,
        },
        {
            path: '/inputsms',
            name: 'InputSMSView',
            component: InputSMSView,
        },
        {
            path: '/contactus',
            name: 'ContactUsView',
            component: ContactUsView,
        },
        {
            path: '/notfound',
            name: 'NotFoundView',
            component: NotFoundView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFoundView',
            component: NotFoundView,
        }
        ]
    })


    export default router