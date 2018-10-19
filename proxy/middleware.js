module.exports = (req, res, next) => {
  if (req.path === '/users/authenticate' && req.method === 'POST') {

    if (req.body.identifier !== 'lukas' || req.body.password !== '1234') {
      res.status(401);
    } else {
      return res.json({...req.body, token: 'aa89bce2-00fe-42f8-8df9-5e1a03e123aa'});
    }
  }
  // Continue to JSON Server router
  next();
};
