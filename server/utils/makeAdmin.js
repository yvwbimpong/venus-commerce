const admin = require('../firebase_admin');

const makeAdmin = async (uid) => {
    console.log({uid})
    const response = await admin.auth().setCustomUserClaims(uid, { admin: true })
    console.log({response})
} 

module.exports = {makeAdmin}