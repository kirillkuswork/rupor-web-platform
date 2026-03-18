import React, { ChangeEvent, useRef } from 'react';
import {
  Avatar,
  DropdownMenu,
  DropdownOption,
  DropdownPaper,
  Notification,
  PenIcon, Skeleton,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useSettingsModal } from '@/app/providers/SettingsProvider';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useLazyGetMeInfoQuery, useUpdateUserMutation } from '@/redux/services/users';
import clsx from 'clsx';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const AvatarFieldView = () => {
  const { t } = useTranslation();
  const { openModal } = useSettingsModal();
  const { user, isGetUserInfoLoading } = useSelector(selectors.userSelector);
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [getUserInfo, { isFetching: isFetchingUserInfo }] = useLazyGetMeInfoQuery();

  const notify = (message: string) => {
    Notification.add({
      content: <p className="text-black">{t(message)}</p>,
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      return notify('Settings_Upload_Image_Size_Error');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return notify('Settings_Upload_Image_Format_Error');
    }
    const url = URL.createObjectURL(file);

    openModal('avatar', { fileUrl: url });
  };

  const handleDeleteImage = async () => {
    try {
      const updateResponse = await updateUser({
        id: user.id,
        name: user.name,
        about: user.about,
        avatarFileId: '',
      })
        .unwrap();
      if (!updateResponse) {
        return notify('Settings_Delete_Image_Common_Error');
      }

      const userInfoResponse = await getUserInfo()
        .unwrap();
      if (!userInfoResponse) {
        return notify('Settings_Upload_Image_Get_User_Data_Error');
      }
      notify('Settings_Modal_Notification_Changes_Saved');
    } catch (error) {
      notify('Settings_Delete_Image_Common_Error');
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {isUpdatingUser || isFetchingUserInfo || isGetUserInfoLoading ? (
        <Skeleton
          variant="super ellipse"
          className={clsx('w-[128px] h-[128px]')}
        />
      ) : (
        <Avatar
          marked
          size={128}
          src={user?.avatar?.url}
          variant="super ellipse"
          className="!cursor-default w-[128px] h-[128px] flex items-center justify-center !bg-dark"
        >
          <DropdownMenu
            icon={<PenIcon width={24} height={24} />}
            className="absolute bottom-0 right-0"
            trigger="click"
          >
            <DropdownPaper>
              <DropdownOption onClick={handleOpenFileDialog} label={t('Edit_Pen_Tooltip')} />
              {!!user?.avatar?.url && <DropdownOption onClick={handleDeleteImage} label={t('Settings_Upload_Image_Delete_Dropdown_Item')} />}
            </DropdownPaper>
          </DropdownMenu>
        </Avatar>
      )}
      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AvatarFieldView;
