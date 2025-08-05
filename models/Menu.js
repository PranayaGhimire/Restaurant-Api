import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required:true
    },
    itemName: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required: true
    }
});

const Menu = mongoose.model('Menu',menuSchema);
export default Menu;