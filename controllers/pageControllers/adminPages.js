const {User,} = require('../../models');

const loginAdminPage = async (req, res) => {
    try {
      res.render("admin/login", {status: "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }
const RegisterUserAdminPage = async (req, res) => {
    try {
      res.render("admin/registerUser", {status: "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

const dashboardAdminPage = async (req, res) => {
    try {
      res.render("admin/index", {user : req.session.userName, link: "1", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const logoutAdminPage = async (req, res) => {
    try {
      req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('admin/login', { title: "Express", logout : "logout Successfully...!", status: "none"})
        }
    })
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  const profileAdminPage = async (req, res) => {
    try {
      res.render("admin/profile", {user : req.session.userName, link: "2", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const UserAdminPage = async (req, res) => {
    try {
      const users = await User.findAll()
      res.render("admin/userData", {user : req.session.userName, users, link: "3", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  loginAdminPage,
  dashboardAdminPage,
  logoutAdminPage,
  profileAdminPage,
  UserAdminPage,
  RegisterUserAdminPage,
}