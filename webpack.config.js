const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    mode: "development", //production
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        filename: "bundle.js",
        historyApiFallback: {
            index: "404.html"
        },
        host: "0.0.0.0",
        // hot: true //change withoud reload,
        // port: 8080, //default 8080
        onListening: server => {
            // console.log(`server: `, server);
            console.log(`server.host: `, server.host);
            //on terminal
            const port = server.listeningApp.address().port;
            console.log("Listening on port:", port);
        },
        open: true,
        proxy: {
            "/api": "http://localhost:3000" //your backend API
        },
        // publicPath: "/assets" //bundle folder will be assets/bundle.js default: "/"
        // serveIndex: true // need disable historyApiFallback
        // socket: "socket", // The Unix socket to listen to (instead of a host).
        // sockHost: "myhost.test", // Tells clients connected to devServer to use provided socket host.
        // sockPath: "/socket", // The path at which to connect to the reloading socket.
        // sockPort: 8080, // Tells clients connected to devServer to use provided socket port.
        useLocalIp: true // need host: "0.0.0.0", http://192.168.1.5:8080/, http://192.168.1.4:8080/, use open: true to discover
    }
};
