const changeEmailInitSchema = [
  {
    param: 'headers',
    field: 'authorization',
    required: true,
  },
];

const changeEmailConfirmSchema = [
  {
    param: 'body',
    field: 'changeEmailHash',
    required: true,
  },
  {
    param: 'body',
    field: 'email',
    required: true,
  },
];

const changePasswordSchema = [
  {
    param: 'body',
    field: 'password',
    required: true,
  },
  {
    param: 'body',
    field: 'newPassword',
    required: true,
  },
];

const passwordResetInitSchema = [
  {
    param: 'body',
    field: 'email',
    required: true,
  },
];

const refreshSchema = [
  {
    param: 'headers',
    field: 'authorization',
    required: true,
  },
];

const registrationSchema = [
  {
    param: 'body',
    field: 'email',
    required: true,
  },
  {
    param: 'body',
    field: 'password',
    required: true,
  },
];

const signInSchema = [
  {
    param: 'body',
    field: 'email',
    required: true,
  },
  {
    param: 'body',
    field: 'password',
    required: true,
  },
];

const signOutSchema = [
  {
    param: 'headers',
    field: 'authorization',
    required: true,
  },
];

const verifyEmailSchema = [
  {
    param: 'query',
    field: 'emailHash',
    required: true,
  },
];

module.exports = {
  changeEmailInitSchema,
  changeEmailConfirmSchema,
  changePasswordSchema,
  passwordResetInitSchema,
  refreshSchema,
  registrationSchema,
  signInSchema,
  signOutSchema,
  verifyEmailSchema,
};
