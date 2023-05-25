var express = require("express");
var BaiVietController = require("../Controller/BaiViet");
var router = express.Router();

router.get("/listBaiViet/:idNguoiDung", BaiVietController.listBaiViet);

module.exports = router;
