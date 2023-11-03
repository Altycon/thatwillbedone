
import express from 'express';
import favicon from 'serve-favicon';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const host = process.env.HOST || '127.0.0.1:3456';
const port = process.env.PORT || 3456;

const App = express();

App.use(express.static(path.join(__dirname, 'public')));

App.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

App.get('/', (request,response)=>{

    response.sendFile(path.join(__dirname, 'views', 'index.html'));

});

App.get('#TodoManagement', (request,response)=> {

    response.send('Boo')
})

App.listen( port, ()=> console.log(`Express server listening on port ${port}: hosted by ${host}`))