export const getTranslatedDti = (word: string) => {
  switch (word) {
    case 'Смотреть позже':
      return 'Video_Option_Add_Video_To_Watchlist';
    case 'Удалить из «Смотреть позже»':
      return 'Video_Option_Delete_Video_From_Watchlist';
    case 'Добавить в очередь':
      return 'Video_Option_Add_Video_To_Queue';
    case 'Удалить из очереди':
      return 'Video_Option_Delete_Video_From_Queue';
    case 'Сохранить':
      return 'Playlist_Dropdown_Save_Video';
    case 'Удалить из сохраненных':
      return 'Playlist_Dropdown_Remove_From_Saved';
    case 'Удалить из истории просмотров':
      return 'Delete_From_Views_History';
    case 'Пожаловаться на видео':
      return 'Video_Option_Report';
    case 'Очистить историю просмотров':
      return 'Clear_View_History';

    // Модалка пожаловаться
    case 'Контент сексуального характера':
      return 'VIDEO_COMPLAINT_SEX';
    case 'Насилие, вражда, опасные действия':
      return 'VIDEO_COMPLAINT_VIOLENCE';
    case 'Нарушение авторских прав':
      return 'VIDEO_COMPLAINT_COPYRIGHT';
    case 'Запрещенный товар':
      return 'VIDEO_COMPLAINT_BANNED_ITEM';
    case 'Пропагада терроризма':
      return 'VIDEO_COMPLAINT_TERRORISM';
    case 'Ненормативная лексика, оскорбление':
      return 'VIDEO_COMPLAINT_HATE_SPEECH';
    case 'Обман, спам, мошенничество':
      return 'VIDEO_COMPLAINT_SPAM';
    case 'Сообщить о проблеме':
      return 'VIDEO_COMPLAINT_TECH_PROBLEM';
    case 'Другое':
      return 'VIDEO_COMPLAINT_ANOTHER';

    // Модалка сортировки
    case 'Сначала новые':
      return 'NEW_COMMENTS';
    case 'Сначала старые':
      return 'OLD_COMMENTS';

    // Модалка комментариев
    case 'Редактировать комментарий':
      return 'EDIT_COMMENT';
    case 'Удалить':
      return 'DELETE_COMMENT';

    // Модалка пользователя (справ вверху)
    case 'Рупор студия':
      return 'RUPOR_STUDIO';
    case 'Настройки':
      return 'SETTINGS';
    case 'Выйти':
      return 'LOGOUT';

    default:
      return '';
  }
};
