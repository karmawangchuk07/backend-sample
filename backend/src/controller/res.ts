import { Response, Request, RequestHandler } from "express";
import prisma from "../prisma";

// Interfaces for type safety
interface CreateRestaurantBody {
  name: string;
  location: string;
}

interface RestaurantResponse {
  id: string;
  name: string;
  location: string;
  reviews?: any[];
  menu?: any[];
}

interface ApiResponse<T> {
  message: string;
  data?: T;
  success: boolean;
}

// Create restaurant
export const res: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, location }: CreateRestaurantBody = req.body;

  // Input validation
  if (!name || !location) {
    res.status(400).json({
      message: "Name and location are required",
      success: false
    } as ApiResponse<null>);
    return;
  }

  try {
    // Check for existing restaurant
    const existing = await prisma.restaurant.findFirst({
      where: {
        name: name.trim(),
        location: location.trim()
      }
    });

    if (existing) {
      res.status(409).json({
        message: "Restaurant already exists with this name and location",
        success: false
      } as ApiResponse<null>);
      return;
    }

    // Create new restaurant
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: name.trim(),
        location: location.trim()
      }
    });

    res.status(201).json({
      message: "Restaurant created successfully",
      data: newRestaurant,
      success: true
    } as ApiResponse<RestaurantResponse>);

  } catch (err) {
    console.error("Error creating restaurant:", err);
    res.status(500).json({
      message: "Internal server error while creating restaurant",
      success: false
    } as ApiResponse<null>);
  }
};

// Get all restaurants
export const getAllRestaurants: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        review: true,
        menu: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Format response data
    const formattedRestaurants = restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
      reviewCount: restaurant.review?.length || 0,
      menuItemCount: restaurant.menu?.length || 0,
      // Include full data if needed
      reviews: restaurant.review,
      menu: restaurant.menu
    }));

    res.status(200).json({
      message: "Restaurants retrieved successfully",
      data: formattedRestaurants,
      success: true,
      count: formattedRestaurants.length
    });

  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({
      message: "Unable to retrieve restaurants",
      success: false
    } as ApiResponse<null>);
  }
};

// Get restaurant by ID
export const getRestaurantById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate ID parameter
  if (!id) {
    res.status(400).json({
      message: "Restaurant ID is required",
      success: false
    } as ApiResponse<null>);
    return;
  }

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id
      },
      include: {
        review: {
          orderBy: {
            // createdAt: 'desc' // Uncomment if you have createdAt field
          }
        },
        menu: true
      }
    });

    if (!restaurant) {
      res.status(404).json({
        message: "Restaurant not found",
        success: false
      } as ApiResponse<null>);
      return;
    }

    const formattedRestaurant = {
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
      reviews: restaurant.review,
      menu: restaurant.menu,
      reviewCount: restaurant.review?.length || 0,
      menuItemCount: restaurant.menu?.length || 0
    };

    res.status(200).json({
      message: "Restaurant retrieved successfully",
      data: formattedRestaurant,
      success: true
    });

  } catch (err) {
    console.error("Error fetching restaurant by ID:", err);
    res.status(500).json({
      message: "Internal server error while fetching restaurant",
      success: false
    } as ApiResponse<null>);
  }
};

// Optional: Update restaurant
export const updateRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!id) {
    res.status(400).json({
      message: "Restaurant ID is required",
      success: false
    } as ApiResponse<null>);
    return;
  }

  try {
    // Check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id }
    });

    if (!existingRestaurant) {
      res.status(404).json({
        message: "Restaurant not found",
        success: false
      } as ApiResponse<null>);
      return;
    }

    // Update restaurant
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(location && { location: location.trim() })
      }
    });

    res.status(200).json({
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
      success: true
    });

  } catch (err) {
    console.error("Error updating restaurant:", err);
    res.status(500).json({
      message: "Internal server error while updating restaurant",
      success: false
    } as ApiResponse<null>);
  }
};

// Optional: Delete restaurant
export const deleteRestaurant: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Restaurant ID is required",
      success: false
    } as ApiResponse<null>);
    return;
  }

  try {
    // Check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { id }
    });

    if (!existingRestaurant) {
      res.status(404).json({
        message: "Restaurant not found",
        success: false
      } as ApiResponse<null>);
      return;
    }

    // Delete restaurant
    await prisma.restaurant.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Restaurant deleted successfully",
      success: true
    });

  } catch (err) {
    console.error("Error deleting restaurant:", err);
    res.status(500).json({
      message: "Internal server error while deleting restaurant",
      success: false
    } as ApiResponse<null>);
  }
};