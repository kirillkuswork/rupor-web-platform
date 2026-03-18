interface IShareItemProps {
  link: string;
  icon: JSX.Element
  name: string
  dti: string
}

export const ShareItem = ({ link, icon, name, dti }: IShareItemProps) => {
  const onClickHandler = () => {
    window.open(link, '_blank');
  };

  return (
    <button
      data-testid={dti}
      type="button"
      className="flex-col items-center justify-center ml-6 font-thin text-paragraph-s first:ml-0"
      onClick={onClickHandler}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-colorGrey"
      >
        {icon}
      </div>
      <span className="block mt-1 text-grey">{name}</span>
    </button>
  );
};
