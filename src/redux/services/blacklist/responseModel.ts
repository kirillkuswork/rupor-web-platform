export interface IValidateTextResponseField {
  value?: Array<string>
}
export interface IValidateTextResponseModel {
  'words'?: { [key: string]: IValidateTextResponseField; };
}
