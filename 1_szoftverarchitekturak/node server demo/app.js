const http = require('http')
const fs = require('fs')
const fsp = require('fs').promises

http.createServer( async (req, res) => {
  //Promise-s megoldás
  //csak 1 fájl
  /*
  const fileContent = await fsp.readFile('./views/index.html', 'utf-8');
  res.end(fileContent)
  */

  //párhuzamos beolvasás
  //nem adódik össze az olvasási idő
  const fileContents = await Promise.all([
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
    fsp.readFile('./views/index.html', 'utf-8'),
  ]);
  //5. elem kiíratása
  res.end(fileContents[5])

  //Szinkron módszer
  // de több fájl-nál ez már nem jó megoldás
  /*
  const fileContent = fs.readFileSync('./views/index.html', 'utf-8');
  res.end(fileContent)
  */
  
  
  
  //Aszinkon módzser
  /*
  fs.readFile('./views/index.html', 'utf-8', (err, data) => {
    console.log('A fájl olvasása befejeződött!')
    if (err) {
      return res.end('Server Error!')
    }

    res.end(data)
  });

  //res.end('<h1>Hello from NodJS!</h1>');
  console.log('A függvény vége.')
  */
}).listen( 3333, () => {
  console.log('Server runs on the 3333 port.')
});