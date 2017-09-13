const Router = require('express').Router;
const r = require('rethinkdb');

function getDBConnection(config) {
	return function(req, res, next) {
		r.connect({host: config.host, port: config.port, db: config.db})
			.then(function(conn) {
				req.conn = conn;
				next()
			})
		}
}

function getAllSubscriptions(req, res) {
	const conn = req.conn;

	r.table('subscriptions').run(conn)
		.catch(function(err) { res.json({message: 'Somthing wrong with fetching table data'}) })
		.then(function(cur) { return cur.toArray() })
		.then(function(data) { res.json(data) })
}

function getSubscriptionById(req, res) {
	const conn = req.conn;
	const id = req.params.id;

	r.table('subscriptions').get(id).run(conn)
		.catch(function(err) { res.json([]) })
		.then(function(data) { res.json(data) })

}

function deleteSubscriptionById(req, res) {
	const conn = req.conn;
	const id = req.params.id;

	r.table('subscriptions').get(id).delete().run(conn)
		.catch(function(err) { res.json([]) })
		.then(function(data) { res.json(data) })

}

function createSubscription(req, res) {
	const conn = req.conn;
	const doc = req.body.doc;

	r.table('subscriptions').insert(doc).run(conn)
		.catch(function(err) { res.json({message: 'Something wrong with creating subscription'}) })
		.then(function(data) { res.json(data) })
}

module.exports = (config) => {
	const subscriptions = new Router();

	subscriptions.use( getDBConnection(config) );

	subscriptions.get('/', getAllSubscriptions);
	subscriptions.get('/:id', getSubscriptionById);
	subscriptions.delete('/:id', deleteSubscriptionById)
	subscriptions.post('/', createSubscription)

	return subscriptions;
}
