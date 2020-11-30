module.exports = {
    plugins: {
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        'postcss-pxtorem': {
            //转换的根元素基准值
            //测量设计稿时要将测量值除以二来用，因为我们的设计稿是750不是375
            //也可以图像大小更改设计稿基准值为375，要关闭重新采样，再利用单位与标尺将单位改成点
            rootValue: 37.5,
            //需要转化的css属性
            propList: ['*'],
        },
    },
};