/**
 * Created by jarro on 26/08/16.
 */
import * as application from "application";
import {Observable} from "data/observable";
import {ImageSource} from "image-source";
import {Cache} from "ui/image-cache";



export class GameImage extends Observable
{
    private cache = new Cache();
    private imageSource = new ImageSource();
    private _oImg: any; /* 1 */

    get imageSrc(): ImageSource
    {
        var image = this.cache.get(this._oImg.url);

        if (image)
        {
            return image;
        }

        cache.push(
            {
                key: this._oImg.url
                , url: this._oImg.url
                , completed:
                (image) =>
                {
                    if(image){  /* 2 */
                        this.notify(
                            {
                                object: this
                                , eventName: Observable.propertyChangeEvent
                                , propertyName: "imageSrc"
                                , value: image
                            });
                    }
                }
            });

        /* 3  starts */
        var scaledPlaceholderImageSrc;

        // resizing placeholder image for android.
        if(application.android){
            if(this.cache.placeholder.android){
                var resizedBitmap = application.android.graphics.Bitmap.createScaledBitmap(this.cache.placeholder.android, this._oImg.width, this._oImg.height, true);
                scaledPlaceholderImageSrc = resizedBitmap;
            }
        }


        // resizing placeholder image for ios.
        if(application.ios){
            if(this.cache.placeholder.ios){
                let cgSize = application.ios.CGSizeMake(this._oImg.width, this._oImg.height);
                application.ios.UIGraphicsBeginImageContextWithOptions(cgSize, false, 0.0);

                this.cache.placeholder.ios.drawInRect(application.ios.CGRectMake(0, 0, this._oImg.width, this._oImg.height));
                let newImageSource = application.ios.UIGraphicsGetImageFromCurrentImageContext();
                application.ios.UIGraphicsEndImageContext();
                scaledPlaceholderImageSrc = newImageSource;
            }
        }


        var newImg = new ImageSource();
        newImg.setNativeSource(scaledPlaceholderImageSrc);
        return newImg;
        /* 3 ends */
    }

    constructor(imageSrc : string)
    {
        super();
        this._imageSrc = imageSrc;
    }
}