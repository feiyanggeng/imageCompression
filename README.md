# image-compression 

### 简介
对要压缩的图片进行右键，出现 【图片压缩】的选项

点击 图片压缩 出现选择压缩成什么格式的文件 self 或 webp

self 是文件原本的格式

webp 格式（压缩效果较好）

进行图片压缩之后，vscode 右下角会提示 success 

之后会在 图片目录下生成一个 image-min 的目录，已压缩的图片就保存在这里

### 配置项

```
"image-compression": {
    "quality": 50,  // 图片压缩的质量 0 - 100 ，值越小 图片越小
    "destination": "" // 压缩之后图片保存的位置，默认是 选中文件的文件夹下的 image-min/ ; 自定义的话需要 填写 绝对路径, 比如： /User/Documents/workspace/image-comperssion/image-min/
}
```
