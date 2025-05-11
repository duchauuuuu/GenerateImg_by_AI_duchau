import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.userId;
    if (!prompt) {
      return res.json({ success: false, message: "Thiếu mô tả hình ảnh" });
    }
    if (!userId) {
      return res.json({ success: false, message: "Không xác thực được người dùng" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found for userId:", userId);
      return res.json({ success: false, message: "Người dùng không tồn tại" });
    }
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "Bạn không có đủ tín dụng",
        credits: user.creditBalance,
      });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );
    console.log("Image generated, new creditBalance:", updatedUser.creditBalance);
    res.json({
      success: true,
      message: "Tạo ảnh thành công",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.log("Error in generateImage:", error.message);
    res.json({ success: false, message: error.message });
  }
};