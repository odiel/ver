
const schema = {
    type: 'object',
    properties: {
      id: { 
        type: "string",
        nullable: true,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      },
      name: {
        type: "string"
      },
      description: {
        type: "string"
      },
      quantity: {
        type: "integer"
      },
      isPurchased: {
        type: "boolean"
      }
    },
    required: ["name", "description", "quantity", "isPurchased"],
    additionalProperties: false
}

export default schema;
