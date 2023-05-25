const mongoose = require("mongoose");

const BaiVietSchema = mongoose.Schema(
  {
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    noiDung: {
      type: String,
      required: true,
    },
    anhBaiViet: {
      type: String,
      required: true,
    },
    arr_binhLuan: {
      type: Array,
      required: false,
    },
    arr_tuongTac: {
      type: Array,
      required: false,
    },
    soLuongChiaSe: {
      type: Number,
      required: true,
    },
    soLuongBaoCao: {
      type: Number,
      required: true,
    },
    thoiGian: {
      type: Date,
      required: true,
    },
    viTriBaiViet: {
      type: String,
      required: true,
    },
  },
  { collection: "bai_viet" }
);

module.exports = mongoose.model("BaiViet", BaiVietSchema);
