import validator from 'validator';
const { escape, isEmpty, isAlphanumeric, 
  isEmail, isStrongPassword, isMobilePhone,
  isAlpha, isNumeric, isDate
 } = validator;

 export const formValidation = (req, res, next) => {
  let {
    cellPhone,
    workPhone,
    ssn,
    reference,
    emergencyContacts,
  } = req.body;


  const { phone: refPhone,} = reference || {};

    // SSN validation
  if (ssn && (!isNumeric(ssn) || ssn.length !== 9)) {
    return res.status(400).json({ message: 'SSN must be exactly 9 digits!' });
  }

  // Phone validation (optional fields)
  if (cellPhone && (!isMobilePhone(cellPhone, 'en-US') || cellPhone.length !== 10)) {
    return res.status(400).json({ message: 'Cell phone number must be a valid 10-digit number!' });
  }

  if (workPhone && (!isMobilePhone(workPhone, 'en-US') || workPhone.length !== 10)) {
    return res.status(400).json({ message: 'Work phone number must be a valid 10-digit number!' });
  }


  // Reference validation
  if (reference) {
    if (refPhone && (!isMobilePhone(refPhone, 'en-US') || refPhone.length !== 10)) {
      return res.status(400).json({ message: 'Reference phone number must be a valid 10-digit number!' });
    }
  }

  // Emergency contact validation (can have 1 or more)
  for (let contact of emergencyContacts || []) {
    const {phone } = contact;
    if (phone && (!isMobilePhone(refPhone, 'en-US') || refPhone.length !== 10)) {
      return res.status(400).json({ message: 'Emergency contact phone number must be a valid 10-digit number!' });
    }
  }

  next();
};

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
        const { address, landlord, title} = req.body;
        const { buildingOrAptNumber, street, city, state, zip } = address;
        const { name, phone, email } = landlord;
        if (!title) return res.status(400).json({ message: "Missing title!" });
        if (!address) return res.status(400).json({ message: "Missing address info!" });
        if (!landlord) return res.status(400).json({ message: "Missing landlord info!" });
        if (!buildingOrAptNumber) return res.status(400).json({ message: "Missing building info!" });
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

export const reportValidation = (req, res, next) => {
    try {
        const { houseId, title, description } = req.body;
        if (!houseId) return res.status(400).json({ message: 'Missing houseId!' });
        if (!title) return res.status(400).json({ message: 'Missing houseId!' });
        if (!description) return res.status(400).json({ message: 'Missing houseId!' });
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Missing required info!', code: 400 });
    }
};

export const commentValidation = (req, res, next) => {
    try {
        const { reportId, description } = req.body;
        if (!reportId) return res.status(400).json({ message: 'Missing reportId!' });
        if (!description) return res.status(400).json({ message: 'Missing houseId!' });
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Missing required info!', code: 400 });
    }
};

export default { createUserValidation, loginUserValidation };

