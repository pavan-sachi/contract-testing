const express = require('express')
const faker = require('faker');

const app = express()

const ROLES = ['Admin', 'General', 'BillPayer'];
const PRODUCTS = ['Channel Mananger', 'Booking Button', 'Front Desk'];
const HOTELS = [
  { 
    name: 'Hilton',
    address: '488 George Street, Sydney',
  },
  { 
    name: 'Shangri La',
    address: '176 Cumberland St, The Rocks NSW 2000',
  },
  {
    name: 'Four Seasons',
    address: '199 George St, Sydney NSW 2000'
  },
  {
    name: 'Hyatt Regency',
    address: '161 Sussex Street, Sydney 2000'
  },
  {
    name: 'Grace Hotel',
    address: '77 York Street, Sydney 2000'
  }
]

const users = [...Array(5).keys()]
  .map((key) => ({
    id: key + 1,
    name: faker.name.findName(),
    role: ROLES[Math.floor(Math.random() * ROLES.length)]
  }));

const products = [...Array(5).keys()]
  .map((key) => ({
    id: key + 1,
    name: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
    provisionedAt: faker.date.past()
  }))

console.log(products)

const properties = [...Array(5).keys()]
  .map((key) => ({
    id: key + 1,
    name: HOTELS[key].name,
    address: HOTELS[key].address,
    products: [products[key % products.length]],
    users: [users[key]]
  }))

app.get('/properties', (req, res) => {

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(properties))
})

const startServer = (port, cb) => {
  const server = app.listen(port, () => {
    cb(server)
  })
};

module.exports = { startServer };
