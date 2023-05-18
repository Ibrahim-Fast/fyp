const sharp = require('sharp');

const get_thumbnail_Base64 = async (base64String, maxWidth, maxHeight, backgroundColor) => {
    const buffer = Buffer.from(base64String, 'base64');
    // console.log('0',base64String.length)
    const image = sharp(buffer);
    let metadata = await image.metadata();
    // console.log('1',metadata)
    const thumbnailBuffer = await sharp(buffer)
        .resize({
            width: maxWidth, 
            height: maxHeight, 
            fit: "cover",
            background: { r: backgroundColor.r, g: backgroundColor.g, b: backgroundColor.b, alpha: backgroundColor.alpha }
        })
        .extend({
            top: Math.max(0, Math.floor((maxHeight - metadata.height) / 2)),
            bottom: Math.max(0, Math.ceil((maxHeight - metadata.height) / 2)),
            left: Math.max(0, Math.floor((maxWidth - metadata.width) / 2)),
            right: Math.max(0, Math.ceil((maxWidth - metadata.width) / 2)),
            background: { r: backgroundColor.r, g: backgroundColor.g, b: backgroundColor.b, alpha: backgroundColor.alpha }
        })
        .toBuffer();
    
    const thumbnailBase64 = thumbnailBuffer.toString('base64');
    // console.log('3',thumbnailBase64.length)

    return thumbnailBase64;
}


module.exports = get_thumbnail_Base64