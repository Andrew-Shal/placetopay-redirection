﻿/// <reference path="typedefs.js" />

/**
 * @typedef {import('../Message/RedirectRequest')} RedirectRequest
 * @typedef {import('../Message/RedirectInformation')} RedirectInformation
 * @typedef {import('../Helpers/Configuration')} Configuration
 */

const {RedirectResponse, RedirectInformation} = require('../Message')

class BaseCarrier{
    /**
     * @protected
     * @type {Configuration}
     */
    _configuration
    constructor(configuration) {
        
        if(new.target === BaseCarrier) throw new Error('Cannot instantiate an abstract class.')
        
        this._configuration = configuration
    }

    /**
     * 
     * @param {RedirectRequest} redirectRequest
     * @returns {RedirectResponse}
     */
    request(redirectRequest){
        throw new Error('Abstract method must be implemented by subclass')
    }

    /**
     * 
     * @param {number} requestId
     * @returns {RedirectInformation}
     */
    query(requestId){
        throw new Error('Abstract method must be implemented by subclass')
    }
}

class RestCarrier extends  BaseCarrier{
    /**
     * @param {Configuration} configuration
     */
    constructor(configuration) {
        super(configuration)
    }

    /**
     * 
     * @param {string} url
     * @param {Object} args
     * @returns {Promise<*>}
     */
    async #_makeRequest(url, args){
        try{
            const data = {
                ... args,
                auth: this._configuration.authentication.getFields()
            }

            // log the request
            this._configuration.logger.info('[REQUEST]', data)

            const response = await this._configuration.client.post(url, data)
            const result = response.data

            // log the result
            this._configuration.logger.info('[RESPONSE]', result)
            return result
        }catch(error){
            console.log(error)
            // TODO: check what type or error and log
            throw new Error(error)
        }
    }

    /**
     *
     * @param {RedirectRequest} redirectRequest
     * @returns {RedirectResponse}
     */
    async request(redirectRequest){
        const result = await this.#_makeRequest(this._configuration.baseUrl('api/session'), redirectRequest.getFields())
        return new RedirectResponse(result)
    }

    /**
     *
     * @param {number} requestId
     * @returns {RedirectInformation}
     */
    async query(requestId){
        const result = await this.#_makeRequest(this._configuration.baseUrl(`api/session/${requestId}`), {})
        return new RedirectInformation(result)
    }
}

module.exports = RestCarrier