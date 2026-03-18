export interface IValidateTextApiField {
  value: string
  key: string
}

export interface IValidateTextRequestModel {
  fields?: Array<IValidateTextApiField>
}
