const {User, Admin} = require('../../models');

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
      const dataUser = await User.findAll()
      const dataUserActive = await User.findAll({
        where: {
          active: true
        }
      })
      const dataUserNonActive = await User.findAll({
        where: {
          active: false
        }
      })
      const dataAdmin = await Admin.findByPk(req.session.an)
      res.render("admin/index", {user : req.session.userName, dataUser, dataUserActive, dataUserNonActive, dataAdmin, id: req.session.an, link: "1", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
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
            res.render('admin/login', { title: "SIAP || Sistem Informasi Arsip Perencanaan", logout : "logout Successfully...!", status: "none"})
        }
    })
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  const profileAdminPage = async (req, res) => {
    try {
      const dataAdmin = await Admin.findByPk(req.session.an)
      res.render("admin/profile", {user : req.session.userName, dataAdmin, id: req.session.an, link: "2", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const UserAdminPage = async (req, res) => {
    try {
      const users = await User.findAll()
      const dataAdmin = await Admin.findByPk(req.session.an)
      res.render("admin/userData", {user : req.session.userName, dataAdmin,id: req.session.an, users, link: "3", firstLogin: false, status:req.query.status|| "none",message: req.query.message || "none"})
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