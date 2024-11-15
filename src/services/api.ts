import { Product } from '../types/cart';

export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Producto no encontrado');
      }
      throw new Error('Error al obtener el producto');
    }

    const data = await response.json();
    if (!data || !data.id || !data.title || !data.price) {
      throw new Error('El producto no tiene el formato esperado');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Error al obtener el producto');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al obtener el producto');
  }
};