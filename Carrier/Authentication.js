/// <reference path="typedefs.js" />

const dayjs = require('dayjs') // TODO: remove these and simply use datetime
const crypto = require('crypto')
class Authentication{
    #login; #tranKey; #algorithm; #auth; #overridden;

    /**
     * 
     * @param {AuthConfigurationData} configuration
     */
    constructor(configuration) {
        this.#login = configuration.login
        this.#tranKey = configuration.tranKey

        this.#algorithm = configuration.algorithm ?? 'sha256'

        this.#auth = null
        this.#overridden = false
        if(configuration.auth){
            this.#auth = configuration.auth
            this.#overridden = true
        }

        this.generate()
    }

    /**
     * 
     * @param {boolean} encoded -
     * @returns {string}
     */
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

    /**
     * 
     * @returns {string}
     */
    get seed(){
        return this.#auth ? this.#auth.seed : dayjs().toISOString()
    }

    /**
     * 
     * @returns {string}
     */
    get tranKey(){
        return this.#tranKey
    }

    /**
     * 
     * @returns {string}
     */
    get login(){
        return this.#login
    }

    /**
     * 
     * @param {boolean} encoded
     * @returns {string}
     */
    digest(encoded = true){
        const digest = crypto.createHash(this.#algorithm).update(this.getNonce(false) + this.seed + this.tranKey).digest()
        return encoded ? Buffer.from(digest,'binary').toString('base64') : Buffer.from(digest,'binary').toString()
    }


    /**
     * 
     * @returns {Authentication}
     */
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