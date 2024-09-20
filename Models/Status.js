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
    constructor(data) {
        this._status = data.status
        this._reason = data.reason
        this._message = data.message
        this._date = data.date
    }

    status(){
        return this._status ?? StatusTypes.ST_ERROR
    }

    reason(){
        return this._reason
    }

    message(){
        return this._message
    }

    date(){
        return this._date
    }

    isSuccessful(){
        return this.status() === StatusTypes.ST_OK
    }

    isRejected(){
        return this.status() === StatusTypes.ST_REJECTED
    }

    isError(){
        return this.status() === StatusTypes.ST_ERROR
    }

    getFields(){
        return {
            status: this.status(),
            reason: this.reason(),
            message: this.message(),
            date: this.date()
        }
    }
}

class StatusHelper{
    constructor(status) {
        this._status = status
    }
    status(){
        return this._status
    }

    isApproved(){
        return this._status
    }

    isSuccessful(){
        return ![StatusTypes.ST_ERROR, StatusTypes.ST_FAILED].find(s => s === this.status().status())
    }

    isRejected(){
        return this.status().status() === StatusTypes.ST_REJECTED
    }
}