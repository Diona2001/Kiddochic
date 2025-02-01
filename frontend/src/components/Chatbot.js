import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hey there 👋\nHow can I help you today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const location = useLocation();

    // Only show on home page
    if (location.pathname !== '/') {
        return null;
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();
            
            // Add bot response
            setMessages(prev => [...prev, { text: data.response, isBot: true }]);
        } catch (error) {
            console.error('Error:', error);
        }

        setInputMessage('');
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                <span className="text-indigo-600 text-xl">🤖</span>
                            </div>
                            <span>Chatbot</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${
                                    message.isBot 
                                        ? 'bg-gray-100 text-gray-800' 
                                        : 'bg-indigo-600 text-white'
                                }`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-indigo-600"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                            >
                                ↑
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot; 
