/**
 * @namespace typedefs
 */

// ------- Message Types ---------
/**
 * @typedef {Object} BuyerData
 * @property {string} name -
 * @memberOf typedefs
 */

/**
 * @typedef {Object} PaymentData
 * @property {string}
 * @memberOf typedefs
 */

/**
 * @typedef {Object} RedirectRequestData
 * @property {string | undefined} locale -
 * @property {BuyerData} buyer -
 * @property {PaymentData} payment -
 * @property {string | undefined} cancelUrl -
 * @property {string} ipAddress -
 * @property {string} userAgent -
 * @property {string | undefined} expiration -
 * @property {string | undefined} paymentMethod -
 * @property {string} returnUrl -
 * @property {Object | undefined} fields -
 * @memberOf typedefs
 */

/**
 * @typedef {Object} RedirectResponseData
 * @property {string} requestId -
 * @property {string} processUrl -
 * @property {Object} status -
 * @memberOf typedefs
 */


/**
 * @typedef {Object} NotificationResponseData
 * @property {string} requestId -
 * @property {string} reference -
 * @property {string} signature -
 * @property {StatusData} status -
 * @memberOf typedefs
 */
// ------- Message Types ---------


// ------- Configuration Types ---------
/**
 * @type AxiosInstance {import('axios').AxiosInstance}
 * @typedef {import('winston').Logger} WinstonLogger
 */

/**
 * @typedef {Object} ConfigurationData
 * @property {string} baseUrl -
 * @property {string} login -
 * @property {string} tranKey -
 * @property {AxiosInstance | undefined} client -
 * @property {number | undefined} timeout -
 * @property {WinstonLogger | undefined} logger -
 * @memberOf typedefs
 */

// ------- Configuration Types ---------

// ------- Carrier Types ---------
/**
 * @typedef {Object} AuthConfigurationData
 * @property {string} login -
 * @property {string} tranKey -
 * @property {string | undefined} algorithm -
 * @property {Object | undefined} auth -
 * @property {boolean | undefined} overridden -
 * @memberOf typedefs
 */
// ------- Carrier Types ---------

/**
 * 
 * @typedef {Object} StatusData
 * @property {string} status -
 * @property {string} reason -
 * @property {string} message -
 * @property {string} date -
 * @memberOf typedefs
 */
exports.unused = {}

