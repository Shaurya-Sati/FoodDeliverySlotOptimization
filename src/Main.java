import com.project.graph.Graph;
import com.project.graph.Dijkstra;

public class Main {
    public static void main(String[] args) {

        // Create graph with 5 nodes
        Graph g = new Graph(5);

        // Add edges (source, destination, weight)
        g.addEdge(0, 1, 10);
        g.addEdge(0, 2, 5);
        g.addEdge(1, 2, 2);
        g.addEdge(1, 3, 1);
        g.addEdge(2, 3, 9);
        g.addEdge(3, 4, 4);

        // Run Dijkstra
        Dijkstra d = new Dijkstra();
        d.shortestPath(g, 0);
        d.shortestPath(g, 2);
    }
}