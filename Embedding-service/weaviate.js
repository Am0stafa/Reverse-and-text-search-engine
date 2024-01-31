import weaviate from "weaviate-client";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

async function createSchema() {
  const schemaConfig = {
    class: "Images",
    vectorizer: "img2vec-neural",
    moduleConfig: {
      "img2vec-neural": {
        imageFields: ["image"],
      },
      vectorIndexConfig: {
        type: "hnsw",
        // Additional HNSW configuration can go here if needed
      },
    },
    properties: [
      {
        name: "image",
        dataType: ["blob"],
      },
      {
        name: "text",
        dataType: ["text"], // Changed from 'string' to 'text'
      },
    ],
  };

  try {
    await client.schema.classCreator().withClass(schemaConfig).do();
    console.log("Schema created successfully");
  } catch (error) {
    console.error("Error creating schema:", error);
  }
}

createSchema();

export default client;
