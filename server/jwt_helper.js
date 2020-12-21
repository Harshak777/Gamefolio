const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (uid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                
            }
            const secret = "sorgavaasal";
            const options = {
                expiresIn: "1d",
                issuer: "gamefolio.com",
                audience: toString(uid),
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            })
        })
    }
}