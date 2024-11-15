import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CartItem } from "../../types/cart";
import { StyledImage } from "../common/StyledImage";

interface CartTableProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

export const CartTable: React.FC<CartTableProps> = ({ items, onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">
          No hay productos en el carrito, probá agregando uno nuevo arriba con su ID y la cantidad que desees ingresar
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cantidad</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio Unidad</TableCell>
              <TableCell>Precio Total</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={`${item.id}-${item.quantity}`}>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        onUpdateQuantity(item.id, newQuantity);
                      }
                    }}
                    slotProps={{
                      input: {
                        inputMode: "numeric",
                      },
                    }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <StyledImage src={item.image} alt={item.title} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onRemoveItem(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Typography variant="body2" color="text.secondary">
            Cantidad total de productos: {totalItems}
          </Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={onClearCart}>
          Limpiar Carrito
        </Button>
      </Box>
    </Box>
  );
};
