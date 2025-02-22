export interface IServiceType {
  _id: string;
  name: string;
  type: string;
  price: number;
}

export interface IServiceTypeSelected extends IServiceType {
  selected: boolean;
  quantity: number;
}
