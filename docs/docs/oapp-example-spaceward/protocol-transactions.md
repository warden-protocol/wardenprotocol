---
sidebar_position: 8
---

# Protocol transactions

---EDIT---

Things to consider:

- An alternative name: Wardend CLI commands?
- Should we also put it to the Backend section?
- What about WardenJS functions?

Contents:

- A general explanation where and how these commands are used
- An overview of available commands
- A full list of available commands

Notes:

- Here are some examples of correct commands:

	- No of keys - `wardend query warden keys - pagination: 25095`
	- No. of spaces - `wardend query warden spaces - pagination: 20199`
	- No. of accounts - `wardend query auth accounts - pagination: 78221`
	- No of accounts with WARD - `wardend query bank denom-owners uward - pagination: 77527 `
	- No. of intents - `wardend query intent list-intents - pagination: 272` 
	- No .of actions - `wardend query intent actions - pagination: 44915`
	- No. of validators - `wardend query stakin`
	- Slashings - ``wardend query slashing signing-infos - ``

- See also: [Fusion commands](https://github.com/zenrocklabs/fusionchain/blob/dbe4626b8031050f17079426497279f2626913fc/GUIDE.md)