class RedirectInformation {
    constructor(data) {
        this._status = new Status(data.status)
    }
}

module.exports = RedirectInformation