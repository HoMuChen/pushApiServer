const apiConfig = {
	port: process.env['API_SERVER_PORT']
}

const pushManagerConfig = {
	publicKey: process.env['PUB_KEY'],
	privateKey: process.env['PRIVATE_KEY']
}

const subscriptionsDBConfig = {
	host: process.env['RTK_HOST'],
	port: process.env['RTK_PORT'],
	db: process.env['RTK_DB'],
	tb: process.env['RTK_TB']
}

module.exports = {
	apiConfig,
	pushManagerConfig,
	subscriptionsDBConfig
}
