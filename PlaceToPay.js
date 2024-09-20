/**
 * @typedef {import('./types').ConfigurationData} ConfigurationDataInput
 * @typedef {import('./Message/RedirectResponse')} RedirectResponse
 * @typedef {import('./Message/RedirectInformation')} RedirectInformation
 */

const { RedirectRequest } = require('./Message')
const { Configuration } = require('./Helpers')

class PlaceToPay {
    /**
     * @type {Configuration}
     */
    #configuration;
    
    /**
     * @param {ConfigurationDataInput} configuration
     */
    constructor(configuration) {
        this.#configuration =  new Configuration(configuration)
    }

    /**
     * @param {any} redirectRequest
     * @return RedirectResponse
     */
    request(redirectRequest){
        const request = new RedirectRequest(redirectRequest)
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
     * 
     * @param data
     */
    readNotification(data){
        return new Notification(data, this.#configuration.tranKey())
    }
}

module.exports = PlaceToPay