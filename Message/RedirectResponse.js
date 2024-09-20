/**
 * @typedef {import('./types').RedirectResponseData} RedirectResponseData
 */

class RedirectResponse{
    #requestId; #processUrl; #status

    /**
     * @param {RedirectResponseData} data
     */
    constructor(data) {
        this.#requestId = data.requestId
        this.#processUrl = data.processUrl
        this.#status = new Status(data.status)
    }

    get status(){
        return this.#status
    }

    get requestId(){
        return this.#requestId
    }

    get processUrl(){
        return this.#processUrl
    }

    getFields(){
        return {
            status: this.#status,
            processUrl: this.#processUrl,
            requestId: this.#requestId,
        }
    }
}