const { writeFileWrapper, appendFileWrapper } = require('./utils')

// létrehoz vagy felülír
writeFileWrapper('./szamarmese.txt', 'SZAMÁRMESE')

// létrehoz vagy hozzáfűz
appendFileWrapper('./poets.txt', 'Romhányi a Rímhányó')
