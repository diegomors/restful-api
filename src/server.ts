import { App, Environment } from './app';

const _App = new App();

_App.app.listen(_App.port, _App.host, () => console.log(`Server is running on HOST=${_App.host}, PORT=${_App.port}, ENV=${Environment[_App.environment]}`));

process.once('SIGUSR2', () => _App.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => _App.closeDataBaseConnection('execution interrupted', () => process.exit(0)));