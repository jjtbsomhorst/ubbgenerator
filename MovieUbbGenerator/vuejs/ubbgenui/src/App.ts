import { Options, Vue } from 'vue-class-component';
import MainMenu from '@/components/MainMenu/MainMenu.vue';
import PageContainer from '@/components/PageContainer/PageContainer.ts';
import FomanticUI from 'vue-fomantic-ui';
import 'fomantic-ui-css/semantic.min.css'
@Options({
    components: {
        MainMenu,PageContainer
    },
})
export default class App extends Vue {}