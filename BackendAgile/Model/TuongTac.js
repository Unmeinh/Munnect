const mongoose = require("mongoose");

const TuongTacSchema = mongoose.Schema(
  {
    idBaiViet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaiViet",
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    trangThai: {
      type: String,
      required: true,
    },
  },
  { collection: "tuong_tac" }
);

module.exports = mongoose.model("TuongTac", TuongTacSchema);
