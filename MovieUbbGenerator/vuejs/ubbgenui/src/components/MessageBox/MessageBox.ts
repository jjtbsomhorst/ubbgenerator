import { Options,prop,Vue } from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {SuiMessage} from 'vue-fomantic-ui';


enum MessageType{
    info,
    warning,
    success
}

@Options({
    components: {
        SuiMessage
    },
})
export default class MessageBox extends Vue{

    @Prop({title:String})
    private title = "";

    @Prop({closable:Boolean})
    private closable =false;

    @Prop({errors:Array})
    private errors=[];

    @Prop({type:String})
    private type=MessageType.info.toString();

    get isClosable(){
        return this.closable;
    }

    get isWarning(){
        return this.type == MessageType.warning.toString();
    }

    get isInfo(){
        return this.type == MessageType.info.toString();
    }

    get isSuccess(){
        return this.type == MessageType.success.toString();
    }

}