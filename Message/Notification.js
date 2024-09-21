/// <reference path="typedefs.js" />

const crypto = require('crypto')
const { StatusHelper } = require("../Models/Status");

class Notification{
    #requestId; #reference; #signature; #tranKey; #statusHelper;

    /**
     * 
     * @param {NotificationResponseData} data
     * @param {string} tranKey
     */
    constructor(data, tranKey) {
        this.#requestId = data.requestId
        this.#reference = data.reference
        this.#signature = data.signature
        
        this.#tranKey = tranKey
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
    get reference(){
        return this.#reference
    }

    /**
     * 
     * @returns {string}
     */
    get signature(){
        return this.#signature
    }

    /**
     * 
     * @returns {string}
     */
    makeSignature(){
        return crypto.createHash('sha1').update(this.requestId + this.statusHelper.status.status  + this.statusHelper.status.date + this.#tranKey).digest('hex')
    }
}

module.exports = Notification