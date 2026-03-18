export interface IFAQCategoryQuestion {
  id: string,
  question: string
}

export interface IFAQMeta {
  total: string
}

export interface IFAQCategory {
  id: string,
  name: string,
  questions: IFAQCategoryQuestion[]
  meta: IFAQMeta
}

export interface IFAQCategories {
  categories: IFAQCategory[]
}

export interface IFAQAnswer {
  id?: string;
  question?: string;
  answer?: string;
}
