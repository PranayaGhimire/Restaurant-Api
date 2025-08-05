import express from 'express';
import { createMenu, deleteMenu, getAllMenus, getMenu, updateMenu } from '../controllers/menuController.js';

const router = express.Router();

router.get('/',getAllMenus);
router.post('/',createMenu);
router.get('/:id',getMenu);
router.put('/:id',updateMenu);
router.delete('/:id',deleteMenu);

export default router;