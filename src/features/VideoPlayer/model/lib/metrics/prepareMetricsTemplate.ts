import { TPlayerMetric } from '@/entities/Video';

interface IModifierParams {
  user_id: string;
  user_auth: string;
  content_id: string
}

interface IPrepareMetricsTemplate {
  template: TPlayerMetric[];
  params: IModifierParams;
}

const replaceTemplateStringWithParams = (
  template: string,
  params: Record<string, string>,
): string => Object.entries(params).reduce((result, [key, value]) => {
  const placeholder = `{{${key}}}`;
  return result.replace(new RegExp(placeholder, 'g'), value);
}, template);

export const prepareMetricsTemplate = ({
  template,
  params,
}: IPrepareMetricsTemplate): TPlayerMetric[] => template.map((el) => ({
  ...el,
  body: replaceTemplateStringWithParams(el.body, { ...params }),
}));
