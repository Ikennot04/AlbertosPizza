export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

export const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Brown Spanish',
        description: 'Brown Spanish Latte is basically espresso-based coffee with milk.',
        price: 39,
        stock: 100,
        image: '/images/Menu/sss.jpg',
    },
    {
        id: 2,
        name: 'Oreo Coffee',
        description: 'Oreo Iced Coffee Recipe is perfect for a hot summer day.',
        price: 39,
        stock: 50,
        image: '/images/Menu/greenpizza.jpg',
    },
    {
        id: 3,
        name: 'Black Forest',
        description: 'A decadent symphony of flavors featuring luxurious Belgian dark chocolate and succulent Taiwanese strawberries, delicately infused with velvety milk',
        price: 39,
        stock: 50,
        image: '/images/Menu/cheesepizza.jpg',
    },
    {
        id: 4,
        name: 'Don darko',
        description: 'Crafted from the finest Belgian dark chocolate, harmoniously blended with creamy milk',
        price: 39,
        stock: 50,
        image: '/images/Menu/leafpizza.jpg',
    },
    {
        id: 5,
        name: 'Donya Berry',
        description: 'A tantalizing fusion of succulent Taiwanese strawberries mingled with creamy milk',
        price: 39,
        stock: 50,
        image: '/images/Menu/bida.png',
    },
    {
        id: 6,
        name: 'Iced Caramel',
        description: 'An exquisite blend of freshly pulled espresso, smooth milk, and luscious caramel syrup, served over a bed of ice',
        price: 39,
        stock: 50,
        image: '/images/Productlist/icedcaramel.jpg',
    }
];