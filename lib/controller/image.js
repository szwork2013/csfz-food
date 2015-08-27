/**
 * Created by yuyangyang on 2015/7/23.
 */
var formidable = require('formidable');
var imageService = require('../service/image');

var fs = require('fs');
var Constants = require('../utils/constants');

module.exports = {
    mapping: '/image',
    get: {
        '/:imageId': function (req, res) {
            var imageId = req.params.imageId;

            imageService.queryImageById(imageId).then(function (image) {
                res.end(image.data);
            });
        }
    },
    post: {
        /**
         * 上传图片
         */
        '/upload': function (req, res) {
            var form = new formidable.IncomingForm();
            var userId = req.session.user._id;

            form.parse(req, function (err, fields, files) {
                var data = fs.readFileSync(files.file.path);

                imageService.addImage({
                    data: data,
                    contentType: files.file.type,
                    filename: files.file.name,
                    adder: userId
                }).then(function (image) {
                    res.json({
                        code: Constants.resCode.COMMON,
                        data: image._id
                    });
                });
            });


        }
    }
};