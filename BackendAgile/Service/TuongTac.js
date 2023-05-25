const TuongTac = require("../Model/TuongTac");

const listTuongTac = async (filter) => {
  const pipeline = [
    {
      $match: filter,
    },
  ];
  return await TuongTac.aggregate(pipeline);
};

module.exports = {
  listTuongTac,
};
