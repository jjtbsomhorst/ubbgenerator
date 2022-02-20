import {Options, Vue} from 'vue-class-component';
import {Prop,Watch} from "vue-property-decorator";
import {SuiDropdown,SuiDropdownMenu, SuiDropdownItem} from 'vue-fomantic-ui';
@Options({
    components: {
        SuiDropdown,SuiDropdownItem,SuiDropdownMenu
    },
})
export default class ReviewEditor extends Vue{

    public selectedPlatform = "";
    private platformlist = [];

    @Prop()
    public platforms = [];


    @Watch('platforms')
    dostuff():void{
        console.log('suff')
            this.platforms.forEach((e)=>{
                this.platformlist.push({
                    "text": e.name,
                    "value":e.id
                })
            })

        this.platformlist.push({
            "text":'Other',
            "value": 9999999999
        })

    }

    copyToClipBoard():void{
        console.log('copy!');
        console.log(this.$refs);
    }
    generateReview():void{
        console.log('generator called')
    }
    onDecorateEvent(decoration:string):void{
        console.log(decoration);
    }
}