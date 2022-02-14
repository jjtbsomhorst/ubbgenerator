import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic.min.css'
import eventBus from 'vue3-eventbus';

const pp = createApp(App);
pp.use(FomanticUI)
    .use(router)
    .use(eventBus)
pp.mount('#app');