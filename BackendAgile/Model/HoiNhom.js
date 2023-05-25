const mongoose = require('mongoose');

const HoiNhomSchema = mongoose.Schema(
  {
    id_chuNhom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    arr_nguoiDung: {
      type: Array,
      required: true,
    },
    arr_baiViet: {
      type: Array,
      required: true,
    },
    gioiThieu: {
      type: String,
      required: true,
    },
  },
  { collection: 'hoi_nhom' }
);

module.exports = mongoose.model('HoiNhom', HoiNhomSchema);
