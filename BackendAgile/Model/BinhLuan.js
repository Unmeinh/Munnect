const mongoose = require('mongoose');

const BinhLuanSchema = mongoose.Schema(
  {
    idBaiViet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BaiViet',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    noiDung: {
      type: String,
      required: true,
    },
  },
  { collection: 'binh_luan' }
);

module.exports = mongoose.model('BinhLuan', BinhLuanSchema);
