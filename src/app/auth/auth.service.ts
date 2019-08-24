import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators'
import {throwError, BehaviorSubject} from 'rxjs'

import { User } from './user.model';

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
    user = new BehaviorSubject<User>(null)
    

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfnkwPr8l3dkycv7Xrr3r-sxv5WhVtxgo',
        {email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
       this.handleAuthentication(
           resData.email, 
           resData.localId, 
           resData.idToken, 
           +resData.expiresIn)
    }))
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfnkwPr8l3dkycv7Xrr3r-sxv5WhVtxgo',
            {email: email,
            password: password,
            returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken, 
                +resData.expiresIn)
         }))
    }

    private handleAuthentication(email:string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email, 
            userId,
            token,
            expirationDate
            )
            this.user.next(user)
    }

    private handleError(errorRes: HttpErrorResponse ){
        let errorMessage = 'An unknown error occured'
            if(!errorRes.error || !errorRes.error.error ){
                return throwError(errorMessage)
            }
            switch(errorRes.error.error.messsage){
                case 'INVALID_PASSWORD': errorMessage = 'The password you have entered is invalid';
                break
                case 'EMAIL_NOT_FOUND': errorMessage = 'Your email is not found in database';
                break
                case 'INVALID_PASSWORD': errorMessage = 'You have entered an invalid password';
            }
            return throwError(errorMessage)
    }
}