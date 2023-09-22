import bunyan from 'bunyan';

export const logger = bunyan.createLogger({
  name: 'server',
  level: 'info',
  src: true
});
