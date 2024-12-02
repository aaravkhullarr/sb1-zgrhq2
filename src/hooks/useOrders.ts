import { useOrderStore } from '../stores/orderStore';

export function useOrders() {
  return useOrderStore();
}