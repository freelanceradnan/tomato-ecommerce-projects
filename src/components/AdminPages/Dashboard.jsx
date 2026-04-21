import { Package, ShoppingCart, SquareKanban, Truck, UsersRound } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetCategoryQuery, useGetOrdersQuery } from "../../app/store";

const Dashboard = () => {
    const { data: allProduct = [] } = useGetAllPostsQuery();
    const { data: allCategory = [] } = useGetCategoryQuery();
    const { data: allUsers = [] } = useGetAllUsersQuery();
    const {data:orders=[]}=useGetOrdersQuery()
    
    // This is the variable 
    const chartData = [
        { name: 'Products', count: allProduct.length },
        { name: 'Categories', count: allCategory.length },
        { name: 'Users', count: allUsers.length },
        { name: 'Orders', count: orders.length }
    ];

    return (
        <>
            <div>
                <div>
                    <h2 className="font-semibold text-2xl uppercase">Dashboard</h2>
                </div>
                <div className="lg:flex items-center justify-between py-10 space-y-2 lg:space-y-0 lg:gap-4">
                    <div className="border border-[#d4a496] flex-1 p-4 rounded-sm bg-[#fcefeb]">
                        <div className="flex justify-between">
                            <h2 className="uppercase font-semibold">Products</h2>
                            <ShoppingCart color="white" className="bg-[#8f442d] p-1" />
                        </div>
                        <div className="text-2xl font-bold">{allProduct.length}</div>
                    </div>
                    <div className="border border-[#91cea9] flex-1 p-4 rounded-sm bg-[#e5f9ed]">
                        <div className="flex justify-between">
                            <h2 className="uppercase font-semibold">Categories</h2>
                            <SquareKanban color="white" className="bg-[#12a84e] p-1" />
                        </div>
                        <div className="text-2xl font-bold">{allCategory.length}</div>
                    </div>
                    <div className="border border-[#b2dfe6] flex-1 p-4 rounded-sm bg-[#e5f8fb]">
                        <div className="flex justify-between">
                            <h2 className="uppercase font-semibold">Users</h2>
                            <UsersRound color="white" className="bg-[#3bb0c2] p-1" />
                        </div>
                        <div className="text-2xl font-bold">{allUsers.length}</div>
                    </div>
                    <div className="border border-[#cabf9d] flex-1 p-4 rounded-sm bg-[#fdf7e5]">
                        <div className="flex justify-between">
                            <h2 className="uppercase font-semibold">Orders</h2>
                            <Truck color="white" className="bg-[#94710a] p-1" />
                        </div>
                        <div className="text-2xl font-bold">
                            {orders.length}
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                
<div className="lg:flex gap-4">
    {/* Bar Chart Container */}
    <div className="flex-1 border border-[#c4bbbb] py-8 px-4 bg-white">
        <h2 className="font-bold mb-4">Inventory Overview</h2>
        
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3bb0c2" />
            </BarChart>
        </ResponsiveContainer>
    </div>

    {/* Line Chart Container */}
    <div className="flex-1 border border-[#c4bbbb] py-8 px-4 bg-white">
        <h2 className="font-bold mb-4">Resource Comparison</h2>
      
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
</div>
            </div>
        </>
    );
};

export default Dashboard;