export const deliveryOptions = [
  {
    id: "1",
    days: 7,
    price: 0,
  },
  {
    id: "2",
    days: 3,
    price: 25000,
  },
  {
    id: "3",
    days: 1,
    price: 50000,
  },
];

export function getDeliveryOption(id) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === id) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
