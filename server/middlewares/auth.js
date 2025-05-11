import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
//   let token = req.headers.token || req.headers.authorization;
 let token = req.headers.token;
  console.log("Request headers:", req.headers);
//   if (token && token.startsWith('Bearer ')) {
//     token = token.split(' ')[1];
//   }
  if (!token) {
    console.log("No token provided");
    return res.json({ success: false, message: "Không xác thực được! đăng nhập lại 1" });
  }
  try {
    console.log("Verifying token with JWT_SECRET:", process.env.JWT_SECRET);
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", tokenDecode);
    if (tokenDecode.id) {
      req.user = { userId: tokenDecode.id }; // Gán userId vào req.user
      console.log("Token decoded, userId:", req.user.userId);
      next();
    } else {
      console.log("Token missing id field");
      return res.json({ success: false, message: "Không xác thực được! đăng nhập lại 2" });
    }
  } catch (error) {
    console.log("Error in userAuth:", error.message);
    return res.json({ success: false, message: `Không xác thực được! đăng nhập lại 3: ${error.message}` });
  }
};

export default userAuth;