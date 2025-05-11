import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    toast.success("Thanh toán thành công!");
    loadCreditsData();
  }, [loadCreditsData]);

  return (
    <div className="flex items-center justify-center mt-10">
      <h1 className="text-2xl text-green-600">Thanh toán thành công!</h1>
    </div>
  );
};

export default PaymentSuccess;