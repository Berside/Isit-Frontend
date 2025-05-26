import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        try {
            this._isAdmin = false
            this._isAuth = true
            this._user = {}
            this._isEmail = {}
            makeAutoObservable(this)
        } catch (error) {
            console.error('Ошибка при создании UserStore:', error)
        }
    }
    setIsEmail(email) {
        this._isEmail = email
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    get isAdmin() {
        return this._isAdmin
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get isEmail() {
        return this._isEmail
    }
}