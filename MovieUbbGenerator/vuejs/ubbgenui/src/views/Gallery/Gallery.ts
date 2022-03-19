import MainMenu from '@/components/MainMenu/MainMenu.vue';
import {Options, Vue} from 'vue-class-component';

@Options({
    components: {
        MainMenu
    },
})
export default class Gallery extends Vue {}
