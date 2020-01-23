// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const { validate } = require('../middlewares/validate');

const { IS_PORT } = process.env;

const app = express();

const identityService = require('../routes');

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(validate);

app.use('/', identityService);

exports.server = app.listen(IS_PORT, () => {
  console.log(`
'####'########:'########'##::: ##'########'####'########'##:::'##:
. ##::##.... ##:##.....::###:: ##... ##..:. ##:... ##..:. ##:'##::
: ##::##:::: ##:##:::::::####: ##::: ##:::: ##:::: ##::::. ####:::
: ##::##:::: ##:######:::## ## ##::: ##:::: ##:::: ##:::::. ##::::
: ##::##:::: ##:##...::::##. ####::: ##:::: ##:::: ##:::::: ##::::
: ##::##:::: ##:##:::::::##:. ###::: ##:::: ##:::: ##:::::: ##::::
'####:########::########:##::. ##::: ##:::'####::: ##:::::: ##::::
....:........::........:..::::..::::..::::....::::..:::::::..:::::
`);
  console.log(`---- Server running at localhost:${IS_PORT} ----`);
});
