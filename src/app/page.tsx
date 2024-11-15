"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Item } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export default function HomePage() {
  const [cart, setCart] = useState<Item[]>([])
  const [date, setDate] = useState<Date | null>()
  const [itemId, setItemId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedDate = localStorage.getItem('date')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedDate) {
      setDate(new Date(savedDate))
    } else {
      const newDate = new Date()
      localStorage.setItem("date", newDate.toISOString())
      setDate(newDate)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault()

    if (!itemId || !quantity) {
      setError("Complete todos los campos")
      return
    }

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${itemId}`)
      if (!res.ok) throw new Error('Item no encontrado')
      const item = await res.json()
      const newItem: Item = {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: parseInt(quantity)
      }

      const itemIndex = cart.findIndex(item => item.id === newItem.id)
      if (itemIndex !== -1) {
        const updatedCart = [...cart]
        updatedCart[itemIndex].quantity += newItem.quantity
        setCart(updatedCart)
      } else {
        setCart(prev => [...prev, newItem])
      }
      setQuantity('')
      setItemId('')
      setError('')
    } catch (error) {
      setError('Error al agregar item al carrito.')
    }
  }

  const handleClearCart = () => {
    setCart([])
  }

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) return "Cargando..."

  return (
    <main className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <p>Agrega los productos al carro de compra</p>
        <form className="flex justify-between gap-4 sm:gap-0" onSubmit={handleAddItem}>
          <div className="flex gap-4">
            <Input type="number" name="quantity" placeholder="Cantidad" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <Input type="string" name="product" placeholder="ID del Producto" value={itemId} onChange={e => setItemId(e.target.value)} />
          </div>
          <Button type="submit">Agregar</Button>
        </form>
        {error && <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <p>Carrito de compras</p>
              {date && <p className="text-sm">Carrito creado: {date.toLocaleString()}</p>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {
              cart.length > 0 ? <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Precio U</TableHead>
                    <TableHead>Precio T</TableHead>
                    <TableHead>Foto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
                      <TableCell>{(item.price * item.quantity).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
                      <TableCell>
                        <Image src={item.image} alt={item.title} width={32} height={32} className="object-contain w-full h-full" sizes="32px" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Precio total</TableCell>
                    <TableCell colSpan={2} className="text-right">{totalCart.toLocaleString('es-AR', { style: "currency", currency: "ARS" })}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table> : <p className="text-sm text-stone-400">No hay productos en el carro aun, prueba agregando arriba con su id y la cantidad que deseas ingresar.</p>
            }
          </CardContent>
          {cart.length > 0 && (
            <CardFooter className="flex justify-between items-center w-full">
              <Button onClick={handleClearCart} title="Vaciar carrito" aria-label="Vaciar carrito"><Trash2 className="size-4" /></Button>
              <div className="text-md font-semibold text-right">
                {/* <p>Precio total: <span className="text-primary">{totalCart.toLocaleString('es-AR', { style: "currency", currency: "ARS" })}</span></p> */}
                <p>Total de productos: <span className="text-primary">{totalItems}</span></p>
              </div>
            </CardFooter>
          )
          }
        </Card>
      </section>
    </main>
  );
}
