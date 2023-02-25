import { createApp } from 'vue'
import "@/assets/css/index.less";
import App from './App.vue'
import router from './router'
import {createStore} from './store'
import SvgIcon from './icons'
import Web3 from 'web3'
import directives from '@/directives'
import eventBus from 'vue3-eventbus'
import { networkConfig } from "@/config";
import Row from 'ant-design-vue/lib/row';
import Col from 'ant-design-vue/lib/col';
import Icon from 'ant-design-vue/lib/icon'
import Dropdown from 'ant-design-vue/lib/dropdown'
import Menu from 'ant-design-vue/lib/menu'
import Modal from 'ant-design-vue/lib/modal'
import Notification from 'ant-design-vue/lib/notification'
import message from 'ant-design-vue/lib/message'

const web3 = new Web3(Web3.givenProvider);
const store = createStore(web3, {networkConfig});

const app = createApp(App);
app.config.globalProperties.web3 = web3
app.config.globalProperties.$networkConfig = networkConfig
app.config.globalProperties.$notification = Notification;
app.config.globalProperties.$message = message;
// console.log('web3:: ', web3);

app
    .use(Row)
    .use(Col)
    .use(Icon)
    .use(Dropdown)
    .use(Menu)
    .use(Modal)
app
    .use(SvgIcon)
    .use(store)
    .use(directives)
    .use(router)
    .use(eventBus)
    .mount('#app')
