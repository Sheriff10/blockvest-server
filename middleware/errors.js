const error = (err, req, res, next) => {
   console.log(err);
   res.send({ error: "Interna Server Error" });
};

module.exports = error;
