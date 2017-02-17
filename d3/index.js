//////////////////////////////////////////////////////////////
// I could have used Coffee script for genealogy though :-) //
//////////////////////////////////////////////////////////////
var express = require('express');
var mysql   = require('mysql');

var app = express();

app.use(express.static('static'));

var person = express();

app.get('/person', person);

app.get('/', function(req, res) {
	res.send('static/index.html')
})

var api = express();

app.use('/api/v1', api);

var mysql = require('mysql');
var db  = mysql.createPool({
	connectionLimit : 10,
	host            : '139.59.63.232',
	user            : 'root',
	password        : 'password',
	database        : 'genealogy'
});


api.get('/relations/:id', function (req, res) {
	var id = req.params.id;

	/*
	var query = 'select from_id, to_id, p1.name person1, p2.name person2 from relations r \
		left join people p1 on p1.id = r.from_id \
		left join people p2 on p2.id = r.to_id \
		where from_id=? OR to_id=?;';
	*/

	var query = 'SELECT id, name FROM ( \
						SELECT to_id id, p.name FROM relations r LEFT JOIN people p ON p.id = r.to_id WHERE from_id = ? \
							UNION ALL \
						SELECT from_id id, p.name from relations r LEFT JOIN people p ON p.id = r.from_id where to_id = ? \
					) t \
					';

	db.query(query,
			[id, id], function (error, results, fields) {
		if (error) throw error;

		db.query('SELECT name FROM people WHERE id = ?', [id], function(e, r, f) {
			if(e) throw e;

			res.json({
				relations: results,
				name: r[0].name,
				id: id,
				names: ['Name 1', 'Name 2', 'Name 3']
			});
		})
	});

});


app.listen(80, function () {
	console.log('Example app listening on port http')
});

