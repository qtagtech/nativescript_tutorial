import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {User} from "./user";
import {CustomError} from "../error/error";
import {Config} from "../config";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
    constructor(private _http: Http) {}

    register(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this._http.post(
            Config.apiUrl + "Users",
            JSON.stringify({
                Username: user.email,
                Email: user.email,
                Password: user.password
            }),
            { headers: headers }
        )
            .catch(this.handleErrors);
    }

    login(user: User){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this._http.post(
            Config.apiUrl + 'oauth/token',
            JSON.stringify({
                username: user.email,
                password: user.password,
                grant_type: "password"
            }),
            {headers: headers}
        )
            .map(response => response.json())
            .do(data =>{
                Config.token = data.Result.access_token;
            })
            .catch(this.handleErrors);
    }

    handleErrors(_error: Response) {
        var error = new CustomError(_error['_body']['errorCode'], _error['_body']['message']);
        console.log(JSON.stringify(_error));
        return Observable.throw(error);
    }
}