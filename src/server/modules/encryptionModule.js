import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

/**
 * Function that encrypts a string with aes-256-cbc algorithm
 * and then returns an Object with initialization vector,
 * key and encrypted string
 * @param {String} text a string to be encrypted
 * @returns {Object} Initialization vector, key, encrypted string
 */

const encrypt = (text) => {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        key: key.toString('hex'),
        encryptedData: encrypted
    };
}

/**
 * Same function as the encryption one but this
 * one just decrypts the string using encrypted string,
 * key and IV
 * @param {String} encryptedData encrypted string
 * @param {String} key Key 
 * @param {String} iv IV 
 * @returns {String} decrypted string
 */

const decrypt = (encryptedData, key, iv) => {
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');

    decrypted += decipher.final('utf8');
    
    return decrypted;
}

export { 
    encrypt, 
    decrypt 
};