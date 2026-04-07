import React from 'react';

const Policies = () => {
    return (
        <div className='w-full max-w-full md:max-w-4xl mx-auto bg-[#F9F9F9] md:p-6 min-h-screen'>
        <h2 className='font-semibold text-2xl'>Privacy and Confidentiality</h2>

        {/* //grid */}
        <div className='flex flex-col gap-6'>

        <div>
            <h2>At Tomato.com, protecting your privacy is our priority. This policy outlines how we collect, use, and safeguard your information in a simplified manner.</h2>
        </div>
       
       <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>1. Information We Collect</h2>
        <p>We may collect the following data to provide our services:</p>
        <ul className='pl-2' style={{"list-style-type":"circle"}}>
            <li><span className='font-semibold'>Personal Information:</span>Name, email address, phone number, delivery address, and date of birth.</li>
            <li><span className='font-semibold'>Payment Details:</span>Bank account or card information (processed securely by our payment partners).</li>
            <li><span className='font-semibold'>Technical Data:</span>IP address, browser type, and Cookies.</li>
            <li><span className='font-semibold'>Location Data:</span>To facilitate accurate and timely delivery.</li>
        </ul>
       </div>

 <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>2. How We Use Your Information</h2>
        
        <ul className='pl-2' style={{"list-style-type":"circle"}}>
            <li>To process your orders and deliver products to your doorstep.</li>
            <li>To provide order updates and customer support.</li>
            <li>To send marketing offers and news about new products (only if you opt-in).</li>
            <li>To improve our website functionality and user experience.</li>
        </ul>
       </div>


 <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>3. Data Sharing (Third Parties)</h2>
        <p>We may collect the following data to provide our services:</p>
        <ul className='pl-2' style={{"list-style-type":"circle"}}>
            <li><span className='font-semibold'>Logistics Partners:</span>To ensure your products reach your address.</li>
            <li><span className='font-semibold'>Payment Gateways:</span>To verify and complete financial transactions.</li>
            <li><span className='font-semibold'>Legal Requirements:</span>If requested by government authorities or required by law.</li>
            <li>We never sell your personal data to third part.</li>
        </ul>
       </div>


 <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>4. Security</h2>
        <p>We use modern server security and firewalls to protect your data. However, as no internet transmission is 100% secure, we advise you to keep your account password confidential.</p>
       </div>

<div className='flex flex-col gap-2'>
    <h2 className='text-xl font-semibold'>6. Minors</h2>
    <p><span className='font-semibold'>Tomato.com</span>does not sell products to individuals under the age of 18. Any use of the site by a minor must be under the supervision of a parent or guardian.</p>
</div>
<div>
   <span  className='font-semibold'> Contact Us:</span> If you have any questions regarding this Privacy Policy, please contact our support team directly
</div>
        </div>
        </div>
    );
};

export default Policies;