/// <reference path="typedefs.js" />

const axios = require('axios')
const { Authentication, RestCarrier  } = require('../Carrier')

class Configuration {
    #carrier; #baseUrl; #login; #tranKey; #client; #timeout; #logger;
    
    /**
     * @param {ConfigurationData} configuration
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

    /**
     * 
     * @param endpoint
     * @returns {string}
     */
    baseUrl(endpoint = ''){
        return this.#baseUrl + endpoint
    }

    /**
     * 
     * @returns {number}
     */
    get timeout(){
        return this.#timeout
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
     * @returns {string}
     */
    get tranKey(){
        return this.#tranKey
    }

    /**
     * 
     * @returns {AxiosInstance}
     */
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

    /**
     * 
     * @returns {RestCarrier}
     */
    get carrier(){
        if(this.#carrier){
            return this.#carrier
        }
        this.#carrier = new RestCarrier(this)

        return this.#carrier
    }

    /**
     * 
     * @returns {Authentication}
     */
    get authentication(){
        return new Authentication({
            login: this.login,
            tranKey: this.tranKey,
        })
    }
}

module.exports = Configuration