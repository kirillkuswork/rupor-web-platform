import { TFunction } from 'i18next';

export enum SubscribePropsType {
  subscribe = 'subscribe',
  unsubscribe = 'unsubscribe',
}

export interface ISubscribeProps {
  src?: string;
  type: SubscribePropsType,
  title?: string,
  id: string;
  onClose: () => void;
  onSub: () => void;
  onUnsub: () => void;
  mainText: string;
  buttonText: string;
  t: TFunction<'translation', undefined>
}
