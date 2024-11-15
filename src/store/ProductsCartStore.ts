import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { Action, Product, State } from "@/models/ProductsCartStoreModels";

export const useProductsCartStore = create<State & Action>()(
  persist(
    (set) => ({
      productsCartList: [],
      cartDateCreation: null,

      addProductToCart: (product: Product) => {
        try {
          set((state: State) => ({
            productsCartList: [...state.productsCartList, product],
            cartDateCreation: state.cartDateCreation ?? new Date(),
          }));
          toast.success(`${product.title} added to cart`);
        } catch (error) {
          toast.error("Error al agregar el producto al carrito");
          console.error("Add Product Error:", error);
        }
      },

      updateProductQuantity: (productId: number, quantity: number) => {
        try {
          set((state: State) => ({
            productsCartList: state.productsCartList.map((product) =>
              product.id === productId
                ? { ...product, quantity: product.quantity + quantity }
                : product
            ),
          }));
          toast.success(`El producto ya esta agregado, se ha sumado la cantidad`, {
            id: String(productId),
          });
        } catch (error) {
          toast.error("Error al actualizar la cantidad del producto");
          console.error("Update Product Quantity Error:", error);
        }
      },

      updateProductQuantityFromCart: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          set((state: State) => ({
            productsCartList: state.productsCartList.map(
              (product) => product.id === productId ? { ...product, quantity: 1 } : product
            ),
          }));
          return;
        }
        try {
          set((state: State) => ({
            productsCartList: state.productsCartList.map((product) =>
              product.id === productId ? { ...product, quantity } : product
            ),
          }));
        } catch (error) {
          toast.error("Error al actualizar la cantidad del producto");
          console.error("Update Product Quantity Error:", error);
        }
      },

      removeProductFromCart: (productId: number) => {
        try {
          set((state: State) => ({
            productsCartList: state.productsCartList.filter(
              (product) => product.id !== productId
            ),
          }));
          toast.success(`Producto eliminado!`);
        } catch (error) {
          toast.error("Error al eliminar el producto");
          console.error("Remove Product Error:", error);
        }
      },
      cleanCart: () => {
        set(() => ({
          productsCartList: [],
          cartDateCreation: null,
        }));
      },
    }),
    {
      name: "productsCartStore",
      partialize: (state) => ({
        productsCartList: state.productsCartList,
        cartDateCreation: state.cartDateCreation,
      }),
    }
  )
);
