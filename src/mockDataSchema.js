var schema = {
  "type": "object",
  "properties": {
    "therapists": {
      "type": "array",
      "minItems": 3,
      "maxItems": 10,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "format": "email",
            "unique": true,
            "faker": "internet.email"
          },
          "username": {
            "type": "string",
            "unique": true,
            "faker": "internet.userName"
          },
          "status": {
            "type": "boolean"
          }
        },
        "required": ["id", "firstName", "lastName", "email", "username", "status"]
      }
    },
    "companies": {
      "type": "array",
      "minItems": 3,
      "maxItems": 10,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "name": {
            "type": "string",
            "faker": "name.findName"
          },
          "email": {
            "type": "string",
            "format": "email",
            "unique": true,
            "faker": "internet.email"
          },
          "address": {
            "type": "string",
            "faker": "address.streetAddress"
          },
          "status": {
            "type": "boolean"
          }
        },
        "required": ["id", "name", "email", "address", "status"]
      }
    },
    "clients": {
      "type": "array",
      "minItems": 3,
      "maxItems": 10,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "username": {
            "type": "string",
            "faker": "internet.userName"
          },
          "company": {
            "type": "string",
            "faker": "company.companyName"
          },
          "status": {
            "type": "boolean"
          }
        },
        "required": ["id", "username", "company", "status"]
      }
    },
    "sessions": {
      "type": "array",
      "minItems": 0,
      "maxItems": 3,
      "items": {
        "type": "object",
        "properties": {
          "sessionId": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "duration": {
            "type": "number",
            "faker": "random.number"
          },
          "createDateTime": {
            "type": "string",
            "faker": "date.recent"
          },
          "startDateTime": {
            "type": "string",
            "faker": "date.recent"
          },
          "endDateTime": {
            "type": "string",
            "faker": "date.recent"
          },
          "clientUsername": {
            "type": "string",
            "unique": true,
            "faker": "internet.userName"
          },
          "clientCompany": {
            "type": "string",
            "faker": "company.companyName"
          },
          "status": {
            "type": "boolean"
          }
        },
        "required": [
          "sessionId",
          "duration",
          "createDateTime",
          "startDateTime",
          "endDateTime",
          "clientUsername",
          "clientCompany",
          "status"
        ]
      }
    }
  },
  "required": ["therapists", "companies", "clients", "sessions"]
};

module.exports = schema;
