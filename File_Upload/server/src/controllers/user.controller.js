const create = (req,res) => {
    console.log("create user controller");
    console.log(req.body);
    console.log(req.file);
}

module.exports = {create}