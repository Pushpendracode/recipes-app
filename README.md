# 🍽️ Recipes API

A CRUD REST API for managing recipes, built with **Node.js**, **Express.js**, and **Mongoose (MongoDB)**.

---

## 🔗 Links

| Resource | URL |
|---|---|
| Live API | https://recipes-app-ryqk.onrender.com |
| Postman Documentation | https://documenter.getpostman.com/view/55882092/2sBXwsNAdc |
| GitHub Repo | https://github.com/Pushpendracode/recipes-app |

---

## 📦 Tech Stack

- **Node.js** + **Express.js 5** — server & routing
- **Mongoose 9** — MongoDB ODM / schema validation
- **dotenv** — environment variable management
- **nodemon** (dev only) — auto-restart during development

---

## 📁 Project Structure

```
recipes-app/
├── config/
│   └── db.js                 # MongoDB connection (Mongoose)
├── controllers/
│   └── recipeController.js   # CRUD business logic
├── middleware/
│   └── errorMiddleware.js    # 404 handler + centralized error handler
├── models/
│   └── Recipe.js             # Mongoose schema/model
├── routes/
│   └── recipeRoutes.js       # /api/recipes routes
├── server.js                 # App entry point
├── Recipes-API.postman_collection.json  # Importable Postman collection
└── README.md
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Pushpendracode/recipes-app.git
   cd recipes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

4. **Run the server**
   ```bash
   npm run dev    # with nodemon (development)
   npm start      # plain node (production)
   ```

   The API will be available at `http://localhost:5000`.

---

## 📚 API Reference

Base path: `/api/recipes`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/recipes` | Create a new recipe |
| `GET` | `/api/recipes` | Get all recipes |
| `GET` | `/api/recipes/:id` | Get a single recipe by ID |
| `PUT` | `/api/recipes/:id` | Update a recipe by ID |
| `DELETE` | `/api/recipes/:id` | Delete a recipe by ID |

All responses are JSON and follow this shape:
```json
{ "success": true | false, "data": {}, "message": "..." }
```

### Recipe Schema

| Field | Type | Required | Constraints / Default |
|---|---|---|---|
| `title` | String | ✅ | 3–100 characters |
| `description` | String | ✅ | max 500 characters |
| `ingredients` | String[] | ✅ | at least one item |
| `instructions` | String | ✅ | — |
| `cookingTime` | Number | ✅ | minutes, min 1 |
| `servings` | Number | ✅ | min 1 |
| `difficulty` | String | ❌ | `Easy` \| `Medium` \| `Hard` — default `Medium` |
| `category` | String | ❌ | default `General` |
| `createdAt` / `updatedAt` | Date | auto | added by Mongoose timestamps |

---

### 1. Create Recipe

**`POST /api/recipes`**

**Request body:**
```json
{
  "title": "Classic Margherita Pizza",
  "description": "A simple, authentic Italian pizza with fresh mozzarella, basil, and tomato sauce.",
  "ingredients": ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Fresh basil", "Olive oil", "Salt"],
  "instructions": "Preheat oven to 250°C. Spread crushed tomatoes over the dough. Add torn mozzarella. Bake 10-12 minutes until golden. Top with basil and olive oil.",
  "cookingTime": 25,
  "servings": 4,
  "difficulty": "Easy",
  "category": "Italian"
}
```

**Success — `201 Created`:**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": { "_id": "665f1c2e...", "title": "Classic Margherita Pizza", "...": "..." }
}
```

**Validation error — `400 Bad Request`:**
```json
{ "success": false, "message": "Validation failed", "errors": ["Recipe title is required"] }
```

---

### 2. Get All Recipes

**`GET /api/recipes`**

Returns all recipes sorted newest first.

**Success — `200 OK`:**
```json
{ "success": true, "count": 2, "data": [ { "_id": "...", "title": "..." } ] }
```

---

### 3. Get Recipe By ID

**`GET /api/recipes/:id`**

**Success — `200 OK`:**
```json
{ "success": true, "data": { "_id": "...", "title": "..." } }
```

**Not found — `404 Not Found`:**
```json
{ "success": false, "message": "Recipe not found" }
```

**Invalid ID format — `400 Bad Request`:**
```json
{ "success": false, "message": "Invalid recipe ID" }
```

---

### 4. Update Recipe

**`PUT /api/recipes/:id`**

Send only the fields you want to change. Schema validators run on update.

**Request body (example — partial update):**
```json
{ "cookingTime": 30, "difficulty": "Medium" }
```

**Success — `200 OK`:**
```json
{ "success": true, "message": "Recipe updated successfully", "data": { "_id": "...", "cookingTime": 30 } }
```

**Not found — `404 Not Found`:**
```json
{ "success": false, "message": "Recipe not found" }
```

---

### 5. Delete Recipe

**`DELETE /api/recipes/:id`**

**Success — `200 OK`:**
```json
{ "success": true, "message": "Recipe deleted successfully", "data": {} }
```

**Not found — `404 Not Found`:**
```json
{ "success": false, "message": "Recipe not found" }
```

---

## ❌ Error Handling

- **Unknown route** → `404 Not Found`
  ```json
  { "success": false, "message": "Route not found: /api/whatever" }
  ```
- **Uncaught server error** → `500 Internal Server Error`
  ```json
  { "success": false, "message": "Internal Server Error" }
  ```

---

## 🧪 Testing with Postman

A ready-to-import collection is included in this repo: **[`Recipes-API.postman_collection.json`](./Recipes-API.postman_collection.json)**

**To use it:**
1. Open Postman → **Import** → select `Recipes-API.postman_collection.json`.
2. The collection variable `baseUrl` is pre-set to the live Render URL. To test locally, edit it to `http://localhost:5000/api/recipes`.
3. Run **Create Recipe** first — its Tests script auto-saves the new recipe's `_id` into the `recipeId` variable, which the Get/Update/Delete requests reuse automatically.

Hosted documentation (same collection, viewable without Postman): https://documenter.getpostman.com/view/55882092/2sBXwsNAdc

---

## 🚀 Deployment

The API is deployed on **Render** at:
https://recipes-app-ryqk.onrender.com

Environment variables (`PORT`, `MONGODB_URI`) are configured in the Render dashboard under **Environment**.

---

## 👤 Author

**Pushpendra Singh**
GitHub: [@Pushpendracode](https://github.com/Pushpendracode)
