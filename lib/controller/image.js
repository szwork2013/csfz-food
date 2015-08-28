/**
 * Created by yuyangyang on 2015/7/23.
 */
var formidable = require('formidable');
var imageService = require('../service/image');

var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
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
            form.uploadDir = path.join(process.cwd(), 'uploads');
            form.keepExtensions = true;
            var userId = req.session.user._id;

            form.parse(req, function (err, fields, files) {
                var filepath = files.file.path;
                var data = fs.readFileSync(filepath);

                var dimensions = sizeOf(filepath);

                imageService.addImage({
                    data: data,
                    contentType: files.file.type,
                    filename: files.file.name,
                    adder: userId,
                    width: dimensions.width,
                    height: dimensions.height,
                    size:files.file.size
                }).then(function (image) {
                    res.json({
                        code: Constants.resCode.COMMON,
                        data: {
                            imageId: image._id,
                            width: image.width,
                            height: image.height
                        }
                    });
                });

            });


        }
    }
};