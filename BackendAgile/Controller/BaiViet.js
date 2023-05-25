const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const baiVietService = require("../Service/BaiViet");
const tuongTacService = require("../Service/TuongTac");

const listBaiViet = async (req, res) => {
  try {
    console.log("req.idNguoiDung: " + req.params.idNguoiDung);
    let filter = {};
    let filterTT = { idNguoiDung: new ObjectId(req.params.idNguoiDung) };

    const listBaiViet = await baiVietService.listBaiViet(filter);
    const listTuongTac = await tuongTacService.listTuongTac(filterTT);
    console.log("listBaiViet: ", listBaiViet);

    res.status(200).json({
      success: true,
      data: {
        listBaiViet: listBaiViet,
        listTuongTac: listTuongTac,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  listBaiViet,
};
