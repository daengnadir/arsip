const {User, Admin} = require('../../models');

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
      const dataUser = await User.findByPk(req.session.an)
      res.render("user/index", {user : req.session.userName, dataUser,link: "1", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
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
            res.render('user/login', { title: "Sistem Informasi Arsip Perencanaan", logout : "logout Successfully...!", status: "none"})
        }
    })
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  const profileUserPage = async (req, res) => {
    try {
      const dataUser = await User.findByPk(req.session.an)
      res.render("user/profile", {user : req.session.userName, dataUser, id: req.session.an, link: "2", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const uploadUserPage = async (req, res) => {
    const dataUser = await User.findByPk(req.session.an)
    try {
      res.render("user/upload", {user : req.session.userName, dataUser, id: req.session.an, link: "3", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  loginUserPage,
  dashboardUserPage,  
  logoutUserPage,
  profileUserPage,
  uploadUserPage,
}