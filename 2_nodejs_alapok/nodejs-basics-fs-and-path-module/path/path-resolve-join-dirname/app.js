const { resolve, join } = require('path')

// kiírja az aktuális könyvtár abszolút elérési útvonalát
console.log(resolve())
// útvonal részeket fűz össze
// . - aktuális munkakönyvtár relatív elérési útvonala
console.log(join())

// globális változó - abszolút vonalat ad vissza, az aktuális fájlnak, mindegy hogy melyik könyvtárban állok
console.log(__dirname)

console.log(resolve('./szamarmese.txt'))
console.log(join('./szamarmese.txt'))
console.log(join(__dirname, './szamarmese.txt'))
