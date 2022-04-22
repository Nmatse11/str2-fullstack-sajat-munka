- r: To open file to read and throws exception if file doesn’t exists.
- r+: Open file to read and write. Throws exception if file doesn’t exists.
- rs+: Open file in synchronous mode to read and write.
- w: Open file for writing. File is created if it doesn’t exists.
- wx: It is same as ‘w’ but fails if path exists.
- w+: Open file to read and write. File is created if it doesn’t exists.
- wx+: It is same as ‘w+’ but fails if path exists.
- a: Open file to append. File is created if it doesn’t exists.
- ax: It is same as ‘a’ but fails if path exists.
- a+: Open file for reading and appending. File is created if it doesn’t exists.
- ax+: It is same as ‘a+’ but fails if path exists.

- r: Megnyitja olvasásra; kivétel keletkezik, ha a fájl nem létezik.

- r+: Megnyitja olvasásra és írásra; kivétel keletkezik, ha a fájl nem létezik.

- rs: Szinkron módban megnyitja olvasásra.

- rs+: Szinkron módban megnyitja olvasásra és írásra.

- w: Megnyitja írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.

- wx: A w-hez hasonló flag. A fájl exkluzív módban nyílik meg: ez azt jelenti, hogy a flag csak újonnan létrehozott fájloknál működik.

- w+: Megnyitja olvasásra és írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.

- wx+: A w+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

- a: Megnyitja adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza.

- ax: A a-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

- a+: Megnyitja olvasásra és adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza.

- ax+: A a+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.
