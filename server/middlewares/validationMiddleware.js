import validator from 'validator';
const { escape, isEmpty, isAlphanumeric, isEmail, isStrongPassword } = validator;

// Sanitize input to escape potentially harmful characters
const createUserValidation = (req, res, next) => {
  let { username, email, password } = req.body;
  let {token} = req.query;

  username = escape(username);
  email = escape(email);

  if (
    !username ||
    !email ||
    !password ||
    isEmpty(username) ||
    isEmpty(email) ||
    isEmpty(password) ||
    !token ||
    isEmpty(token)

  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (!isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address!' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password is too weak!' });
  }

  next();
};

const loginUserValidation = (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    (!username && !email) ||  // Either username or email should be present
    !password ||
    (username && isEmpty(username)) ||
    (email && isEmpty(email)) ||
    isEmpty(password)
  ) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  if (username && !isAlphanumeric(username)) {
    return res.status(400).json({ message: 'Username must be alphanumeric!' });
  }

  if (email && !isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address!' });
  }

  next();
};

export default { createUserValidation, loginUserValidation };

