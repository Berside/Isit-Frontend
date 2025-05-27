import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        try {
            this._isAdmin = false
            this._isAuth = false
            this._isProf = false
            this._isStud = false
            this._user = {}
            this._isEmail = {}
            this._userid = {}
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
    setIsProf(bool) {
        this._isProf = bool
    }
    setIsStud(bool) {
        this._isStud = bool
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserId(id) {
        this._userid = id
    }
    get isAdmin() {
        return this._isAdmin
    }
        get userID() {
        return this._userid
    }
    get isProf() {
        return this._isProf
    }
    get isStud() {
        return this._isStud
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