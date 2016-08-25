import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {CustomError} from "../../shared/error/error";
import {TextField} from "ui/text-field";
var socialShare = require('nativescript-social-share');

@Component({
    selector: "list",
    templateUrl: "pages/list/list.html",
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [GroceryListService]
})

export class ListPage implements OnInit{
    groceryList: Array<Grocery>;
    grocery: string;
    isLoading: boolean;
    listLoaded: boolean;
    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private _groceryListService: GroceryListService){
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
    }

    add(){

        if(this.grocery.trim() === ""){
            alert("Enter a grocery item");
            return;
        }

        //Dismiss the kexboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this._groceryListService.add(this.grocery)
            .subscribe(
                (groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = "";
                },
                (error: CustomError) => {
                    alert({
                        message: error.message,
                        okButtonText: "OK"
                    });
                    this.grocery = "";
                });
    }

    share() {
        let list = [];
        for (let i = 0, size = this.groceryList.length; i < size ; i++) {
            list.push(this.groceryList[i].name);
        }
        let listString = list.join(", ").trim();
        socialShare.shareText(listString);
    }

    ngOnInit(){
        this.isLoading = true;
        this._groceryListService.load()
            .subscribe(
                (loadedGroceries)=>{
                    loadedGroceries.forEach((groceryObject)=>{
                        this.groceryList.unshift(groceryObject);
                    });
                },
                (error: CustomError) => {
                    alert(error.message);
                }, () => {
                    this.isLoading = false;
                    this.listLoaded = true;
                });
    }
}