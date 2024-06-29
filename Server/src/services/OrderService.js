const AppError = require('../utils/AppError');
const fetch = require('node-fetch');
require('dotenv').config();
const base = 'https://api-m.sandbox.paypal.com';
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

class OrderService {
    async handleResponse(response, next) {
        try {
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                httpStatusCode: response.status,
            };
        } catch (err) {
            const errorMessage = await response.text();
            next(new AppError(errorMessage));
        }
    }
    async generateAccessToken(next) {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            next(
                new AppError(
                    'Failed to generate Access Token: MISSING_API_CREDENTIALS'
                )
            );
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET
        ).toString('base64');

        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    }

    async createOrder(cartTotalPrice, next) {
        const accessToken = await this.generateAccessToken(next);
        const url = `${base}/v2/checkout/orders`;

        const payload = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: cartTotalPrice,
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });

        return this.handleResponse(response, next);
    }
    async captureOrder(orderID, next) {
        const accessToken = await this.generateAccessToken(next);
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return this.handleResponse(response, next);
    }
}

module.exports = new OrderService();
