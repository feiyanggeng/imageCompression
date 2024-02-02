import fs from 'fs';

// 获取buffer
export const getBufferFromFile = (filePath: string): Promise<Buffer> => {
    return new Promise((resolve) => {
      fs.readFile(filePath, function (err: any, res: any) {
        if (!err) {
          resolve(res);
        }
      });
    });
};
