import {Options, Vue} from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import {SuiItemContent,SuiItemGroup, SuiItemImage,SuiItem,SuiItemHeader,SuiItemMeta,SuiItemDescription } from 'vue-fomantic-ui';
import {MovieEntity} from "@/entities/MovieEntity";
import { bus } from 'vue3-eventbus'
import { v4 as uuidv4 } from 'uuid';

@Options({
    components: {
        SuiItemGroup, SuiItemImage, SuiItem,SuiItemContent,SuiItemHeader,SuiItemMeta,SuiItemDescription
    },
})
export default class MovieGroupList extends Vue {

    protected movieItems:Array<MovieEntity> = [];
    protected uniqueId = "";

    get items(): Array<MovieEntity> {
        return this.movieItems;
    }

    set items(value: Array<MovieEntity>) {
        console.log(value);
        this.movieItems = value;
    }
    @Prop({ type: String })
    protected resource!: string;

    created(){
        this.uniqueId = uuidv4();
        console.log('Created child: '+this.uniqueId);
        bus.emit('child_created',this.uniqueId);
    }
    beforeMount(){
        this.loadData("");
    }
    protected loadData(url:string){
        if(url != ""){
            bus.emit('child_loading',this.uniqueId);
            fetch(url)
                .then(response=>response.json())
                .then(data => {
                    console.log(data);
                    this.items = data.search;
                    bus.emit('child_loaded',this.uniqueId);
                })
        }else{
            if(this.resource === undefined){
                bus.emit('child_loaded',this.uniqueId);
            }else {fetch(this.resource)
                .then(response => response.json())
                .then(data => {
                    this.items = data.search;
                    bus.emit('child_loaded', this.uniqueId)
                });
            }
        }

    }
    refresh(){
        this.items = [];
        bus.emit('child_loading',this.uniqueId);
        this.loadData("");
    }


}