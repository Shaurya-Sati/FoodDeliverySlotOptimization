package com.project.model;

public class Order {
    private int orderId;
    private String customerName;
    private int restaurantNode;
    private int deliveryNode;
    private int deadline;
    private int orderValue;

    public Order(int orderId, String customerName, int restaurantNode, int deliveryNode, int deadline, int orderValue) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.restaurantNode = restaurantNode;
        this.deliveryNode = deliveryNode;
        this.deadline = deadline;
        this.orderValue = orderValue;
    }

    public int getOrderId() {
        return orderId;
    }
    public String getCustomerName() {
        return customerName;
    }
    public int getRestaurantNode() {
        return restaurantNode;
    }
    public int getDeliveryNode() {
        return deliveryNode;
    }
    public int getDeadline() {
        return deadline;
    }
    public int getOrderValue() {
        return orderValue;
    }
}
