const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encrypPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passpoison = await bcrypt.hash(password, salt);
    return passpoison;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};


module.exports = helpers;