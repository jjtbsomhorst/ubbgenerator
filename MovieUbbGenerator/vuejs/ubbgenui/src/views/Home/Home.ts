import { Options, Vue } from 'vue-class-component';
import {SuiContainer,SuiGrid,SuiGridColumn } from 'vue-fomantic-ui';
import MovieGroupList from "@/components/MovieGroupList/MovieGroupList.vue";
@Options({
    components: {
        SuiContainer,SuiGrid,SuiGridColumn,MovieGroupList
    },
})
export default class Home extends Vue {
}