module.exports = {
  getDeposit: function(req, res){
    getDeposit(req, res);
  }
}

//

function getDeposit(req, res) {

	console.log("sql query....");
  // config for database
  var sql = require('mssql');
  var config = {
      user: 'xxx',
      password: 'xxxxxxx',
      server: 'xxxxxxx', 
      database: 'xxxxx',
      options: {
          tdsVersion:'7_1',
          encrypt: false // Use this if you're on Windows Azure
      }
    };
  var query = req.query
  var id = query.id
  if (id!= null){
    switch (id){
      case '1':
        var sql_query = `select [YYYYMM],
                          銀行別,
                          合計
                        from
                          source.dbo.金融統計月報_存款
                        where
                          銀行別 in
                        (
                        '元大商業銀行' ,'永豐商業銀行',
                        '中國信託商業銀行','台北富邦銀行',
                        '玉山商業銀行','國泰世華商業銀行',
                        '台新國際商業銀行'
                        )
                        and
                          類別='一般銀行及信用合作社存款月底餘額'
                          `;
        break;
      case '2':
        var sql_query = `select [YYYYMM],
                          銀行別,
                          合計
                        from
                          source.dbo.金融統計月報_存款
                        where
                          銀行別 in
                        (
                        '元大商業銀行' ,'永豐商業銀行',
                        '中國信託商業銀行','台北富邦銀行',
                        '玉山商業銀行','國泰世華商業銀行',
                        '台新國際商業銀行'
                        )
                        and
                          類別='一般銀行外匯存款餘額'
                          `;
        break;
    }
  }else{
    console.log('not valid query');
    return
  }

  sql.connect(config, function(err){
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records

    request.query(sql_query, function (err, recordset) {

          if (err) console.log(err)

          // send records as a response
          res.send(recordset);

    });
  });

}
