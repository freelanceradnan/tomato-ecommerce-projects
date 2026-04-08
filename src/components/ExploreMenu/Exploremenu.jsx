import React from 'react';

const Exploremenu = ({ handler, categories, activeCategory }) => {
    return (
        <div className='flex flex-col gap-3' id='menu'> 
            <h2 className='text-[#262626] text-3xl font-medium mt-5'>Explore our menu</h2>
            <p className='md:max-w-[60%] text-[#747474] text-[max(1.4vw,14px)]'>
                Choose from a diverse menu featuring a delectable array of meals.
            </p>
            
            <div className="md:h-60 h-48 flex justify-between items-center gap-10 text-center md:m-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
                {categories.map((item) => {
                    const isActive = activeCategory === item
                    return (
                        <div 
                            key={item.id} 
                            className='flex-shrink-0 cursor-pointer' 
                            onClick={() => handler(item)}
                        >
                            <img 
                                src={item.image} 
                                alt={item.name}
                                
                                className={`w-20 h-20 md:w-32 md:h-32 object-cover rounded-full transition-all duration-300 border-4 ${
                                    isActive ? "border-orange-500 p-1" : "border-transparent"
                                }`} 
                            />
                            <p className={`mt-2 text-sm md:text-base transition-colors ${
                                isActive ? "text-orange-600 font-semibold" : "text-[#747474]"
                            }`}>
                                {item.name}
                            </p>
                        </div>
                    );
                })}
            </div>
            <hr className='md:my-2 h-[2px] bg-gray-100 border-none'/>
        </div>
    );
};

export default Exploremenu;