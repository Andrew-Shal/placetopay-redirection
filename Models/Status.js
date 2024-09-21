/// <reference path="typedefs.js" />

const StatusTypes = {
    ST_OK: 'OK',
    ST_FAILED: 'FAILED',
    ST_APPROVED: 'APPROVED',
    ST_REJECTED: 'REJECTED',
    ST_PENDING: 'PENDING',
    ST_ERROR: 'ERROR',
    ST_UNKNOWN: 'UNKNOWN',
}

class Status{
    #status; #reason; #message; #date;

    /**
     * 
     * @param {StatusData} data
     */
    constructor(data) {
        this.#status = data.status
        this.#reason = data.reason
        this.#message = data.message
        this.#date = data.date
    }

    /**
     * 
     * @returns {string}
     */
    get status(){
        return this.#status ?? StatusTypes.ST_ERROR
    }

    /**
     * 
     * @returns {string}
     */
    get reason(){
        return this.#reason
    }

    /**
     * 
     * @returns {string}
     */
    get message(){
        return this.#message
    }

    /**
     * 
     * @returns {string}
     */
    get date(){
        return this.#date
    }

    /**
     * 
     * @returns {boolean}
     */
    get isSuccessful(){
        return this.status === StatusTypes.ST_OK
    }

    /**
     * 
     * @returns {boolean}
     */
    get isRejected(){
        return this.status === StatusTypes.ST_REJECTED
    }

    /**
     * 
     * @returns {boolean}
     */
    get isError(){
        return this.status === StatusTypes.ST_ERROR
    }

    getFields(){
        return {
            status: this.status,
            reason: this.reason,
            message: this.message,
            date: this.date,
        }
    }
}

class StatusHelper{
    /**
     * @type {Status}
     */
    #status;

    /**
     * 
     * @param {Object} statusData
     */
    constructor(statusData) {
        this.#status = new Status(statusData)
    }
    get status(){
        return this.#status
    }

    get isApproved(){
        return this.#status.status === StatusTypes.ST_APPROVED
    }

    /**
     * 
     * @returns {boolean}
     */
    get isSuccessful(){
        return ![StatusTypes.ST_ERROR, StatusTypes.ST_FAILED].find(s => s === this.status.status)
    }

    /**
     * 
     * @returns {boolean}
     */
    get isRejected(){
        return this.status.status === StatusTypes.ST_REJECTED
    }
}

module.exports = {
    StatusTypes,
    StatusHelper,
    Status,
}