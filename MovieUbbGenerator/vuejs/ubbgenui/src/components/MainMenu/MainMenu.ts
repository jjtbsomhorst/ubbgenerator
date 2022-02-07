import { Options, Vue } from 'vue-class-component';
import {SuiMenuItem, SuiMenu, SuiMenuMenu, SuiInput, SuiIcon} from 'vue-fomantic-ui';

@Options({
    components:{
        SuiMenu,SuiMenuItem, SuiMenuMenu,SuiInput,SuiIcon
    }
})
export default class MainMenu extends Vue {
    go(event){
        this.$router.push({ name: event});
    }
}