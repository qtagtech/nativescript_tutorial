import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Game} from "../../shared/game/game";
import {GameImage} from "../../shared/gameImage/gameImage";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {CustomError} from "../../shared/error/error";
import observableArray = require("data/observable-array");
import observable = require("data/observable");

declare var UIColor: any;


@Component({
    selector: "games",
    templateUrl: "pages/games/games.html",
    styleUrls: ["pages/games/games-common.css", "pages/games/games.css"],
    providers: [GroceryListService]
})

export class GamesPage implements OnInit{
    gameList: observableArray.ObservableArray<Game>;
    isLoading: boolean;
    listLoaded: boolean;

    constructor(){
        this.gameList = new observableArray.ObservableArray<Game>();
        this.isLoading = false;
        this.listLoaded = false;
    }



    ngOnInit(){
        this.isLoading = true;

        this.gameList.push(new Game('Prueba 2', '000002', new GameImage('imagen de prueba 2', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-dd9c1d08-56ed-4212-9d48-c6e18748c01d-image.PNG')));
        this.gameList.push(new Game('Prueba 1', '000001', new GameImage('imagen de prueba', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-a5ff6c99-6563-4cd0-bfd7-a0373164af3d-image.PNG')));
        this.gameList.push(new Game('Prueba 2', '000002', new GameImage('imagen de prueba 2', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-dd9c1d08-56ed-4212-9d48-c6e18748c01d-image.PNG')));
        this.gameList.push(new Game('Prueba 1', '000001', new GameImage('imagen de prueba', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-a5ff6c99-6563-4cd0-bfd7-a0373164af3d-image.PNG')));
        this.gameList.push(new Game('Prueba 2', '000002', new GameImage('imagen de prueba 2', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-dd9c1d08-56ed-4212-9d48-c6e18748c01d-image.PNG')));
        this.gameList.push(new Game('Prueba 1', '000001', new GameImage('imagen de prueba', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-a5ff6c99-6563-4cd0-bfd7-a0373164af3d-image.PNG')));
        this.gameList.push(new Game('Prueba 2', '000002', new GameImage('imagen de prueba 2', 'http://files.parsetfss.com/5b753752-1191-4bcc-90ce-2dff36874dea/tfss-dd9c1d08-56ed-4212-9d48-c6e18748c01d-image.PNG')));
        this.isLoading = false;
        this.listLoaded = true;
    }

    listViewItemTap(args){
        console.log("-----------ITEM TAP: ------------"+args.index);
    }

    onItemLoading(args){
        var cell = args.ios;
        if(cell){
            cell.backgroundColor = UIColor.clearColor();
        }
    }
}