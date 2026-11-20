import express from "express"
import jwt from "jsonwebtoken"
import passport from "../config/passport.js"
import requireAuth from "../middlewares/auth.middleware.js"

// Steps 1–2: start the flow → Passport redirects to Google

const router = express.Router()

/**
 * @method GET
 * @route /api/auth/google
 * @desc Initiates the Google OAuth flow (redirects to Google)
 * @access Public
 */

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false,
  })
);

// Steps 6–15: Google sends the user back with ?code=
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google`,
  }),
  (req, res) => {
    // req.user = whatever the verify callback passed to done(null, user)
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

export default router;