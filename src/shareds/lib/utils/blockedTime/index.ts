import { TFunction } from 'i18next';
import { pluralize } from '../pluralize';

type BlockedTime = ({ text, time, t }: { text: string, time: number, t: TFunction }) => string;

export const blockedTime: BlockedTime = ({ text, time, t }) => `${t(text)} ${time} ${pluralize(time, [t('Format_Minute_1'), t('Format_Minute_2'), t('Format_Minute_3')])}.`;
