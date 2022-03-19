import {Options, Vue} from 'vue-class-component';
import {Prop, Watch} from "vue-property-decorator";
import {SuiItemContent,SuiItemGroup, SuiMenu,SuiMenuItem,SuiMenuMenu,SuiItemImage,SuiItem,SuiItemHeader,SuiItemMeta,SuiItemDescription,SuiIcon,SuiLoader } from 'vue-fomantic-ui';
import {MovieEntity} from "@/entities/MovieEntity";
import { bus } from 'vue3-eventbus'
import { v4 as uuidv4 } from 'uuid';

@Options({
    components: {
        SuiItemGroup, SuiItemImage, SuiItem,SuiItemContent,SuiItemHeader,SuiItemMeta,SuiItemDescription, SuiMenu, SuiMenuMenu,SuiMenuItem,SuiIcon,SuiLoader
    },
})
export default class MovieGroupList extends Vue {

    protected movieItems:Array<MovieEntity> = [];
    protected uniqueId = "";
    public disableForward = false;
    public disableRewind = false;
    private currentPage = 1;
    private pagesize = 10;
    private maxresults = 0;
    private maxPage = 1;
    private loading = false;

    get items(): Array<MovieEntity> {
        return this.movieItems;
    }

    set items(value: Array<MovieEntity>) {
        console.log(value);
        this.movieItems = value;
    }
    @Prop({ type:String })
    protected resource!: string;

    @Prop()
    public paging = false;

    @Prop()
    public title = "";

    @Prop()
    public keyname = "id"

    rewind():void{
        console.log('rewind..');
        if(this.currentPage - 1 > 0){
            let page = this.currentPage -1;
            let newResource = this.resource.replace("&page="+this.currentPage,"");
            newResource+= "&page="+page;
            this.loadData(newResource);
        }
    }
    forward():void{
        console.log('stuff');
       if(this.currentPage +1 <= this.maxPage){

            let page = this.currentPage+1;
            let newResource = this.resource.replace("&page="+this.currentPage,"");
            this.loadData(newResource +"&page="+page);
        }

    }

    created():void{
        this.uniqueId = uuidv4();
        console.log('Created child: '+this.uniqueId);
        bus.emit('child_created',this.uniqueId);
    }
    beforeMount():void{
        this.loadData(this.resource);
    }
    protected loadData(url:string):void{
        this.loading = true;
        if(url == ""){
            url = this.resource;
        }

        if(url === undefined){
            bus.emit('child_loaded',this.uniqueId);
        }else {
            bus.emit('child_loading',this.uniqueId);

            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.items = data.search;
                this.currentPage = data.currentPage;
                this.maxresults = parseInt(data.totalResults);
                bus.emit('child_loaded',this.uniqueId);
                this.loading=false;
                this.updatePagingData();
            });
        }


    }

    @Watch('resource')
    refresh():void{
        console.log('refresh!');
        this.items = [];
        this.currentPage = 1;
        bus.emit('child_loading',this.uniqueId);
        this.loadData("");
    }


    private updatePagingData() {
        console.log('update paging');
        if(this.maxresults > this.pagesize ){
            let lftover = this.maxresults % this.pagesize;
            if(lftover>0){
                this.maxPage = (this.maxresults - lftover) / this.pagesize;
                this.maxPage += 1;
            }
        }

        this.disableRewind = false;
        this.disableForward = false;

        if(this.currentPage == 1){
            this.disableRewind = true;
        }

        if(this.currentPage == this.maxPage){
            this.disableForward = true;
        }

    }
}