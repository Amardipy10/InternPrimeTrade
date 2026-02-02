import express from 'express';
import { getProfile, updateProfile } from '../../controllers/profileController.js';
import { protect } from '../../middleware/auth.js';
import { updateProfileValidation, validate } from '../../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProfile)
  .put(updateProfileValidation, validate, updateProfile);

export default router;
