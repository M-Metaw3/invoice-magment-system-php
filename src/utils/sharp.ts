// sharp.ts
const sharp= require('sharp');
const path = require('path');

// create a function to resize an image file to 300kb
export const resizeImage = async (file: Express.Multer.File) => {
  // get the file name and extension
  const fileName = path.parse(file.filename).name;
  const fileExt = path.parse(file.filename).ext;

  // define the output file name and path
  const outputFileName = `${fileName}-small${fileExt}`;
  const outputPath = path.join(file.destination, outputFileName);

  // resize the image using sharp
  await sharp(file.path)
    .resize({ width: 300, height: 300, fit: 'cover' })
    .toFile(outputPath);

  // return the output file name and path
  return { outputFileName, outputPath };
};
