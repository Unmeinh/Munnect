const mongoose = require('mongoose');

const VaiTroNguoiDungSchema = mongoose.Schema(
  {
    id_hoiNhom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HoiNhom',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    vaiTro: {
      type: String,
      required: true,
    },
  },
  { collection: 'vai_tro_nguoi_dung' }
);

module.exports = mongoose.model('VaiTroNguoiDung', VaiTroNguoiDungSchema);
