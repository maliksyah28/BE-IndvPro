const bcrypt = require("bcryptjs");

//encrypsi data asli
const hash = (value) => {
  return bcrypt.hashSync(value);
};
//pembanding data di database dengan data yg di isi client (frontend)
const compare = (value, hash) => {
  return bcrypt.compareSync(value, hash);
};

module.exports = { hash, compare };
