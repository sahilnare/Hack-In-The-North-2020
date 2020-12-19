module.exports = (req, res, next) => {
  const { phone, username, password } = req.body;

  function validPhone(userPhone) {
    return /^\d{10}$/.test(userPhone);
  }

  function validPasswod(password) {
    return /^.{6,}$/.test(password);
  }

  if (req.path === "/register") {
    if (![phone, username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validPhone(phone)) {
      return res.status(401).json("Invalid phone number");
    } else if (!validPasswod(password)) {
      return res.status(401).json("Password too short");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    }
  }

  next();
};
