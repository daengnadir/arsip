const admin = (req, res, next) => {
    if (!req.session.userName) {
      return res.redirect('/admin/login');
    }
    next();
  };
  
  module.exports = admin