const mongoose = require('mongoose');

const ChiaSeSchema = mongoose.Schema(
  {
    idBaiViet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BaiViet',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
  },
  { collection: 'chia_se' }
);

module.exports = mongoose.model('ChiaSe', ChiaSeSchema);
