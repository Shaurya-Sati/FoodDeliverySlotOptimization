package com.project.graph;

import java.util.*;

public class Dijkstra {

    // Method to find shortest path from source
    public void shortestPath(Graph graph, int source) {

        int V = graph.getVertices();

        // Distance array
        int[] dist = new int[V];

        // Fill distances with infinity
        Arrays.fill(dist, Integer.MAX_VALUE);

        // Distance to source is 0
        dist[source] = 0;

        // Min Heap (Priority Queue)
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));

        // Add source
        pq.add(new int[]{source, 0});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            int currentDist = current[1];

            // Explore neighbors
            for (Graph.Edge edge : graph.getNeighbors(node)) {
                int neighbor = edge.destination;
                int weight = edge.weight;

                // Relaxation step
                if (currentDist + weight < dist[neighbor]) {
                    dist[neighbor] = currentDist + weight;
                    pq.add(new int[]{neighbor, dist[neighbor]});
                }
            }
        }

        // Print result
        System.out.println("Shortest distances from source " + source + ":");
        for (int i = 0; i < V; i++) {
            System.out.println("To node " + i + " -> " + dist[i]);
        }
    }
}