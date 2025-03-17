const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    count: {
        type: Number,
    },
    description: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    qte: {
        type: String,
        
    }
}, { timestamps: true });

module.exports = mongoose.model('Produits', productSchema);