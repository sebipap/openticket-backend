const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { domain, audience } = require('../config/env.dev');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),

    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ['RS256'],
});


const getUserID = (token) => {
    const bearerToken = token.split(" ")[1];
    const base64Url = bearerToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const bearerData = JSON.parse(jsonPayload);
    return bearerData.sub
}


module.exports = {
    checkJwt,
    getUserID
};
