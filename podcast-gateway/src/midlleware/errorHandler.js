const errorHandler = (err, req, res) => {
    
    res.status(500).send(err.message);
  };
  
  module.exports = errorHandler;
  