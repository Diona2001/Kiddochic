import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const NewbornKitCustomization = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedBodysuit, setSelectedBodysuit] = useState(null);
    const [selectedSleepsuit, setSelectedSleepsuit] = useState(null);
    const [selectedMittensBooties, setSelectedMittensBooties] = useState(null);
    const [selectedBabyCap, setSelectedBabyCap] = useState(null);

    const bodysuitOptions = [
        {
            id: 'bs1',
            image: "https://m.media-amazon.com/images/I/61AxU9b4IKL._AC_UY1100_.jpg",
            color: "Pink Floral"
        },
        {
            id: 'bs2',
            image: "https://m.media-amazon.com/images/I/716gu4mX7jL._AC_UY1100_.jpg",
            color: "Blue Stripes"
        },
        {
            id: 'bs3',
            image: "https://image.made-in-china.com/2f0j00JTAkMWflkwzB/Combed-Cotton-0-3-Months-Baby-Clothing-Infant-Collar-Bodysuit-Boutique-Baby-Onesie.jpg",
            color: "White Classic"
        },
        {
            id: 'bs4',
            image: "https://m.media-amazon.com/images/I/91z6NRrVLkL.jpg",
            color: "Multicolor Set"
        },
        {
            id: 'bs5',
            image: "https://m.media-amazon.com/images/I/81VlJjN8QgL._AC_UY1100_.jpg",
            color: "Pastel Collection"
        }
    ];

    const sleepsuitOptions = [
        {
            id: 'ss1',
            image: "https://kidzcare.lk/wp-content/uploads/2024/02/new_born_warm_suits___sleep_suits_1pcs_clo0036_1.jpg",
            color: "Warm Grey"
        },
        {
            id: 'ss2',
            image: "https://media.vertbaudet.co.uk/Pictures/vertbaudet/357307/pack-of-3-interlock-sleepsuits-for-babies-basics.jpg",
            color: "Basic Pack"
        },
        {
            id: 'ss3',
            image: "https://babylovessleepco.com/cdn/shop/products/Toddler-Onesie-Winter-Sleep-Suit-Cool-Grey-3_1200x.jpg?v=1663665730",
            color: "Cool Grey"
        },
        {
            id: 'ss4',
            image: "https://img.tatacliq.com/images/i19//437Wx649H/MP000000023546951_437Wx649H_202409052007281.jpeg",
            color: "Pink Pattern"
        }
    ];

    const mittensBootiesOptions = [
        {
            id: 'mb1',
            image: "https://www.uyyaala.com/cdn/shop/products/Mittens_Booties_Set_for_New_Born_Baby_-_Navy_Blue_White_Pack.jpg?v=1732540523",
            color: "Navy Blue & White"
        },
        {
            id: 'mb2',
            image: "https://5.imimg.com/data5/SELLER/Default/2023/7/325096258/OX/SH/GR/181165196/baby-mittens-and-booties.jpg",
            color: "Classic White"
        },
        {
            id: 'mb3',
            image: "https://fcity.in/images/products/397525764/lmvvb_512.jpg",
            color: "Pink Set"
        },
        {
            id: 'mb4',
            image: "https://gugu.com.my/wp-content/uploads/2025/01/2-pairs-of-mitten-booties.png",
            color: "Double Pack"
        },
        {
            id: 'mb5',
            image: "https://m.media-amazon.com/images/I/61fKueR2akL.jpg",
            color: "Pastel Collection"
        }
    ];

    const babyCapOptions = [
        {
            id: 'cap1',
            image: "https://www.allaboutami.com/wp-content/uploads/2017/12/wsi-imageoptim-newborn-hats-logo-a.jpg",
            color: "Classic White"
        },
        {
            id: 'cap2',
            image: "https://assets.ajio.com/medias/sys_master/root/20240819/gjrS/66c342801d763220fa845a9c/-473Wx593H-466549578-yellow-MODEL.jpg",
            color: "Yellow Animal Print"
        },
        {
            id: 'cap3',
            image: "https://www.gerberchildrenswear.com/cdn/shop/products/h42qflny1bqolfystrik.jpg?v=1707000653&width=900",
            color: "Striped Cotton"
        },
        {
            id: 'cap4',
            image: "https://img.joomcdn.net/36559d8eb4da850ff61422f9d056aa36ea433cf8_original.jpeg",
            color: "Knitted Bear"
        },
        {
            id: 'cap5',
            image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://mickeyminors.pk/wp-content/uploads/2021/12/4-1.jpg",
            color: "Mickey Mouse"
        }
    ];

    const kitItems = {
        'Clothing Essentials': [
            { 
                id: 1, 
                name: 'Bodysuits (0-3 months)', 
                price: 499, 
                description: 'Pack of 3 cotton bodysuits',
                hasVariants: true,
                variantType: 'bodysuit'
            },
            { 
                id: 2, 
                name: 'Sleep Suits', 
                price: 599, 
                description: 'Comfortable sleep wear',
                hasVariants: true,
                variantType: 'sleepsuit'
            },
            { 
                id: 3, 
                name: 'Mittens & Booties', 
                price: 299, 
                description: 'Soft cotton set',
                hasVariants: true,
                variantType: 'mittensBooties'
            },
            { 
                id: 4, 
                name: 'Baby Caps', 
                price: 199, 
                description: 'Pack of 2 cotton caps',
                hasVariants: true,
                variantType: 'babyCap'
            }
        ],
        'Care Items': [
            { id: 5, name: 'Baby Wipes', price: 299, description: 'Pack of 72 wipes' },
            { id: 6, name: 'Diapers (Newborn)', price: 599, description: 'Pack of 36 diapers' },
            { id: 7, name: 'Baby Lotion', price: 349, description: 'Gentle moisturizing lotion' },
            { id: 8, name: 'Baby Oil', price: 249, description: 'Gentle baby oil' }
        ],
        'Feeding & Nursing': [
            { id: 9, name: 'Feeding Bottles', price: 499, description: 'Set of 3 bottles' },
            { id: 10, name: 'Burp Cloths', price: 299, description: 'Pack of 4 cloths' },
            { id: 11, name: 'Bottle Brush', price: 149, description: 'Bottle cleaning brush' },
            { id: 12, name: 'Pacifiers', price: 199, description: 'Pack of 2 pacifiers' }
        ]
    };

    const handleBodysuitSelect = (bodysuitId) => {
        setSelectedBodysuit(bodysuitId);
    };

    const handleSleepsuitSelect = (sleepsuitId) => {
        setSelectedSleepsuit(sleepsuitId);
    };

    const handleMittensBootiesSelect = (mittensBootiesId) => {
        setSelectedMittensBooties(mittensBootiesId);
    };

    const handleBabyCapSelect = (capId) => {
        setSelectedBabyCap(capId);
    };

    const handleQuantityChange = (itemId, quantity) => {
        // Update selected items
        const updatedItems = {
            ...selectedItems,
            [itemId]: quantity
        };
        setSelectedItems(updatedItems);

        // Calculate new total price
        const newTotal = Object.entries(updatedItems).reduce((total, [id, qty]) => {
            if (qty > 0) {
                const item = Object.values(kitItems)
                    .flat()
                    .find(item => item.id === parseInt(id));
                return total + (item?.price * qty);
            }
            return total;
        }, 0);

        setTotalPrice(newTotal);
    };

    const handleBuyNow = () => {
        // Validate if items with variants are selected properly
        const validateVariants = () => {
            if (selectedItems[1] && !selectedBodysuit) return 'Please select a bodysuit style';
            if (selectedItems[2] && !selectedSleepsuit) return 'Please select a sleepsuit style';
            if (selectedItems[3] && !selectedMittensBooties) return 'Please select a mittens & booties style';
            if (selectedItems[4] && !selectedBabyCap) return 'Please select a baby cap style';
            return null;
        };

        const validationError = validateVariants();
        if (validationError) {
            alert(validationError);
            return;
        }

        const orderDetails = {
            items: selectedItems,
            variants: {
                bodysuit: selectedBodysuit,
                sleepsuit: selectedSleepsuit,
                mittensBooties: selectedMittensBooties,
                babyCap: selectedBabyCap
            },
            totalPrice: totalPrice
        };
        console.log('Proceeding to checkout:', orderDetails);
        navigate('/checkout', { state: { orderDetails } });
    };

    const renderItemContent = (item) => {
        if (item.hasVariants) {
            const options = item.variantType === 'bodysuit' 
                ? bodysuitOptions 
                : item.variantType === 'sleepsuit'
                ? sleepsuitOptions
                : item.variantType === 'mittensBooties'
                ? mittensBootiesOptions
                : babyCapOptions;
            
            const selectedVariant = item.variantType === 'bodysuit' 
                ? selectedBodysuit 
                : item.variantType === 'sleepsuit'
                ? selectedSleepsuit
                : item.variantType === 'mittensBooties'
                ? selectedMittensBooties
                : selectedBabyCap;
            
            const handleSelect = item.variantType === 'bodysuit' 
                ? handleBodysuitSelect 
                : item.variantType === 'sleepsuit'
                ? handleSleepsuitSelect
                : item.variantType === 'mittensBooties'
                ? handleMittensBootiesSelect
                : handleBabyCapSelect;

            return (
                <div>
                    <div className="flex-1 mb-4">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-blue-600 font-medium">₹{item.price}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {options.map((option) => (
                            <div 
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                                    selectedVariant === option.id 
                                        ? 'border-blue-500' 
                                        : 'border-transparent'
                                }`}
                            >
                                <img 
                                    src={option.image} 
                                    alt={option.color}
                                    className="w-full h-20 object-cover"
                                />
                                {selectedVariant === option.id && (
                                    <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-bl-lg">
                                        <FaCheck className="text-white text-sm" />
                                    </div>
                                )}
                                <p className="text-xs text-center p-1">{option.color}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-blue-600 font-medium">₹{item.price}</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-16 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* Hero Section with Enhanced Animation */}
                <div className="text-center mb-16 relative animate-fade-in">
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold mb-4 animate-bounce">
                        Customize Your Perfect Kit
                    </span>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Welcome to the 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                            Newborn Kit
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create the perfect collection of essentials for your little one with our carefully curated selection.
                    </p>
                </div>

                {/* Main Content - Keep existing grid structure but add enhanced styling */}
                <div className="grid md:grid-cols-3 gap-10 relative z-10">
                    {/* Left Column - Kit Items - Enhanced card styling */}
                    <div className="md:col-span-2 space-y-10">
                        {Object.entries(kitItems).map(([category, items]) => (
                            <div key={category} 
                                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100"
                            >
                                {/* Category Header with new gradient */}
                                <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 p-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        {category}
                                    </h2>
                                </div>

                                {/* Items with enhanced hover effects */}
                                <div className="p-8 space-y-8">
                                    {items.map(item => (
                                        <div key={item.id} 
                                            className="group bg-white/60 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-purple-50 hover:border-purple-200"
                                        >
                                            {/* Keep existing item content structure */}
                                            {renderItemContent(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Summary with glass effect */}
                    <div className="md:col-span-1">
                        <div className="sticky top-4 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-purple-100">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 -mx-8 -mt-8 p-8 rounded-t-3xl mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    Kit Summary
                                </h2>
                            </div>

                            {/* Enhanced summary content */}
                            <div className="space-y-4 mb-8">
                                {Object.entries(selectedItems).map(([itemId, quantity]) => {
                                    if (quantity > 0) {
                                        const item = Object.values(kitItems)
                                            .flat()
                                            .find(item => item.id === parseInt(itemId));
                                        return (
                                            <div key={itemId} className="flex justify-between">
                                                <span className="text-gray-600">
                                                    {item.name} x {quantity}
                                                </span>
                                                <span className="font-medium">
                                                    ₹{item.price * quantity}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            {/* Enhanced total and button section */}
                            <div className="border-t border-purple-100 pt-6">
                                <div className="flex justify-between mb-8">
                                    <span className="text-xl font-bold text-gray-800">Total:</span>
                                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                        ₹{totalPrice.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={totalPrice === 0}
                                    className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform ${
                                        totalPrice === 0 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
                                    }`}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewbornKitCustomization; 