import imgProxy from '@/shareds/lib/utils/imgProxy';
import { TUploadingSource } from '@/redux/services/video/baseModel';
import { useLayoutEffect, useMemo, useState } from 'react';

const fetchWithProxy = (imgUrl: string) => fetch(imgProxy({
  imgUrl,
  width: 1280,
  height: 720,
}))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob));

const fetchWithoutProxy = (imgUrl: string) => fetch(imgUrl)
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob));

const mapUploadingSourceToFetch: Record<TUploadingSource, (imgUrl: string) => Promise<string>> = {
  RUPOR: fetchWithProxy,
  RUTUBE: fetchWithoutProxy,
};

interface IUseFetchVideoThumbnail {
  uploadingSource: TUploadingSource;
  thumbnailUrl: string;
}

export const useFetchVideoThumbnail = (props: IUseFetchVideoThumbnail) => {
  const {
    uploadingSource,
    thumbnailUrl,
  } = props;

  const [thumbnailBlob, setThumbnailBlob] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    if (!thumbnailUrl.length) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    mapUploadingSourceToFetch[uploadingSource](thumbnailUrl)
      .then((blob) => setThumbnailBlob(blob))
      .then(() => setIsLoading(false))
      .catch(() => setIsError(true));

    return () => {
      URL.revokeObjectURL(thumbnailBlob);
    };
  }, [thumbnailUrl, uploadingSource]);

  return useMemo(() => ({
    thumbnailBlob,
    isLoading,
    isError,
  }), [thumbnailBlob, isLoading, isError]);
};
