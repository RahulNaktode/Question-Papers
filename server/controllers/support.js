import Support from './../models/Support.js'

const postSupport = async (req, res) => {
    try {
        const { name, email, type, subject, description } = req.body;

        // Validation
        if (!name || !email || !subject || !description) {
            return res.json({ 
                success: false, 
                message: "Please fill all required fields" 
            });
        }

        const entry = new Support({
            name,
            email,
            type,
            subject,
            description
        });

        await entry.save();

        return res.json({ 
            success: true, 
            message: "Data saved successfully! We will get back to you." 
        });

    } catch (error) {
        console.error("Backend Error:", error);
        return res.json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

const getSupport = async (req, res) => {
    try {
        const allReports = await Support.find().sort({ createdAt: -1 });
        return res.json({ 
            success: true, 
            data: allReports 
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export {postSupport, getSupport}