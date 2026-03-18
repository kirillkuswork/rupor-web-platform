/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback } from 'react';

import {
  DropzoneOptions,
  useDropzone,
} from 'react-dropzone';

export type DropzoneProps = {
  setterFn: (files: File[]) => void;
  accept?: DropzoneOptions['accept'];
  children?: ReactNode;
};

export const Dropzone: FC<DropzoneProps> = ({
  setterFn,
  accept,
  children,
}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setterFn(acceptedFiles);
  }, [setterFn]);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
