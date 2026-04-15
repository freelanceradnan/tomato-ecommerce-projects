import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetCategoryQuery, useGetEditPostQuery, useUpdateProductMutation } from '../../app/store';
import { uploadToCloudinary } from '../../utils/cloudinary';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [updateProduct] = useUpdateProductMutation();
    

    const { data: singleData, isLoading: isProductLoading } = useGetEditPostQuery(id, {
        skip: !id
    });
    const { data: allCategory = [] } = useGetCategoryQuery();

    // Form States
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [product, setProduct] = useState(null); 
    const [categoryList, setCategoryList] = useState([]);

    // Image states
    const [keepExistingImage, setKeepExistingImage] = useState(true);
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    
    useEffect(() => {
        if (singleData) {
            setProduct(singleData);
            setTitle(singleData.title || "");
            setPrice(singleData.price || "");
            setCategoryId(singleData.categoryId || "");
        }
        if (allCategory) {
            setCategoryList(allCategory);
        }
    }, [singleData, allCategory]);

    const handlernewImage = (file) => {
        if (!file) return;
        setNewImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setKeepExistingImage(false);
    };

    const removeNewImage = () => {
        setNewImageFile(null);
        setImagePreview(null);
        setKeepExistingImage(true);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            
            let imageUrl = product?.image; 

            if (newImageFile && !keepExistingImage) {
               
                const uploaded = await uploadToCloudinary(newImageFile);
                imageUrl = uploaded.url;
            }

            await updateProduct({
                id: id,
                updates: {
                    title,
                    price: Number(price),
                    image: imageUrl,
                    categoryId: categoryId
                }
            }).unwrap();

            alert('Product updated successfully!');
            navigate('/admin-dashboard/inventory');
        } catch (error) {
            console.error(error);
            alert('Failed to update!');
        } finally {
            setSubmitting(false);
        }
    };

    
    if (isProductLoading) return <div className="p-10 text-center">Loading product data...</div>;

    return (
        <div className='p-4'>
            <div className='flex flex-col justify-between md:flex-row gap-2 max-w-full mb-5'>
                <div className='py-2'>
                    <h2 className='text-xl font-bold'>Edit Inventory</h2>
                    <p className='text-sm text-gray-600'>Manage your inventory items</p>
                </div>
                <div>
                    <Link to="/admin-dashboard/inventory">
                        <button className='bg-[#e96841] text-white px-4 py-2 rounded-sm hover:bg-[#e64514] text-sm'>
                            Go to Inventory List
                        </button>
                    </Link>
                </div>
            </div>

            <div className='bg-white p-5 border rounded-md shadow-sm'>
                <form className='max-w-sm flex flex-col gap-4' onSubmit={submitHandler}>
                    {/* Product Name */}
                    <div>
                        <label className='block text-sm font-medium mb-1'>Product Name</label>
                        <input 
                            type="text" 
                            className='border w-full p-2 rounded-md' 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            disabled={submitting}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className='block text-sm font-medium mb-1'>Price</label>
                        <input 
                            type="number" 
                            className='border w-full p-2 rounded-md' 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            disabled={submitting}
                            required
                        />
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label className='block text-sm font-medium mb-1'>Select Category</label>
                        <select 
                            className='border w-full p-2 rounded-md' 
                            value={categoryId} 
                            onChange={(e) => setCategoryId(e.target.value)}
                            disabled={submitting}
                            required
                        >
                            <option value="">-- Choose Category --</option>
                            {categoryList?.map((single) => (
                                <option value={single.id} key={single.id}>{single.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Current Image Display */}
                    <div>
                        <label className='block text-sm font-bold mb-1'>Current Image</label>
                        {product?.image ? (
                            <img src={product.image} alt="product" className='w-20 h-20 object-cover border mb-2 rounded' />
                        ) : (
                            <div className="text-gray-400 text-xs">No image available</div>
                        )}
                        <label className='flex items-center gap-2 text-sm cursor-pointer'>
                            <input 
                                type="checkbox" 
                                checked={keepExistingImage} 
                                onChange={() => setKeepExistingImage((p) => !p)} 
                                disabled={submitting || !!newImageFile}
                            />
                            Keep existing image
                        </label>
                    </div>

                    {/* New Image Upload */}
                    <div className='mt-2'>
                        <label className='block text-sm font-bold mb-1'>Upload New Image</label>
                        <input 
                            type="file" 
                            accept='image/*' 
                            onChange={(e) => handlernewImage(e.target.files[0])} 
                            className='text-sm border w-full p-1'
                            disabled={submitting}
                        />
                        {newImagePreview && (
                            <div className='mt-2 p-2 border border-dashed rounded'>
                                <img src={newImagePreview} className='w-20 h-20 object-cover mb-1' alt="preview" />
                                <button 
                                    type="button"
                                    onClick={removeNewImage} 
                                    className='text-xs text-white bg-red-500 px-2 py-1 rounded'
                                >
                                    Clear new image
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        className={`mt-4 p-2 rounded-md text-white font-bold ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        type='submit' 
                        disabled={submitting}
                    >
                        {submitting ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;