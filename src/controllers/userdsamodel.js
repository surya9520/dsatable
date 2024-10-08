import { Userdsa } from "../models/userdsamodel.js";
import { getuser } from "../utils/jwt.js";
import { Dsa } from "../models/dsamodel.js";
import { User } from "../models/usermodel.js";

//submit solution
const submitSolution = async (req, res) => {
  const { questionId, solutionCode,language } = req.body;
  console.log(req.cookies);
  let user = getuser(req.cookies?.uid);
  console.log(user)
  user = await User.findById(user._doc._id); 
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized: No user found" });
  }
  try { 
    let solution = new Userdsa({
      questionId, 
      solutionCode,   
      language, 
      userId:user._id
    });
    await solution.save();
    res.status(200).json({ msg: "solution submitted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "internal server error" });
   
  }
};

//get solution
const getSolution= async(req,res)=>{
  let user = getuser(req.cookies?.uid);
 
let questionId = req.headers.questionid; // Changed to access the header correctly

user = await User.findById(user._doc._id);
if (!user) {
  return res.status(401).json({ msg: "Unauthorized: No user found" });
} 

try {
  let userId = user._id;

  let solution = await Userdsa.find({ questionId, userId });  
  if (solution.length === 0) {
    return res.status(404).json({ msg: "No solutions found" });
  }
  
  res.status(200).json(solution);
} catch (error) {
  console.error("Error fetching solution:", error); 
  res.status(500).json({ msg: "Internal server error" }); 
}

}


//for specific solution
const getSpecifSolution= async(req,res)=>{
let solutionId = req.headers.solutionid;
console.log(solutionId)
try {
  let solution = await Userdsa.findById(solutionId);  
  console.log(solution)
  
  res.status(200).json(solution);
} catch (error) {
  console.error("Error fetching solution:", error); 
  res.status(500).json({ msg: "Internal server error" }); 
}

}

//FOR UPDATE A SOLUTION
const updateSolution = async (req, res) => {
  let { solutionId, language, solutionCode } = req.body;
  console.log(req.body);

  try {
    let updatedSolution = await Userdsa.findByIdAndUpdate(
      solutionId,
      {
        $set: {
          language: language,
          solutionCode: solutionCode,
        },
      },
      { new: true } 
    );

    if (!updatedSolution) {
      return res.status(404).json({ message: 'Solution not found' });
    }
    res.status(200).json({
      msg: 'Solution updated successfully',
      data: updatedSolution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export { submitSolution,getSolution,getSpecifSolution,updateSolution };
