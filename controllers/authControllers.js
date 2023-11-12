const bcrypt = require("bcrypt")
const {Admin, User} = require('../models');

const login = async (req, res) => {
    try {
      const { userName, password } = req.body;
        
      const admin = await Admin.findOne({ where: 
        { userName: userName.toLowerCase(),}, })
  
  
        if (!admin) {
        return res.status(401).render("admin/login", {status: "failed", message: "Admin tidak ditemukan"})
      }
  
  
      const passwordIsValid = bcrypt.compareSync(
        password,
        admin.password)
  
      if (!passwordIsValid) {
        return res.status(401).render("admin/login", {status: "failed", message: "Password salah"})
      }
    
  
      req.session.userName = userName
      return res.render("admin/index",  {user : req.session.userName, firstLogin: true, status: "none", link: "0"})
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }


  const loginUsers = async (req, res) => {
    try {
      const { email, password } = req.body;
        
      const user = await User.findOne({ where: 
        { email: email.toLowerCase(),}, })
  
  
        if (!user) {
        return res.status(401).render("user/login", {status: "failed", message: "Akun tidak ditemukan"})
      }
  
  
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.password)
  
      if (!passwordIsValid) {
        return res.status(401).render("user/login", {status: "failed", message: "Password salah"})
      }
    
  
      req.session.userName = user.userName
      return res.render("user/index",  {user : req.session.userName, firstLogin: true, status: "none", link:"0"})
  
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  const register = async (req, res) => {
    try {
      const {userName, email, password} = req.body
  
      const usernameExist = await User.findOne({
        where: {
          userName: userName.toLowerCase()
        }
      })
  
      if (usernameExist) {
        return res.status(400).render("admin/registerUser", {status: "failed", message: "username telah digunakan"})
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10)
  
      const newUser = await User.create({
        userName: userName.toLowerCase(), password: hashedPassword, email: email
      })
  
      return res.status(201).render("admin/registerUser", {status: "success", message: "Registrasi Berhasil"})
  
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message,
      })
    }
  }

  const deleteUsers = async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id, }, })
     res.redirect("/admin/data/?status=delete&message=User Berhasil dihapus")
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

module.exports = {
    login,
    loginUsers,
    register,
    deleteUsers,
}