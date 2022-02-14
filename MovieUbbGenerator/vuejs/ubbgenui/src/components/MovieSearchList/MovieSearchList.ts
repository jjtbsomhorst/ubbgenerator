import MovieGroupList from "@/components/MovieGroupList/MovieGroupList";
import {bus} from "vue3-eventbus";

export default class MovieSearchList extends MovieGroupList {

    created() {
        bus.on('searchterm_entered',(data:string)=>{
            console.log('searchterm entered, lets do some stuff with it');
            if(data.length > 3){
                super.loadData("api/movies/search?name="+data);
            }
        });
    }

}