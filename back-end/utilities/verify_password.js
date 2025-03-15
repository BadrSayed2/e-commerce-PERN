import crypto from 'crypto';

function isPasswordsEqual(password, salt, hash) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 31, 11, 'sha256', (err, hashedPassword) => {
            if (err) {
                reject(err);  
                return;
            }

            resolve(hash === hashedPassword.toString('hex'));
        });
    });
}

export default isPasswordsEqual;