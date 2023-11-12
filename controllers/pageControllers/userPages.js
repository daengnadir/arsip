const loginUserPage = async (req, res) => {
    try {
      res.render("user/login", {status: "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

const dashboardUserPage = async (req, res) => {
    try {
      res.render("user/index", {user : req.session.userName, link: "1", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const logoutUserPage = async (req, res) => {
    try {
      req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('user/login', { title: "Express", logout : "logout Successfully...!", status: "none"})
        }
    })
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

module.exports = {
  loginUserPage,
  dashboardUserPage,  
  logoutUserPage,
}