import { useRouter } from 'next/router';
import { EmbedPlayer } from './content/EmbedPlayer';

type TContentTypes = 'player';

interface IEmbedPageRouter {
  content?: TContentTypes;
}

const EmbedPage = () => {
  const router = useRouter();

  const { content } = router.query as IEmbedPageRouter;

  switch (content) {
    case 'player': {
      return <EmbedPlayer />;
    }
    default: {
      return <>Не переданы значения</>;
    }
  }
};

export default EmbedPage;
