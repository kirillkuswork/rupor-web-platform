const axios = require("axios");
const fileSystem = require('fs');
const path = require('path');
const {retry} = require('../utils/retry')

const translateUrl = `https://sheets.googleapis.com/v4/spreadsheets/1vX5arpVVIEZoN3B3S5O2pZHvGwKNTrAJH-ts8bHxxfY/values/NEW_PLATFORM?key=AIzaSyDmhGpELgfnZredfoITLcs-PRwrWcFkAOc`
const publicPath = process.env.I18_LANGUAGE_FOLDER || path.join(__dirname, '../../public/locales');

const get = async () => {
    console.log('\x1b[35m', `Загружаются языковые таблицы ${process.env.I18_LANGUAGE_FOLDER}`, '\x1b[0m')
    const response = await axios.get(translateUrl)
    return response.data.values
}

function merge() {
    let dst = {},
      src,
      p,
      args = [].splice.call(arguments, 0)
    while (args.length > 0) {
        src = args.splice(0, 1)[0]
        if (toString.call(src) === '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) === '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p])
                    } else {
                        dst[p] = src[p]
                    }
                }
            }
        }
    }

    return dst
}

const createDictionary = (googleSheet) => {
    const accamulator = googleSheet[0].reduce((acc, lang, index) => {
        if (!index) {
            return acc
        }
        return {
            ...acc, [index]: {_fileName: `${lang}/common.json`}
        }
    }, {})
    return googleSheet.reduce((acc, sheetRow, index) => {

        if (!index) {
            return acc
        }

        const newObj = sheetRow.reduce((acc, value, index) => {
            if (!index) {
                return {[index]: value}
            }
            //Если строка без слов
            if (sheetRow.length === 1) {
                return acc
            }
            //Затираем ключ на последней итерации
            if (index + 1 === sheetRow.length) {
                const newResult = {
                    ...acc, [index]: {
                        [acc[0]]: value
                    }
                }

                delete newResult["0"]
                return newResult
            }
            //Стандартная итерация
            return {
                ...acc, [index]: {
                    [acc[0]]: value
                }
            }

        }, {})

        return merge(acc, newObj)

    }, accamulator)
};

const write = async (data) => {
    const newData = {...data}
    delete newData._fileName

    const name = `${publicPath}/${data._fileName}`.replace("common.json", "")
    fileSystem.mkdir(name, {recursive: true}, (error) => {
        if (error) {
            console.log(error)
        }
        if (!error) {
            fileSystem.writeFile(`${publicPath}/${data._fileName}`, JSON.stringify(newData), (e) => {
                if (e) {
                    console.log(e)
                }
                if (!e) {
                    console.log('\x1b[35m', `Файл: "${publicPath}/${data._fileName}" создан`, '\x1b[0m')
                }
            })
        }
    });
};

const listener = async () => {
    const data = await retry(get, 5, 250);
    const dictionary = createDictionary(data);
    const langs = Object.entries(dictionary)
    langs.forEach(ele => write(ele[1]))

};

module.exports = {
    listener,
};
