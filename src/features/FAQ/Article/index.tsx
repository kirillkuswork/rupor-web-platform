import React from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Paper } from '@/shareds';
import { IFAQAnswer } from '@/redux/services/faq/responseModel';

interface IArticle {
  answer: IFAQAnswer['answer'];
}

export const Article = ({ answer = '' }: IArticle) => (
  <Paper className="w-full py-6 sm:p-4 sm:gap-4 sm:mb-0">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="leading-loose"
    >
      {answer}
    </ReactMarkdown>
  </Paper>
);
