const dayjs = require('dayjs')

/**
 * @typedef {import('./types').BuyerData} BuyerData
 * @typedef {import('./types').PaymentData} PaymentData
 * @typedef {import('./types').RedirectRequestData} RedirectRequestData
 */

class RedirectRequest{
    #locale; #buyer; #payment; #returnUrl; #paymentMethod; #cancelUrl; #ipAddress; #userAgent; #expiration

    /**
     * @param {RedirectRequestData} data
     */
    constructor(data) {
        this.#locale = data.locale ?? 'en_US'
        this.#buyer = data.buyer
        this.#payment = data.payment
        this.#returnUrl = data.returnUrl
        this.#paymentMethod = data.paymentMethod ?? ''
        this.#cancelUrl = data.cancelUrl ?? ''
        this.#ipAddress = data.ipAddress
        this.#userAgent = data.userAgent
        this.#expiration = data.expiration ?? dayjs().add(30, 'minutes').toISOString()
        if(data.fields) this.fields = data.fields // TODO: fix typing on this and how we will handle this
    }

    getFields(){
        return {
            locale: this.#locale,
            buyer: this.#buyer,
            payment: this.#payment,
            returnUrl: this.#returnUrl,
            paymentMethod: this.#paymentMethod,
            cancelUrl: this.#cancelUrl,
            ipAddress: this.#ipAddress,
            userAgent: this.#userAgent,
            expiration: this.#expiration,
        }
    }

    get locale(){
        return this.#locale
    }
    get language(){
        return this.#locale.substring(0,2).toUpperCase()
    }
    get cancelUrl(){
        return this.#cancelUrl
    }
    get userAgent(){
        return this.#userAgent
    }
    get returnUrl(){
        return this.#returnUrl
    }
    get ipAddress(){
        return this.#ipAddress
    }
    buyer(){
        return this.#buyer
    }
    get expiration(){
        return this.#expiration
    }
    get paymentMethod(){
        return this.#paymentMethod
    }
    reference(){
        return this.#payment.reference
    }

    setLocale(locale){
        this.#locale = locale
        return this
    }

    setReturnUrl(returnUrl){
        this.#returnUrl = returnUrl
        return this
    }

    setCancelUrl(cancelUrl){
        this.#cancelUrl = cancelUrl
        return this
    }

    setExpiration(expiration){
        this.#expiration = expiration
        return this
    }

    setUserAgent(userAgent){
        this.#userAgent = userAgent
        return this
    }

    setIpAddress(ipAddress){
        this.#ipAddress = ipAddress
        return this
    }
}

module.exports = RedirectRequest