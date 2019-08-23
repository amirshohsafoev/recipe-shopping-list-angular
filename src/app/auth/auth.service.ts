import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registerd?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfnkwPr8l3dkycv7Xrr3r-sxv5WhVtxgo',
        {email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(errorRes=>{
        let errorMessage = 'An unknown error occured'
        if(!errorRes.error || !errorRes.error.error ){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.messsage){
            case 'EMAIL_EXISTS':
            errorMessage = 'This email exists'
        }
        return throwError(errorMessage)
    }))
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfnkwPr8l3dkycv7Xrr3r-sxv5WhVtxgo',
        {email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occured'
            if(!errorRes.error || !errorRes.error.error ){
                return throwError(errorMessage)
            }
            switch(errorRes.error.error.messsage){
                case 'INVALID_PASSWORD':
                errorMessage = 'The password you have entered is invalid'
            }
            return throwError(errorMessage)
        }))
    }
}