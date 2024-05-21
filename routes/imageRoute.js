import express from 'express';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage: storage});

const imagerouter = express.Router();

imagerouter.post('/', upload.single('file'), function (req, res) {
    res.json({});
});

export default imagerouter;