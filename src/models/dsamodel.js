import { mongoose, Schema,Types } from "mongoose";


const dsaSchema = new Schema(
  {
    questionName: {
      type: String,
      require: true,
    },
    platform: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    solutionVideoLink: {
      type: String,
    },
    solutionArticleLink: {
      type: String,
    },
    complexity: {
      type: String,
      enum: ["easy", "medium", "hard"],
      require: true,
    },
    intop: {
      type: Boolean,
      default: false // Whether the question is in the top questions
    },
    lists: [{
      type: Types.ObjectId,
      ref: 'List' // Array of List schema references
    }],
    dataStructureTags: [{
      type: Types.ObjectId,
      ref: 'DataStructureTag' // Reference to DataStructureTag schema
    }],
    companyTags: [{
      type: Types.ObjectId,
      ref: 'CompanyTag' // Reference to CompanyTag schema
    }],
    complexityTags: {
      type: Types.ObjectId,
      ref: 'DifficultyTag', // Reference to DifficultyTag schema
      required: true // Difficulty is mandatory
    },
    platformTags: [{
      type: Types.ObjectId,
      ref: 'PlatformTag' // Reference to PlatformTag schema
    }],
    lists: [{
      type: Schema.Types.ObjectId,
      ref: 'List' ,
      required:false
    }]
  
  },
  { timestamps: true }
);

const Dsa = mongoose.model("dsa", dsaSchema);

export { Dsa };
