# 🚀 Food Delivery Slot Optimization System

A full-stack Java + Spring Boot application that optimizes food delivery by intelligently assigning delivery agents to orders using **Dijkstra's Shortest Path Algorithm** and a **Greedy Earliest Deadline First (EDF) Scheduler**.

---

## 📌 Project Overview

In a real food delivery system, multiple orders arrive simultaneously and need to be assigned to available agents efficiently. This system solves that problem by:

- Representing the city as a **weighted graph** of nodes (restaurants, intersections, customer zones)
- Computing the **shortest travel path** for each agent using Dijkstra's Algorithm
- Assigning orders to agents using a **greedy priority queue** that minimizes late deliveries
- Exposing the backend logic as a **REST API** consumed by an interactive frontend

---

## 🎯 Objectives

- Minimize total delivery time across all orders
- Ensure maximum orders are delivered before their deadlines
- Demonstrate practical application of graph algorithms in a real-world scenario
- Provide a clean, interactive UI to visualize results

---

## 🧠 Algorithms Used

### 1. Dijkstra's Shortest Path Algorithm
Used to compute the minimum travel distance between any two nodes in the city graph.

- **Input:** Source node, destination node, weighted adjacency list
- **Output:** Shortest distance from source to destination
- **Time Complexity:** O((V + E) log V) using a Priority Queue
- **Used for:** Agent → Restaurant → Customer Zone routing

### 2. Greedy Earliest Deadline First (EDF) Scheduling
Used to assign orders to agents in the most time-efficient order.

- Orders are **sorted by deadline** (earliest first)
- A **min-heap Priority Queue** always picks the agent with the earliest available time
- For each order: `finishTime = agentAvailableTime + distToRestaurant + distToDelivery`
- If `finishTime ≤ deadline` → **ON TIME**, else → **LATE**

---

## 🏗️ Project Structure

```
FoodDeliveryOptimization/
│
├── src/main/java/com/project/
│   ├── FoodDeliveryApplication.java     ← Spring Boot entry point
│   ├── controller/
│   │   └── SimulationController.java    ← REST API endpoint (POST /api/run)
│   ├── service/
│   │   └── DeliveryService.java         ← Business logic, graph setup
│   ├── model/
│   │   ├── Order.java                   ← Order data model
│   │   └── Agent.java                   ← Agent data model
│   ├── graph/
│   │   ├── Graph.java                   ← Adjacency list graph
│   │   └── Dijkstra.java                ← Shortest path implementation
│   └── scheduler/
│       └── Scheduler.java               ← EDF scheduling with priority queue
│
├── frontend/
│   ├── index.html                       ← Main UI
│   ├── style.css                        ← Styling
│   └── script.js                        ← API calls, graph canvas, form logic
│
├── pom.xml                              ← Maven + Spring Boot dependencies
└── README.md
```

---

## 🗺️ City Graph

The delivery network consists of **10 nodes** and **14 edges**:

| Node | Location Type | Description |
|------|--------------|-------------|
| 0 | Restaurant | Restaurant A |
| 1 | Restaurant | Restaurant B |
| 2 | Intersection | Intersection 1 |
| 3 | Intersection | Intersection 2 |
| 4–9 | Customer Zone | Delivery destinations |

Edges represent roads with weighted travel times. The graph is **undirected** — travel works both ways.

---

## 🔁 System Flow

```
User fills Input Form (orders + agents)
              ↓
Frontend sends POST /api/run  with JSON payload
              ↓
Spring Boot Controller receives request
              ↓
DeliveryService builds city graph
              ↓
Scheduler sorts orders by deadline (EDF)
              ↓
For each order → pick earliest available agent (min-heap)
              ↓
Dijkstra: agent node → restaurant node → delivery node
              ↓
Calculate finishTime, compare with deadline
              ↓
Return JSON results → Frontend renders result cards
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2 |
| Algorithm | Dijkstra's Algorithm, Greedy EDF |
| REST API | Spring MVC (`@RestController`, `@PostMapping`) |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| UI Components | Bootstrap 5, Bootstrap Icons |
| Graph Visualization | HTML5 Canvas API |
| Build Tool | Maven |

---

## ⚙️ How to Run

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Any modern browser

### Step 1 — Clone the repository
```bash
git clone https://github.com/Shaurya-Sati/FoodDeliverySlotOptimization.git
cd FoodDeliverySlotOptimization
```

### Step 2 — Start the Spring Boot backend
```bash
mvn spring-boot:run
```
Backend will start at: `http://localhost:8080`

### Step 3 — Open the frontend
Open `frontend/index.html` directly in your browser.

> No separate server needed for the frontend — it runs as a static HTML file.

### Step 4 — Use the application
1. Go to the **Input** tab
2. Add orders (customer name, restaurant node, delivery node, deadline)
3. Add agents (name, starting node)
4. Click **Run Optimizer**
5. View results in the **Results** tab
6. Check **Dashboard** for summary metrics
7. Use **City Graph** tab to visualize shortest paths

---

## 📡 API Reference

### `POST /api/run`

Runs the scheduling simulation with user-provided orders and agents.

**Request Body:**
```json
{
  "orders": [
    {
      "orderId": 1,
      "customerName": "Rahul Sharma",
      "restaurantNode": 0,
      "deliveryNode": 5,
      "deadline": 20,
      "orderValue": 350
    }
  ],
  "agents": [
    {
      "agentId": 101,
      "agentName": "Ravi Desai",
      "currentNode": 0
    }
  ]
}
```

**Response:**
```json
[
  {
    "orderId": 1,
    "customerName": "Rahul Sharma",
    "agentId": 101,
    "agentName": "Ravi Desai",
    "startTime": 0,
    "finishTime": 13,
    "deadline": 20,
    "distToRestaurant": 0,
    "distToDelivery": 13,
    "status": "ON TIME"
  }
]
```

**Status values:** `ON TIME` | `LATE` | `UNDELIVERABLE`

---

## 📊 Sample Output

```
Order 1 (Rahul Sharma) → Agent Ravi Desai
  Start: 0 | Finish: 13 | Deadline: 20 → ✅ ON TIME

Order 2 (Priya Singh) → Agent Sonal Mehta  
  Start: 0 | Finish: 18 | Deadline: 15 → ❌ LATE
```

---

## 👨‍💻 Author

**Shaurya Sati**  
GitHub: [@Shaurya-Sati](https://github.com/Shaurya-Sati)
