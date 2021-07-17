// change
/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './routes/categories';
import items from './routes/items';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.warn('hekk');

const publicPath = path.resolve(__dirname, '../public');
const indexPath = path.resolve(__dirname, '../public/index.html');

// if query not starts with '/api/' string - send file from wwwroot
app.use(/^(?!\/api\/)/, express.static(publicPath));
// if file doesn't exists - send index.html
app.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});

app.use('/api/categories', categories);
app.use('/api/items', items);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server EFK-SRV started on ${PORT} port`));
