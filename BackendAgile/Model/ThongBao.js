const mongoose = require('mongoose');

const ThongBaoSchema = mongoose.Schema(
  {
    idBaiViet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BaiViet',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    noiDungTB: {
      type: String,
      required: true,
    },
    thoiGianTB: {
      type: Date,
      required: true,
    },
    anhThongBao: {
      type: String,
      required: true,
    },
  },
  { collection: 'thong_bao' }
);

module.exports = mongoose.model('ThongBao', ThongBaoSchema);
