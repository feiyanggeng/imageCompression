import path from 'path';
import fs from 'fs';
import * as vscode from 'vscode';
import { getBufferFromFile } from '../utils/tools';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imagemin from 'imagemin';
import webp from 'webp-converter';

type TType = 'self' |'webp';
interface ICostomConfig {
    quality: number
    destination: string
    type?: TType
    showSelection?: boolean  // 是否展示 quickpick
}

function imageMinPlugin(image: any, customConfig: ICostomConfig, parsedPath: path.ParsedPath) {
    return new Promise(async (resolve, reject) => {
        const bufferFile = await getBufferFromFile(image.fsPath);
        let res;
        try {
            res = await imagemin.buffer(bufferFile, {
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({
                        quality: [0, customConfig.quality/100],
                    }),
                ],
            });
        } catch (err) {
            vscode.window.showInformationMessage(JSON.stringify(err));
            
            reject(err);
            res = null;
            return;
        }
        fs.writeFile(customConfig.destination + `/${parsedPath.name}${parsedPath.ext}`, res, () => {
            resolve('success');
        });
    });
}

function webpPlugin(image: any, customConfig: ICostomConfig, parsedPath: path.ParsedPath) {
    return webp.cwebp(image.fsPath, customConfig.destination + `/${parsedPath.name}.webp` ,`-q ${customConfig.quality}`);
}

function startMinImage(image: any, customConfig: ICostomConfig, parsedPath: path.ParsedPath) {
       // 编辑器左下角显示压缩中的提示
	const statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left
	);
    statusBarItem.text = `Compression file ${image?.fsPath}`;
	statusBarItem.show();
    let result: Promise<any>;

    vscode.window.showInformationMessage(`${JSON.stringify(customConfig)}${customConfig.type}`);
    

    if (customConfig.type === 'webp') {
        result = webpPlugin(image, customConfig, parsedPath);
    } else {
        result = imageMinPlugin(image, customConfig, parsedPath);
    }

    result.then(() => {
        statusBarItem.hide();
        vscode.window.showInformationMessage(`Image compressed successfully!`);
    }).catch(() => {
        statusBarItem.hide();
        vscode.window.showInformationMessage(`Image compressed failly!`);
    });
}

/**
 * 创建 快速选择项
 */
async function createQuickPick(): Promise<TType> {
    return new Promise((resolve) => {
        const quickPick =  vscode.window.createQuickPick();
        quickPick.items = [
            {label: 'webp', description: '压缩为 webp 格式'},
            {label: 'self', description: '保持原来的格式 png jpg'},
        ];
        quickPick.show();

        quickPick.onDidChangeSelection((e: any) => {
            vscode.window.showInformationMessage(`${e[0].label}`);
            resolve(e[0].label);

            quickPick.hide();
        });
    });
}

/**
 * 读取配置信息
 * @param dir 文件的 文件夹目录
 * @returns 
 */
function readConfiguration(dir: string): ICostomConfig {

    let destinationImagePath = path.join(dir, 'image-min');
    const config = vscode.workspace.getConfiguration('image-compression') || {};

    const quality = config.quality || 50;   // 图片压缩的质量
    const destination = config.destination || destinationImagePath; // 压缩之后图片放置的地方 绝对路径

    const customConfig: ICostomConfig = {
        ...config,
        quality,
        destination
    };

    return customConfig;
}

export default async function imageCompression(image: any) {

    /**
     * 当 image 是 文件的时候的 结构
     * {
            "$mid":1,
            "fsPath":"/Users/didi/Documents/项目/didichuxing/image/松枝-1.jpg",
            "external":"file:///Users/didi/Documents/%E9%A1%B9%E7%9B%AE/didichuxing/image/%E6%9D%BE%E6%9E%9D-1.jpg",
            "path":"/Users/didi/Documents/项目/didichuxing/image/松枝-1.jpg",
            "scheme":"file"
        }
     */


    /**
     * parsedPath
     * {
            "root":"/",
            "dir":"/Users/didi/Documents/项目/didichuxing/image",
            "base":"挽留弹窗8.0小程序@3x.png",
            "ext":".png",
            "name":"挽留弹窗8.0小程序@3x"
        }
     */
	const parsedPath = path.parse(image.fsPath);

    const customConfig: ICostomConfig = readConfiguration(parsedPath.dir);

    vscode.window.showInformationMessage(`${customConfig.showSelection}`);

    if (customConfig.showSelection) {
        const type = await createQuickPick();
        customConfig.type = type || 'webp';
    }
    
    if (!fs.existsSync(customConfig.destination)) {
        fs.mkdir(customConfig.destination, (err: any) => {
            if (err) {
                vscode.window.showErrorMessage('Failed to create a folder'+customConfig.destination);
            } else {
                vscode.window.showInformationMessage('successed to create a folder'+customConfig.destination);
                startMinImage(image, customConfig, parsedPath);
            }
        });
    } else {
        startMinImage(image, customConfig, parsedPath);
    }

}