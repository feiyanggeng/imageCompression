// import Jimp from 'jimp';    // 无法无损压缩
// import sharp from 'sharp';  // 需要底层库
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';
// import imagemin from 'imagemin';
// import images from 'images'; // mac arm 上不行

const { exec } = require("child_process");
const path = require("path");

const imageCompression = () => {
    // sharp(image.fsPath)
    // .jpeg({quality: 50})
    // .toFile(path + `/${parsedPath.base}`, (err, info) => {
    //     statusBarItem.hide();

    //     if (err) {
    //         vscode.window.showInformationMessage(`Image compressed fail! `);
    //     }
    //     else {
    //         vscode.window.showInformationMessage(`Image compressed successfully! `);
    //     }
    // });

    // Jimp.read(image.fsPath).then((lenna) => {
    //     lenna
    //         .scale(0.3)
    //         .write(path + `/${parsedPath.name}.png`, () => {
    //             vscode.window.showInformationMessage(`Image compressed successfully! `);
    //             statusBarItem.hide();
    //         });
    //   })
    //   .catch((err) => {
    //     statusBarItem.hide();
    //     console.error(err);
    //   });

    // images(image.fsPath).save(path+'/'+parsedPath.base, {
    //     quality: 50
    // });

    // imagemin([image.fsPath], {
    //     plugins: [
    //         imageminJpegtran(),
    //         imageminPngquant({
    //             quality: [0.3, 0.5],
    //             strip: true,
    //         })
    //     ]
    // })
    // .then((files: any[]) => {
    //     fs.writeFile(path + `/${parsedPath.base}`, files[0].data, () => {
    //         vscode.window.showInformationMessage(`Image compressed successfully! `);
    //     });
    // })
    // .catch((err: any) => {
    //     vscode.window.showInformationMessage(`Error compressing image ${JSON.stringify(err)}`);
    // })
    // .finally(() => {
    //     statusBarItem.hide();
    // });
};

const pngquant = path.join(__dirname, '../../bin');
const output = path.join(__dirname, '../../');

function start() {
    exec(`${pngquant}/libpng_osx/pngquant --quality=30-35 /Users/didi/Documents/项目/didichuxing/image/松枝-1.jpg-fs8.png`,
    {shell: true},
    (error, stdout, stderr)=> {
        if (error) {
            console.log(error);
        }
        else {
            console.log('success');
        }
    }
    );
}


start();
