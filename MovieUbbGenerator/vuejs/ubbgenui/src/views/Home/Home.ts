import {Options, Vue} from 'vue-class-component';
import {SuiContainer,SuiGrid,SuiGridColumn,SuiCard,SuiButton,SuiIcon } from 'vue-fomantic-ui';
import MovieGroupList from "@/components/MovieGroupList/MovieGroupList.vue";
import { bus } from 'vue3-eventbus'
import MainMenu from '@/components/MainMenu/MainMenu.vue';


@Options({
    components: {
        SuiContainer,SuiGrid,SuiGridColumn,SuiCard,MovieGroupList,MainMenu,SuiButton,SuiIcon
    },
})

export default class Home extends Vue {

    public loading = true;
    public search = false;
    public searchResource = "";

    private children:Map<string,boolean> = new Map();

    beforeCreate() :void{
        bus.on('child_created',(data:any)=>{
            this.children.set(data,false);
            this.loading=true;
        })
        bus.on('child_loading',(data:any)=>{
          this.children.set(data,false);
          this.children.forEach((v,k)=>{
              if(!v){
                  this.loading=true;
              }
          })
        })
        bus.on('child_loaded',(data:any)=>{
            this.loading = false;
            this.children.set(data,true);
            this.children.forEach((v,k)=>{
                if(!v){
                    this.loading = true;
                }
            })
        });

        bus.on('searchterm_entered',(data:string)=>{
            if(data.length == 0){
                this.search =false;
            }else if(data.length > 3){
                this.search = true;
                console.log('we hebben data.. searchresource zetton')
                this.searchResource = "api/movies/search?name="+data;
            }
        });

        bus.on('searchterm_cleared',()=>{
            this.search = false;
        })

    }
}