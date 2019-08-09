import { App } from './app';

const myApp = new App();

myApp.listen(myApp.config.port, () => console.log(`Server is running on PORT=${myApp.config.port}, ENV=${myApp.config.env}`));

process.once('SIGUSR2', () => myApp.closeDataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => myApp.closeDataBaseConnection('execution interrupted', () => process.exit(0)));