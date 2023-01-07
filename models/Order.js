import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // user: { type: String, required: true },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        store: { type: String, required: true },
      },
    ],
    shippingAddress: {
      fullname: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postal: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      mobile: String,
      token: String,
      amount: Number,
      widget_id: String,
    },
    itemsPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
