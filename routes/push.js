const Router = require('express').Router;
const webpush = require('web-push');

function configWebpush(config) {
	webpush.setVapidDetails(
		'mailto:example@localhost:8777',
		config.publicKey,
		config.privateKey
	);
}

function sendPushMessage(req, res) {
	const subscriptions = req.body.subscriptions;
	const message = req.body.message;

	subscriptions.forEach(subscription => {
		webpush.sendNotification(subscription, message);
	})

	res.json({ message: 'sent push message done' })
}

module.exports = (config) => {
	configWebpush(config);
	const push = new Router();

	push.post('/', sendPushMessage);

	return push;
}
