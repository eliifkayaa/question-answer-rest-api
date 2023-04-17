const getAllQuestions = (req,res,next) => {
    router.get("/", (req,res) => {
        res.status(200).json({
            success: true
        })
    })
}

module.exports = {
    getAllQuestions
}