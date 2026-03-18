import { Button, EmptyPage } from 'rupor-ui-kit';
import Link from 'next/link';
import Image from 'next/image';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';

// TODO:: Переводы
const Error404Page = () => (
  <div className="bg-black fixed top-0 left-0 z-50 sm:flex-col px-6 sm:pt-8 sm:pb-[149px] sm:justify-between h-[100vh]
    w-full flex items-center justify-center"
  >
    <div className="flex items-center justify-center object-contain w-[660px] h-[687px] sm:max-w-[326px]
         sm:h-max sm:w-full sm:object-cover"
    >
      <Image src="/img/play-button.png" alt="Страница не найдена" width={1320} height={1374} />
    </div>
    <div className="w-[318px] ml-[138px] flex flex-col items-start justify-center sm:items-center
        sm:w-full sm:ml-0"
    >
      <EmptyPage.Title className="w-max text-headline-xl sm:text-headline-m-s">Ошибка 404</EmptyPage.Title>
      <EmptyPage.Subtitle className="!text-left pb-12 sm:!text-center">
        Такой страницы не существует, но есть много интересных видео!
      </EmptyPage.Subtitle>
      <Link href={APP_PATHS_PAGES.home} passHref>
        <Button label="Вернуться на главную" />
      </Link>
    </div>
  </div>
);

export default Error404Page;
