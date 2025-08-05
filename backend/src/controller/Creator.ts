import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../prisma';

// Interface for the request body
interface CreateReviewBody {
  restaurantId: string;
  comment: string;
  ambience: string;
  rating: string | number;
}

// Extended Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId: string;
  body: CreateReviewBody;
}

// Interface for the review response (matching Prisma output)
interface ReviewResponse {
  id: string;
  userId: string | null;
  restaurantId: string | null;
  comment: string;
  ambience: string | null;
  rating: number;
}

// Interface for success response
interface SuccessResponse {
  message: string;
  review: ReviewResponse;
}

// Interface for error response
interface ErrorResponse {
  message: string;
}

export const Creator: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authReq = req as AuthenticatedRequest;
  const userId: string = authReq.userId;
  const { restaurantId, comment, ambience, rating }: CreateReviewBody = authReq.body;

  // Input validation
  if (!restaurantId || !rating || !comment || !ambience) {
    res.status(411).json({
      message: "Invalid inputs or incorrect"
    } as ErrorResponse);
    return;
  }

  try {
    const review = await prisma.review.create({
      data: {
        userId: userId,
        restaurantId: restaurantId,
        comment: comment,
        ambience: ambience,
        rating: parseFloat(rating.toString())
      }
    });

    res.json({ 
      message: "Created successfully", 
      review 
    } as SuccessResponse);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ 
      message: "Interrupted while creating review" 
    } as ErrorResponse);
  }
};