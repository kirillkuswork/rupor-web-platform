// Функция для простого хеширования строки (например, используя SHA-256)
async function hashString(str: string) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function generateVisitorId() {
  // Получаем базовые параметры устройства
  const { userAgent } = navigator; // Браузер и ОС
  const { language } = navigator; // Язык браузера
  const screenResolution = `${window.screen.width}x${window.screen.height}`; // Разрешение экрана
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Часовой пояс
  const { platform } = navigator; // Платформа (ОС)

  // Объединяем параметры в одну строку
  const data = `${userAgent}${language}${screenResolution}${timezone}${platform}`;

  // Применяем хеширование для получения `visitorId`
  const visitorId = await hashString(data);
  return visitorId;
}
