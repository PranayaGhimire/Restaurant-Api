import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurant, updateRestaurant } from '../controllers/restaurantController.js';
import { protect } from '../middleware/authMiddleware.js';
import {upload} from "../middleware/uploadMiddleware.js";
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/',protect,getAllRestaurants);
router.post('/',protect, upload.single('image') ,requireRole('admin'), createRestaurant);
router.get('/:id',protect,getRestaurant);
router.put('/:id',protect, upload.single('image') ,updateRestaurant);
router.delete('/:id',protect,deleteRestaurant);

export default router;