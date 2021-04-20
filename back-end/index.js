const express = require('express');
const httpServer = require('http');
const path = require('path');
const cors = require('cors');
const Rescue = require('express-rescue');
const handleError = require('./src/api/middlewares/handleError');
const routes = require('./src/api/routes');
const chat = require('./chat');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use('/', Rescue(routes));
app.use(handleError);

const server = httpServer.createServer(app);
chat(server);

server.listen(port, () => console.log(`server running on port: ${port}`));

// app.listen(port, () => console.log('Port Running'));

// const teste = async () => {
//   const result = await salesProducts.findAll({
//     include: [{ model: sale, as: 'sale' }, { model: product, as: 'product' }],
//   });

//   return result;
// };

// app.get('/', (_req, res) => teste().then((result) => res.status(200).json(result)));
