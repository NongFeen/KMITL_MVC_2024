const corsOptions = {
    origin: (origin, callback) => {
        const isLocalNetwork = origin && origin.startsWith('http://192.168.1.');
        const isLocalhost = origin === 'http://localhost:5500' || origin === 'http://127.0.0.1:5500';
        
        if (isLocalNetwork || isLocalhost) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
