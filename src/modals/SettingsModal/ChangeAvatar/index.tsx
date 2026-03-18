import React, { useState } from 'react';
import {
  BaseModal, Button, Crop, Notification,
} from 'rupor-ui-kit';
import { useSettingsModal } from '@/app/providers/SettingsProvider';
import { useLazyGetMeInfoQuery, useUpdateUserMutation } from '@/redux/services/users';
import { useLazyGetStoragesQuery, useLazyUploadFileToStorageQuery } from '@/redux/services/files';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';
import { useConnectionStatus } from 'rupor-common';

export const ChangeAvatar = () => {
  const { t } = useTranslation();
  const { modalParams, closeModal } = useSettingsModal();
  const { fileUrl } = modalParams;
  const [instance, setInstance] = useState<Cropper | null>(null);
  const { isOnline } = useConnectionStatus();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [getUserInfo, { isFetching: isFetchingUserInfo }] = useLazyGetMeInfoQuery();
  const [uploadFile, { isFetching: isUploadingFile }] = useLazyUploadFileToStorageQuery();
  const [getStorages, { isFetching: isGettingStorage }] = useLazyGetStoragesQuery();
  const { user } = useSelector(selectors.userSelector);

  const isLoading = isUpdatingUser || isFetchingUserInfo || isUploadingFile || isGettingStorage;

  const notify = (message: string, className?: string) => {
    Notification.add({
      containerClassName: className,
      content: <p>{t(message)}</p>,
    });
  };

  const getStorageId = async (): Promise<string | null> => {
    try {
      const response = await getStorages().unwrap();
      if (response?.storages?.length > 0) {
        return response.storages[0].id;
      }
    } catch (error) {
      notify('Settings_Upload_Image_Common_Error');
    }
    return null;
  };

  const handleCropSubmit = async (blob: Blob | null) => {
    if (!blob) {
      return notify('Settings_Upload_Image_Common_Error');
    }

    if (!isOnline) {
      return notify('Offline_State_Error', '!bg-red !text-white');
    }

    const storageId = await getStorageId();
    if (!storageId) {
      return notify('Settings_Upload_Image_Common_Error');
    }

    const formData = new FormData();
    formData.append('file', blob);

    let newAvatarFileId: string;
    try {
      const uploadResponse = await uploadFile({ storage_id: storageId, file: formData }).unwrap();
      if (!uploadResponse) {
        return notify('Settings_Upload_Image_Upload_Error');
      }
      newAvatarFileId = uploadResponse.id;
    } catch (error) {
      return notify('Settings_Upload_Image_Upload_Error');
    }

    try {
      const updateResponse = await updateUser({
        id: user.id,
        name: user.name,
        about: user.about || 'name',
        avatarFileId: newAvatarFileId,
      }).unwrap();
      if (!updateResponse) {
        return notify('Settings_Upload_Image_Update_User_Data_Error');
      }
      const userInfoResponse = await getUserInfo().unwrap();
      if (!userInfoResponse) {
        return notify('Settings_Upload_Image_Get_User_Data_Error');
      }
      closeModal();
      notify('Settings_Modal_Notification_Changes_Saved');
    } catch (error) {
      notify('Settings_Upload_Image_Modal_Common_Error');
    }
  };

  const handleSubmit = () => {
    instance?.getCroppedCanvas().toBlob(handleCropSubmit, 'image/jpeg');
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div className="mt-7">
          {fileUrl ? (
            <Crop
              superEllipse
              src={fileUrl}
              onGetInstance={(cropperInstance) => setInstance(cropperInstance)}
            />
          ) : (
            <p>{t('Settings_Upload_Image_Common_Error')}</p>
          )}
        </div>
        <BaseModal.ButtonWrapper className="mt-12">
          <Button variant="tertiary" onClick={closeModal} label={t('Settings_Upload_Image_Modal_Cancel_Button')} />
          <Button
            disabled={isLoading}
            loading={isLoading}
            onClick={handleSubmit}
            label={t('Settings_Upload_Image_Modal_Save_Button')}
          />
        </BaseModal.ButtonWrapper>
      </div>
    </div>
  );
};
