module.exports = {
    calcuImageSize: function (imgWidth, imageHeight, destWidth, desHeight) {
        if (!imgWidth || !imageHeight || !destWidth || !desHeight) {
            return {};
        }
        var rate = destWidth / desHeight;

        if (imgWidth > imageHeight * rate && imgWidth > destWidth) {
            return {width: destWidth};
        }

        if (imgWidth <= imageHeight * rate && imageHeight > desHeight) {
            return {height: desHeight};
        }

        return {};
    }
};
