import { State } from "@/models/ProductsCartStoreModels";
import { useProductsCartStore } from "@/store/ProductsCartStore";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import emptyCart from "@/assets/empty-cart.png";
import DeleteProductDialogComponent from "../DeleteProductDialog/DeleteProductDialogComponent";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const ProductCartListComponent = () => {
  const productsList = useProductsCartStore(
    (state: State) => state.productsCartList
  );
  const cartDateCreation = useProductsCartStore(
    (state: State) => state.cartDateCreation
  );

  const cleanCart = useProductsCartStore((state: State) => state.cleanCart);

  const updateProductQuantityFromCart = useProductsCartStore(
    (state: State) => state.updateProductQuantityFromCart
  );

  const totalProducts = productsList.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const totalPrice = productsList.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0);

  // Formateo de la fecha
  const formattedDate = cartDateCreation
    ? new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(cartDateCreation))
    : null;

  return (
    <Card className="max-w-[1000px]">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <h2 className="font-bold text-2xl">Carrito de compra</h2>
          {cartDateCreation && (
            <p className="text-sm">
              <b>Fecha de creación:</b> {formattedDate}
            </p>
          )}
        </div>
        <Button onClick={() => cleanCart()}>Limpiar carrito <X /></Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Listado de productos de tu carrito</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cantidad</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Precio Total</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <img
                      src={emptyCart}
                      alt="empty cart"
                      className="h-40 w-auto"
                    />
                    <p>Tu carrito está vacío.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              productsList.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Input
                        className="flex-1"
                        type="number"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(e) =>
                          updateProductQuantityFromCart(
                            product.id,
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <p>{product.title}</p>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        className="h-20 w-auto rounded-sm"
                        src={product.image}
                        alt={product.title}
                      />
                    </TableCell>
                    <TableCell>$ {product.price}</TableCell>
                    <TableCell>
                      $ {(Number(product.price) * product.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DeleteProductDialogComponent product={product} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="flex flex-wrap gap-4 justify-between mt-8">
          <p>Cantidad de items: {totalProducts}</p>
          <p className="text-xl flex gap-4">
            Total a pagar:{" "}
            <span className="font-bold">$ {totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCartListComponent;
