import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function PaySafeButton(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const user = useSelector((state) => state.userSignin);

  var API_KEY =
    "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=";

  const checkout = () => {
    window.paysafe.checkout.setup(
      API_KEY,
      {
        currency: "USD",
        amount: props.order.totalPrice * 100,
        locale: "en_US",
        customer: {
          firstName: user.userInfo.name.split(" ")[0],
          lastName: user.userInfo.name.split(" ").pop(),
          email: user.userInfo.email,
        },
        billingAddress: {
          nickName: user.userInfo.name,
          street: props.order.shipping.address,
          city: props.order.shipping.city,
          zip: props.order.shipping.postalCode,
          country: "US",
          state: "CA",
        },
        environment: "TEST",
        merchantRefNum: "1559900597607",
        displayPaymentMethods: ["skrill", "card", "instantach"],
        paymentMethodDetails: {
          sightline: {
            consumerId: "123456",
          },
          skrill: {
            consumerId: "john.doe@email.com",
            emailSubject: "Skrill Payout",
            emailMessage: "Your Skrill Payout request has been processed",
          },
          instantach: {
            consumerId: "john.doe@email.com",
            paymentId: "3aeb9c63-6386-46a3-9f8e-f452e722228a",
            emailSubject: "Instant ACH Payout",
            emailMessage: "Your Instant ACH Payout request has been processed",
          },
          vippreferred: {
            consumerId: "550726575",
          },
          paysafe: {
            consumerId: "sb-cpfxo1472281@personal.example.com",
            consumerMessage: "Paysafe note to payer",
            recipientType: "PAYSAFE_ID",
          },
        },
      },
      async (instance, error, result) => {
        if (result && result.paymentHandleToken) {
          console.log(result.paymentHandleToken);
          // make AJAX call to Payments API
          let paymentData = await makeCall(result.paymentHandleToken);

          instance.showSuccessScreen();
          setTimeout(() => {
            instance.close();
            window.location.reload();
          }, 3000);
        } else {
          console.error(error);
          // Handle the error
        }
      },
      function (stage, expired) {
        switch (stage) {
          case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
          case "PAYMENT_HANDLE_CREATED": // Handle the scenario
          case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
          case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
          default: // Handle the scenario
        }
      }
    );
  };

  const makeCall = async (token) => {
    const { data } = await axios.post(
      "/api/paysafe",
      { amount: props.order.totalPrice * 100, token, orderID: props.order._id },
      {
        headers: {
          Authorization: "Bearer " + user.userInfo.token,
        },
      }
    );
    return data;
  };

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((err) => console.log(err));

  return (
    <div>
      <button onClick={checkout}> Pay {props.order.totalPrice} </button>
    </div>
  );
}

export default PaySafeButton;
