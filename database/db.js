import { openDatabase } from "expo-sqlite";

const databaseName = "kerokero.db";

const getConnection = () => {
    const databaseConnection = openDatabase(databaseName)
    return databaseConnection
}

//#region CREATE TABLES

export const createGenresTable = () => {
    return new Promise(() => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS genres (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);"
            ),
            [],
            (tx, results) => console.log("[INFO]: Created Table: genres"),
            (tx, error) => console.error(error)
        })
    })
}

export const createAuthorsTable = () => {
    return new Promise(() => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS authors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE);",
                [],
                (tx, results) => console.log("[INFO]: Created Table: authors"),
                (tx, error) => console.error(error)
            )
        })
    })
}

export const createBooksTable = () => {
    return new Promise((resolve, reject) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE, authorId INTEGER NOT NULL, genreId INTEGER NOT NULL, isbn TEXT NOT NULL UNIQUE, datePublished DATE NOT NULL, dateCreated DATETIME NOT NULL, cover TEXT NOT NULL)",
                [],
                (tx, results) => console.log("[INFO]: Created Table: books"),
                (tx, error) => console.error(error)
            )
        })
    })
}

//#endregion

//#region DROP TABLES
export const dropAuthorsTable = () => {
    return new Promise(() => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "DROP TABLE authors",
                [],
                (tx, results) => console.log("[INFO]: Dropped Table: authors")
            )
        })
    })
}
//#endregion

//#region GENRES

export const getAllGenres = () => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM genres",
                [],
                (tx, results) => {
                    resolve(results.rows._array)
                },
                (tx, error) => console.error(error)
            )
        })
    })
}

export const getGenreByName = (name) => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM genres WHERE name = ?",
                [name],
                (tx, results) => {
                    resolve(results.rows._array[0])
                },
                (tx, error) => console.error(error)
            )
        })
    })
}

export const insertGenre = (name) => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO genres (name) VALUES (?)",
                [name],
                (tx, results) => {
                    let response = null
                    if (results.insertId != null) {
                        response = results.insertId
                    }
                    resolve(response)
                },
                (tx, error) => console.error(error)
            )
        })
    })
}

//#endregion

//#region AUTHORS
export const getAllAuthors = () => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM authors",
                [],
                (tx, results) => resolve(results._array),
                (tx, error) => console.error(error)
            )
        })
    })
}

export const getAuthorByName = (name) => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM authors WHERE name = ?",
                [name],
                (tx, results) => resolve(results._array[0]),
                (tx, error) => console.error(error)
            )
        })
    })
}

export const insertAuthor = (name) => {
    return new Promise((resolve) => {
        const db = getConnection()
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO authors (name) VALUES (?)",
                [name],
                (tx, results) => {
                    let response = null
                    if (results.insertId != null) {
                        response = results.insertId
                    }
                    resolve(response)
                },
                (tx, error) => console.error(error)
            )
        })
    })
}
//#endregion

//#region BOOKS

//#endregion

