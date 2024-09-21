/// <reference path="typedefs.js" />

const { StatusHelper } = require('../Models/Status')

class RedirectResponse{
    #requestId; #processUrl; #statusHelper;

    /**
     * @param {RedirectResponseData} data
     */
    constructor(data) {
        this.#requestId = data.requestId
        this.#processUrl = data.processUrl
        this.#statusHelper = new StatusHelper(data.status)
    }

    /**
     *
     * @returns {StatusHelper}
     */
    get statusHelper(){
        return this.#statusHelper
    }

    /**
     * 
     * @returns {string}
     */
    get requestId(){
        return this.#requestId
    }

    /**
     * 
     * @returns {string}
     */
    get processUrl(){
        return this.#processUrl
    }

    getFields(){
        return {
            status: this.statusHelper.status.getFields(),
            processUrl: this.#processUrl,
            requestId: this.#requestId,
        }
    }
}

module.exports = RedirectResponse