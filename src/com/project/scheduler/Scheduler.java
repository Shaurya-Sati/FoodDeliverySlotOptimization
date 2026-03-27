package com.project.scheduler;

import com.project.model.Order;
import com.project.model.Agent;

import java.util.*;

// Helper class to track agent availability
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

    public List<String> assignOrders(List<Order> orders, List<Agent> agents) {

        List<String> result = new ArrayList<>();

        // STEP 1: Sort orders by deadline (urgent first)
        Collections.sort(orders, (a, b) -> a.getDeadline() - b.getDeadline());

        // STEP 2: Create priority queue (earliest free agent first)
        PriorityQueue<AgentStatus> pq = new PriorityQueue<>();

        for (Agent a : agents) {
            pq.add(new AgentStatus(a));
        }

        // STEP 3: Assign orders
        for (Order o : orders) {

            AgentStatus current = pq.poll();

            // Temporary distance calculation (replace with Dijkstra later)
            int distance = Math.abs(o.getDeliveryNode() - o.getRestaurantNode());

            int startTime = current.availableTime;
            int finishTime = startTime + distance;

            String status;

            if (finishTime <= o.getDeadline()) {
                status = "ON TIME";
            } else {
                status = "LATE";
            }

            String output = "Order " + o.getOrderId()
                    + " → Agent " + current.agent.getAgentId()
                    + " | Start: " + startTime
                    + " | Finish: " + finishTime
                    + " | Deadline: " + o.getDeadline()
                    + " | " + status;

            result.add(output);

            // Update agent availability
            current.availableTime = finishTime;

            // Put back in queue
            pq.add(current);
        }

        return result;
    }
}