/**
 * @typedef {import('../types').AuthConfigurationData} AuthConfigurationDataInput
 * 
 */

const dayjs = require('dayjs')
const crypto = require('crypto')
class Authentication{
    #login; #tranKey; #algorithm; #auth; #overridden;

    /**
     * 
     * @param {AuthConfigurationDataInput} configuration
     */
    constructor(configuration) {
        this.#login = configuration.login
        this.#tranKey = configuration.tranKey

        this.#algorithm = configuration.algorithm ?? 'sha1'

        this.#auth = null
        this.#overridden = false
        if(configuration.auth){
            this.#auth = configuration.auth
            this.#overridden = true
        }

        this.generate()
    }

    getNonce(encoded = true){
        let nonce = null
        if(this.#auth){
            nonce = this.#auth.nonce
        }else{
            const rawNonce = Math.floor(Math.random() * 1000000)
            nonce = rawNonce.toString()
        }

        return encoded ? Buffer.from(nonce).toString('base64') : nonce
    }

    get seed(){
        return this.#auth ? this.#auth.seed : dayjs().toISOString()
    }

    get tranKey(){
        return this.#tranKey
    }

    get login(){
        return this.#login
    }

    digest(encoded = true){
        // TODO: should this be sha1 or sha256???
        const digest = crypto.createHash('sha256').update(this.getNonce(false) + this.seed + this.tranKey).digest()

        return encoded ? Buffer.from(digest,'binary').toString('base64') : Buffer.from(digest,'binary').toString()
    }


    generate(){
        if(!this.#overridden){
            this.#auth = {
                seed: this.seed,
                nonce: this.getNonce()
            }
        }

        return this
    }

    getFields(){
        return {
            login: this.login,
            tranKey: this.digest(),
            nonce: this.getNonce(),
            seed: this.seed,
        }
    }
}

module.exports = Authentication