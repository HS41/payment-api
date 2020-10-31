var axios = require("axios");
export async function processPayment(paymentInfo) {
  return new Promise((resolve, reject) => {
    var data = {
      merchantRefNum: new Date().getTime().toString(),
      amount: paymentInfo.amount,
      currencyCode: "USD",
      dupCheck: true,
      settleWithAuth: false,
      paymentHandleToken: paymentInfo.token,
      customerIp: "103.208.70.53",
      description: "Magazine subscription",
    };

    var config = {
      method: "post",
      url: "https://api.test.paysafe.com/paymenthub/v1/payments",
      headers: {
        Accept: "application/json, text/plain, */*",
        Simulator: "EXTERNAL",
        Authorization:
          "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
