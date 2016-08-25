/**
 * Created by jarro on 25/08/16.
 */
export class CustomError{
    code: number;
    message: string;

    constructor(private _code:number, private _message:string){
        this.code = _code;
        this.message = _message;
    }
}