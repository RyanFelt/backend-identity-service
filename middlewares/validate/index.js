const {
  ValidationError,
  resolveErrorSendResponse,
} = require('../../controllers/utils/errors');
const validationSchema = require('./validationSchema');

const requiredFields = param => {
  if (!param || param < 1 || param === 'undefined') {
    return false;
  }
  return true;
};

const checkEmail = param => {
  const regex = /\S+@\S+/; // Just checks for @
  if (!regex.test(param)) {
    return false;
  }
  return true;
};

const checkPassword = param => {
  if (param.length < 5) {
    return false;
  }
  return true;
};

exports.validate = (req, res, next) => {
  try {
    const path = req.path.split('/')[1];
    if (!validationSchema[path]) {
      return next();
    }

    const schema = validationSchema[path];

    for (let x = 0; x < schema.length; x += 1) {
      let param = req[schema[x].param][schema[x].field];

      // Makes sure required fields are present and valid
      if (schema[x].required === true && !requiredFields(param)) {
        throw new ValidationError(`${schema[x].field.toLowerCase()} is required`);
      }

      // Makes sure email is valid format
      if (schema[x].field === 'email') {
        param = param.trim().toLowerCase();
      }
      if (schema[x].field === 'email' && !checkEmail(param)) {
        throw new ValidationError('invalid email');
      }

      //  Makes sure password is valid format
      if (
        // eslint-disable-next-line operator-linebreak
        (schema[x].field === 'password' || schema[x].field === 'newPassword') &&
        !checkPassword(param)
      ) {
        throw new ValidationError('invalid password');
      }
    }

    return next();
  } catch (e) {
    return resolveErrorSendResponse(e, res);
  }
};
