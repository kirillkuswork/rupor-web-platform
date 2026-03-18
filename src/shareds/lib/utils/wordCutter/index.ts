export const wordCutter = (text: string, maxLength = 8) => text.split(' ').map((word) => (word.length > maxLength + 1 ? `${word.slice(0, maxLength)}.` : word)).join(' ');
