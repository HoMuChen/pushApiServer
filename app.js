const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./utils/logger');
const subscriptions = require('./routes/subscriptions');
const push = require('./routes/push');

module.exports = (config) => {
	const app = new express();

	app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
		stream: logger.stream
	}));
	app.use(bodyParser.json());
	app.use(cors());

	app.use('/subscriptions', subscriptions( config.subscriptionsDBConfig ));
	app.use('/push', push( config.pushManagerConfig ));

	app.listen(config.apiConfig.port, function() { console.log(`Push api server is now listening on port ${config.apiConfig.port}`) })

	return app;
}
