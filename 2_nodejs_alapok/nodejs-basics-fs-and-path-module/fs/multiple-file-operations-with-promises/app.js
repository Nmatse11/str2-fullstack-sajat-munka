const truncateAndPrintFile = require('./utils')

// 11 karakter, vagyis csak a címet olvassuk ki, 1024 méretű blokkonként
truncateAndPrintFile('./szamarmese.txt', 11, 1024)
