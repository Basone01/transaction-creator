import Parse from 'parse';
import config from '../config';
Parse.initialize(config.PARSE_APP_ID, config.PARSE_JS_KEY);
Parse.serverURL = config.PARSE_SERVER_URL;
