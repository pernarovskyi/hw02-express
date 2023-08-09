const multer = require("multer");
const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileName = `${uniquePrefix}_${file.originalname}`;
        cb(null, fileName)
    }
});

const limits = {
    fileSize: Math.pow(1024, 2) * 5
}

const upload = multer({
    storage,
    limits,
});

module.exports = upload;