import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export const ApiSlice=createApi({
    reducerPath:'api',
    baseQuery:fakeBaseQuery(),
    tagTypes:['products','category','users'],
    endpoints:(builder)=>({
        getAllPosts:builder.query({
         async queryFn(){
            try{
                const docRef=collection(db,'products')
                const docSnap=await getDocs(docRef)
                const filteredData=docSnap.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                return {data:filteredData,error:null}
            }
            catch(error){
  return { error: { message: "failed to fetch all data" } }
}
         },
         providesTags:['products']
        }),
         getEditPost:builder.query({
         async queryFn(id){
            
            try{
            const productRef=doc(db,'products',id)
            
            const productsnap=await getDoc(productRef)
            
            const product=productsnap.data()
            return {data:product}
            }
            catch(error){
  return { error: { message: "failed to fetch all data" } }
}
         },
         providesTags:['products']
        }),
        getAllUsers:builder.query({
         async queryFn(){
            try{
                const docRef=collection(db,'users')
                const docSnap=await getDocs(docRef)
                const filteredData=docSnap.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                return {data:filteredData,error:null}
            }
            catch(error){
  return { error: { message: "failed to fetch all data" } }
}
         },
         providesTags:['users']
        }),
        updateProduct:builder.mutation({
        async queryFn({id,updates}){
            try {
             const upRef=doc(db,'products',id)
             const updateData=await updateDoc(upRef,{
                ...updates,
                updatedAt:serverTimestamp()
             })
             return {data:updateData}  
            } catch(error){
  return { error: { message: "failed to update" } }
}
        },
        invalidatesTags:['products']
        }),
        getProductByCategory:builder.query({
            async queryFn(categoryId){
                try {
                    const q=query(collection(db,'products'),
                where("categoryId","==",categoryId))
                const snap=await getDocs(q)
                return{data:snap.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))}
                } catch (error) {
                    return {error:"failed to fetch product by category"}
                }
            }
        }),
        getCategory:builder.query({
         async queryFn(){
            try {
            const snapsort=await getDocs(query
                (collection(db,'category')
                ,where("isActive","==",true)))
            return{
                data:snapsort.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
            }
            } catch (error) {
                return {error:"failed to fetch active category"}
            }
         }
        }),
        addProduct:builder.mutation({
        queryFn: async(product)=>{
        try {
        await addDoc(collection(db,'products'),{
            ...product
        })
        return {data:product}
        } catch (error) {
            return {error:"failed to add products"}
        }
        }
        }),
        getUsers:builder.query({
         async queryFn(){
            try {
            const snapsort=await getDocs(query
                (collection(db,'users')
                ,where("isActive","==",true)))
            return{
                data:snapsort.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
            }
            } catch (error) {
                return {error:"failed to fetch active category"}
            }
         },
         providesTags:['users']
        }),
        getOrders:builder.query({
         async queryFn(){
            try {
            const orderRef=collection(db,'orders')
            const snapsort=await getDocs(orderRef)
            return{
                data:snapsort.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
            }
            } catch (error) {
                return {error:"failed to fetch active category"}
            }
         }
         
        }),
        deleteUser: builder.mutation({
      async queryFn(id) {
        
        try {
          await deleteDoc(doc(db, 'users', id));
          return { data: id };
        } catch (error) {
          return { error: { message: "Delete failed" } };
        }
      },
      invalidatesTags: ['users'] 
    }),
    updateUser:builder.mutation({
        async queryFn({id,...editForm}){
           
            try {
             const upRef=doc(db,'users',id)
             const updateData=await updateDoc(upRef,{
                ...editForm
             })
             return {data:updateData}  
            } catch(error){
  return { error: { message: "failed to update" } }
}
        },
        invalidatesTags:['users']
        }),
    })
})
export const {useAddProductMutation,useUpdateProductMutation,useGetAllPostsQuery,useGetCategoryQuery,useGetProductByCategoryQuery,useGetAllUsersQuery,useGetEditPostQuery,useGetUsersQuery,useDeleteUserMutation,useUpdateUserMutation,useGetOrdersQuery}=ApiSlice