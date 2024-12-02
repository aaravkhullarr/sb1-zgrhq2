export type UserRole = 'admin' | 'driver' | 'customer';

export interface User {
  id: string;
  schoolId: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  lunchPeriod: number;
  role: UserRole;
  driverAuthNumber?: string;
  password?: string;
  grade?: number;
  profilePicture?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'accepted'
  | 'on_the_way_there'
  | 'at_restaurant'
  | 'on_way_back'
  | 'at_npac'
  | 'delivered'
  | 'cancelled';

export type NotificationType = 
  | 'new_order'
  | 'status_update'
  | 'driver_assigned'
  | 'order_cancelled'
  | 'order_delivered';

export interface OrderNotification {
  id: string;
  orderId: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead: boolean;
  restaurantId: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerProfilePicture?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverProfilePicture?: string;
  restaurantId: number;
  restaurantName: string;
  orderNumber: string;
  orderName: string;
  status: OrderStatus;
  lunchPeriod: number;
  createdAt: string;
  updatedAt: string;
  notifications: OrderNotification[];
}

export interface OrderStats {
  totalOrders: number;
  favoriteRestaurant: string;
  averageDeliveryTime: string;
  mostOrderedFrom: string;
  recentOrders: Order[];
}