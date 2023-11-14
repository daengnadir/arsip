const bcrypt = require("bcrypt")
const {Admin, User} = require('../models');
const imagekit = require("../middleware/imagekit")


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
      req.session.an = admin.id
      const dataAdmin = await Admin.findByPk(req.session.an)
      return res.render("admin/index",  {user : req.session.userName, dataAdmin, id: req.session.an, firstLogin: true, status: "none", link: "0"})
  
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
    
  
      if (user.active == false) {
        return res.status(401).render("user/login", {status: "failed", message: "Akun anda belum aktif"})
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

  async function updateAdminById(req, res) {
    try {
      const {
        userName,
        email,  
        password,
      } = req.body

      const file = req.file
      console.log(req.file)

      const validFormat =
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif"
      if (!validFormat) {
        return res.status(400).json({
          status: "failed",
          message: "Wrong Image Format",
        })
      }
  
      const split = file.originalname.split(".")
      const ext = split[split.length - 1]
  
      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${ext}`,
      })
  

      const hashedPassword = bcrypt.hashSync(password, 10)

      console.log(userName, email, password)
      console.log(req.params.id)
      await Admin.update(
        {
          userName: userName.toLowerCase(),
          email,
          password: hashedPassword,
          image: img.url,
        },
        {
          where: { id: req.params.id, },
        }
      )
      const delay = 3000; // 3 seconds
      setTimeout(() => {
        res.status(201).redirect(
          "/admin/profile/?status=success&message=Berhasil Update"
        );
      }, delay);
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  async function activeUserById(req, res) {
    try {

      await User.update(
        {
          active: true,

        },
        {
          where: { id: req.params.id, },
        }
      )
    res.redirect(
      "/admin/data/?status=success&message=Berhasil aktivasi user"
    );
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

  async function nonActiveUserById(req, res) {
    try {

      await User.update(
        {
          active: false,

        },
        {
          where: { id: req.params.id, },
        }
      )
    res.redirect(
      "/admin/data/?status=success&message=Berhasil non aktif user"
    );
    } catch (error) {
      return res.status(500).send({ message: error.message, })
    }
  }

module.exports = {
    login,
    loginUsers,
    register,
    deleteUsers,
    updateAdminById,
    activeUserById,
    nonActiveUserById,
}