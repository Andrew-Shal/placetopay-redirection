const {Status, StatusTypes} = require("./Status");

class Transaction{
    #reference; #internalReference = ''; #paymentMethod = ''; #paymentMethodName = '';
    #issuerName = ''; #discount = null; #amount; #authorization = ''; #receipt = '';
    #franchise = ''; #refunded = false;
    
    #status;
    
    #processorFields = [];
    
    constructor(data) {
        this.#reference = data.reference  
        this.#internalReference = data.internalReference  
        this.#paymentMethod = data.paymentMethod  
        this.#paymentMethodName = data.paymentMethodName  
        this.#issuerName = data.issuerName  
        this.#authorization = data.authorization  
        this.#receipt = data.receipt  
        this.#franchise = data.franchise  
        this.#refunded = data.refunded 
        
        this.#status = new Status(data.status)
        
        // TODO: set amount, discount and processor fields
    }
    
    get reference(){
        return this.#reference
    }
    
    get internalReference(){
        return this.#internalReference
    }
    
    get paymentMethod(){
        return this.#paymentMethod
    }
    
    get issuerName(){
        return this.#issuerName
    }
    
    get amount(){
        return this.#amount
    }
    
    get authorization(){
        return this.#authorization
    }
    
    get receipt(){
        return this.receipt
    }
    
    get franchise(){
        return this.#franchise
    }
    
    get processorFields(){
        return this.#processorFields
    }
    
    get refunded(){
        return this.#refunded
    }
    
    get discount(){
        return this.#discount
    }
    
    get isSuccessful(){
        return this.#status && this.#status.status !== StatusTypes.ST_ERROR
    }
    
    get isApproved(){
        return this.#status && this.#status.status === StatusTypes.ST_APPROVED
    }
    
    setProcessorFields(data){
        if(data.item){
            data = data.item
        }
        
        if(Array.isArray(data)){
            data.forEach(d => {
                // 'keyword: string', 'value: string|array', 'displayOn: string'
                this.#processorFields = d
            })
        }
        
        return this
    }
    
    get processorFieldsKeyValues(){
        if(this.processorFields){
            let kvPairs = {}
            this.processorFields.forEach(i => {
                kvPairs = i['keyword'] = i['value']
            })
            return kvPairs
        }
        return {}
    }
    
    getFields(){
        return {
            status: this.#status.getFields(),
            internalReference: this.internalReference,
            paymentMethod: this.paymentMethod,
            paymentMethodName: this.paymentMethodName,
            issuerName: this.issuerName,
            amount: this.amount ? this.amount : null, // TODO: get object not class
            authorization: this.authorization,
            reference: this.reference,
            receipt: this.receipt,
            refunded: this.refunded,
            discount: this.discount ? this.discount : null, // TODO: get object not class
            processorFields: this.processorFieldsKeyValues,
        }
    }
}

module.exports = Transaction