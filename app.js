import express, { request, response } from 'express';

const usersTable = [
    {
        name: 'Leo',
        email: 'leo@e.com',
        isActive: true
    },
    {
        name: 'Lili',
        email: 'lili@e.com',
        isActive: true
    },
    {
        name: 'Petra',
        email: 'petra@e.com',
        isActive: true
    },
    {
        name: 'Jhon',
        email: 'jhon@e.com',
        isActive: false
    },
];

const products = [ 
	{
		name: 'Product 1',
		stock: 15
	},
	{
		name: 'Product 2',
		stock: 25
	}
];

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Server is alive!'
    })
});

app.get('/products', (request, response) => {
	if(request.body.token) {
		response.status(200).json({
			products: products,
			message: 'Get all products success'
		});
	} else {
		response.status(403).json({
			message: 'Fobidden'
		});
	}
});


app.get('/users', (request, response) => {
    const activeUsers = [];
    usersTable.forEach((user, index) => {
        if(user.isActive) {
            activeUsers.push({
                id: index,
                ...user
            })
        }
    });
    response.status(200).json(activeUsers);
});

app.get('/users/all', (request, response) => {
    response.status(200).json(usersTable);
});

app.get('/users/:id', (request, response) => {
    response.status(200).json(usersTable[request.params.id]);
});

app.post('/users', (request, response) => {
    usersTable.push({
        ...request.body,
        isActive: true
    });
    response.status(201).json({
        message: 'User created successfully',
        user: {
            ...usersTable[usersTable.length - 1]
        }
    });
});

app.put('/users', (request, response) => {
    usersTable[request.body.id] = request.body;
    response.status(200).json({
        message: 'User updated successfully',
        user: usersTable[request.body.id]
    });
});

app.delete('/users/:id', (request, response) => {
    // usersTable[request.params.id].isActive = false;
    usersTable.splice(request.params.id, 1);
    response.status(200).json({
        message: 'User deleted successfully',
        user: {
            name: usersTable[request.params.id].name,
            email: usersTable[request.params.id].email
        } 
    });
});


app.listen(3000, () => {
    console.log('Server runing on port 3000...');
});
