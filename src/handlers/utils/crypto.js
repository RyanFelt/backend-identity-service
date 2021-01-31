const crypto = require('crypto');
const constants = require('../../constants');

const {
  IS_ENCRYPT_KEY,
  IS_ENCRYPT_PASSWORD_KEY,
  IS_CIPHER_ALGORITHM,
  IS_INPUT_ENCODING,
  IS_OUTPUT_ENCODING,
} = constants;

exports.encrypt = (text, password) => {
  let encryptKey = IS_ENCRYPT_KEY;
  if (password) encryptKey = IS_ENCRYPT_PASSWORD_KEY;

  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(IS_CIPHER_ALGORITHM, encryptKey, iv);
  let crypted = cipher.update(text, IS_INPUT_ENCODING, IS_OUTPUT_ENCODING);
  crypted += cipher.final(IS_OUTPUT_ENCODING);
  return `${iv.toString(IS_OUTPUT_ENCODING)}:${crypted.toString()}`;
};

exports.checkPassword = (password, encryptedDBPassword) => {
  try {
    const encryptedDBPasswordSplit = encryptedDBPassword.split(':');
    const iv = Buffer.from(encryptedDBPasswordSplit[0], IS_OUTPUT_ENCODING);
    const cipher = crypto.createCipheriv(
      IS_CIPHER_ALGORITHM,
      IS_ENCRYPT_PASSWORD_KEY,
      iv,
    );

    let crypted = cipher.update(password, IS_INPUT_ENCODING, IS_OUTPUT_ENCODING);
    crypted += cipher.final(IS_OUTPUT_ENCODING);
    const encryptPassword = `${iv.toString(
      IS_OUTPUT_ENCODING,
    )}:${crypted.toString()}`;

    if (encryptPassword === encryptedDBPassword) return true;
    return false;
  } catch (e) {
    return false;
  }
};

exports.decrypt = (text, password) => {
  try {
    let encryptKey = IS_ENCRYPT_KEY;
    if (password) encryptKey = IS_ENCRYPT_PASSWORD_KEY;

    const textArr = text.split(':');

    const iv = Buffer.from(textArr[0], IS_OUTPUT_ENCODING);
    const encryptedpassword = Buffer.from(textArr[1], IS_OUTPUT_ENCODING);

    const decipher = crypto.createDecipheriv(IS_CIPHER_ALGORITHM, encryptKey, iv);
    let decrypted = decipher.update(
      encryptedpassword,
      IS_OUTPUT_ENCODING,
      IS_INPUT_ENCODING,
    );
    decrypted += decipher.final(IS_INPUT_ENCODING);
    return decrypted.toString();
  } catch (e) {
    return false;
  }
};
