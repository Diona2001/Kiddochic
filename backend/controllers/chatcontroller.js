const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ 
                error: 'Message is required' 
            });
        }

        let response = "";
        const lowerMessage = message.toLowerCase();

        // Initial greeting
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = "Hey there 👋\nWelcome to KiddoChic! How can I help you today?";
        } 
        // About products and collections
        else if (lowerMessage.includes('product') || lowerMessage.includes('clothes') || lowerMessage.includes('collection')) {
            response = "🌟 Our Premium Kids Collections:\n\n" +
                      "👕 Boys Collection:\n" +
                      "• Casual T-shirts & Polo Shirts (Age 0-12)\n" +
                      "• Formal Shirts & Blazers\n" +
                      "• Comfortable Pants & Shorts\n" +
                      "• Party & Occasion Wear\n" +
                      "• Ethnic Wear\n\n" +
                      "👗 Girls Collection:\n" +
                      "• Pretty Dresses (Casual & Party)\n" +
                      "• Tops & Blouses\n" +
                      "• Skirts & Leggings\n" +
                      "• Party Gowns\n" +
                      "• Traditional Wear\n\n" +
                      "👶 Infant Collection (0-24 months):\n" +
                      "• Onesies & Rompers\n" +
                      "• Sleep Suits\n" +
                      "• Soft Cotton Sets\n\n" +
                      "🎨 Special Features:\n" +
                      "• Organic Cotton Options\n" +
                      "• Anti-allergic Fabrics\n" +
                      "• Easy-care Materials\n\n" +
                      "Would you like to know about our current deals?";
        }
        // Sizing information
        else if (lowerMessage.includes('size') || lowerMessage.includes('measurement')) {
            response = "📏 Size Guide:\n\n" +
                      "Baby Sizes:\n" +
                      "🔹 Newborn: 0-3 months (Height: 50-60cm)\n" +
                      "🔹 3-6 months (Height: 60-67cm)\n" +
                      "🔹 6-12 months (Height: 67-76cm)\n\n" +
                      "Toddler Sizes:\n" +
                      "🔹 1-2 years (Height: 76-86cm)\n" +
                      "🔹 2-3 years (Height: 86-98cm)\n" +
                      "🔹 3-4 years (Height: 98-104cm)\n" +
                      "🔹 4-5 years (Height: 104-110cm)\n\n" +
                      "Pro Tips:\n" +
                      "• Measure your child before ordering\n" +
                      "• Check size charts for each category\n" +
                      "• Consider growth spurts\n\n" +
                      "Need specific measurements for any item?";
        }
        // Pricing and offers
        else if (lowerMessage.includes('price') || lowerMessage.includes('offer') || lowerMessage.includes('deal')) {
            response = "💰 Current Offers:\n\n" +
                      "🎉 Special Deals:\n" +
                      "• Buy 2 Get 1 Free on all T-shirts\n" +
                      "• 30% off on Party Wear\n" +
                      "• Flat 20% off on Baby Essentials\n\n" +
                      "🎯 Price Ranges:\n" +
                      "• Casual Wear: ₹299 - ₹999\n" +
                      "• Party Wear: ₹799 - ₹2499\n" +
                      "• Baby Sets: ₹499 - ₹1499\n\n" +
                      "💳 Payment Benefits:\n" +
                      "• Extra 10% off on prepaid orders\n" +
                      "• EMI available on orders above ₹3000\n\n" +
                      "Would you like to know about shipping?";
        }
        // Shipping and delivery
        else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
            response = "🚚 Shipping Information:\n\n" +
                      "📦 Delivery Options:\n" +
                      "• Standard Delivery: 3-5 days\n" +
                      "• Express Delivery: 1-2 days\n" +
                      "• Same Day Delivery (select cities)\n\n" +
                      "💰 Shipping Costs:\n" +
                      "• Free shipping on orders above ₹999\n" +
                      "• Standard delivery: ₹49\n" +
                      "• Express delivery: ₹99\n\n" +
                      "📍 We deliver to 27,000+ pin codes\n\n" +
                      "🔄 Easy Returns:\n" +
                      "• 30-day return policy\n" +
                      "• Free pickup for returns\n" +
                      "• Quick refunds\n\n" +
                      "Need help tracking an order?";
        }
        // Material and quality
        else if (lowerMessage.includes('material') || lowerMessage.includes('quality') || lowerMessage.includes('fabric')) {
            response = "✨ Our Quality Standards:\n\n" +
                      "🌿 Materials Used:\n" +
                      "• 100% Organic Cotton\n" +
                      "• Breathable Fabrics\n" +
                      "• Non-toxic Dyes\n\n" +
                      "🛡️ Safety Features:\n" +
                      "• Hypoallergenic Materials\n" +
                      "• Child-safe Buttons\n" +
                      "• Soft Seams\n\n" +
                      "♻️ Sustainability:\n" +
                      "• Eco-friendly Packaging\n" +
                      "• Sustainable Production\n" +
                      "• Recycled Materials Options\n\n" +
                      "Would you like to know about care instructions?";
        }
        // Default response
        else {
            response = "I'm here to help you with:\n\n" +
                      "👕 Our Collections & Products\n" +
                      "📏 Sizing Information\n" +
                      "💰 Prices & Offers\n" +
                      "🚚 Shipping Details\n" +
                      "✨ Material & Quality\n" +
                      "📦 Order Status\n" +
                      "🔄 Returns & Exchanges\n\n" +
                      "What would you like to know about?";
        }

        return res.status(200).json({ response });

    } catch (error) {
        console.error('Chat Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
};

module.exports = {
    handleChat
}; 