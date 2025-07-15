# Backend README

This backend provides an API for searching and retrieving components based on metadata, stored in a MongoDB database. It is structured to include controllers, models, and routes that handle the application logic and request routing for the components.

## Folder Structure

- **/server**  
  - **/controllers**  
    Contains the logic for handling requests
  - **/models**  
    Contains the Mongoose models for MongoDB collections
  - **/routes**  
    Defines the API endpoints
  - **index.js**  
    Main server setup file



## Technologies Used

- **Node.js**: Backend JavaScript runtime
- **Express.js**: Web framework for building REST APIs
- **MongoDB**: NoSQL database for storing component metadata
- **Mongoose**: ODM for interacting with MongoDB
- **Cors**: Middleware to enable cross-origin requests
- **Dotenv**: Loads environment variables from a `.env` file
- **AI Tools Used**: GitHub Copilot, ChatGPT for debugging, commenting, and setting up `.env` file.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jaissica/component-suggestion-tool-backend
   cd your-project
      ```
2. **Install dependencies:**
```bash
   npm install
  ```

3. **Set up environment variables:**
 ```
  MONGODB_URI=your_mongodb_connection_string
  PORT=your_preferred_port (default: 5050)
  ```
4. **Run the server:**
 ```
   npm start
  ```
The backend is currently on render
## API Endpoints

### Search Components
- **GET** `/search/components`

  Searches the `ComponentMeta` collection based on a query parameter `q`. This endpoint performs a full-text search on the `name` and `description` fields. If no results are found, it falls back to searching based on tags. The tags are manually updated in the database. In use, a query checks for common words that can be used to define a component, helping to categorize and optimize component discovery.

  #### Query Parameters:
  - `q`: The search query (required)

  #### Response:
  - **200 OK**: A JSON array of component metadata that matches the query
  - **400 Bad Request**: If the `q` parameter is missing
  - **500 Internal Server Error**: If an error occurs during the search

  #### Example Request:
  ```bash
  GET http://localhost:5050/search/components?q=button
    ```
  ```bash
    [
      {
        "name": "Primary Button",
        "slug": "primary-button",
        "description": "A primary action button for forms",
        "usage": "Use for main actions like submit.",
        "tags": ["button", "primary", "action"],
        "category": "UI Components",
        "createdAt": "2025-07-12T14:32:56Z"
      }
    ] 
    ```

## Code Explanation

### Controllers: `componentController.js`

The `componentController.js` file defines the logic for handling component search requests.

#### The `searchComponents` function:

- **Retrieves the query parameter `q`** from the request.
- **If `q` is missing**, it returns a `400` response with an error message.
- It first tries to find components with a **full-text search** on the `name` and `description` fields using MongoDB's `$text` operator.
- If no results are found, it splits the query into individual words and searches for components whose **tags** match any of the words.
- It returns the **search results as a JSON response**.

---

### Models: `ComponentMeta.js`

The `ComponentMeta.js` file defines the Mongoose schema for the `ComponentMeta` model.

#### The schema contains the following fields:

- `name`: The name of the component (unique)
- `slug`: A URL-friendly identifier for the component (unique)
- `description`: A brief description of the component
- `usage`: Usage instructions or notes
- `tags`: An array of tags associated with the component
- `category`: The category to which the component belongs
- `createdAt`: The timestamp of when the component was created

The schema also includes a **text index** on `name` and `description` to enable full-text search.

---

### Routes: `componentRoutes.js`

The `componentRoutes.js` file defines the routes for the application.

- The `GET /search/components` route calls the `searchComponents` controller function to perform the search operation.

---