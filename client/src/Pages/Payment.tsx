import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import { SHOPCONTAEXT } from "../context/Shopcontext";
const Payment = () => {
  const context = useContext(SHOPCONTAEXT);
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState<any>("");

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/product/braintree/token`
      );
     
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}/api/v1/product//braintree/payment`,
        {
          nonce,
          cart: context?.cart,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  if (!clientToken) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="w-full  ">
        <div className="w-1/2 mx-auto flex flex-col  justify-center">
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => setInstance(instance)}
          />
          <button
            className="font-inter  font-semibold capitalize p-2 bg-[#19A5B1] rounded text-[#ffffff] my-4"
            onClick={handlePayment}
          >
            Make a Payment
          </button>
        </div>
      </div>
    );
  }
};

export default Payment;
