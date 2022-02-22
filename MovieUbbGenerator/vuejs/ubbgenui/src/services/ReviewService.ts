
import {StreamingPlatform} from "@/entities/StreamingPlatform";
import { MovieEntity } from "@/entities/MovieEntity";

const defaultReview = `[table bgcolor=transparent width=100% cellpadding=6]
                            [tr]
                                [td fontsize=14]
                                    [url="http://www.imdb.com/title/{{imdbID}}","IMDb -- {{title}}"][b]{{title}}[/b] ({{year}})[/url]
                                [/td]
                                [td align=right valign=top rowspan=2 fontsize=9]
                                    [url="{{poster}}"]
                                        [img=110,163,,,"{{title}} ({{year}})",1]{{poster}}[/]
                                    [/url]
                                [/td]
                            [/tr]
                            [tr]
                                [td valign=top colspan=2]
                                    [small]
                                        [b]Tweakers:[/b] {{tweakscore}} | 
                                        [b]IMDb:[/b] {{imdbRating}} | 
                                        [b]Genre:[/b] {{genre}} | 
                                        [b]Runtime:[/b] {{runtime}} | 
                                        [b][abbr="Motion Picture Association of America"]MPAA[/abbr]:[/b] {{rated}} |
                                        [b]Source:[/] {{platform}} 
                                    [/small]
                                    [hr=noshade]
                                    [justify]{{reviewText}}[/justify]
                                [/td]
                            [/tr]
                            [tr]
                                [td colspan=2 align=right]
                                    [small]
                                        [url="http://www.imdb.com/title/{{imdbID}}"]
                                            [img=16,16,,left,""]http://www.jeroensomhorst.eu/ubbgenerator/assets/imdb.png[/]
                                        [/url]
                                        [url="https://en.wikipedia.org/w/index.php?search={{title}} (film)"]
                                            [img=16,16,,left,""]http://www.jeroensomhorst.eu/ubbgenerator/assets/wikipedia.png[/]
                                        [/url]
                                        [url="https://www.youtube.com/results?search_query=trailer+{{title}}"]
                                            [img=16,16,,left,""]http://www.jeroensomhorst.eu/ubbgenerator/assets/youtube.png[/]
                                        [/url]
                                        [img=,24,,,,]https://www.jeroensomhorst.eu/ubbgenerator/assets/stars/{{rating}}.png[/]
                                        [b]{{rating}}[/b] / 10
                                    [/small]
                                [/td]
                            [/tr]
                       [/table]
                       [sub]
                            [url=http://www.jeroensomhorst.eu/ubbgenerator/#?format=ubb]Genereer je eigen UBB code review[/url]
                       [/sub]`;

export class ReviewService{


    static generateReview(reviewText:string,movie?:MovieEntity,rating = 0,platform?:StreamingPlatform):string{

        if(reviewText!=null && movie!=null&&rating!=null&&platform!=null){
            let result = defaultReview;
            let replaceMovieVars = ['imdbID','title','year','poster','tweakscore','imdbRating','genre','runtime','rated',]
            replaceMovieVars.forEach((v)=>{
                let replaceValue = "";
                if(Object.prototype.hasOwnProperty.call(movie, v)){
                    //@ts-ignore
                    replaceValue = movie[v];
                }
                result = result.replaceAll('{{'+v+'}}',replaceValue);
                
            })

            result = result.replace('{{reviewText}}',reviewText);
            result = result.replace('{{rating}}',rating.toFixed(1));
            result = result.replace('{{platform}}',platform.text);

            return result;
        }
        return "";


    }

}