package com.project.scheduler;

import com.project.model.Order;
import com.project.model.Agent;
import com.project.graph.Graph;
import com.project.graph.Dijkstra;

import java.util.*;

// Helper class
class AgentStatus implements Comparable<AgentStatus> {

    Agent agent;
    int availableTime;

    AgentStatus(Agent agent) {
        this.agent = agent;
        this.availableTime = 0;
    }

    @Override
    public int compareTo(AgentStatus other) {
        return this.availableTime - other.availableTime;
    }
}

public class Scheduler {

    public List<String> assignOrders(List<Order> orders, List<Agent> agents, Graph graph) {

        List<String> result = new ArrayList<>();
        Dijkstra dijkstra = new Dijkstra();

        // STEP 1: Sort orders by deadline
        Collections.sort(orders, (a, b) -> a.getDeadline() - b.getDeadline());

        // STEP 2: Priority Queue for agents
        PriorityQueue<AgentStatus> pq = new PriorityQueue<>();

        for (Agent a : agents) {
            pq.add(new AgentStatus(a));
        }

        // STEP 3: Assign orders
        for (Order o : orders) {

            AgentStatus current = pq.poll();
            Agent agent = current.agent;

            // 🔥 REAL DISTANCES using Dijkstra
            int toRestaurant = dijkstra.getShortestDistance(
                    graph,
                    agent.getCurrentNode(),
                    o.getRestaurantNode()
            );

            int toDelivery = dijkstra.getShortestDistance(
                    graph,
                    o.getRestaurantNode(),
                    o.getDeliveryNode()
            );

            int totalDistance = toRestaurant + toDelivery;

            int startTime = current.availableTime;
            int finishTime = startTime + totalDistance;

            String status = (finishTime <= o.getDeadline()) ? "ON TIME" : "LATE";

            String output = "Order " + o.getOrderId()
                    + " → Agent " + agent.getAgentId()
                    + " | Start: " + startTime
                    + " | Finish: " + finishTime
                    + " | Deadline: " + o.getDeadline()
                    + " | " + status;

            result.add(output);

            // 🔥 Update agent
            current.availableTime = finishTime;
            agent.setCurrentNode(o.getDeliveryNode());

            pq.add(current);
        }

        return result;
    }
}