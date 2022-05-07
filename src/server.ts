import express from 'express';
import cors from 'cors';
import { routes } from './routes';
let PORT = process.env.PORT || 3001
const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`API on PORT: ${PORT}`);
});