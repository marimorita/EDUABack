export class Validator {
    static get email(){
        return/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    }
    static get number () {
        return /^[0-9]+$/
    }
    static get text (){
        return /^[a-zA-Z0-9\s]+$/
    }
    static get date (){
        return /^\d{4}-\d{2}-\d{2}$/
    }
}