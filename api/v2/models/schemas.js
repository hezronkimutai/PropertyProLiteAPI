const update = async(req, res) => {
    Object.keys(req.body).forEach((key) => {

        const updateUser = `UPDATE users SET ${key} = '${req.body[key]}' where req.params.id = '${req.params.id}'`
        db.query(updateUser, (err, result) => {
            if (err) { res.status(500).json({ Error: err }) }
        });
    });

}
const delete = async(req, res) => {

}
const get = async(req, res) => {

}
const post = async(req, res) {

}