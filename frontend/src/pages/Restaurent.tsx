import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, AlertCircle } from 'lucide-react';

// Types
interface Restaurant {
  id: string;
  name: string;
  location?: string | null;
  rating?: number | null;
  description?: string | null;
  imageUrl?: string | null;
}

interface ApiResponse {
  message: string;
  restaurant: Restaurant[];
}

const Restaurant: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual backend URL
  const API_BASE_URL = 'http://localhost:4000';

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${token}`
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Debug: Log the response to see what we're getting
      console.log('API Response:', data);
      
      // Check if data exists and has the expected structure
      if (data && Array.isArray(data.restaurant)) {
        // Add IDs if they don't exist
        const restaurantsWithIds = data.restaurant.map((restaurant, index) => ({
          ...restaurant,
          id: restaurant.id || `restaurant-${index}` // Generate ID if missing
        }));
        setRestaurants(restaurantsWithIds);
      } else if (Array.isArray(data)) {
        // If the API returns array directly instead of wrapped in restaurant property
        const restaurantsWithIds = (data as Restaurant[]).map((restaurant, index) => ({
          ...restaurant,
          id: restaurant.id || `restaurant-${index}`
        }));
        setRestaurants(restaurantsWithIds);
      } else {
        // If no valid data structure found
        console.warn('Unexpected API response structure:', data);
        setRestaurants([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
      console.error('Error fetching restaurants:', err);
      setRestaurants([]); // Ensure restaurants is always an array
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">No rating</span>;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading restaurants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRestaurants}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Restaurants</h1>
          <p className="text-gray-600 text-lg">
            Discover {restaurants?.length || 0} amazing dining experiences
          </p>
        </div>

        {!restaurants || restaurants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Check back later for new additions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {restaurant.imageUrl ? (
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {restaurant.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {restaurant.name || 'Unknown Restaurant'}
                  </h3>
                  
                  {restaurant.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{restaurant.location}</span>
                    </div>
                  )}
                 
                  
                  <div className="mb-4">
                    {renderStars(restaurant.rating ?? null)}
                  </div>
                  
                  {restaurant.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {restaurant.description}
                    </p>
                  )}
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;