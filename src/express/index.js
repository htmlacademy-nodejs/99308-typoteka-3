'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
