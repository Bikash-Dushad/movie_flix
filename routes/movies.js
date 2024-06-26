const express = require('express');

const router = express.Router();
const moviesController = require('../controllers/movie_controller')

router.post('/addMovie', moviesController.addMovie)
router.get('/toggle-status/:id', moviesController.toggleWatched);
router.post('/rate-review/:id', moviesController.rateAndReview);
router.get('/edit/:id', moviesController.editPage);
router.post('/edit-movie/:id', moviesController.editMovie);
router.get('/delete-movie', moviesController.deleteMovie)
module.exports = router;