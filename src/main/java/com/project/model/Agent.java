package com.project.model;

public class Agent {
    private int agentId;
    private String agentName;
    private int currentNode;
    private boolean isAvailable;

    public Agent(int agentId, String agentName, int currentNode) {
        this.agentId = agentId;
        this.agentName = agentName;
        this.currentNode = currentNode;
        this.isAvailable = true;
    }

    public int getAgentId() {
        return agentId;
    }
    public String getAgentName() {
        return agentName;
    }
    public int getCurrentNode() {
        return currentNode;
    }
    public boolean isAvailable() {
        return isAvailable;
    }

    public void setCurrentNode(int currentNode) {
        this.currentNode = currentNode;
    }
    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
