const { Status } = require('../Models/Status')
const Transaction = require('../Models/Transaction')
const RedirectRequest = require("./RedirectRequest");
class RedirectInformation {
    #requestId; #request; #payment = []; #status;
    
    constructor(data) {
        this.#status = new Status(data.status)
        this.#requestId = data.request
        
        if(data.request) this.#request = new RedirectRequest(data.request)
        
        if(data.payment) this.setPayment(data.payment)
    }
    
    get requestId(){
        return this.#requestId
    }
    
    get request(){
        return this.#request
    }
    
    get payment(){
        return this.#payment
    }
    
    setPayment(payments){
        if(payments){
            this.$payment = []
            
            if(payments.transaction){
                payments = payments.transaction
            }
            
            payments.forEach(p => {
              this.#payment.push(new Transaction(p))
            })
        }
        return this
    }
    
    lastApprovedTransaction(){
        return this.lastTransaction(true)
    }
    
    lastTransaction(approved = false){
        let transactions = this.payment
        
        if(Array.isArray(transactions) && transactions.length > 0){
            return approved ? transactions.find(t => t.isSuccessful) : transactions[0]
        }
        return null
    }
    
    lastAuthorization(){
        if(this.lastApprovedTransaction()){
            return this.lastApprovedTransaction().authorization() 
        }
        return ''
    }
    
    getFields(){
        return {
            requestId: this.requestId,
            status: this.#status.getFields(),
            request: this.#request ? this.#request.getFields() : null,
            payment: this.payment.getFields()
        }
    }
}

module.exports = RedirectInformation