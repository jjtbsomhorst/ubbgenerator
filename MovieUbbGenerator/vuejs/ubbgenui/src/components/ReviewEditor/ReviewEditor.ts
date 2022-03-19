import {Options, Vue} from 'vue-class-component';
import {Prop,Watch} from "vue-property-decorator";
import {SuiDropdown,SuiDropdownMenu, SuiDropdownItem,SuiFormField,SuiRating} from 'vue-fomantic-ui';
import {StreamingPlatform} from "@/entities/StreamingPlatform";
import {ReviewService} from "@/services/ReviewService";
import {ReviewEntity} from "@/entities/ReviewEntity";
import { MovieEntity } from '@/entities/MovieEntity';
import MessageBox from '../MessageBox/MessageBox.vue';


@Options({
    components: {
        SuiDropdown,SuiDropdownItem,SuiDropdownMenu,SuiFormField,SuiRating,MessageBox
    },
})
export default class ReviewEditor extends Vue{

    public selectedPlatform:StreamingPlatform = new StreamingPlatform(-1,'Platform..');
    public customPlatform = "";
    public reviewText = "";

    public error:any;

    public hasError= false;
    // @ts-ignore
    public rating = 0;

    private showPreview = false;

    private platformlist:StreamingPlatform[] = [];

    get isValid():boolean{
        return ((this.rating > 0 && this.rating < 11)
                && (this.reviewText != null && this.reviewText != ""));
    }


    @Prop()
    public movie!:MovieEntity;

    @Prop()
    public platforms = [];


    get previewIcon():string{
        if(this.showPreview){
            return "angle up";
        }
        return "angle down";
    }

    get previewVisible():boolean{
        return this.showPreview;
    }

    togglePreview():void{
        this.showPreview = !this.showPreview;
    }

    get isOther() :boolean{
        return (this.selectedPlatform != null && this.selectedPlatform.value === 999999);
    }

    get review():string{
        return ReviewService.generateReview(this.reviewText,this.movie,this.rating,this.selectedPlatform);
    }


    @Watch('platforms')
    watchPlatforms():void{
            this.platforms.forEach((e)=>{
                // @ts-ignore
                this.platformlist.push(new StreamingPlatform(e.id,e.name));
            })

        this.platformlist.unshift(new StreamingPlatform(-1,''))
        this.platformlist.push(new StreamingPlatform(999999,'Other'));

    }

    copyToClipBoard():void{
        console.log(this.$refs);
    }
    generateReview():void{

        let r:ReviewEntity = new ReviewEntity();
        r.imdbId = this.movie.imdbID;
        r.platform= this.selectedPlatform;
        r.rating= this.rating;
        r.text= this.reviewText;

        fetch('/api/reviews',{
            method: 'POST',
            body: JSON.stringify(r.toJson()),
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw res;
            }
            return res.json();
        })
        .then(()=>{
            let element = document.getElementById("ReviewResult") as HTMLTextAreaElement;
            navigator.clipboard.writeText(element.value);

        })
        .catch((data)=>{
            //@ts-ignore
            data.json().then((e)=>{
                console.log('kepot');
                console.log(e);
                this.hasError = true;
                this.error = e;
            })
            
        });
    }

    onSelect(event: any):void{
        console.log(event);
    }
    onDecorateEvent(decoration:string):void{
        console.log(this.$refs);
        let node = document.getElementById('ReviewEditor') as HTMLInputElement;
        if(node != null) {
            let content = node.value;
            if (!(content == "" || content == null)) {
                let startTag = "[" + decoration + "]";
                let endTag = "[/]";
                // @ts-ignore
                let beforeSelection = this.reviewText.substring(0, node.selectionStart);
                // @ts-ignore
                let afterSelection = this.reviewText.substring(node.selectionEnd);
                // @ts-ignore
                let selectedContent = this.reviewText.substring(node.selectionStart, node.selectionEnd);
                selectedContent = startTag + selectedContent + endTag;
                this.reviewText = beforeSelection + selectedContent + afterSelection;
            }
        }
    }
}