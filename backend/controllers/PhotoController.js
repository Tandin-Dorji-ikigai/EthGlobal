const Photo = require('./../models/CandidatePhoto')
const multer = require("multer")

exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find()
        res.status(200).json({ data: photos, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createPhoto = async (req, res) => {
    try {
        if (req.file) {
            req.body.photo = req.file.path
        }
        const photo = await Photo.create(req.body);
        res.json({ data: photo, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        res.json({ data: photo, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndUpdate(req.params.id, req.body);
        if (!photo) {
            return res.status(404).json({ status: "error", message: "Photo not found" });
        }
        res.json({ data: photo, status: "success" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};



exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        res.json({ data: photo, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1]
        cb(null, `candidate-${Date.now()}.${ext}`)
    }
})

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new AppError("Not an image! Please upload only images", 400), false)
    }
}

const upload = multer({
    storage: storageEngine,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single("photo")