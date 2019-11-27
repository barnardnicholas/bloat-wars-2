/*
  the alternateCase function should take a string and return a string.
  Every other letter either capital or lower case, starting with a capital letter.
  
  'hello' would become 'HeLlO'
  'hello world' would become 'HeLlO wOrLd'  
*/

const { monsterFunction } = require("./controllers/controllers-nested-2.js");

function alternateCase(string) {
  let result = "";
  monsterFunction(string, (err, response) => {
    if (err) return err;
    else {
      console.log(response);
      result = response;
    }
  });
  return result;
}

const result = alternateCase("FULLY CAPITALIZED STRING WITH MANY LETTERS");
console.log("Result:", result);

module.exports = alternateCase;
