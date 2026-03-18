export interface FormSubmitData <ComplainType extends string> {
  complaints?: ComplainType[]
  description?: string;
}
