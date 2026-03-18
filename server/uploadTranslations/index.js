const fs = require('fs');
const path = require('path');

const fetch = global.fetch || require('node-fetch');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvY2FsaXplQGl0LXZpcy50ZWNoIiwiZXhwIjoxNzM5ODgzOTA5LCJ1c2VySUQiOjIyfQ.uUJnKdTAUagnzMWgE58csYuwm0a8YR94J7D7M8nRwnw'; // Захардкоженный токен авторизации
const APP_ID = 14;
const LOCALE_ID = 20;


const url = `https://api.rupor-dev.rutube.dev/localize-app/v1/translation?app_id=${APP_ID}`;

async function uploadTranslations(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(data);

    if (typeof translations !== 'object' || translations === null) {
      throw new Error("Файл должен содержать объект с парами key: value");
    }

    for (const [key, value] of Object.entries(translations)) {
      console.log(`Отправляем перевод: ${key} => ${value}`);

      const body = {
        locale_id: LOCALE_ID,
        key,
        value
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        console.error(`Ошибка при отправке перевода для ключа "${key}". Статус: ${response.status}`);
      } else {
        console.log(`Перевод для "${key}" успешно отправлен.`);
      }
    }

    console.log('Все переводы обработаны.');
  } catch (error) {
    console.error('Ошибка при отправке переводов:', error);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const filePath = args.length >= 1
  ? path.resolve(process.cwd(), args[0])
  : path.resolve(process.cwd(), 'public/locales/en/common.json');

uploadTranslations(filePath);
