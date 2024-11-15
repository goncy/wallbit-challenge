import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Product, State } from "@/models/ProductsCartStoreModels";
import { useProductsCartStore } from "@/store/ProductsCartStore";

const DeleteProductDialogComponent = ({ product }: { product: Product }) => {
  const removeProductFromCart = useProductsCartStore(
    (state: State) => state.removeProductFromCart
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="my-8">
          <DialogTitle>Eliminar producto</DialogTitle>
          <DialogDescription>
            ¿Esta seguro que desea eliminar <b>{product.title}</b> del carrito?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => removeProductFromCart(product.id)}
          >
            Si, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialogComponent;
