# E-commerce Website

This repository contains the source code for a website using reactjs, expressjs, socketio...

## Technology

-   Front-end: reactjs, redux toolkit, bootstrap
-   Back-end: express, nodejs, socketio, swagger
-   database: mongodb, redis

## Features

-   Authentication with Google OAuth2
-   Authorization and refresh token using JWT
-   Utilized Cloudinary to handle image uploads and storage
-   Integrated PayPal for payment processing
-   Cart management using Redis
-   Implemented real-time messaging functionality and notification system using SocketIO
-   Created API document with Swagger
-   Executed unit tests using Jest

## Installation

Follow these steps to set up and run the project locally

### Prerequistes

-   Install npm, nodejs, mongodb, redis

### Clone the repository

```
git clone https://github.com/huyf-51/first_project.git
cd first_project
```

### Install dependencies

```
npm install
```

### Configure environment variable

Create .env file and add above env vars

-   For frontend:

```
REACT_APP_SERVER_URL=your_server_url
```

-   For backend

```
MONGODB_URI=your_mongodb_url

accessToken=your_accessToken_secret_key
refreshToken=your_refreshToken_secret_key

GOOGLE_CLIENT_ID=your_gg_client_id

GOOGLE_REDIRECT_URL=your_gg_redirect_url
GOOGLE_CLIENT_SECRET=your_gg_client_secret

CLIENT_URL=your_client_url

GOOGLE_APP_EMAIL=your_gg_app_email
GOOGLE_APP_PASSWORD=your_gg_app_pass

TOKEN_RESET_PASSWORD=your_token_secret_for_reset_pass

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### Run project

-   For backend:

```
cd Server
npm start
```

-   For frontend:

```
cd Client
npm start
```
