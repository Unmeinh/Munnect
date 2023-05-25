const mongoose = require('mongoose');

const NguoiDungSchema = mongoose.Schema(
  {
    taiKhoan: {
      type: String,
      required: true,
    },
    matKhau: {
      type: String,
      required: true,
    },
    hoTen: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gioiTinh: {
      type: String,
      required: true,
    },
    sdt: {
      type: String,
      required: true,
    },
    queQuan: {
      type: String,
      required: true,
    },
    ngaySinh: {
      type: Date,
      required: true,
    },
    anhDaiDien: {
      type: String,
      required: true,
    },
    anhBia: {
      type: String,
      required: true,
    },
    arr_TheoDoi: {
      type: Array,
      required: true,
    },
    arr_NguoiTheoDoi: {
      type: Array,
      required: true,
    },
    arr_HoiNhom: {
      type: Array,
      required: true,
    },
  },
  { collection: 'nguoi_dung' }
);

module.exports = mongoose.model('NguoiDung', NguoiDungSchema);
