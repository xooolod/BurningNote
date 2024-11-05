import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

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