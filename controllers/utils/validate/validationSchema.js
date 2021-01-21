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

const passwordResetInitSchema = [
  {
    param: 'body',
    field: 'email',
    required: true,
  },
];

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

const refreshSchema = [
  {
    param: 'headers',
    field: 'authorization',
    required: true,
  },
];

module.exports = {
  registrationSchema,
  signInSchema,
  changePasswordSchema,
  signOutSchema,
  verifyEmailSchema,
  passwordResetInitSchema,
  changeEmailInitSchema,
  changeEmailConfirmSchema,
  refreshSchema,
};
