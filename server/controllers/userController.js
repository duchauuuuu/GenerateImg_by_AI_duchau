import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import axios from "axios";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Nhập tất cả thông tin" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
      creditBalance: 5,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log("Error in registerUser:", error);
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Nhập tất cả thông tin" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại 1" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Sai mật khẩu" });
    }
  } catch (error) {
    console.log("Error in loginUser:", error);
    res.json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const userId = req.user?.userId; // Lấy userId từ req.user
    console.log("userCredits called, userId:", userId);
    if (!userId) {
      console.log("No userId provided");
      return res.json({ success: false, message: "Không xác thực được! Thiếu userId" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found for userId:", userId);
      return res.json({ success: false, message: "Người dùng không tồn tại 2" });
    }
    console.log("User found, creditBalance:", user.creditBalance);
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.log("Error in userCredits:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const createMomoPayment = async (req, res) => {
  try {
    const { amount, planId, credits } = req.body;
    const userId = req.user?.userId; // Lấy userId từ req.user
    if (!userId || !amount || !planId || !credits) {
      return res.json({ success: false, message: "Thiếu thông tin" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại 3" });
    }
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const orderInfo = `Thanh toán gói ${planId} cho ${user.name}`;
    const redirectUrl = process.env.CLIENT_URL + "/payment-success";
    const ipnUrl = process.env.MOMO_IPN_URL;
    const requestType = "payWithMethod";
    const orderId = `${partnerCode}_${userId}_${Date.now()}`;
    const requestId = orderId;
    const extraData = "";
    const lang = "vi";
    const autoCapture = true;

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    console.log("Raw signature:", rawSignature);
    const signature = createHmac("sha256", secretKey).update(rawSignature).digest("hex");
    console.log("Signature:", signature);

    const requestBody = {
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      signature,
    };

    const response = await axios.post(
      `${process.env.MOMO_API_ENDPOINT}/v2/gateway/api/create`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("MoMo API response:", response.data);
    if (response.data.resultCode === 0) {
      const transaction = new transactionModel({
        userId,
        plan: planId,
        amount,
        credits,
        payment: false,
      });
      await transaction.save();
      return res.json({ success: true, payUrl: response.data.payUrl, orderId });
    } else {
      return res.json({ success: false, message: response.data.message });
    }
  } catch (error) {
    console.log("Error in createMomoPayment:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const momoCallback = async (req, res) => {
  try {
    const { orderId, resultCode, amount } = req.body;
    console.log("MoMo callback received:", req.body);
    if (resultCode === 0) {
      const [_, userId, _timestamp] = orderId.split("_");
      const user = await userModel.findById(userId);
      if (!user) {
        return res.json({ success: false, message: "Người dùng không tồn tại 4" });
      }
      const transaction = await transactionModel.findOne({ userId, amount, payment: false });
      if (!transaction) {
        return res.json({ success: false, message: "Giao dịch không tồn tại" });
      }
      user.creditBalance += transaction.credits;
      transaction.payment = true;
      await user.save();
      await transaction.save();
      console.log("Updated creditBalance:", user.creditBalance);
      return res.json({ success: true, message: "Thanh toán thành công" });
    } else {
      return res.json({ success: false, message: "Thanh toán thất bại" });
    }
  } catch (error) {
    console.log("Error in momoCallback:", error);
    return res.json({ success: false, message: error.message });
  }
};