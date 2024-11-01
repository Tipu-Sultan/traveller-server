// routes/placeRoutes.js
const express = require('express');
const { getSearchPlaces, getPlaceWithNearbyServices, getPlaceById } = require('../controllers/placeController');
const router = express.Router();

router.get('/search', getSearchPlaces);
router.get('/:placeId', getPlaceById);
router.get('/place/services', getPlaceWithNearbyServices);


module.exports = router;
