import React, { useState } from 'react';
import { useAddProductMutation, useGetCategoryQuery } from '../../app/store';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const AddProduct = () => {
    const navigate = useNavigate(); 
    const { data: allcategory = [] } = useGetCategoryQuery();
    const [addProduct] = useAddProductMutation(); 
    const [submitting, setSubmitting] = useState(false);
    
    const description = "Food provides essential nutrients for overall health and well-being";
    
    const [products, setProducts] = useState({
        title: "",
        price: "",
        image: "",
        category: "", 
        description: description
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProducts({
            ...products,
            
            [name]: name === 'price' ? Number(value) : value
        });
    };

    const imageHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSubmitting(true); 
        try {
            const record = await uploadToCloudinary(file);
            setProducts({ ...products, image: record.url });
            toast.info("Image uploaded successfully!");
        } catch (error) {
            toast.error("Image upload failed");
        } finally {
            setSubmitting(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
       
        if (!products.image) {
            return toast.error('Image missing!');
        }

        setSubmitting(true);
        try {
            await addProduct(products).unwrap(); 
            toast.success('Product Added!', {
                style: { backgroundColor: '#ff8c00', color: '#ffffff' },
                progressStyle: { background: '#ffffff' }
            });
            navigate("/"); 
        } catch (error) {
            toast.error("Failed to add product");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        
        <form className='max-w-sm flex flex-col gap-4' onSubmit={submitHandler}>
            <h2 className='font-semibold'>Add Product</h2>
            <div>
                <label className='block text-sm font-medium mb-1'>Product Name</label>
                <input 
                    type="text" 
                    className='border w-full p-2 rounded-md'
                    name="title"
                    value={products.title}
                    onChange={changeHandler}
                    required
                />
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Price</label>
                <input 
                    name="price"
                    value={products.price}
                    onChange={changeHandler}
                    type="number" 
                    className='border w-full p-2 rounded-md' 
                    required
                />
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Select Category</label>
                <select 
                    className='border w-full p-2 rounded-md'
                    name="category"
                    onChange={changeHandler}
                    required
                >
                    <option value="">-- Choose Category --</option>
                    {allcategory?.map((single) => (
                        <option value={single.id} key={single.id}>{single.name}</option>
                    ))}
                </select>
            </div>

            <div className='mt-2'>
                <label className='block text-sm font-bold mb-1'>Upload New Image</label>
                <input 
                    type="file" 
                    accept='image/*' 
                    onChange={imageHandler}
                    className='text-sm border w-full p-1'
                />
                
                {products.image && (
                    <div className='mt-2 p-2 border border-dashed rounded'>
                        <img src={products.image} className='w-20 h-20 object-cover mb-1' alt="preview" />
                    </div>
                )}
            </div>

            <button 
                className={`mt-4 p-2 rounded-md text-white font-bold ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                type='submit' 
                disabled={submitting}
            >
                {submitting ? 'Processing...' : 'Add Product'}
            </button>
        </form>
    );
};

export default AddProduct;