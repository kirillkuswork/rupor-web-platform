const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch');

const APP_ID = 14;
const LOCALE_ID = 20;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvY2FsaXplQGl0LXZpcy50ZWNoIiwiZXhwIjoxNzM5ODgzOTA5LCJ1c2VySUQiOjIyfQ.uUJnKdTAUagnzMWgE58csYuwm0a8YR94J7D7M8nRwnw'; // Захардкоженный токен авторизации

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.rupor-dev.rutube.dev/localize-app/v1';
const getTranslationsUrl = `${API_BASE_URL}/translation?app_id=${APP_ID}&locale_id=${LOCALE_ID}&limit=1000`;

async function fetchServerTranslations() {
  console.log(`Получаем список переводов с: ${getTranslationsUrl}`);
  const response = await fetch(getTranslationsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения переводов. Статус: ${response.status}`);
  }
  const data = await response.json();
  if (data && data.translations && Array.isArray(data.translations)) {
    return data.translations;
  }
  return [];
}

async function updateTranslation({ key, value, translation_id }) {
  const updateUrl = `${API_BASE_URL}/translation?app_id=${APP_ID}`;
  console.log(`Обновляем перевод для ключа "${key}" новым значением: "${value}"`);

  const response = await fetch(updateUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      locale_id: LOCALE_ID,
      key,
      value,
      translation_id
    })
  });

  if (!response.ok) {
    console.error(`Ошибка обновления перевода для ключа "${key}". Статус: ${response.status}`);
  } else {
    console.log(`Перевод для ключа "${key}" успешно обновлён.`);
  }
}

async function run(filePath) {
  try {
    const serverTranslations = await fetchServerTranslations();
    console.log(`Получено переводов с сервера: ${serverTranslations.length}`);

    const fileData = fs.readFileSync(filePath, 'utf8');
    const localTranslations = JSON.parse(fileData);
    console.log(`Найдено переводов в локальном файле: ${Object.keys(localTranslations).length}`);

    for (const [key, newValue] of Object.entries(localTranslations)) {
      const serverTranslation = serverTranslations.find(t => t.key === key);
      if (serverTranslation) {
        if (serverTranslation.value !== newValue) {
          await updateTranslation({
            key,
            value: newValue,
            translation_id: serverTranslation.translation_id
          });
        } else {
          console.log(`Ключ "${key}" уже актуален, обновление не требуется.`);
        }
      } else {
        console.log(`Ключ "${key}" не найден на сервере, обновление пропущено.`);
      }
    }
    console.log("Обновление переводов завершено.");
  } catch (error) {
    console.error("Ошибка при обновлении переводов:", error);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const filePath = args[0]
  ? path.resolve(process.cwd(), args[0])
  : path.resolve(process.cwd(), 'public/locales/en/common.json');

run(filePath);
