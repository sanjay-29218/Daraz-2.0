import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('9861345770Sa@', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            id:1,
            name:'Free Shirt',
            slug: 'free-shirt',
            category:'Shirts',
            image:'/images/shirt1.jpg',
            price: 70,
            brand:'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 6,
            description: 'high quality shirt',
            discountedPrice: 50,
            store: 'Manakamana',
        },
        {
            id:2,
            name:'Fit Shirt',
            slug: 'fit-shirt',
            category:'Shirts',
            image:'/images/shirt2.jpg',
            price: 80,
            brand:'Addidas',
            rating: 4.2,
            numReviews: 5,
            countInStock: 6,
            description: 'high quality Fit shirt',
            discountedPrice: 60,
            store: 'Amazon'

        },
        {
            id:3,
            name:'Golf Pants',
            slug: 'golf-pants',
            category:'Pants',
            image:'/images/pants1.jpg',
            price: 120,
            brand:'Addidas',
            rating: 3,
            numReviews: 8,
            countInStock: 6, 
            description: 'high quality Pants',
            discountedPrice: 100,
            store: 'HamroBazar'
        },
        {
            id:4,
            name:'Classic Pants',
            slug: 'classic-pants',    
            category:'Pants',
            image:'/images/pants2.jpg',
            price: 120,
            brand:'Raymond',
            rating: 2,
            numReviews: 8,
            countInStock: 6,
            description: 'high quality Pants',
            discountedPrice: 100,
            store: 'HamroBazar'
        },
        {
            id:5,    
            name:'Short Pants',
            slug:' short-pants',
            category:'Pants',
            image:'/images/pants3.jpg',
            price: 120,
            brand:'Nike',
            rating: 3,
            numReviews: 8,
            countInStock: 6,
            description: 'high quality Short Pants',
            discountedPrice: 100,
            store:'Tamrakar'
        },
        {
            id:6,
            name:'Slim Shirt',
            slug:'slim-shirt',
            category:'slim-shirt',
            image:'/images/shirt3.jpg',
            price: 90,
            brand:'Raymond',
            rating: 5,
            numReviews: 8,
            countInStock: 6,
            description: 'high quality Slim Shirt',
            discountedPrice: 70,
            store:'Complex'
        }              
        
        
]


}
export default data;