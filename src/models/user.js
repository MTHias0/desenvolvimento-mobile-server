const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true},
    email: { type: String, required: true },
    telNumber: { type: Number, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false},
    favorites: [{
        type: { 
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
            description: String,
            image: String
        },
        ref: 'Product',
        required: false
    }],
    orders: [{ 
        type: {
            products: 
            [{
                type: {
                    _id : mongoose.Schema.Types.ObjectId,
                    name: String,
                    quantity: Number,
                    price: Number
                },
                ref:'Product',
                required: true
            }],
            totalPrice: Number,
            status: {
                type: String,
                enum: ['Em andamento', 'Finalizado'],
                default: 'Em andamento'
            }
        },
        ref : 'Order',
        required: false
    }]
});

module.exports = mongoose.model('User', userSchema);