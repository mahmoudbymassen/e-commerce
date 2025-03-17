const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mahmoudbymassen999:bymassen1899@cluster0.ulkda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const produitsRoutes = require('./routes/produitsRoutes'); 
app.use('/api/produits', produitsRoutes);

// Order Routes
const commandeRoutes = require('./routes/commandsRoutes');
app.use('/api', commandeRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});