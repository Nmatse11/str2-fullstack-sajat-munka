const { unlink, rename, copyFile, stat, chmod } = require('fs')

const fileHandlerCallback = (err) => {
  if (err) throw err
  console.log('file process successful')
}

const unlinkWrapper = ({ path, callback = fileHandlerCallback } = {}) => {
  unlink(path, callback)
}

const renameWrapper = ({ oldPath, newPath, callback = fileHandlerCallback } = {}) => {
  rename(oldPath, newPath, callback)
}

const copyFileWrapper = ({ src, dest, callback = fileHandlerCallback } = {}) => {
  copyFile(src, dest, callback)
}

const statWrapper = ({ path, callback = fileHandlerCallback } = {}) => {
  stat(path, callback)
}

// mode összetétele
// a tulajdonos jogosultsága
// a csoport többi tagjának jogosultsága
// egyéb userek jogosultsága
// READ: 4 ha van írási jogosultság
// WRITE: 2 ha van olvasási jogosultság
// EXECUTE: 1 ha van futtatási jogosultság
// 777 = mindenkinek van jogosultsága írni, olvasni, futtatni
// 754 = tulajdonosnak meg van az összes jogosultsága, a csoport többi tagja tudja olvasni és futtatni, mindenki más csak olvasni tudja

const chmodWrapper = ({ path, mode, callback = fileHandlerCallback } = {}) => {
  chmod(path, mode, callback)
}

module.exports = Object.freeze({
  unlinkWrapper,
  renameWrapper,
  copyFileWrapper,
  statWrapper,
  chmodWrapper
})
