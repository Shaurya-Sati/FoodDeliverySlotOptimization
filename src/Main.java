import com.project.graph.Graph;
import com.project.scheduler.Scheduler;
import com.project.model.Order;
import com.project.model.Agent;

import java.util.*;

public class Main {
    public static void main(String[] args) {

        Graph g = new Graph(5);

        g.addEdge(0,1,10);
        g.addEdge(0,2,5);
        g.addEdge(1,3,1);
        g.addEdge(2,3,9);
        g.addEdge(3,4,4);

        List<Order> orders = new ArrayList<>();
        orders.add(new Order(1, "A", 0, 4, 20, 500));
        orders.add(new Order(2, "B", 1, 3, 15, 300));

        List<Agent> agents = new ArrayList<>();
        agents.add(new Agent(1,"Agent1",0));
        agents.add(new Agent(2,"Agent2",2));

        Scheduler scheduler = new Scheduler();
        List<String> result = scheduler.assignOrders(orders, agents, g);

        for(String r : result){
            System.out.println(r);
        }
    }
}