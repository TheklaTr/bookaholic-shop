# BOOKAHOLIC WEB SHOP

## Install dependencies

### For server

```
   cd server
   npm install
```

### For client

```
   cd client
   npm install
```

## Project Implementation

### Connect to server

- Create `.env` file in server

* Add to `.env` modify your information:

```
   # MONGODB
   MONGODB_URL=YOUR_MONGODB_URL

   # Cloudinary
   CLOUD_API_KEY=YOUR_CLOUD_API_KEY
   CLOUD_API_SECRET=YOUR_CLOUD_API_SECRET
   CLOUD_NAME=YOUR_CLOUD_NAME

   # Token Authentication
   ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
   REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET

```

### Connect to PayPal

- Add paypal clientID sandbox in `.env.local`

```
  REACT_APP_SANDBOX_PAYPAL='YOUR-PAYPAL-SANDBOX-APP-ID'

```

## Running Project

## Server

```javascript
   // runs on http://localhost:3003
   npm run dev
```

## Client

```javascript
   // runs on http://localhost:3000
   npm start
```

## Deployment

[Demo link](https://bookaholic-shop.herokuapp.com/)

### Author

Hien Tran

### User interface

Homepage:
![homepage](https://res.cloudinary.com/theklatran/image/upload/v1644780916/test/user_page_jmqirl.png)

### Admin interface

Start Page:
![startpage](https://res.cloudinary.com/theklatran/image/upload/v1644780916/test/admin-page_wuqtgn.png)
