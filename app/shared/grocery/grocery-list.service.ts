import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Config} from "../config";
import {Grocery} from "./grocery";
import {CustomError} from "../../shared/error/error";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class GroceryListService{
    constructor (private _http: Http){}

    load(){
        let headers = new Headers();
        headers.append("Authorization","Bearer " + Config.token);

        return this._http.get(Config.apiUrl + "Groceries",{
          headers: headers
        })
            .map(res => res.json())
            .map(data => {
                let groceryList = [];
                data.Result.forEach((grocery)=>{
                    groceryList.push(new Grocery(grocery.Id, grocery.Name));
                });
                return groceryList;
            })
            .catch(this.handleErrors);
    }

    add(name: string){
        let headers = new Headers();
        headers.append("Authorization", "Bearer "+ Config.token);
        headers.append("Content-Type", "application/json");

        return this._http.post(
            Config.apiUrl + "Groceries",
            JSON.stringify({
                Name: name
            }),
            {headers: headers}
        )
            .map((res) => {
                return res.json();
            })
            .map(data => {
                return new Grocery(data.Result.Id, name);
            })
            .catch(this.handleErrors);
    }

    handleErrors(_error: Response) {
        var error = new CustomError(_error['_body']['errorCode'], _error['_body']['message']);
        console.log(JSON.stringify(_error));
        return Observable.throw(error);
    }
}