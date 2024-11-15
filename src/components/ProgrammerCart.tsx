import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../hooks/useCart";
import { CartForm } from "./cart/CartForm";
import { CartTable } from "./cart/CartTable";

const ProgrammerCart: React.FC = () => {
  const { cartItems, error, loading, addToCart, clearCart, removeItem, updateQuantity, startedAt } = useCart();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Tienda - El topo
        </Typography>

        <CartForm onSubmit={addToCart} loading={loading} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper variant="outlined" sx={{ mt: 2 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              {cartItems.length === 0
                ? "Carrito de compra"
                : `Carrito de compra - Iniciado ${startedAt}`}
            </Typography>
          </Box>

          <CartTable
            items={cartItems}
            onRemoveItem={removeItem}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
          />
        </Paper>
      </Paper>
    </Container>
  );
};

export default ProgrammerCart;
