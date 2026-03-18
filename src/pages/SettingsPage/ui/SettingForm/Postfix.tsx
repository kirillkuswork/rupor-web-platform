import React, { FC, ReactNode } from 'react';

interface IPostfixComponent {
  openModal: () => void;
  postfix?: ReactNode;
}

export const PostfixComponent: FC<IPostfixComponent> = ({ postfix, openModal }) => {
  if (!postfix) return null;

  return (
    <button
      className="pointer-events-auto"
      type="button"
      onClick={openModal}
    >
      {postfix}
    </button>
  );
};
