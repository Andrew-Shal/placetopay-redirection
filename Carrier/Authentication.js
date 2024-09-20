const dayjs = require('dayjs')
const crypto = require('crypto')
class Authentication{
    constructor(configuration) {
        this._login = configuration.login
        this._tranKey = configuration.tranKey

        this._algorithm = configuration.algorithm ?? 'sha1'

        this._auth = null
        this._overridden = false
        if(configuration.auth){
            this._auth = configuration.auth
            this.overridden = true
        }

        this.generate()
    }

    getNonce(encoded = true){
        let nonce = null
        if(this._auth){
            nonce = this._auth.nonce
        }else{
            const rawNonce = Math.floor(Math.random() * 1000000)
            nonce = rawNonce.toString()
        }

        return encoded ? Buffer.from(nonce).toString('base64') : nonce
    }

    getSeed(){
        return this._auth ? this._auth.seed : dayjs().toISOString()
    }

    tranKey(){
        return this._tranKey
    }

    login(){
        return this._login
    }

    digest(encoded = true){
        // TODO: should this be sha1 or sha256???
        const digest = crypto.createHash('sha256').update(this.getNonce(false) + this.getSeed() + this.tranKey()).digest()

        return encoded ? Buffer.from(digest,'binary').toString('base64') : Buffer.from(digest,'binary').toString()
    }


    generate(){
        if(!this._overridden){
            this._auth = {
                seed: this.getSeed(),
                nonce: this.getNonce()
            }
        }

        return this
    }

    getFields(){
        return {
            login: this.login(),
            tranKey: this.digest(),
            nonce: this.getNonce(),
            seed: this.getSeed(),
        }
    }
}