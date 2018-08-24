const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');

const SRC = 'src';
const DIST = 'dist';

// console.log(process.argv);
// 注意，图片文件名称不能是中文
fs.readdir(SRC, function (err, files) {
    if (err) {
        console.error(err);
        return false;
    }
    let orign_files = [];
    files.forEach((item) => {
        if (/.*\.(jpg|png|gif)/.test(item)) {
            orign_files.push(`${SRC}/${item}`)
        }
    });
    (async () => {
        let result = await imagemin(orign_files, DIST, {
            plugins: [
                // jpg 设置
                imageminJpegRecompress({
                    accurate: true,//高精度模式
                    quality: "medium",//图像质量:low, medium, high and veryhigh;
                    method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
                    min: 70,//最低质量
                    loops: 0,//循环尝试次数, 默认为6;
                    progressive: false,//基线优化
                    subsample: "default"//子采样:default, disable;
                }),
                // png 设置
                imageminPngquant({ quality: '65-80' }),
                // gif 设置
                imageminGifsicle({
                    optimizationLevel: 3,
                }),
            ],
        });
        result = result.map(item => item.path)
        console.log(result);
    })();
})


