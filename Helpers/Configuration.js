/**
 * @typedef {import('../types').ConfigurationData} ConfigurationData
 */
class Configuration {
    /**
     * @param {ConfigurationData} configuration
     */
    constructor(configuration) {
        /**
         * @type {null | RestCarrier}
         * @private
         */
        this._carrier = null
        
        this._baseUrl = configuration.baseUrl
        this._login = configuration.login
        this._tranKey = configuration.tranKey


        this._client = configuration.client
        this._timeout = configuration.timeout

        this._logger = configuration.logger // TODO: look into winston for logging: https://www.npmjs.com/package/winston
    }

    baseUrl(endpoint = ''){
        return this._baseUrl + endpoint
    }

    timeout(){
        return this._timeout
    }

    login(){
        return this._login
    }

    tranKey(){
        return this._tranKey
    }

    client(){
        if(!this._client){
            this._client = axios.create({
                baseURL: this._baseUrl
            })
            if(this._timeout !== null) this._client.defaults.timeout = this._timeout
        }

        return this._client
    }

    /**
     *
     * @returns {WinstonLogger}
     */
    logger(){
        return this._logger
    }

    get carrier(){
        if(this._carrier){
            return this._carrier
        }
        this._carrier = new RestCarrier(this)

        return this._carrier
    }

    authentication(){
        return new Authentication({
            login: this.login(),
            tranKey: this.tranKey(),
        })
    }
}

module.exports = Configuration