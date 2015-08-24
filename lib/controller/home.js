module.exports = {
    get: {
        /**
         * 首页
         */
        '/': function (req, res) {
            res.render(req.url, {
                channel: 'index',
                seo: {
                    title: '首页'
                }
            });

        }
    }
};