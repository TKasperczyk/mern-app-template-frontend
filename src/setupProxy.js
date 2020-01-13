const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(proxy('/api/*', { 
        target: 'http://localhost:3001' 
    }));

    //TODO: wait until they fix websockets in the development server. Until then use a hardcoded URL in SocketManager
    /*
    app.use(proxy('/ws', { 
        target: 'ws://localhost:3001',
        ws: true,
    }));
    */
};