/// <reference path="typedefs.js" />

/**
 * @typedef {import('./Message/RedirectResponse')} RedirectResponse
 * @typedef {import('./Message/RedirectInformation')} RedirectInformation
 */

const { Notification, RedirectRequest } = require('./Message')
const { Configuration } = require('./Helpers')

class PlaceToPay {
    /**
     * @type {Configuration}
     */
    #configuration;
    
    /**
     * @param {ConfigurationData} configuration
     */
    constructor(configuration) {
        this.#configuration =  new Configuration(configuration)
    }

    /**
     * @param {RedirectRequestData} redirectRequestData
     * @return RedirectResponse
     */
    request(redirectRequestData){
        const request = new RedirectRequest(redirectRequestData)
        return this.#configuration.carrier.request(request)
    }

    /**
     * @param {number} requestId
     * @return RedirectInformation
     */
    query(requestId){
        return this.#configuration.carrier.query(requestId)
    }

    /**
     * TODO: need to figure out this one
     * @param data
     */
    readNotification(data){
        return new Notification(data, this.#configuration.tranKey)
    }
}

module.exports = PlaceToPay