const mongoose = require('mongoose');

const BaoCaoSchema = mongoose.Schema(
  {
    idBaiViet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BaiViet',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    noiDungBC: {
      type: String,
      required: true,
    },
  },
  { collection: 'bao_cao' }
);

module.exports = mongoose.model('BaoCao', BaoCaoSchema);
