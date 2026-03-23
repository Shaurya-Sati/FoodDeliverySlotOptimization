package com.project.graph;

import java.util.*;

public class Graph {

    private int vertices; // number of nodes
    private List<List<Edge>> adjList;

    // Edge class (inner class)
    public static class Edge {
        int destination;
        int weight; // distance or time

        public Edge(int destination, int weight) {
            this.destination = destination;
            this.weight = weight;
        }
    }

    // Constructor
    public Graph(int vertices) {
        this.vertices = vertices;
        adjList = new ArrayList<>();

        for (int i = 0; i < vertices; i++) {
            adjList.add(new ArrayList<>());
        }
    }

    // Add edge
    public void addEdge(int source, int destination, int weight) {
        adjList.get(source).add(new Edge(destination, weight));
        adjList.get(destination).add(new Edge(source, weight)); // undirected graph
    }

    // Get neighbors
    public List<Edge> getNeighbors(int node) {
        return adjList.get(node);
    }

    // Get total vertices
    public int getVertices() {
        return vertices;
    }
}