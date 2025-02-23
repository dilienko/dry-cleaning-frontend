import { IClient } from './client.model';
import { status } from './dryCleaning.model';
import { IServiceType } from './serviceType.model';

export interface IOrder {
  _id?: string;
  serviceType: IServiceType[];
  client: IClient;
  receivedDate: Date;
  returnDate?: Date;
  branch: string;
  status: status;
  totalPrice: number;
}
