import {Page} from "ui/page";
import {Component,ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../shared/user/user";
import {CustomError} from "../../shared/error/error";
import {UserService} from "../../shared/user/user.service";
import {Color} from "color";
import {View} from  "ui/core/view";
import {AnimationCurve} from "ui/enums";

@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
    user: User;
    isLoggingIn = true;

    @ViewChild("container") container : ElementRef;

    constructor(private _router: Router, private _userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "juanda7@gmail.com"
        this.user.password = "Enero131986";
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this._userService.login(this.user)
            .subscribe(
                ()=> this._router.navigate(["/list"]),
                (error: Error) => alert(error.message)
            );
    }

    signUp() {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }
        this._userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                (error: CustomError) => alert(error.message)
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
            duration: 200,
            curve: AnimationCurve.easeIn
        });
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }
}