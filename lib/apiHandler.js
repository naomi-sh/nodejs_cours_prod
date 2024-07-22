// 1. Import 'http' module
const http = require('http');
const { junit } = require('node:test/reporters');
const url = require ('url');

// Resource database
//  הגדרת מערך לקוחות
const customers = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, Springfield",
        numberOfAccounts: 2,
        balance: 1500.75
    },
    {
        id: 2,
        name: "Jane Smith",
        address: "456 Oak St, Metropolis",
        numberOfAccounts: 1,
        balance: 2500.50
    },
    {
        id: 3,
        name: "Alice Johnson",
        address: "789 Pine St, Gotham",
        numberOfAccounts: 3,
        balance: 3500.00
    },
    {
        id: 4,
        name: "Bob Brown",
        address: "101 Maple St, Star City",
        numberOfAccounts: 4,
        balance: 4500.25
    },
    {
        id: 5,
        name: "Charlie Davis",
        address: "202 Birch St, Central City",
        numberOfAccounts: 1,
        balance: 5500.75
    },
    {
        id: 6,
        name: "Diana Evans",
        address: "303 Cedar St, Coast City",
        numberOfAccounts: 2,
        balance: 6500.50
    },
    {
        id: 7,
        name: "Ethan Foster",
        address: "404 Elm St, Bludhaven",
        numberOfAccounts: 3,
        balance: 7500.00
    },
    {
        id: 8,
        name: "Fiona Green",
        address: "505 Spruce St, Keystone City",
        numberOfAccounts: 4,
        balance: 8500.25
    },
    {
        id: 9,
        name: "George Harris",
        address: "606 Ash St, Smallville",
        numberOfAccounts: 1,
        balance: 9500.75
    },
    {
        id: 10,
        name: "Hannah Martin",
        address: "707 Walnut St, Fawcett City",
        numberOfAccounts: 2,
        balance: 10500.50
    },
    {
        id: 11,
        name: "Isaac Nelson",
        address: "808 Chestnut St, Hub City",
        numberOfAccounts: 3,
        balance: 11500.00
    },
    {
        id: 12,
        name: "Jackie O'Neill",
        address: "909 Poplar St, Midway City",
        numberOfAccounts: 4,
        balance: 12500.25
    },
    {
        id: 13,
        name: "Karen Phillips",
        address: "1010 Beech St, Ivy Town",
        numberOfAccounts: 1,
        balance: 13500.75
    },
    {
        id: 14,
        name: "Liam Quinn",
        address: "1111 Cypress St, Opal City",
        numberOfAccounts: 2,
        balance: 14500.50
    },
    {
        id: 15,
        name: "Megan Roberts",
        address: "1212 Holly St, Happy Harbor",
        numberOfAccounts: 3,
        balance: 15500.00
    },
    {
        id: 16,
        name: "Nathan Scott",
        address: "1313 Redwood St, Ivy City",
        numberOfAccounts: 4,
        balance: 16500.25
    },
    {
        id: 17,
        name: "Olivia Turner",
        address: "1414 Willow St, Monument Point",
        numberOfAccounts: 1,
        balance: 17500.75
    },
    {
        id: 18,
        name: "Patrick Underwood",
        address: "1515 Alder St, Platinum Flats",
        numberOfAccounts: 2,
        balance: 18500.50
    },
    {
        id: 19,
        name: "Quincy Vaughn",
        address: "1616 Sequoia St, New Carthage",
        numberOfAccounts: 3,
        balance: 19500.00
    },
    {
        id: 20,
        name: "Rachel White",
        address: "1717 Fir St, Coral City",
        numberOfAccounts: 4,
        balance: 20500.25
    }
];

// 2. Create a server
const handlerApiRequest = (request,response) =>
{
    // 1. Break-down URL to components
    // לאיזה משאב אנחנו צריכים את המידע
    const parsedUrl = url.parse(request.url,true);
    const pathname = parsedUrl.pathname; // --> /api/v1/customers
    const method = request.method; // --> GET

    // API structure
    // /api/v1/customers - GET (ALL)
    // /api/v1/customers/{id} - GET (ONE)
    // /api/v1/customers - POST --> {body: {name:,address:,...}}
    // /api/v1/customers/{id} - PUT --> {body: {id:,name:,address:,...}} - עדכון של כל השדות
    // /api/v1/customers/{id} - PATCH --> {body: {id:,name:,address:,...}} - עדכון של חלק מהשדות
    // /api/v1/customers/{id} - DELETE


    // EXTRACT ID FROM UTL based on standart REST API
    const arrUrlPparts = pathname.split('/');
    const lastPart = arrUrlPparts[arrUrlPparts.length - 1];
    const lastLastPart = arrUrlPparts[arrUrlPparts.length - 2];

    let route = '';
    let body = '';
    let found = 0;
    let x=0 ;

    console.log(lastLastPart)

    if (lastPart === 'customers' || lastLastPart === 'customers'){
        route = lastLastPart === 'customers' ? '--customers--x--' :  '--customers--';
    }
    console.log(`${route}${method}--`);

    switch (`${route}${method}--`){
        case '--customers--GET--':
            // לקבל את כל המערך
            response.writeHead(200,{'content-type': 'application/json'});
            response.end(JSON.stringify(customers));
            break;

        case '--customers--POST--':
            // יצירת אוביקט חדש במערך
            request.on('data', chunk => body += chunk.toString());
            request.on('end',() => {
                // הגדרת מזהה חדש ייחודי id
                const newId = customers.length + 1;
                const newCustomer = JSON.parse(body);
                newCustomer.id = newId;
                // מייצרים אוביקט חדש במערך
                customers.push(newCustomer);
                // לייצר את ה response
                response.writeHead(201,{'content-type': 'application/json'});
                response.end(JSON.stringify(newCustomer));
            });
            break;

        case '--customers--x--GET--':
            const customer = customers.find(c => c.id === parseInt(lastPart));
            if (customer){
                response.writeHead(200,{'content-type': 'application/json'});
                response.end(JSON.stringify(customer));
            }
            else{
                response.writeHead(404,{'content-type':'application/json'});
                response.end(JSON.stringify({message: `customer '{lastPart}' not found`})) ;          
            }
            break;

        case '--customers--x--PUT--':
            request.on('data', chunk => body += chunk.toString());
            request.on('end',() => {
                const putCustomer = JSON.parse(body);
                console.log(putCustomer)
                while (!found)
                {
                    if (customers[x].id === parseInt(lastPart))
                    {
                        console.log(x);
                        customers[x].name = putCustomer.name;
                        customers[x].address = putCustomer.address;
                        customers[x].numberOfAccounts = putCustomer.numberOfAccounts;
                        customers[x].balance = putCustomer.balance;
                        console.log(customers[x]);
                        found= 1;
                    }
                    x = x + 1;
                }
                response.writeHead(201,{'content-type': 'application/json'});
                response.end(JSON.stringify(customers[x-1]));
            })
            break;

        case '--customers--x--DELETE--':
            while (!found)
                {
                    if (customers[x].id === parseInt(lastPart))
                    {
                        console.log(x);
                        customers.splice(x, 1)
                        found= 1;
                    }
                    x = x + 1;
                }
                response.writeHead(201,{'content-type': 'application/json'});
                response.end(JSON.stringify(customers));
            break;
            default:
                response.writeHead(404,{'content-type':'application/json'});
                response.end(JSON.stringify({message: `API endPoint not found!`})) ;          
    }


    // האם החלק האחרון בקישור הוא customer
    // אז מדובר בכל המערך
   // if (pathname.startsWith('/api/v1/') && (lastPart === 'customers' || lastLastPart === 'customers'))
 /*  if (lastPart === 'customers' || lastLastPart === 'customers')
    {
        if (lastPart === 'customers')
        {
            if (method === 'GET'){
                // לקבל את כל המערך
                response.writeHead(200,{'content-type': 'application/json'});
                response.end(JSON.stringify(customers));
            }
            else if (method === 'POST'){
                // יצירת אוביקט חדש במערך
                let body = '';
                request.on('data', chunk => body += chunk.toString());
                request.on('end',() => {
                    // הגדרת מזהה חדש ייחודי id
                    const newId = customers.length + 1;
                    const newCustomer = JSON.parse(body);
                    newCustomer.id = newId;
                    // מייצרים אוביקט חדש במערך
                    customers.push(newCustomer);
                    // לייצר את ה response
                    response.writeHead(201,{'content-type': 'application/json'});
                    response.end(JSON.stringify(newCustomer));
                });
            }
        }
        else
        {
            // כנראה שקיבלנו גם מזהה (נמצא בחלק האחרון של הקישור), ואז זה לקוח ספציפי
            if (method === 'GET'){
                const customer = customers.find(c => c.id === parseInt(lastPart));
                if (customer){
                    response.writeHead(200,{'content-type': 'application/json'});
                    response.end(JSON.stringify(customer));
                }
                else{
                    response.writeHead(404,{'content-type':'application/json'});
                    response.end(JSON.stringify({message: `customer '{lastPart}' not found`})) ;          
                }
            }
            else if (method === 'PUT')
                {
                //UPDATE
                    let body = '';
                    let found = 0;
                    let x=0 ;
                    request.on('data', chunk => body += chunk.toString());
                    request.on('end',() => {
                        const putCustomer = JSON.parse(body);
                        console.log(putCustomer)
                        while (!found)
                        {
                            if (customers[x].id === parseInt(lastPart))
                            {
                                console.log(x);
                                customers[x].name = putCustomer.name;
                                customers[x].address = putCustomer.address;
                                customers[x].numberOfAccounts = putCustomer.numberOfAccounts;
                                customers[x].balance = putCustomer.balance;
                                console.log(customers[x]);
                                found= 1;
                            }
                            x = x + 1;
                        }
                        response.writeHead(201,{'content-type': 'application/json'});
                        response.end(JSON.stringify(customers[x-1]));
                    })
                }
                else if (method === 'DELETE')
                    {
                        let found = 0;
                        let x=0 ;    
                        while (!found)
                            {
                                if (customers[x].id === parseInt(lastPart))
                                {
                                    console.log(x);
                                    customers.splice(x, 1)
                                    found= 1;
                                }
                                x = x + 1;
                            }
                            response.writeHead(201,{'content-type': 'application/json'});
                            response.end(JSON.stringify(customers));
                     }
                    
        }      
    }
    else{
            response.writeHead(404,{'content-type':'application/json'});
            response.end(JSON.stringify({message: `API endPoint not found!`})) ;          
    }
            */
}
module.exports = {handlerApiRequest};
