const Place = require('../models/PlaceModel'); 
const Hotel = require('../models/HotelsModel'); // Hotel model
const BikeRental = require('../models/BikeRentalModel'); // BikeRental model
const PetrolStation = require('../models/PetrolStationModel'); // PetrolStation model
const { getSeason } = require('../helper/SeasonCount');
// Controller to search places by name or state
const getSearchPlaces = async (req, res) => {
  const { query, page = 1, limit } = req.query; // Default to page 1 and limit 10

  if (!query) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the number of results to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Search for places matching the query in name or state (case insensitive)
    const places = await Place.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { 'location.state': { $regex: query, $options: 'i' } } 
      ]
    }).skip(skip).limit(limitNumber);

    // Check if places were found
    if (places.length === 0) {
      return res.status(404).json({ error: 'No places found matching the search criteria' });
    }

    // Get the total number of places to calculate total pages
    const totalPlaces = await Place.countDocuments({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { 'location.state': { $regex: query, $options: 'i' } }
      ]
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalPlaces / limitNumber);

    // Send the found places along with pagination details
    res.status(200).json({
      places,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPlaceById = async (req, res) => {
  const { placeId } = req.params; // Extract placeId from request parameters

  try {
      const place = await Place.findOne({ place_id: placeId }); // Find place by place_id

      if (!place) {
          return res.status(404).json({ error: "Place not found" }); // Return 404 if place not found
      }

      res.status(200).json(place); // Return place data if found
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

const getHotelById = async (req, res) => {
  const { hotelId } = req.params; // Extract placeId from request parameters

  try {
      const hotel = await Hotel.findOne({ hotel_id: hotelId }); // Find place by place_id

      if (!hotel) {
          return res.status(404).json({ error: "Hotel not found" }); // Return 404 if place not found
      }

      res.status(200).json(hotel); // Return place data if found
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

const getRentalById = async (req, res) => {
  const { rentalId } = req.params; // Extract placeId from request parameters

  try {
      const bikeRental = await BikeRental.findOne({ bike_rental_id: rentalId }); // Find place by place_id

      if (!bikeRental) {
          return res.status(404).json({ error: "Bike Rental not found" }); // Return 404 if place not found
      }

      res.status(200).json(bikeRental); // Return place data if found
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

// Controller to fetch place data with nearby hotels, bike rentals, and petrol stations
const getPlaceWithNearbyServices = async (req, res) => {
  try {
      const { placeId, placeName, city } = req.query;
      // 1. Find place based on placeId, name, or city
      let placeQuery = {};
      if (placeId) {
          placeQuery.place_id = placeId; // Use place_id instead of _id
      } else if (placeName) {
          placeQuery.name = placeName;
      } else if (city) {
          placeQuery["location.city"] = city;
      }

      const place = await Place.findOne(placeQuery);

      if (!place) {
          return res.status(404).json({ message: "Place not foundmmm" });
      }

      // 2. Search for hotels and bike rentals in the same city as the place
      const hotelsPromise = Hotel.find({ "location.city": place.location.city });
      const bikeRentalsPromise = BikeRental.find({ "locationName": place.location.city });

      const [hotels, bikeRentals] = await Promise.all([
          hotelsPromise,
          bikeRentalsPromise,
      ]);

      // 3. Combine results and respond
      const response = {
          place,
          nearbyHotels: hotels,
          nearbyBikeRentals: bikeRentals,
      };

      res.status(200).json(response);
  } catch (error) {
      console.error("Error fetching place data:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// Fetch Featured Places based on Season
const fetchFeaturedPlaces = async (req, res) => {
  try {
    // Fetch only places with an average rating greater than 4.7
    const places = await Place.find({ average_rating: { $gt: 4.8 } });

    // Check if places were found
    if (!places || places.length === 0) {
      return res.status(404).json({ message: 'No places found with rating above 4.7.' });
    }

    // Respond with the fetched places
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching featured places:", error);
    res.status(500).json({ error: 'Error fetching featured places' });
  }
};


module.exports = {
  getSearchPlaces,
  getPlaceWithNearbyServices,
  getPlaceById,
  getHotelById,
  getRentalById,
  fetchFeaturedPlaces
};
