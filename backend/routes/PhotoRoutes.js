const express = require('express')
const photoController = require('./../controllers/PhotoController')
const router = express.Router()

router
    .route('/')
    .get(photoController.getAllPhotos)
    .post(photoController.uploadUserPhoto, photoController.createPhoto)

router
    .route('/:id')
    .get(photoController.getPhoto)
    .patch(photoController.updatePhoto)
    .delete(photoController.deletePhoto)

module.exports = router