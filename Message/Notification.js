/**
 * @typedef {import('../types').NotificationResponseData} NotificationInput
 */


const crypto = require('crypto')

class Notification{
    #requestId; #reference; #signature; #tranKey

    /**
     * 
     * @param {NotificationInput} data
     * @param {string} tranKey
     */
    constructor(data, tranKey) {
        this.#requestId = data.requestId
        this.#reference = data.reference
        this.#signature = data.signature
        
        this.#tranKey = tranKey
    }
    
    get requestId(){
        return this.#requestId
    }
    
    get reference(){
        return this.#reference
    }
    
    get signature(){
        return this.#signature
    }
    
    makeSignature(){
        return crypto.createHash('sha1').update(requestId + status.status + status.date + P2P_SECRET_KEY).digest('hex')
    }
}

module.exports = Notification