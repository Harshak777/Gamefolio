const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (uid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                
            }
            const secret = "sorgamvasal";
            const options = {
                expiresIn: "1d",
                issuer: "gamefolio.com",
                audience: uid,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            })
        })
    }
}