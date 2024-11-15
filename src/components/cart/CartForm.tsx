import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { CartFormData } from '../../types/cart';

interface CartFormProps {
  onSubmit: (data: CartFormData) => Promise<boolean>;
  loading: boolean;
}

export const CartForm: React.FC<CartFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<CartFormData>({
    productId: '',
    quantity: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ productId: '', quantity: '' });
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexWrap: 'wrap'
      }}
    >
      <TextField
        label="Cantidad"
        type="number"
        value={formData.quantity}
        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
        size="small"
        required
        inputProps={{ min: 1 }}
        sx={{ width: 100 }}
      />
      <TextField
        label="ID del Producto"
        type="number"
        value={formData.productId}
        onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
        size="small"
        required
        inputProps={{ min: 1 }}
        sx={{ width: 150 }}
      />
      <Button 
        variant="contained" 
        type="submit" 
        disabled={loading}
        sx={{ height: 40 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Agregar'}
      </Button>
    </Box>
  );
};