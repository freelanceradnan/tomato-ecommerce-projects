import { useLocation } from 'react-router-dom';
import Invoice from '../InvoiceDownload/Invoice';


const InvoicePage = () => {
    const location = useLocation();
    
  
    const { order } = location.state || {}; 

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold">No order found!</h2>
                <p>Please go back to your order history.</p>
            </div>
        );
    }

    return <Invoice orderData={order} userEmail={order?.userEmail} />;
};

export default InvoicePage;