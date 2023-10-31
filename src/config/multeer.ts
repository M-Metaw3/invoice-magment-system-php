// multer.ts
const multer =require('multer');
const path= require( 'path');

// define your destination folder and file name
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, path.join(__dirname, '..', '..', 'public', 'images'));
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// create a multer instance with your storage options
export const upload = multer({ storage });
