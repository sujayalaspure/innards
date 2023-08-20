import {PaymentTypes} from '@app/components/checkout/PaymentView';
import {CartItem} from '@app/types/product';
import {Location} from '@app/types/user';

export interface Order {
  id: number | string;
  products: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: string;
  address: Location;
  deliveryDate: string;
  payment: Payment;
  tracking: Tracking[];
  rating?: number;
}

type OrderStatus =
  | 'pending'
  | 'in-transit'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderedProduct
  extends CartItem,
    Pick<Order, 'status' | 'payment'> {
  isDelivered: boolean;
  orderId: number | string;
}

export interface Payment {
  id?: number | string;
  amount: number;
  billingDetails?: BillDetails;
  status?: PaymentStatus;
  createdAt: string;
  paymentMethod: PaymentMethod;
  msg?: string;
}

type PaymentStatus = 'pending' | 'paid' | 'failed';
export type PaymentMethod = PaymentTypes;

export interface Tracking {
  title: string;
  description: string;
  date: string;
}

type BillDetails = {
  mrp?: number;
  discount?: number;
  totalItems?: number;
  shipping?: number;
  tax?: number;
  total?: number;
};
