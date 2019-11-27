const { monsterFunction } = require("../models/models.js");

const monsterController = (request, response) => {
  console.log(`Reached controller`);
  monsterFunction(request.params.string, (err, owners) => {
    if (err) next(err);
    else {
      response.status(200).send(owners);
    }
  });
};

module.exports = {
  monsterController
};
