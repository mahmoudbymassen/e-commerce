const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
    {
        id_client: { type: String, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        produits: [
            {
                id_produit: { type: String, required: true },
                qte: { type: Number, required: true },
            },
        ],
        statut: { type: String, default: "En attente" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Commande", commandeSchema);