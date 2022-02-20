import {Options, Vue} from 'vue-class-component';
import {Prop,Watch} from "vue-property-decorator";
import MainMenu from '@/components/MainMenu/MainMenu.vue';
import {SuiContainer,SuiCard,SuiGrid,SuiGridRow,SuiGridColumn,SuiFormTextarea,SuiForm,SuiMenu,SuiMenuMenu,SuiMenuItem  } from 'vue-fomantic-ui';
import ReviewEditor from "@/components/ReviewEditor/ReviewEditor.vue";
import Movie from "@/components/Movie/Movie";
@Options({
    components: {
        MainMenu,SuiContainer,SuiCard,SuiGrid,SuiGridRow,SuiGridColumn,SuiFormTextarea,SuiForm,SuiMenu,SuiMenuMenu,SuiMenuItem,ReviewEditor
    },
})
export default class Review extends Vue{

    public loading = true;

    @Prop()
    public imdbId = "";

    private item = null;
    private platforms = [];

    @Watch('imdbId')
    refresh():void{
        console.log('imdb changed!!')
    }

    created() :void{

        Promise.all([
            fetch("api/movies/"+this.imdbId),
            fetch("api/platforms")
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => {
            // Log the data to the console
            // You would do something with both sets of data here
            this.item = data[0];
            this.platforms = data[1].search;
            this.loading=false;
        }).catch(error => {
            // if there's an error, log it
            console.log(error);
        });


        // fetch()
        //     .then(response=>response.json())
        //     .then(data=>{
        //         this.item = data;
        //         this.loading=false;
        //     })
        //     .catch(data=>{
        //         console.log('error!!');
        //     });

    }
}