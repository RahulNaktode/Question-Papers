const getHome = (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to server",
    })
}

const getHealth = (req, res) => {
    return res.json({
        success: true,
        message: "Server is healthy",
    })
}

export { getHome, getHealth }