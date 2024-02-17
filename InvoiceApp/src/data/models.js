export const Invoice = {
  id: 10,
  name: "Componentes PC",
  client: {
    name: "Pepe",
    lastName: "Doe",
    address: {
      country: "USA",
      city: "Los Angeles",
      street: "One street",
      number: 12,
    },
  },
  company: {
    name: "New Egg",
    fiscalNumber: 1234567,
  },
  items: [
    {
      product: "CPU Intel i7",
      price: 499,
      quantity: 1,
    },
    {
      product: "Corsair Keyboard Mechanic",
      price: 150,
      quantity: 1,
    },
    {
      product: "Monitor asus",
      price: 350,
      quantity: 1,
    },
  ],
};
