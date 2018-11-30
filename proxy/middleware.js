module.exports = (req, res, next) => {

  if (req.path === '/authenticate' && req.method === 'POST') {
    if (req.body.username === 'lukas_weber@gmx.net' && req.body.password === '123456') {
      return res.json({token: 'aa89bce2-00fe-42f8-8df9-5e1a03e123aa'});
    } else {
      res.status(401);
      return res.json({message: 'you shall not pass!'});
    }
  }

  // Continue to JSON Server router
  next();
};
