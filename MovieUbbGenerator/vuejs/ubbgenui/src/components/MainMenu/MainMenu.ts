import { Options, Vue } from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {SuiMenuItem, SuiMenu, SuiMenuMenu, SuiInput, SuiIcon} from 'vue-fomantic-ui';
import { bus } from 'vue3-eventbus'

@Options({
    components:{
        SuiMenu,SuiMenuItem, SuiMenuMenu,SuiInput,SuiIcon
    }
})
export default class MainMenu extends Vue {

    public searchTerm = "";
    @Prop({ loading: Boolean })
    protected loading!: boolean;

    private timer :any = null;

    go(event:string){
        this.$router.push({ name: event});
    }

    onTime():void{
        if(this.searchTerm!==null && this.searchTerm != "") {
            console.log('yay!');
            bus.emit('searchterm_entered', this.searchTerm);
        }else{
            bus.emit('searchterm_cleared');
        }
    }

    @Watch('searchTerm')
    handleChange(event:any):void {

        if(this.timer!==null){
            console.log('clear the timer! ')
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(()=>{this.onTime()},500);
    }
}