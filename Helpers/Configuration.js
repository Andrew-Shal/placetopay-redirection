const axios = require('axios')
const { Authentication, RestCarrier  } = require('../Carrier')

/**
 * @typedef {import('../types').ConfigurationData} ConfigurationDataInp
 */
class Configuration {
    #carrier; #baseUrl; #login; #tranKey; #client; #timeout; #logger;
    
    /**
     * @param {ConfigurationDataInp} configuration
     */
    constructor(configuration) {
        /**
         * @type {null | RestCarrier}
         * @private
         */
        this.#carrier = null
        this.#baseUrl = configuration.baseUrl
        this.#login = configuration.login
        this.#tranKey = configuration.tranKey


        this.#client = configuration.client
        this.#timeout = configuration.timeout

        this.#logger = configuration.logger
    }

    baseUrl(endpoint = ''){
        return this.#baseUrl + endpoint
    }

    get timeout(){
        return this.#timeout
    }

    get login(){
        return this.#login
    }

    get tranKey(){
        return this.#tranKey
    }

    get client(){
        if(!this.#client){
            this.#client = axios.create({
                baseURL: this.#baseUrl
            })
            if(this.#timeout !== null) this.#client.defaults.timeout = this.#timeout
        }

        return this.#client
    }

    /**
     *
     * @returns {WinstonLogger}
     */
    get logger(){
        return this.#logger
    }

    get carrier(){
        if(this.#carrier){
            return this.#carrier
        }
        this.#carrier = new RestCarrier(this)

        return this.#carrier
    }

    get authentication(){
        return new Authentication({
            login: this.login,
            tranKey: this.tranKey,
        })
    }
}

module.exports = Configuration