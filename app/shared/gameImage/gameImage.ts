import observable = require("data/observable");
import imageCache = require("ui/image-cache");
import imageSource = require("image-source");

var cache = new imageCache.Cache();
cache.maxRequests = 10;
cache.placeholder = imageSource.fromResource("placeholder");

export class GameImage extends observable.Observable
{
    private _imageSrc: string
    private _name: string;
    get imageSrc(): imageSource.ImageSource
    {
        var image = cache.get(this._imageSrc);

        if (image)
        {
            return image;
        }

        cache.push(
            {
                key: this._imageSrc
                , url: this._imageSrc
                , completed:
                (image) =>
                {
                    this.notify(
                        {
                            object: this
                            , eventName: observable.Observable.propertyChangeEvent
                            , propertyName: "imageSrc"
                            , value: image
                        });
                }
            });

        return cache.placeholder;
    }

    constructor(name:string,imageSrc : string)
    {
        super();
        this._name = name;
        this._imageSrc = imageSrc;
    }
}