import { Dsa } from "../models/dsamodel.js";

// Adding a DSA problem
const addDsaProblem = async (req, res) => {
  console.log(req.body);
  const {
    questionName,
    platform,
    link,
    solutionVideoLink,
    solutionArticleLink,
    complexity,
    complexityTags,
    companyTags,
    dataStructureTags,
    lists, // Include lists
    description, // Include description
  } = req.body;

  try {
    // Check if the question already exists
    let dsaProblem = await Dsa.findOne({ questionName });
    if (dsaProblem) {
      return res
        .status(400)
        .json({ msg: `Question "${questionName}" already exists.` });
    }

    // Create a new DSA problem instance
    dsaProblem = new Dsa({
      questionName,
      platform,
      link,
      solutionVideoLink,
      solutionArticleLink,
      complexity,
      complexityTags,
      companyTags,
      dataStructureTags,
      lists, // Added lists
      description, // Added description
    });

    // Save the new DSA problem to the database
    await dsaProblem.save();
    return res.status(201).json(dsaProblem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Get all DSA problems
const getAllProblems = async (req, res) => {
  const { page = 1, limit = 10, filter = {}, search = "" } = req.query;
  if (filter == "") {
    filter = {};
  }
  const filterObj = JSON.parse(filter);
  let listquery = {};
  let dsquery = {};
  let compquery = {};
  let diffquery = {};
  
  if (filterObj.Difficulty != "") {
    diffquery = { companyTags: { $in: filterObj.Difficulty } };
  }
  if (filterObj.Company != "") {
   
    compquery = { companyTags: { $in: filterObj.Company } };
  }
  if (filterObj.datastructure != "") {
    dsquery = { dataStructureTags: { $in: filterObj.datastructure } };
  }
  if (filterObj.list != "") {
    listquery = { lists: { $in: `${filterObj.list}` } };
  }
  const query = {
    ...compquery,
    ...listquery,
    ...dsquery,
    ...diffquery,
    questionName: { $regex: search, $options: "i" },
  };

  console.log("queryyy", query);
  // Calculate pagination parameters
  const skip = (page - 1) * limit;   

  try {
    console.log(req.query);
    const total = await Dsa.countDocuments(query); // Get total documents for pagination
    const problems = await Dsa.find(query).populate('DataStructureTags').populate('CompanyTags').skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ problems, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export { getAllProblems, addDsaProblem };
