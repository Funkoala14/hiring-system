import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const jwtValidation = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', code: 401 });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token', code: 401 });
    } else {
        return res.status(500).json({ message: 'Server error', code: 500 });
    }
  }
};

export const checkPermission = (requireRole) => (req, res, next) => {
    const userRole = req.user.role;
    
    if (userRole !== requireRole) {
        return res.status(403).json({ message: "No permission to access", code: 403 });
    }

    next();
};
