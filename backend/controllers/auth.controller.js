const db = require("../models/index");
const argon2 = require("argon2");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware to handle file upload
const uploadMiddleware = upload.single("profilePhoto");

const makeHashPassword = async (password) => {
  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string");
  }
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.error("Password hashing error:", error);
    throw error;
  }
};

async function signup(req, res) {
  // Use multer middleware
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload error: " + err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown error: " + err.message });
    }

    try {
      const { email, password, ...userData } = req.body;

      // Check if user exists
      const user = await db.User.findOne({ where: { email: email } });
      if (user) {
        return res.json({ message: "User already exists" });
      }

      // Validate password
      if (!password) {
        return res.json({ message: "Password is required" });
      }

      // Hash password
      const hashedPassword = await makeHashPassword(password);

      // Prepare image data if a file was uploaded
      let profilePhotoData = null;
      let profilePhotoType = null;
      if (req.file) {
        profilePhotoData = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      // Create user with image
      const newUser = await db.User.create({
        email: email,
        password: hashedPassword,
        profilePhoto: profilePhotoData,
        profilePhotoType: profilePhotoData.contentType,
        ...userData,
      });

      res.status(200).json({
        message: "success",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email and password" });
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email and password" });
    }
    res.json({ message: "success" });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { signup, login };
