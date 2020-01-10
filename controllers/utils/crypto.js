const crypto = require('crypto');

exports.encrypt = (text, password) => {
  let encryptKey = process.env.IS_ENCRYPT_KEY;
  if (password) encryptKey = process.env.IS_ENCRYPT_PASSWORD_KEY;

  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(process.env.IS_CIPHER_ALGORITHM, encryptKey, iv);
  let crypted = cipher.update(text, process.env.IS_INPUT_ENCODING, process.env.IS_OUTPUT_ENCODING);
  crypted += cipher.final(process.env.IS_OUTPUT_ENCODING);
  return `${iv.toString(process.env.IS_OUTPUT_ENCODING)}:${crypted.toString()}`;
};

exports.checkPassword = (password, encryptedDBPassword) => {
  try {
    const encryptedDBPasswordSplit = encryptedDBPassword.split(':');
    const iv = Buffer.from(encryptedDBPasswordSplit[0], process.env.IS_OUTPUT_ENCODING);
    const cipher = crypto.createCipheriv(
      process.env.IS_CIPHER_ALGORITHM,
      process.env.IS_ENCRYPT_PASSWORD_KEY,
      iv,
    );

    let crypted = cipher.update(
      password,
      process.env.IS_INPUT_ENCODING,
      process.env.IS_OUTPUT_ENCODING,
    );
    crypted += cipher.final(process.env.IS_OUTPUT_ENCODING);
    const encryptPassword = `${iv.toString(process.env.IS_OUTPUT_ENCODING)}:${crypted.toString()}`;

    if (encryptPassword === encryptedDBPassword) return true;
    return false;
  } catch (e) {
    return false;
  }
};

exports.decrypt = (text, password) => {
  try {
    let encryptKey = process.env.IS_ENCRYPT_KEY;
    if (password) encryptKey = process.env.IS_ENCRYPT_PASSWORD_KEY;

    const textArr = text.split(':');

    const iv = Buffer.from(textArr[0], process.env.IS_OUTPUT_ENCODING);
    const encryptedpassword = Buffer.from(textArr[1], process.env.IS_OUTPUT_ENCODING);

    const decipher = crypto.createDecipheriv(process.env.IS_CIPHER_ALGORITHM, encryptKey, iv);
    let decrypted = decipher.update(
      encryptedpassword,
      process.env.IS_OUTPUT_ENCODING,
      process.env.IS_INPUT_ENCODING,
    );
    decrypted += decipher.final(process.env.IS_INPUT_ENCODING);
    return decrypted.toString();
  } catch (e) {
    return false;
  }
};
