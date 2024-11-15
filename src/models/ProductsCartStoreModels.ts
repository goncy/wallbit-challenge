export interface Product {
  id: number;
  title: string;
  price: string | number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

export interface State extends Action {
  productsCartList: Product[];
  cartDateCreation: Date | null;
};

export interface Action {
  addProductToCart: (product: Product) => void;
  updateProductQuantity: (productAdded: number, quantity: number) => void;
  updateProductQuantityFromCart: (productId: number, quantity: number) => void;
  removeProductFromCart: (productId: number) => void;
  cleanCart: () => void;

}
