import {Options, Vue} from 'vue-class-component';
import { Prop ,Data} from "vue-property-decorator";
import {SuiItemContent,SuiItemGroup, SuiItemImage,SuiItem,SuiItemHeader,SuiItemMeta,SuiItemDescription } from 'vue-fomantic-ui';
@Options({
    components: {
        SuiItemGroup, SuiItemImage, SuiItem,SuiItemContent,SuiItemHeader,SuiItemMeta,SuiItemDescription
    },
})
export default class MovieGroupList extends Vue {
    @Prop({ type: String })
    private resource!: string;

    public items: Array<any>

    data() {
        return {
            "items": this.items
        }
    }
    get movieItems(){
        return this.items;
    }

    beforeMount(){
        fetch(this.resource)
            .then(response => response.json())
            .then(data => {
                this.items = data
                console.log(this.items)
            });

    }
}