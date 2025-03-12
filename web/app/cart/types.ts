export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}
