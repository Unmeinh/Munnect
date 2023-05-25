const BaiViet = require("../Model/BaiViet");

const listBaiViet = async (filter) => {
  const pipeline = [
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "nguoi_dung",
        localField: "idNguoiDung",
        foreignField: "_id",
        as: "idNguoiDung",
      },
    },
    {
      $unwind: { path: "$idNguoiDung", preserveNullAndEmptyArrays: false },
    },
  ];
  return await BaiViet.aggregate(pipeline);
};

module.exports = {
  listBaiViet,
};
