module.exports = {
  dropDb: function (dbCon, next) {
    dbCon.db.dropDatabase(function (err, res) {
      if (err) console.error(err);

      next && next();
    });
  },
};
