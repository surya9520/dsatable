import { mongoose,Schema } from "mongoose";

const userDsaSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dsa',
        required: true,
    },
    solutionCode:{
        type:String,
        required:true
    },
    language: {
        type: String,
        required: true,
        enum: ['JavaScript', 'Python', 'C++', 'Java'], // Programming language used for the solution
    },

})

const Userdsa=mongoose.model('userdsa',userDsaSchema);

export {Userdsa} 