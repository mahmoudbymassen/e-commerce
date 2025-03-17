const express = require("express");
const Commande = require("../models/commande"); 
const Produits = require("../models/produits"); 
const User = require("../models/user"); 

const router = express.Router();

// GET all commandes
router.get("/", async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate({ path: "produits.id_produit", model: Produits }) // Populate produits.id_produit
      .populate({ path: "id_client", model: User }); // Populate id_client

    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// GET a commande by ID
router.get("/:id", async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate({ path: "produits.id_produit", model: Produits }) // Populate produits.id_produit
      .populate({ path: "id_client", model: User }); // Populate id_client

    if (!commande) {
      return res.status(404).json({ message: "Commande not found" });
    }

    res.status(200).json(commande);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// POST a new commande
router.post("/api/commandes", async (req, res) => {
  const { id_client, produits } = req.body;

  // Validate required fields
  if (!id_client || !Array.isArray(produits) || produits.length === 0) {
    return res.status(400).json({ message: "Invalid order data." });
  }

  // Validate each product in the produits array
  for (const produit of produits) {
    if (!produit.id_produit || !produit.qte) {
      return res.status(400).json({ message: "Each product must have an id_produit and qte." });
    }
  }

  try {
    const nouvelleCommande = new Commande({ id_client, produits });
    const savedCommande = await nouvelleCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    res.status(400).json({ message: "Error saving order: " + error.message });
  }
});

// UPDATE a commande
router.put("/:id", async (req, res) => {
  try {
    const updatedCommande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCommande) {
      return res.status(404).json({ message: "Commande not found" });
    }

    res.status(200).json(updatedCommande);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// DELETE a commande by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCommande = await Commande.findByIdAndDelete(req.params.id);
    if (!deletedCommande) {
      return res.status(404).json({ message: "Commande not found" });
    }
    res.status(200).json({ message: "Commande successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

module.exports = router;