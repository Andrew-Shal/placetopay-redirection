/// <reference path="typedefs.js" />

const dayjs = require('dayjs')

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
        let returnObj = {
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
        if(this.#cancelUrl !== '')  returnObj['cancelUrl'] = this.#cancelUrl
        
        return returnObj 
    }

    /**
     * 
     * @returns {string}
     */
    get locale(){
        return this.#locale
    }

    /**
     * 
     * @returns {string}
     */
    get language(){
        return this.#locale.substring(0,2).toUpperCase()
    }

    /**
     * 
     * @returns {string}
     */
    get cancelUrl(){
        return this.#cancelUrl
    }

    /**
     * 
     * @returns {string}
     */
    get userAgent(){
        return this.#userAgent
    }

    /**
     * 
     * @returns {string}
     */
    get returnUrl(){
        return this.#returnUrl
    }

    /**
     * 
     * @returns {string}
     */
    get ipAddress(){
        return this.#ipAddress
    }

    /**
     * 
     * @returns {Object}
     */
    buyer(){
        return this.#buyer
    }

    /**
     * 
     * @returns {string}
     */
    get expiration(){
        return this.#expiration
    }

    /**
     * 
     * @returns {string}
     */
    get paymentMethod(){
        return this.#paymentMethod
    }

    /**
     * 
     * @returns {string}
     */
    reference(){
        return this.#payment.reference
    }

    /**
     * 
     * @param {string} locale
     * @returns {RedirectRequest}
     */
    setLocale(locale){
        this.#locale = locale
        return this
    }

    /**
     * 
     * @param {string} returnUrl
     * @returns {RedirectRequest}
     */
    setReturnUrl(returnUrl){
        this.#returnUrl = returnUrl
        return this
    }

    /**
     * 
     * @param {string} cancelUrl
     * @returns {RedirectRequest}
     */
    setCancelUrl(cancelUrl){
        this.#cancelUrl = cancelUrl
        return this
    }

    /**
     * 
     * @param {string} expiration
     * @returns {RedirectRequest}
     */
    setExpiration(expiration){
        this.#expiration = expiration
        return this
    }

    /**
     * 
     * @param {string} userAgent
     * @returns {RedirectRequest}
     */
    setUserAgent(userAgent){
        this.#userAgent = userAgent
        return this
    }

    /**
     * 
     * @param {string} ipAddress
     * @returns {RedirectRequest}
     */
    setIpAddress(ipAddress){
        this.#ipAddress = ipAddress
        return this
    }
}

module.exports = RedirectRequest