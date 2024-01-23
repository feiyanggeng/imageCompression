import path from 'path';
import fs from 'fs';
import * as vscode from 'vscode';
// import Jimp from 'jimp';    // 无法无损压缩
// import sharp from 'sharp';  // 需要底层库
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';
// import imagemin from 'imagemin';
// import images from 'images'; // mac arm 上不行

import webp from 'webp-converter';

function startMinImage(image: any, path: string, parsedPath: path.ParsedPath) {
       // 编辑器左下角显示压缩中的提示
	const statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left
	);
    statusBarItem.text = `Compression file ${image?.fsPath}`;
	statusBarItem.show();

    const result = webp.cwebp(image.fsPath, path + `/${parsedPath.name}.webp` ,"-q 50");

    result.then(() => {
        statusBarItem.hide();
        vscode.window.showInformationMessage(`Image compressed successfully!`);
    });

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
}

export default function imageCompression(image: any) {
    
    /**
     * {
            "root":"/",
            "dir":"/Users/didi/Documents/项目/didichuxing/image",
            "base":"挽留弹窗8.0小程序@3x.png",
            "ext":".png",
            "name":"挽留弹窗8.0小程序@3x"
        }
     */
	const parsedPath = path.parse(image.fsPath);
    let destinationImagePath = path.join(parsedPath.dir, 'image-min');

    if (!fs.existsSync(destinationImagePath)) {
        fs.mkdir(destinationImagePath, (err: any) => {
            if (err) {
                vscode.window.showInformationMessage('Failed to create a folder'+destinationImagePath);
            } else {
                vscode.window.showInformationMessage('successed to create a folder'+destinationImagePath);
                startMinImage(image, destinationImagePath, parsedPath);
            }
        });
    } else {
        startMinImage(image, destinationImagePath, parsedPath);
    }

}