const path = require('path');

module.exports = {
    mode: "development",
  entry: './src/ts/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //crea el bundle en la carpeta
    publicPath: "dist"
  },
   //indicamos que los maps ya estan generados y que no los tiene que generar que simplemente los tome y los agregue al bundle
  devtool: 'inline-source-map',
  module: {
            //aqui defino las coss que webpack va a revisar
        //por ejemplo aqui revisa todos los .ts menos node_modules
    rules: [
      {
        test: /\.ts$/,
                    //aqi especifico como la herramienta que webpack deberia utilizar
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  resolve: {
                //indica por al archvos que debe revisar y lo que va a juntar todo en un mismo luhar
    extensions: ['.ts', '.js']
  }
};