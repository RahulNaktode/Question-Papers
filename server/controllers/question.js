import Question from "../models/Question.js";

const postQuestion = async (req, res) => {
    const { subject, semester, year, paperUrl, department } = req.body;

    try {
        const newQuestionPaper = new Question({
            subject,
            semester,
            year,
            paperUrl,
            department 
        });

        const savedQuestionPaper = await newQuestionPaper.save();

        return res.json({
            success: true,
            message: "Question paper uploaded successfully",
            data: savedQuestionPaper
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to upload question paper",
            error: error.message
        });
    }
}

const getQuestions = async (req, res) => {
    try {
        const { department } = req.query;

        let filter = {};
        if (department) {
            filter.department = department;
        }

        const questions = await Question.find(filter);
        
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