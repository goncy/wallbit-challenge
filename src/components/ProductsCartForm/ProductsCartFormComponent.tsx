import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utilities/ErrorMessageHandler";
import { Inputs } from "@/models/ProductsCartFormModels";
import { useProductsCartStore } from "@/store/ProductsCartStore";
import { Product, State } from "@/models/ProductsCartStoreModels";
import { getSingleProduct } from "@/services/ProductsCartServices";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const ProductsCartFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const addProductToCart = useProductsCartStore(
    (state: State) => state.addProductToCart
  );
  const updateProductQuantity = useProductsCartStore(
    (state: State) => state.updateProductQuantity
  );
  const productsList = useProductsCartStore(
    (state: State) => state.productsCartList
  );

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setLoading(true);
    console.log(data);

    const isAlreadyAdded = productsList.some(
      (product: Product) => product.id === data.productId
    );

    try {
      if (isAlreadyAdded) {
        updateProductQuantity(data.productId, data.quantity);
      } else {
        const product: Omit<Product, "quantity" | "id"> =
          await getSingleProduct(data.productId);

        // Validación de la respuesta
        if (!product || !product.title || !product.price) {
          throw new Error("Producto no válido o no encontrado.");
        }

        addProductToCart({
          id: data.productId,
          ...product,
          quantity: data.quantity,
        });
      }
    } catch (error) {
      toast.error("Producto no válido o no encontrado.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-[1000px] h-fit">
      <CardHeader>Add Product to Cart</CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "start",
          }}
        >
          <div className="flex-1 min-w-[200px] gap-1.5">
            <Input
              id="quantity"
              min={0}
              placeholder="Cantidad"
              className="flex-1"
              type="number"
              {...register("quantity", {
                required: true,
                min: 1,
                pattern: /^[0-9]+$/,
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
            {errors.quantity && (
              <p className="text-red-500">
                {getErrorMessage(errors.quantity.type)}
              </p>
            )}
          </div>
          <div className="flex-1 min-w-[200px] gap-1.5">
            <Input
              id="productId"
              min={0}
              type="number"
              placeholder="Id de producto"
              {...register("productId", {
                required: true,
                pattern: /^[0-9]+$/,
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
            {errors.productId && (
              <p className="text-red-500">
                {getErrorMessage(errors.productId.type)}
              </p>
            )}
          </div>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="ml-auto">
              Agregar al carrito <ShoppingCart />
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductsCartFormComponent;
