export class ReviewEntity{

    private _imdbId!: string;
    public get imdbId(): string {
        return this._imdbId;
    }
    public set imdbId(value: string) {
        this._imdbId = value;
    }
    private _text!: string;
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }
    private _rating!: number;
    public get rating(): number {
        return this._rating;
    }
    public set rating(value: number) {
        this._rating = value;
    }
    private _platform!: number;
    public get platform(): number {
        return this._platform;
    }
    public set platform(value: number) {
        this._platform = value;
    }


}