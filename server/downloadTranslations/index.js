require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const appId = 14;
const versionId = process.env.NEXT_PUBLIC_VERSION_ID ?? 1;

const BASE_URL = process.env.NEXT_PUBLIC_LOCALIZE_URL ?? ''
const publicPath = process.env.I18_LANGUAGE_FOLDER || path.join(__dirname, '../../public/locales');

async function fetchLocales() {
  const url = `${BASE_URL}/locale_code?app_id=${appId}&version_id=${versionId}`;
  console.log(`Запрашиваются доступные локали по адресу:
${url}`);

  try {
    const response = await axios.get(url);
    return response.data.codes || [];
  } catch (error) {
    console.error('Ошибка при получении локалей:', error.message);
    throw error;
  }
}

async function fetchTranslations(lang) {
  const url = `${BASE_URL}/translation/list?app_id=${appId}&code=${lang}&version_id=${versionId}`;
  console.log(`Запрашиваются переводы для языка "${lang}" по адресу:
${url}`);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении переводов для ${lang}:`, error.message);
    throw error;
  }
}

function writeTranslationFile(lang, data) {
  const langFolder = path.join(publicPath, lang);
  const filePath = path.join(langFolder, 'common.json');

  fs.mkdirSync(langFolder, { recursive: true });

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(`Ошибка записи файла для "${lang}" (${filePath}):`, err);
        reject(err);
      } else {
        console.log(`Файл успешно создан: ${filePath}`);
        resolve();
      }
    });
  });
}

async function updateTranslations() {
  try {
    const locales = await fetchLocales();
    if (!Array.isArray(locales) || locales.length === 0) {
      throw new Error('Не удалось получить список локалей.');
    }

    for (const lang of locales) {
      const translations = await fetchTranslations(lang);
      await writeTranslationFile(lang, translations);
    }
    console.log('Обновление переводов завершено успешно.');
  } catch (error) {
    console.error('Ошибка обновления переводов:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  updateTranslations();
}

module.exports = {
  updateTranslations,
};
