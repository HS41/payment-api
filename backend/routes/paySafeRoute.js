import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';
import {processPayment} from "./../helper/payslip"
const router = express.Router();

router.post("/", isAuth, async (req, res) => {
  const paymentInfo = {
    amount: req.body.amount,
    token: req.body.token
  };
  const paymentResp = await processPayment(paymentInfo);
  console.log(paymentResp);
  const order = await Order.findById(req.body.orderID);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paysafe',
      paymentResult: {
        payerID: req.user._id,
        orderID: req.body.orderID,
        paymentID: paymentResp.id
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  }
  else{
    res.send({  });
  }
});

export default router;