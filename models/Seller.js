import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    mobile: {type:Number, required: true},
    store: {type:String, required: true},
    postal: {type:Number, required: true},
    street: {type:String, required: true},
    city: {type:String, required: true},

},{
    timestamps: true,
})
const  Seller = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);
export default Seller;