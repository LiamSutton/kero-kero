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
                "CREATE TABLE IF NOT EXISTS genres (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE"
            ),
            [],
            (tx, results) => console.log("[INFO]: Created Table: genres")
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

//#endregion

//#region AUTHORS

//#endregion

//#region BOOKS

//#endregion

