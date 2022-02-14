import {Options, Vue} from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import {SuiItemContent,SuiItemGroup, SuiItemImage,SuiItem,SuiItemHeader,SuiItemMeta,SuiItemDescription } from 'vue-fomantic-ui';
@Options({
    components: {
        SuiItemImage, SuiItem,SuiItemContent,SuiItemHeader,SuiItemMeta,SuiItemDescription
    },
})
export default class Movie extends Vue {

    @Prop({ type: Object })
    set item(i){
        this.item = i;
    }
    get item(){
        return this.item;
    }

    beforeMount(){
        console.log('before mojnt!!');
    }
}