export const ProductSchema = {
    name: 'Product',
    properties: {
        id: 'int',
        productName: 'string',
        imagePath: 'string',
        category: 'int',
        description: 'string',
        price: 'int?', //allow null
        instagram: 'string',
        facebook: 'string',
        phoneNumber: 'string',
    },
    primaryKey: 'id',
}as const;

export type Product = {
    id: number;
    productName: string;
    imagePath: string;
    category: number;
    description: string;
    price: number;
    instagram: string;
    facebook: string;
    phoneNumber: string;
}