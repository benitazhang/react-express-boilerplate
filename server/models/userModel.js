const db = require('../../config/db');


// lookup account info with fb id
async function verifyAccount(facebookId){
    try {
        let result = await db.one('SELECT id FROM account WHERE facebook_id = $1', facebookId);
        return result.id;
    } catch (e) {
        // return null instead of throw e because not finding user in DB isnt really an error...just means this is the first time the user is signing in
        return null;
    }
}

// add account row
async function createAccount(userInfo){
    try {
        let result = await db.one('INSERT INTO account(first_name, last_name, email, facebook_id, created_at, picture) VALUES(${firstName}, ${lastName}, ${email}, ${fbId}, ${createdAt}, ${picture}) RETURNING id', userInfo);
        return result.id;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    verifyAccount,
    createAccount
}