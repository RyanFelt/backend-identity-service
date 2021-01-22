const express = require('express');
const constants = require('./constants');
const {
  registration,
  signIn,
  refresh,
  signOut,
  changePassword,
  verifyEmail,
} = require('./');

const { IS_PORT } = constants;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));

app.post('/registration', registration);
app.post('/signIn', signIn);
app.get('/refresh', refresh);
app.get('/signOut', signOut);
app.post('/changePassword', changePassword);
app.get('/verifyEmail', verifyEmail);

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
