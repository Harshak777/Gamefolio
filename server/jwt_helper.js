const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (uid, name) => {
        return new Promise((resolve, reject) => {
            const payload = {
                uid, name
            }
            const secret = "sorgavaasal";
            const options = {
                expiresIn: "1d",
                issuer: "gamefolio.com",
                audience: ""+uid,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err);
                resolve(token);
            })
        })
    },

    verifyAccessToken: (accessToken) => {
        return new Promise((resolve, reject) => {
            const payload = {
                
            }
            const secret = "sorgavaasal";
            JWT.verify(accessToken, secret, (err, decoded) => {
                if(err) return reject(err);
                resolve(decoded);
            })
        })
    }
}