// packages & scripts imports
import mongoose from "mongoose";
import app from './app';
import config from './server.config';

// Connect to the Database & server startup
mongoose.connect(config.db,function(err, res) {
  if(err) {
    return console.log('ERROR: comnecting to Database. ' + err);
  }
    console.log('Connecting to db stablished...');

    app.listen(config.port, function() {
      console.log(`Node server running on http://localhost:${config.port}`);
    });
});
