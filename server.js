// 1. IMPORTS AND SETUP
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows cross-origin requests (from your frontend)
app.use(express.json()); // Allows server to accept JSON data in requests

// 2. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB Atlas!'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// 3. DEFINE DATABASE SCHEMAS (The structure of our data)
const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    address: String,
    pincode: String,
    cartItems: Array,
    orderTotal: Number,
    orderDate: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const subscriberSchema = new mongoose.Schema({
    email: String,
    date: { type: Date, default: Date.now }
});

// Create Mongoose Models from the Schemas
const Order = mongoose.model('Order', orderSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// 4. API ENDPOINTS (ROUTES)
// Test route
app.get('/', (req, res) => {
    res.send('Jovial Flames Backend is Running!');
});

// Endpoint to handle new orders
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, phone, address, pincode, cartItems, orderTotal } = req.body;
        const newOrder = new Order({ customerName, phone, address, pincode, cartItems, orderTotal });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again.', error });
    }
});

// Endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message received! We will get back to you.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again.', error });
    }
});

// Endpoint to handle newsletter subscriptions
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'This email is already subscribed.' });
        }
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Thank you for subscribing!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again.', error });
    }
});

// 5. START THE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});