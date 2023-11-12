const user = (req, res, next) => {
    if (!req.session.userName) {
      return res.redirect('/');
    }
    next();
  };
  
  module.exports = user