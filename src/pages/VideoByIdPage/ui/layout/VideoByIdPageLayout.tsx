import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import styles from './VideoByIdPageLayout.module.scss';

interface IVideoByIdPageLayout {
  player: JSX.Element
  bottomContent: JSX.Element
  rightContent: JSX.Element
}

export const VideoByIdPageLayout = (props: IVideoByIdPageLayout) => {
  const {
    player,
    rightContent,
    bottomContent,
  } = props;

  const { isMobile } = useIsMobile();

  return (
    <div className={clsx(styles.CommonLayout, isMobile ? styles.MobileLayout : styles.DesktopLayout)}>
      <div className={styles.Player}>{player}</div>
      <div className={styles.RightContent}>{rightContent}</div>
      <div className={styles.BottomContent}>{bottomContent}</div>
    </div>
  );
};
