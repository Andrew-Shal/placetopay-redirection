// ------- Message Types ---------
/**
 * @typedef {Object} BuyerData
 * @property {string} name -
 */

/**
 * @typedef {Object} PaymentData
 * @property {string}
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
 */

/**
 * @typedef {Object} RedirectResponseData
 * @property {string} requestId -
 * @property {string} processUrl -
 * @property {Status} status -
 */


/**
 * @typedef {Object} NotificationResponseData
 * @property {string} requestId -
 * @property {string} reference -
 * @property {string} signature -
 * @property {Status} status -
 */
// ------- Message Types ---------


// ------- Configuration Types ---------
/**
 * @typedef AxiosInstance {import('axios').AxiosInstance}
 * @typedef {import('winston').Logger} WinstonLogger
 */

/**
 * @typedef {Object} ConfigurationData
 * @property {string} baseUrl -
 * @property {string} login -
 * @property {string} tranKey -
 * @property {?AxiosInstance} client -
 * @property {number?} timeout -
 * @property {?WinstonLogger} logger -
 */

// ------- Configuration Types ---------

// ------- Carrier Types ---------
/**
 * @typedef {Object} AuthConfigurationData
 * @property {string} login
 * @property {string} tranKey
 * @property {string} algorithm
 * @property {Object} auth
 * @property {boolean} overridden
 * #login; #tranKey; #algorithm; #auth; #overridden;
 */
// ------- Carrier Types ---------


