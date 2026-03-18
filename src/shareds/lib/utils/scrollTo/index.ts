import { SCROLL_CONTAINER_ID_NAME } from '@/shareds/constants/elements';

export const scrollTo = (top = 0, isSmooth = true) => {
  const container = document.getElementById(SCROLL_CONTAINER_ID_NAME);
  if (container) {
    container.scrollTo({ top, behavior: isSmooth ? 'smooth' : undefined });
  }
};
