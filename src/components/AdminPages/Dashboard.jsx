import { Package, ShoppingCart, SquareKanban, Truck, UsersRound } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useGetAllPostsQuery, useGetAllUsersQuery, useGetCategoryQuery } from "../../app/store";

const Dashboard = () => {
    const {data:allProduct=[]}=useGetAllPostsQuery()
    const {data:allCategory=[]}=useGetCategoryQuery()
    const {data:allUsers=[]}=useGetAllUsersQuery()
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
  ];

  return (
    <>
    <div>
    <div>
        <h2 className="font-semibold text-2xl uppercase">Dashboard</h2>
    </div>
        <div className="lg:flex items-center  justify-between py-10 space-y-2">
    
    <div className="border border-[#d4a496] min-w-[200px] p-4  rounded-sm  bg-[#fcefeb]">
     <div className="flex justify-between">
        <h2 className="uppercase font-semibold">Products</h2>
        <div><ShoppingCart color="white" className="bg-[#8f442d] p-1"/></div>
     </div>
     <div className="text-2xl">{allProduct.length}</div>
    </div>
    <div className="border border-[#91cea9] min-w-[200px] p-4  rounded-sm  bg-[#e5f9ed]">
     <div className="flex justify-between">
        <h2  className="uppercase font-semibold">Categories</h2>
        <div><SquareKanban color="white" className="bg-[#12a84e] p-1"/></div>
        
     </div>
     <div className="text-2xl">{allCategory.length}</div>
    </div>
     <div className="border border-[#b2dfe6] min-w-[200px] p-4  rounded-sm  bg-[#e5f8fb] ">
     <div className="flex justify-between">
        <h2  className="uppercase font-semibold">Users</h2>
        <div><UsersRound color="white" className="bg-[#3bb0c2] p-1"/></div>
     </div>
     <div className="text-2xl">{allUsers.length}</div>
    </div>
    <div className="border border-[#cabf9d] min-w-[200px] p-4  rounded-sm  bg-[#fdf7e5]">
     <div className="flex justify-between">
        <h2  className="uppercase font-semibold">Orders</h2>
        <div><Truck color="white" className="bg-[#94710a] p-1"/></div>
     </div>
     <div className="text-2xl">0</div>
    </div>
    </div>
    {/* chats */}
    <div className="lg:flex">
          {/* Bar Chart */}
      <div style={{ width: "100%", height: "50vh", maxWidth: "700px"}} className="border border-[#c4bbbb]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div style={{ width: "100%", height: "50vh", maxWidth: "700px" }} className="border border-[#c4bbbb]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </>
  );
};

export default Dashboard;