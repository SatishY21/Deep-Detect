const axios = require("axios");
const FormData = require("form-data");
const User=require("../models/user_model")
const {uploadToCloudinary,removeImg}=require("../utils/Img_Upload_Rem")

exports.predict = async (req, res) => {
  try {
    
    //console.log(req.file)
    if (!req.file) {
      console.log("Noo image")
      return res.status(400).json({ error: "No image uploaded!" });
    }

   
    const id=req.user._id
    const user=await User.findById(id);
    let attempts=user.totalRemaining

    if(attempts<=0) return res.status(402).json({
      status:"fail",
      data:"No free attempts avilabe, Please Upgrade"
    })

    
    
    // Create FormData and append image
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname, // Send original filename
      contentType: req.file.mimetype, // Send correct MIME type
    });
    
   
  
    // Render https://sixthsem-mini-project-1.onrender.com
    // AWS EC2 http://13.55.199.236:8000
    //local http://127.0.0.1:8000/predict
    const model_uri=process.env.MODEL_URI || "http://127.0.0.1:8000"
  
    const response = await axios.post(`${model_uri}/predict/`, formData, {
      headers: {
        ...formData.getHeaders(), // Ensure correct headers for file upload
      },
      timeout: 6000,
    });


    //uploading img to cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    
    
    //converting confidence to %
    let res_data=response.data
    if (res_data.prediction==="Fake") res_data.confidence=10-res_data.confidence

    res_data.confidence = Math.floor(res_data.confidence * 100) / 10;
    res_data.remaining_attempts=--attempts


     //updating User Database & removeImg form cloudinary
     const req_obj={
       imageUrl : result.secure_url,
       fileName:req.file.originalname,
       result:res_data.prediction,
       confidence:res_data.confidence
     }
     await user.addRequest(req_obj,attempts)
    

    res.status(200).json(res_data); //402 for 0 remaning attempts
    
  }  catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
      return res.status(504).json({ status:"fail",
        error: "The request timed out. Please try again later." }); // 504 Gateway Timeout
    } else {
      console.error('Request failed:', error.message);
      return res.status(500).json({status:"fail",
         error: "An error occurred while processing the request." }); // 500 Internal Server Error
    }
  }
};



