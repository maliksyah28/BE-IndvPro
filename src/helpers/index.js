const isFieldEmpties = (fields) => {
  // fields : {username: "", password: "password", image: undefined}
  // keys : [ 'username', 'password', 'image' ]
  const filteredKeys = Object.keys(fields).filter(
    // filteredKeys : [ 'username', 'image' ]
    (key) => fields[key] == "" || fields[key] == undefined
  );

  return filteredKeys; // ['username']
};

// const checkPasswordValidity = (value) => {
//   const isContainsWhiteSpace = /\s/;
//   if (isContainsWhiteSpace.test(value)) {
//     return "Password must not contain Whitespaces.";
//   }

//   const isContainsUppercase = /^(?=.[A-Z]).$/;
//   if (!isContainsUppercase.test(value)) {
//     return "Password must have at least one Uppercase Character.";
//   }

//   const isContainsLowercase = /^(?=.[a-z]).$/;
//   if (!isContainsLowercase.test(value)) {
//     return "Password must have at least one Lowercase Character.";
//   }

//   const isContainsNumber = /^(?=.[0-9]).$/;
//   if (!isContainsNumber.test(value)) {
//     return "Password must contain at least one Digit.";
//   }

//   const isContainsSymbol = /^(?=.[~`!@#$%^&()--+={}[]|\:;"'<>,.?]).$/;
//   if (!isContainsSymbol.test(value)) {
//     return "Password must contain at least one Special Symbol.";
//   }

//   const isValidLength = /^.{8,16}$/;
//   if (!isValidLength.test(value)) {
//     return "Password must be 8-16 Characters Long.";
//   }

//   return null;
// };
module.exports = { isFieldEmpties };
