# Reverse Image Search Engine

This project is a reverse image search engine that leverages the power of a Weaviate vector database to enable users to upload images and find similar images. It is built using Node.js for the backend API and Next.js for the frontend interface.

## Features

- **Image Upload**: Users can upload images to be indexed in the Weaviate vector database.
- **Image Search**: By uploading an image, users can search for and retrieve similar images from the database.

## Technology Stack

- **Frontend**: Next.js, React, Ant Design UI library
- **Backend**: Node.js, Express.js
- **Database**: Weaviate vector database
- **Image Processing**: Utilizes Weaviate's img2vec-neural module for converting images into vectors

## Prerequisites

- Node.js (LTS version recommended)
- Docker and Docker Compose

## How to Run

### Start the Weaviate Database

1. Navigate to the `client` directory and start Weaviate with Docker Compose:
```
cd client && docker-compose up -d
```

### Start the Backend API

2. In a new terminal, go to the `Embedding-service` directory, install dependencies, and start the server:
```
cd Embedding-service
npm install
npm start
```

### Start the Backend API

3. In a new terminal, go to the `Embedding-service` directory, install dependencies, and start the server:
```
cd Vision-service
npm install
npm start
```

### Start the Frontend Application

4. In another terminal, navigate to the `client` directory, install dependencies, and run the Next.js server:
```
cd client
npm install
npm run dev
```

The frontend is now accessible at `http://localhost:3000`.

## Demonstration Video

To see the search engine in action, watch the demonstration video below:

[![Reverse Image Search Engine Demo](http://img.youtube.com/vi/VIDEO_ID/0.jpg)](http://www.youtube.com/watch?v=VIDEO_ID "Reverse Image Search Engine Demo")
