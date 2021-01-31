const express = require('express');
const constants = require('./constants');
const router = require('./routes');
const validate = require('./middlewares/validate');

const { IS_PORT } = constants;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(validate);
app.use('/api/identity', router);

app.listen(IS_PORT, () => {
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
