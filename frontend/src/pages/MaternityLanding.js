import React from 'react';
import { Link } from 'react-router-dom';

const MaternityLanding = () => {
    const maternityKits = [
        {
            title: "Make your Maternity Kit",
            image: "https://www.popees.com/cdn/shop/files/make_your_kit_8430a960-e069-44f7-8b41-059c396b46af_560x.png?v=1721993444",
            path: "/maternity-kit-customization",
            description: "Customize your perfect maternity kit with essential items"
        },
        {
            title: "Make your New Born Kit",
            image: "https://www.popees.com/cdn/shop/files/Make_your_New_Born_Kit_560x.jpg?v=1721804493",
            path: "/newborn-kit-customization",
            description: "Create the perfect kit for your newborn's needs"
        },
        {
            title: "Make your Hospital Bag",
            image: "https://www.popees.com/cdn/shop/files/hospital_bag_poster_1_560x.png?v=1721993445",
            path: "/hospital-bag-customization",
            description: "Pack everything you need for your hospital stay"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div 
                className="h-[400px] bg-cover bg-center bg-no-repeat text-white relative"
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/2995347/pexels-photo-2995347.jpeg?auto=compress&cs=tinysrgb&w=600")',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Your Maternity Journey</h1>
                        <p className="text-xl">Begin your beautiful journey into motherhood with comfort and style</p>
                    </div>
                </div>
            </div>

            {/* Kits Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {maternityKits.map((kit, index) => (
                        <Link 
                            key={index}
                            to={kit.path}
                            className="group"
                        >
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="h-64 overflow-hidden">
                                    <img 
                                        src={kit.image} 
                                        alt={kit.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{kit.title}</h3>
                                    <p className="text-gray-600 mb-4">{kit.description}</p>
                                    <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                                        Customize Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="max-w-3xl mx-auto text-center mt-16">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-8">Why Choose Our Kits?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Customizable</h3>
                            <p className="text-gray-600">Choose exactly what you need</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">Only the best for you and your baby</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Expert Curated</h3>
                            <p className="text-gray-600">Designed by maternity experts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaternityLanding; 