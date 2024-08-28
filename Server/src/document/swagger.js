const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../../swagger.yml'), 'utf8');
const swaggerDocument = YAML.parse(file);

var options = {
    explorer: true,
    swaggerOptions: {
        url: '/api-docs/swagger.json',
    },
};

const setDoc = (app) => {
    app.get('/api-docs/swagger.json', (req, res) => {
        res.json(swaggerDocument);
    });
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, options)
    );
};

module.exports = setDoc;
