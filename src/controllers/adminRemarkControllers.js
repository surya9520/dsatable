import { AdminRemark } from "../models/adminRemarkModel.js";
import { getuser } from "../utils/jwt.js";

//to post remark
const postRemark=async(req,res)=>{
    const token=req.cookies?.uid;
    const {remark,solutionId,userId}=req.body;
    try{
    if(token){
        const mentor=getuser(token);
        const mentorId=mentor._doc._id;
        const remark=new AdminRemark({remark,mentorId,solutionId,userId});
        await remark.save()
        res.status(200).json({msg:"remark send successfully"})
    }
    else{
        res.status(402).json({msg:"first login"})
    }
}catch(error){
    res.status(500).json({msg:"internal server error"})
}
}

//to get remark
const getRemark=async(req,res)=>{
    const token=req.headers?.uid;
    try{
        if(token){
        const userId=getuser(token)._doc._id;
        const remark=await AdminRemark.findOne({userId});
        const review=remark.review;
        res.status(200).json({review});
        }
        else{
            res.status(402).json({msg:"login first"});
        }
    }catch(error){
        res.status(500).json({msg:"internal server error"});
    }
   
}

//to get users solutions
//get solution
const getUsersSolution= async(req,res)=>{
    let userId = req.headers.id;
   
  let questionId = req.headers.questionid; 
  user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized: No user found" });
  } 
  
  try {
  
    let solution = await Userdsa.findById( userId);  
    if (solution.length === 0) {
      return res.status(404).json({ msg: "No solutions found" });
    }
    
    res.status(200).json(solution);
  } catch (error) {
    console.error("Error fetching solution:", error); 
    res.status(500).json({ msg: "Internal server error" }); 
  }
  
  }

export {postRemark,getRemark,getUsersSolution}