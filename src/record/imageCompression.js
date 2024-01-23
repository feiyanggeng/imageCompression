// import Jimp from 'jimp';    // 无法无损压缩
// import sharp from 'sharp';  // 需要底层库
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';
// import imagemin from 'imagemin';
// import images from 'images'; // mac arm 上不行

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
