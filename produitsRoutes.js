const express = require('express');
const router = express.Router();
const Produit = require('../models/produits');

// CREATE a new product
router.post('/', async (req, res) => {
   try {
      const newProduit = new Produit(req.body);
      const savedProduit = await newProduit.save();
      res.status(201).json(savedProduit); 
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// GET all products
router.get('/', async (req, res) => {
   try {
      const produits = await Produit.find();
      res.status(200).json(produits);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
   try {
      const product = await Produit.findById(req.params.id);
      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
   try {
      const updatedProduit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!updatedProduit) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduit);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
   try {
      const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
      if (!deletedProduit) {
         return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
   try {
      const produits = await Produit.find({ category: req.params.category });
      if (produits.length === 0) {
         return res.status(404).json({ message: 'No products found in this category' });
      }
      res.status(200).json(produits);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

module.exports = router;
