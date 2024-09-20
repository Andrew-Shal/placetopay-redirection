const PlaceToPay = require('../PlaceToPay')
const winston = require('winston')
require('dotenv').config()

async function main(){
    // configure winston
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ],
    })
    
    const configuration = {
        login: process.env.P2P_LOGIN,
        tranKey: process.env.P2P_SECRET_KEY,
        baseUrl: process.env.P2P_BASE_URL,
        logger: logger,
    }
    
    try{
        const placeToPay = new PlaceToPay(configuration)
    
        const requestBody = {
            returnUrl: 'https://iisconnect.immigration.gov.bz/',
            ipAddress: '192.168.0.100',
            userAgent: 'This is a user agent',
            buyer: {
                name: 'my first name',
                surname: 'my last name',
                email: 'andrew.shal@gobmail.gov.bz',
                mobile: '5016244600',
            },
            payment: {
                reference: 'my-ref-num',
                description: `Payment on Belize Immigration - Long Stay Permit application - my-ref-num`,
                amount: {
                    currency: 'USD',
                    total: 250
                }
            },
        }
        
        // const response = await placeToPay.request(requestBody)
        // console.log(response)
        const response = await placeToPay.query(90745)
        console.log(response)
    }catch(error){
        console.log('[ERROR]', error)
        throw error
    }
}

main()
