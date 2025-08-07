const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const { promisify } = require("util");

exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "100d" });
};

exports.verifyAuthToken = async (req, res, next) => {
  let token = "";

  //check if token exist
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return res.status(401).json({
      status: "fail",
      data: "Not authorized, please login",
    });
  token = req.headers.authorization.split(" ")[1];

  //token validation
  const verifyasync = promisify(jwt.verify);

  try {
    const decoded = await verifyasync(token, process.env.JWT_SECRET);

    const currentUser = await User.findOne({ _id: decoded.userId });
    if (!currentUser)
      return res.status(401).json({
        status: "fail",
        data: "User Not Found, please SignIn",
      });

    //assinginig this user to req Object
    req.user = currentUser;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "err",
      data: "something went wrong (jwt verification)",
    });
  }
};

exports.generateApiKey = (userId) => {
  const payload = {
    userId,
    type: "API_KEY",
    permissions: ["deepfake-check"], // You can add scope-based permissions
  };

  return jwt.sign(payload, process.env.API_KEY_SECRET, { expiresIn: "30d" });
};

exports.verifyApiKey = async (req, res, next) => {
  try {
    // Verify the API key
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return res.status(401).json({
        status: "fail",
        data: "This endpoint expects API_KEY , Please get it from DeepDetect.com",
      });
    const apiKey = req.headers.authorization.split(" ")[1];

    if (!apiKey)
      return res.status(401).json({
        status: "fail",
        data: "This endpoint expects API_KEY, Please get it from DeepDetect.com",
      });
    const decoded = jwt.verify(apiKey, process.env.API_KEY_SECRET);

    // Check if payload type is correct & Find user in the database
    const user = await User.findById(decoded.userId);

    if (decoded.type !== "API_KEY" || !user) {
      return res.status(401).json({
        status: "fail",
        data: "Invalid API_KEY, Please get it from DeepDetect.com",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return { success: false, message: "Invalid or expired API key" };
  }
};
