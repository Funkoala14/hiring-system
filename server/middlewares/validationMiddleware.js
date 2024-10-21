import validator from 'validator';
const { escape, isEmpty, isAlphanumeric, isEmail, isStrongPassword, isMobilePhone } = validator;

// Sanitize input to escape potentially harmful characters
const createUserValidation = (req, res, next) => {
  let { username, email, password } = req.body;

  username = escape(username);
  email = escape(email);

  if (
    !username ||
    !email ||
    !password ||
    isEmpty(username) ||
    isEmpty(email) ||
    isEmpty(password)
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

export const housingValidation = (req, res, next) => {
    try {
        const { address, landlord } = req.body;
        const { building, street, city, state, zip } = address;
        const { name, phone, email } = landlord;
        if (!address) return res.status(400).json({ message: "Missing address info!" });
        if (!landlord) return res.status(400).json({ message: "Missing landlord info!" });
        if (!building) return res.status(400).json({ message: "Missing building info!" });
        if (!street) return res.status(400).json({ message: "Missing street info!" });
        if (!city) return res.status(400).json({ message: "Missing city info!" });
        if (!state) return res.status(400).json({ message: "Missing state info!" });
        if (!zip) return res.status(400).json({ message: "Missing zip info!" });
        if (!name) return res.status(400).json({ message: "Missing landlord name info!" });
        if (!phone) return res.status(400).json({ message: "Missing landlord phone info!" });
        if (!email) return res.status(400).json({ message: "Missing landlord email info!" });

        if (phone && !isMobilePhone(phone, "en-US")) {
            return res.status(400).json({ message: "Invalid phone number!" });
        }
        if (email && !isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address!" });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: "Missing required info!", code: 400});
    }
};
export default { createUserValidation, loginUserValidation };

