/// <reference path="typedefs.js" />

const { StatusHelper } = require('../Models/Status')
const Transaction = require('../Models/Transaction')
const RedirectRequest = require("./RedirectRequest");
class RedirectInformation {
    #requestId; #request; #payment = []; #statusHelper;
    
    constructor(data) {
        this.#statusHelper = new StatusHelper(data.status)
        this.#requestId = data.request
        
        if(data.request) this.#request = new RedirectRequest(data.request)
        
        if(data.payment) this.setPayment(data.payment)
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
     * @returns {Object}
     */
    get request(){
        return this.#request
    }

    /**
     * 
     * @returns {[] | Transaction[]}
     */
    get payment(){
        return this.#payment
    }

    /**
     * 
     * @param {Object} payments
     * @returns {RedirectInformation}
     */
    setPayment(payments){
        if(payments){
            this.#payment = []
            
            if(payments.transaction){
                payments = payments.transaction
            }
            
            payments.forEach(p => {
              this.#payment.push(new Transaction(p))
            })
        }
        return this
    }

    /**
     * 
     * @returns {*}
     */
    lastApprovedTransaction(){
        return this.lastTransaction(true)
    }

    /**
     * 
     * @param approved
     * @returns {any|null}
     */
    lastTransaction(approved = false){
        let transactions = this.payment
        
        if(Array.isArray(transactions) && transactions.length > 0){
            return approved ? transactions.find(t => t.isSuccessful) : transactions[0]
        }
        return null
    }

    /**
     * 
     * @returns {*|string}
     */
    lastAuthorization(){
        if(this.lastApprovedTransaction()){
            return this.lastApprovedTransaction().authorization() 
        }
        return ''
    }
    
    getFields(){
        return {
            requestId: this.requestId,
            status: this.statusHelper.status.getFields(),
            request: this.#request ? this.#request.getFields() : null,
            payment: this.payment ? this.payment.map(p => p.getFields()) : []
        }
    }
}

module.exports = RedirectInformation