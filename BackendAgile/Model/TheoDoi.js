const mongoose = require('mongoose');

const TheoDoiSchema = mongoose.Schema(
  {
    idNguoiTheoDoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    idNguoiDung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
    },
    trangThai: {
      type: String,
      required: true,
    },
  },
  { collection: 'theo_doi' }
);

module.exports = mongoose.model('TheoDoi', TheoDoiSchema);
