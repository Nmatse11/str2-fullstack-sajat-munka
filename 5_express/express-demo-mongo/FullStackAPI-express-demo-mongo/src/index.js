const app = require('./app')

// környezeti változóban lévő vagy a 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})