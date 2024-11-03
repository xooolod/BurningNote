import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDirectory = "dist";

export default {
  entry: ["core-js/stable", "regenerator-runtime/runtime", "./src/client/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      }
    ]
  },
  devServer: {
    port: 3000,
    open: false,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://0.0.0.0:8000"
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html'
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
