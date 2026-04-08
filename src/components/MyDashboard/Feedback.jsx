import { Annoyed, Smile, SmilePlus } from "lucide-react";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Feedback = () => {
   const navigate=useNavigate()
   const [emojiFeedback,setEmojiFeedback]=useState("")
    const [data,setData]=useState({
        emoji:"",
        number:"",
        text:"",
        message:""
    })
   
    const handleFeedback = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
    
const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("access_key", "c586bfa8-e5bc-4ca5-bbb7-3f17ac859726");
    //all data
    formData.append("emoji_feedback", data.emoji);
    formData.append("rating_number", data.number);
    formData.append("best_feature", data.text);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
Swal.fire({
  title: "Feedback Successfully!",
  text: "Thanks for submitting your feedback",
  icon: "success"
});
navigate("/")
        
        setData({ emoji: "", number: "", text: "", message: "" });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed!");
    }
  };
  return (
    <div className="w-full max-w-full md:max-w-4xl mx-auto md:p-2 min-h-screen">
      <form
      onSubmit={submitHandler}
        action=""
        className="bg-[#ffffff] max-w-3xl mx-auto rounded-xl p-4  flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold">Feedback</h2>
        <div>
          <h2 className="font-semibold">
            How Would you describe your mood after using our product for first
            time!
          </h2>
          <div className="flex flex-row items-center gap-4">
             <button type="button" onClick={()=>{
                setEmojiFeedback("bad"),
                handleFeedback("emoji","bad")
             }} value="bad">
              <Annoyed size={50} strokeWidth={1} className={emojiFeedback==='bad'?"bg-[#cef2d8] rounded-full":""} />
            </button>
            <button type="button" onClick={()=>{
                setEmojiFeedback("good")
                handleFeedback("emoji","good")
            }} value="bad">
              <Smile size={50} strokeWidth={1} className={emojiFeedback==='good'?"bg-[#cef2d8] rounded-full":""}/>
            </button>
           
            <button type="button" onClick={()=>{
                setEmojiFeedback("excellent")
                handleFeedback("emoji","excellent")
            }} value="bad">
              <SmilePlus size={50} strokeWidth={1} className={emojiFeedback==='excellent'?"bg-[#cef2d8] rounded-full":""}/>
            </button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">
            How would you rate the quality of our product?
          </h2>
          <div className="flex md:gap-2">
            {[1,2,3,4,5].map((num)=>(
                <button key={num} type="button" onClick={()=>handleFeedback("number",num.toString())} 
                className={`px-4 py-2 rounded-full transition-all ${
          data.number === num.toString() ? "bg-[#e1c6fc]" : "bg-[#f0f0f0]"
        }`}
                >{num}</button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold"> Which Feature is the best for you?</h2>
          <div className="flex flex-row gap-2">
            <input type="radio" name="featureSelection" id="check1"  value="The advance search functionality" onChange={(e)=>handleFeedback("text",e.target.value)}/>
            <label htmlFor="check1"><span>The advance search functionality</span></label>
          </div>
          <div className="flex flex-row gap-2">
            <input type="radio" name="featureSelection" id="check2" value="The coustomizable Settings"  onChange={(e)=>handleFeedback("text",e.target.value)}/>
            <label htmlFor="check2"><span>The coustomizable Settings</span></label>
          </div>
          <div className="flex flex-row gap-2">
            {" "}
            <input type="radio" name="featureSelection" id="check3" value="The advance search functionality"  onChange={(e)=>handleFeedback("text",e.target.value)}/>
            <label htmlFor="check3"><span>The advance search functionality</span></label>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Your Feedback</h2>
          <textarea name="message" value={data.message} onChange={(e)=>handleFeedback("message",e.target.value)}rows={3} className="w-full border-[1px] border-slate-300 outline-none rounded-sm"></textarea>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-sm" type="submit">Send Feedback!</button>
      </form>
    </div>
  );

}
export default Feedback;
