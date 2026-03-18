export const USER_NAME_LENGTH_MIN = 2;
export const USER_NAME_LENGTH_MAX = 30;

export const USER_EMAIL_LENGTH_MAX = 256;

// TODO: эта регулярка сейчас пропускает имена состоящие из одних только пробелов (уточнить)
/**
 * Регулярное выражение для валидации имени пользователя:
 * - от 2-х до 30-ти символов
 * - кириллица и латиница
 * - может содержать числа
 * - может содержать . _ - и пробелы
 * @returns /^[а-яА-Яa-zA-Z0-9ёЁ\._\- ]{2,30}$/
 */
/* eslint-disable indent, @typescript-eslint/indent */
export const USER_NAME_REGEX = new RegExp(
  `^.{${USER_NAME_LENGTH_MIN},${USER_NAME_LENGTH_MAX}}$`,
);

/* eslint-enable indent, @typescript-eslint/indent */

// TODO: перенести регулярку на SuperExpressive
/* eslint-disable indent, @typescript-eslint/indent */
// export const NOT_CYRILLIC_EMAIL_REGEX = SuperExpressive()
//     .startOfInput
//     .anythingButChars('а-яА-ЯёЁ')
//     .endOfInput
//     .toRegex();
/* eslint-enable indent, @typescript-eslint/indent */
export const NOT_CYRILLIC_EMAIL_REGEX = /^[^а-яА-ЯёЁ]{1,}[^\-\\—\\.]$/;
