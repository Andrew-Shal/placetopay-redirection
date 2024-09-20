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
    constructor(data) {
        this.#status = data.status
        this.#reason = data.reason
        this.#message = data.message
        this.#date = data.date
    }

    get status(){
        return this.#status ?? StatusTypes.ST_ERROR
    }

    get reason(){
        return this.#reason
    }

    get message(){
        return this.#message
    }

    get date(){
        return this.#date
    }

    get isSuccessful(){
        return this.status() === StatusTypes.ST_OK
    }

    get isRejected(){
        return this.status() === StatusTypes.ST_REJECTED
    }

    get isError(){
        return this.status() === StatusTypes.ST_ERROR
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
     * @param {Status} status
     */
    constructor(status) {
        this.#status = status
    }
    get status(){
        return this.#status
    }

    get isApproved(){
        return this.#status
    }

    get isSuccessful(){
        return ![StatusTypes.ST_ERROR, StatusTypes.ST_FAILED].find(s => s === this.status.status)
    }

    get isRejected(){
        return this.status.status === StatusTypes.ST_REJECTED
    }
}

module.exports = {
    StatusTypes,
    StatusHelper,
    Status,
}