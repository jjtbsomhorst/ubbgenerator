import { StreamingPlatform } from "./StreamingPlatform";

export class ReviewEntity{

    private _imdbId!: string;
    private _text!: string;
    private _rating!: number;
    private _platform!: StreamingPlatform;

    public get imdbId(): string{
        return this._imdbId;
    }

    public set imdbId(id: string){
        this._imdbId = id;
    }

    public get text(): string{
        return this._text;
    }

    public set text(t: string){
        this._text = t;
    }
    
    public get rating(): number{
        return this._rating;
    }

    public set rating(r: number){
        this._rating = r;
    }

    public get platform(): StreamingPlatform {
        return this._platform;
    }
    public set platform(value: StreamingPlatform) {
        this._platform = value;
    }

    public toJson(){
        return {
            imdbId: this.imdbId,
            source: this.platform.value,
            score: this.rating,
            body: this.text,
            username: ''
          };
    }

}