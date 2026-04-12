package com.project.graph;

import java.util.*;

public class Dijkstra {

    static class Pair {
        int node;
        int distance;

        Pair(int node, int distance) {
            this.node = node;
            this.distance = distance;
        }
    }

    public int getShortestDistance(Graph g, int src, int dest) {

        int V = g.getVertices();
        List<List<Graph.Edge>> adj = g.getAdjList();

        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);

        PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a.distance));

        dist[src] = 0;
        pq.add(new Pair(src, 0));

        while (!pq.isEmpty()) {
            Pair current = pq.poll();

            int u = current.node;

            for (Graph.Edge edge : adj.get(u)) {
                int v = edge.destination;
                int weight = edge.weight;

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new Pair(v, dist[v]));
                }
            }
        }

        return dist[dest];
    }
}