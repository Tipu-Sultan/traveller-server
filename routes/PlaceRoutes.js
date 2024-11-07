// routes/placeRoutes.js
const express = require('express');
const { getSearchPlaces, getPlaceWithNearbyServices, getPlaceById, getHotelById, getRentalById, fetchFeaturedPlaces, getSuggestions } = require('../controllers/placeController');
const router = express.Router();

router.get('/search', getSearchPlaces);
router.get('/suggestions', getSuggestions);
router.get('/:packageId', getPlaceById);
router.get('/hotel/:hotelId', getHotelById);
router.get('/bike-rental/:rentalId', getRentalById);
router.get('/place/services', getPlaceWithNearbyServices);
router.get('/place/featured', fetchFeaturedPlaces);



module.exports = router;
