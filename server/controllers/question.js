import Question from "../models/Question.js";

const postQuestion = async (req, res) => {
    const { subject, semester, year, paperUrl } = req.body;

    const newQuestionPaper = new Question({
        subject,
        semester,
        year,
        paperUrl
    });

    const savedQuestionPaper = await newQuestionPaper.save();

    try{
        return res.json({
        success: true,
        message: "Question paper uploaded successfully",
        data: savedQuestionPaper
    })
    }catch(error){
        return res.json({
        success: false,
        message: "Failed to upload question paper",
        data: null   
    }
    )
}
} 

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        return res.json({
            success: true,
            message: "Question papers retrieved successfully",
            data: questions
        });
    }
    catch (error) {
        return res.json({
            success: false, 
            message: "Failed to retrieve question papers",
            data: null
        });
    }
}

export { postQuestion, getQuestions };