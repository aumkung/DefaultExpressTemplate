class BaseController {
    constructor() {
        this.msg = `Hello World`
    }

    getData = (req, res, next) => {
        try {
            let data = this.msg
            return res.status(200).json({data})
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new BaseController()