import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';
import { validateRegistration, validateLogin, sanitizeInput } from '../utils/validators.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Read JWT secret at runtime to avoid import-time env issues
const getJwtSecret = () => process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Configure multer for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    // Sanitize inputs
    const name = sanitizeInput(req.body.name);
    const email = sanitizeInput(req.body.email)?.toLowerCase();
    const password = req.body.password;

    // Validate input
    const validation = validateRegistration({ name, email, password });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: validation.errors 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create new user
    const user = new User({ name, email, password });
    
    // Simple gender detection based on name
    const maleNames = ['john', 'james', 'michael', 'david', 'robert', 'william', 'joseph', 'thomas', 'christopher', 'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew', 'joshua', 'kenneth', 'kevin', 'brian', 'george', 'timothy', 'ronald', 'jason', 'edward', 'jacob', 'gary', 'nicholas', 'eric', 'jonathan', 'stephen', 'larry', 'justin', 'scott', 'brandon', 'benjamin', 'samuel', 'gregory', 'alexander', 'patrick', 'frank', 'raymond', 'jack', 'dennis', 'jerry', 'tyler', 'aaron', 'jose', 'adam', 'nathan', 'henry', 'douglas', 'zachary', 'peter', 'kyle', 'walter', 'ethan', 'jeremy', 'christian', 'keith', 'roger', 'terry', 'gerald', 'harold', 'sean', 'austin', 'carl', 'arthur', 'lawrence', 'dylan', 'jesse', 'jordan', 'bryan', 'billy', 'joe', 'bruce', 'gabriel', 'logan', 'albert', 'willie', 'alan', 'juan', 'wayne', 'roy', 'ralph', 'randy', 'eugene', 'vincent', 'russell', 'elijah', 'luis', 'gary', 'wayne'];
    const femaleNames = ['mary', 'patricia', 'linda', 'barbara', 'elizabeth', 'jennifer', 'maria', 'susan', 'margaret', 'dorothy', 'lisa', 'nancy', 'karen', 'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle', 'laura', 'sarah', 'kimberly', 'deborah', 'jessica', 'shirley', 'cynthia', 'angela', 'melissa', 'brenda', 'amy', 'anna', 'rebecca', 'virginia', 'kathleen', 'pamela', 'martha', 'debra', 'amanda', 'stephanie', 'carolyn', 'christine', 'marie', 'janet', 'catherine', 'frances', 'ann', 'joyce', 'diane', 'alice', 'julie', 'heather', 'teresa', 'doris', 'gloria', 'evelyn', 'jean', 'cheryl', 'mildred', 'katherine', 'joan', 'ashley', 'judith', 'rose', 'janice', 'kelly', 'nicole', 'judy', 'christina', 'kathy', 'theresa', 'beverly', 'denise', 'tammy', 'irene', 'jane', 'lori', 'rachel', 'marilyn', 'andrea', 'kathryn', 'louise', 'sara', 'anne', 'jacqueline', 'wanda', 'bonnie', 'julia', 'ruby', 'lois', 'tina', 'phyllis', 'norma', 'paula', 'diana', 'annie', 'lillian', 'emily', 'robin'];
    
    const firstName = name.toLowerCase().split(' ')[0];
    let gender = 'other';
    if (maleNames.includes(firstName)) {
      gender = 'male';
    } else if (femaleNames.includes(firstName)) {
      gender = 'female';
    }
    
    user.gender = gender;
    // Avatar will be generated dynamically in frontend
    
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration' 
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    // Sanitize inputs
    const email = sanitizeInput(req.body.email)?.toLowerCase();
    const password = req.body.password;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: validation.errors 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('favorites', 'name price image rating');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      user 
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user profile' 
    });
  }
});

/**
 * PUT /api/auth/avatar
 * Upload user avatar
 */
router.put('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // For now, we'll store the avatar as a data URL or file path
    // In production, you'd upload to cloud storage like AWS S3
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Update user avatar
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: avatarUrl
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading avatar'
    });
  }
});

export default router;
