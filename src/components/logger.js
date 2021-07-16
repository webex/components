// Due to webpack, the winston classes need to be imported separately, to avoid importing the File transport which generates an error in the browser
import logform from 'logform';
import createLogger from '../../node_modules/winston/dist/winston/create-logger';
import Console from '../../node_modules/winston/dist/winston/transports/console';

const activeTransports = [];

if (process.env.NODE_ENV !== 'production') {
  activeTransports.push(new Console({
    format: logform.format.combine(
      logform.format.colorize(),
      logform.format.simple(),
    ),
  }));
}

const logger = createLogger({
  transports: activeTransports,
});

export default logger;
