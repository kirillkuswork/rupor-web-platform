import { CONTENT_BASE_MARGIN } from '@/shareds/constants/elements';
import Link, { LinkProps } from 'next/link';
import { scrollTo } from '@/shareds/lib/utils/scrollTo';

const isLink = /https?:\/\/[^\s]+/;
const isHashtag = /#[а-я|А-Я|a-z|A-Z\d-]+/;
const isTimecode = /(?:[0-5]?[0-9]:)?[0-5]?[0-9]:[0-5][0-9]/;
const urlRegex = new RegExp(`(${isLink.source})|(${isHashtag.source})|(${isTimecode.source})`, 'g');

const timeToSeconds = (time: string) => time.split(':').reverse().reduce((acc, val, i) => {
  const multiplier = 60 ** i;

  return acc + Number(val) * multiplier;
}, 0);

const generateHref = (link: string, videoId: string) => {
  if (isHashtag.test(link)) {
    return '#';
  }
  if (isTimecode.test(link)) {
    return `${window.location.origin}/videos/${videoId}?t=${timeToSeconds(link)}`;
  }

  return link;
};

export const linkify = (data: string, videoId: string) => {
  const splitData = data.split(urlRegex);
  const handleScrollTo = () => {
    scrollTo(CONTENT_BASE_MARGIN);
  };

  return splitData.map((text: string) => {
    if (urlRegex.test(text)) {
      const link = document.createElement('a');
      link.href = text;
      const isInternal = link.hostname === window.location.hostname;
      const href = generateHref(text, videoId);
      const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps = {
        href,
        style: {
          color: '#0080EE',
        },
      };
      if (isInternal) {
        linkProps.onClick = handleScrollTo;
      } else {
        linkProps.target = '_blank';
        linkProps.rel = 'noreferrer';
      }
      const linkElement = <Link legacyBehavior {...linkProps}>{text}</Link>;

      return (
        <Link
          key={href}
          href={href}
          passHref
        >
          {linkElement}
        </Link>
      );
    }

    return text;
  });
};
