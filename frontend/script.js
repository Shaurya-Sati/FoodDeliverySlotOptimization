/* ============================================================
   Food Delivery Optimization System — script.js
   Plain JavaScript only — no frameworks
   ============================================================ */

/* ======================================================
   1. DATA
   ====================================================== */

const nodes = [
    { id:0, name:"Restaurant A",   type:"restaurant",   x:120, y:80  },
    { id:1, name:"Restaurant B",   type:"restaurant",   x:420, y:70  },
    { id:2, name:"Intersection 1", type:"intersection", x:260, y:180 },
    { id:3, name:"Intersection 2", type:"intersection", x:380, y:280 },
    { id:4, name:"Customer 1",     type:"customer",     x:100, y:300 },
    { id:5, name:"Customer 2",     type:"customer",     x:240, y:360 },
    { id:6, name:"Customer 3",     type:"customer",     x:440, y:380 },
    { id:7, name:"Customer 4",     type:"customer",     x:560, y:200 },
];

const edges = [
    [0,2,5],[0,4,9],[1,2,6],[1,7,4],[2,3,7],
    [2,4,8],[2,5,5],[3,5,6],[3,6,4],[3,7,9],
    [1,3,11],[4,5,7],[5,6,6],[6,7,8],
];

const orders = [
    { id:"ORD-001", customer:"Arun Sharma",    restaurant:"Restaurant A", deadline:"12:30 PM", priority:"High",   status:"In Progress", agent:"Rahul K."   },
    { id:"ORD-002", customer:"Priya Singh",    restaurant:"Restaurant B", deadline:"12:45 PM", priority:"High",   status:"Pending",     agent:"Unassigned" },
    { id:"ORD-003", customer:"Vikram Nair",    restaurant:"Restaurant A", deadline:"1:00 PM",  priority:"Medium", status:"Delivered",   agent:"Sonal M."   },
    { id:"ORD-004", customer:"Neha Patel",     restaurant:"Restaurant B", deadline:"1:15 PM",  priority:"Low",    status:"Delivered",   agent:"Amit D."    },
    { id:"ORD-005", customer:"Ravi Tiwari",    restaurant:"Restaurant A", deadline:"12:20 PM", priority:"High",   status:"In Progress", agent:"Deepa R."   },
    { id:"ORD-006", customer:"Sneha Kapoor",   restaurant:"Restaurant B", deadline:"1:30 PM",  priority:"Medium", status:"Pending",     agent:"Unassigned" },
    { id:"ORD-007", customer:"Manish Gupta",   restaurant:"Restaurant A", deadline:"1:45 PM",  priority:"Low",    status:"Delivered",   agent:"Rahul K."   },
    { id:"ORD-008", customer:"Divya Menon",    restaurant:"Restaurant B", deadline:"12:50 PM", priority:"High",   status:"Pending",     agent:"Unassigned" },
    { id:"ORD-009", customer:"Suresh Iyer",    restaurant:"Restaurant A", deadline:"2:00 PM",  priority:"Medium", status:"Delivered",   agent:"Sonal M."   },
    { id:"ORD-010", customer:"Kavitha Rao",    restaurant:"Restaurant B", deadline:"2:15 PM",  priority:"Low",    status:"Pending",     agent:"Unassigned" },
    { id:"ORD-011", customer:"Ankit Joshi",    restaurant:"Restaurant A", deadline:"12:10 PM", priority:"High",   status:"In Progress", agent:"Amit D."    },
    { id:"ORD-012", customer:"Pooja Verma",    restaurant:"Restaurant B", deadline:"3:00 PM",  priority:"Low",    status:"Delivered",   agent:"Deepa R."   },
];

const agents = [
    { id:"AGT-01", name:"Rahul Kumar",   status:"Busy",      order:"ORD-001", rating:4.8, deliveries:134 },
    { id:"AGT-02", name:"Sonal Mehta",   status:"Available", order:"—",       rating:4.9, deliveries:98  },
    { id:"AGT-03", name:"Amit Desai",    status:"Busy",      order:"ORD-011", rating:4.7, deliveries:212 },
    { id:"AGT-04", name:"Deepa Rao",     status:"Busy",      order:"ORD-005", rating:4.6, deliveries:87  },
    { id:"AGT-05", name:"Nikhil Sharma", status:"Available", order:"—",       rating:4.5, deliveries:61  },
    { id:"AGT-06", name:"Preethi Nair",  status:"Available", order:"—",       rating:4.9, deliveries:176 },
];

const activities = [
    { msg:"ORD-001 picked up from Restaurant A", time:"2 min ago",  color:"#FF6B35" },
    { msg:"ORD-011 is now In Progress",          time:"5 min ago",  color:"#3B82F6" },
    { msg:"ORD-003 delivered to Vikram Nair",    time:"12 min ago", color:"#10B981" },
    { msg:"ORD-005 assigned to Deepa Rao",       time:"15 min ago", color:"#FF6B35" },
    { msg:"ORD-004 delivered to Neha Patel",     time:"22 min ago", color:"#10B981" },
    { msg:"ORD-007 delivered to Manish Gupta",   time:"30 min ago", color:"#10B981" },
];

/* ======================================================
   2. NAVIGATION  ← THE KEY FIX
   ====================================================== */

function showSection(name) {
    /* Hide every section */
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    /* Remove active from every nav button */
    var btns = document.querySelectorAll('.nav-btn');
    for (var j = 0; j < btns.length; j++) {
        btns[j].classList.remove('active');
    }
    /* Show the right section */
    document.getElementById('sec-' + name).classList.add('active');
    /* Highlight the right button */
    document.getElementById('btn-' + name).classList.add('active');
    /* Draw graph when its tab opens */
    if (name === 'graph') {
        setTimeout(drawGraph, 150);
    }
}

/* ======================================================
   3. DASHBOARD
   ====================================================== */

function renderDashboard() {
    document.getElementById('stat-total').textContent     = orders.length;
    document.getElementById('stat-delivered').textContent = orders.filter(function(o){ return o.status === 'Delivered'; }).length;
    document.getElementById('stat-agents').textContent    = agents.filter(function(a){ return a.status === 'Busy'; }).length;

    /* Activity feed */
    var feed = document.getElementById('activity-feed');
    var html = '';
    for (var i = 0; i < activities.length; i++) {
        var a = activities[i];
        html += '<div class="activity-item">'
            + '<div class="activity-dot" style="background:' + a.color + '"></div>'
            + '<div style="flex:1">' + a.msg + '</div>'
            + '<div class="activity-time">' + a.time + '</div>'
            + '</div>';
    }
    feed.innerHTML = html;

    /* Urgent orders */
    var urgent = orders.filter(function(o){ return o.priority === 'High' && o.status !== 'Delivered'; });
    var uList = document.getElementById('urgent-list');
    var uHtml = '';
    for (var k = 0; k < urgent.length; k++) {
        var o = urgent[k];
        var cls = o.status === 'In Progress' ? 'badge-progress' : 'badge-pending';
        uHtml += '<li class="urgent-item">'
            + '<div><strong>' + o.id + '</strong> <span style="color:#6b7280;font-size:13px">' + o.customer + '</span></div>'
            + '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:12px;color:#9ca3af">' + o.deadline + '</span>'
            + '<span class="' + cls + '">' + o.status + '</span></div>'
            + '</li>';
    }
    uList.innerHTML = uHtml;
}

/* ======================================================
   4. ORDERS TABLE
   ====================================================== */

function renderOrders() {
    var sf = document.getElementById('filterStatus').value;
    var pf = document.getElementById('filterPriority').value;

    var filtered = orders.filter(function(o){
        return (sf === 'all' || o.status === sf) && (pf === 'all' || o.priority === pf);
    });

    var pMap = { High:'badge-high', Medium:'badge-medium', Low:'badge-low' };
    var sMap = { Pending:'badge-pending', 'In Progress':'badge-progress', Delivered:'badge-delivered' };

    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var o = filtered[i];
        html += '<tr>'
            + '<td class="ps-3" style="font-weight:600;color:#FF6B35">' + o.id + '</td>'
            + '<td>' + o.customer + '</td>'
            + '<td><i class="bi bi-shop" style="color:#9ca3af"></i> ' + o.restaurant + '</td>'
            + '<td><i class="bi bi-alarm" style="color:#9ca3af"></i> ' + o.deadline + '</td>'
            + '<td><span class="' + pMap[o.priority] + '">' + o.priority + '</span></td>'
            + '<td><span class="' + sMap[o.status]   + '">' + o.status   + '</span></td>'
            + '<td class="pe-3" style="color:#9ca3af;font-size:13px">' + o.agent + '</td>'
            + '</tr>';
    }
    document.getElementById('ordersBody').innerHTML = html;
}

/* ======================================================
   5. AGENTS GRID
   ====================================================== */

function renderAgents() {
    var colors = ['#FF6B35','#3B82F6','#10B981','#8B5CF6','#F59E0B','#EF4444'];
    var grid = document.getElementById('agentsGrid');
    var html = '';
    for (var i = 0; i < agents.length; i++) {
        var a = agents[i];
        var initials = a.name.split(' ').map(function(w){ return w[0]; }).join('');
        var statusBadge = a.status === 'Available'
            ? '<span class="badge-available">Available</span>'
            : '<span class="badge-busy">Busy</span>';
        var orderLine = a.status === 'Busy'
            ? '<div style="font-size:13px;margin-top:4px"><i class="bi bi-bag" style="color:#FF6B35"></i> Current: <strong style="color:#FF6B35">' + a.order + '</strong></div>'
            : '<div style="font-size:13px;color:#10B981;margin-top:4px"><i class="bi bi-check-circle"></i> Ready for next order</div>';

        html += '<div class="agent-card">'
            + '<div class="agent-avatar" style="background:' + colors[i % colors.length] + '">' + initials + '</div>'
            + '<div style="flex:1;min-width:0">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">'
            + '<div class="agent-name">' + a.name + '</div>' + statusBadge + '</div>'
            + '<div class="agent-id">' + a.id + '</div>'
            + '<div class="agent-meta">'
            + '<span><i class="bi bi-star-fill" style="color:#F59E0B"></i> ' + a.rating + '</span>'
            + '<span><i class="bi bi-box-seam"></i> ' + a.deliveries + ' deliveries</span>'
            + '</div>'
            + orderLine
            + '</div></div>';
    }
    grid.innerHTML = html;
}

/* ======================================================
   6. GRAPH — populate dropdowns
   ====================================================== */

function populateDropdowns() {
    var s = document.getElementById('startNode');
    var e = document.getElementById('endNode');
    for (var i = 0; i < nodes.length; i++) {
        s.innerHTML += '<option value="' + nodes[i].id + '">' + nodes[i].name + '</option>';
        e.innerHTML += '<option value="' + nodes[i].id + '">' + nodes[i].name + '</option>';
    }
    e.value = '6'; // default destination = Customer 3
}

/* ======================================================
   7. DIJKSTRA'S ALGORITHM
   ====================================================== */

function buildAdj() {
    var map = {};
    for (var i = 0; i < nodes.length; i++) map[nodes[i].id] = [];
    for (var j = 0; j < edges.length; j++) {
        var a = edges[j][0], b = edges[j][1], w = edges[j][2];
        map[a].push({ to:b, w:w });
        map[b].push({ to:a, w:w });
    }
    return map;
}

function dijkstra(start, end) {
    var adj     = buildAdj();
    var dist    = {};
    var prev    = {};
    var visited = {};

    for (var i = 0; i < nodes.length; i++) {
        dist[nodes[i].id] = Infinity;
        prev[nodes[i].id] = null;
    }
    dist[start] = 0;

    var queue = [{ id:start, cost:0 }];

    while (queue.length > 0) {
        queue.sort(function(a,b){ return a.cost - b.cost; });
        var curr = queue.shift();
        var u    = curr.id;

        if (visited[u]) continue;
        visited[u] = true;
        if (u === end) break;

        var neighbors = adj[u];
        for (var k = 0; k < neighbors.length; k++) {
            var nb  = neighbors[k];
            var alt = dist[u] + nb.w;
            if (!visited[nb.to] && alt < dist[nb.to]) {
                dist[nb.to] = alt;
                prev[nb.to] = u;
                queue.push({ id:nb.to, cost:alt });
            }
        }
    }

    /* Reconstruct */
    var path = [];
    var c    = end;
    while (c !== null) {
        path.unshift(c);
        c = prev[c];
    }
    if (path[0] !== start) return { path:[], dist:Infinity };
    return { path:path, dist:dist[end] };
}

/* ======================================================
   8. CANVAS — draw graph
   ====================================================== */

var shortestPath = [];

function drawGraph() {
    var canvas = document.getElementById('cityGraph');
    var ctx    = canvas.getContext('2d');
    var W      = canvas.parentElement.clientWidth - 16;
    var H      = Math.min(Math.round(W * 0.72), 430);
    canvas.width  = W;
    canvas.height = H;

    var sx = W / 640;
    var sy = H / 470;

    function px(x){ return x * sx; }
    function py(y){ return y * sy; }

    function onPath(a, b) {
        for (var i = 0; i < shortestPath.length - 1; i++) {
            if ((shortestPath[i]===a && shortestPath[i+1]===b) ||
                (shortestPath[i]===b && shortestPath[i+1]===a)) return true;
        }
        return false;
    }

    ctx.clearRect(0, 0, W, H);

    /* Draw edges */
    for (var e = 0; e < edges.length; e++) {
        var na = nodes[edges[e][0]], nb = nodes[edges[e][1]], w = edges[e][2];
        var isP = onPath(edges[e][0], edges[e][1]);
        ctx.beginPath();
        ctx.moveTo(px(na.x), py(na.y));
        ctx.lineTo(px(nb.x), py(nb.y));
        ctx.strokeStyle = isP ? '#EF4444' : '#d1d5db';
        ctx.lineWidth   = isP ? 3 : 1.5;
        ctx.shadowBlur  = isP ? 8 : 0;
        ctx.shadowColor = '#EF4444';
        ctx.stroke();
        ctx.shadowBlur  = 0;

        /* Weight label */
        var mx = (px(na.x) + px(nb.x)) / 2;
        var my = (py(na.y) + py(nb.y)) / 2;
        ctx.fillStyle    = isP ? '#EF4444' : '#9ca3af';
        ctx.font         = (isP ? 'bold ' : '') + Math.max(10, Math.round(11 * Math.min(sx,sy))) + 'px Segoe UI, sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(w + 'm', mx, my - 7);
    }

    /* Draw nodes */
    var colorMap = { restaurant:'#FF6B35', customer:'#3B82F6', intersection:'#10B981' };
    var R = Math.max(16, Math.round(21 * Math.min(sx, sy)));

    for (var n = 0; n < nodes.length; n++) {
        var nd  = nodes[n];
        var cx  = px(nd.x), cy = py(nd.y);
        var isOnPath = shortestPath.indexOf(nd.id) !== -1;

        /* Glow ring */
        if (isOnPath) {
            ctx.beginPath();
            ctx.arc(cx, cy, R + 7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239,68,68,0.15)';
            ctx.fill();
        }

        /* Circle fill */
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle   = isOnPath ? '#EF4444' : colorMap[nd.type];
        ctx.shadowColor = isOnPath ? '#EF4444' : colorMap[nd.type];
        ctx.shadowBlur  = isOnPath ? 12 : 5;
        ctx.fill();
        ctx.shadowBlur  = 0;

        /* White border */
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth   = 2.5;
        ctx.stroke();

        /* Initial letter */
        ctx.fillStyle    = 'white';
        ctx.font         = 'bold ' + Math.max(10, Math.round(13 * Math.min(sx,sy))) + 'px Segoe UI, sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nd.name[0], cx, cy);

        /* Label below node */
        var fs = Math.max(9, Math.round(10.5 * Math.min(sx,sy)));
        ctx.font         = (isOnPath ? 'bold ' : '') + fs + 'px Segoe UI, sans-serif';
        ctx.fillStyle    = isOnPath ? '#EF4444' : '#374151';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(nd.name, cx, cy + R + 4);
    }
}

window.addEventListener('resize', function(){
    if (document.getElementById('sec-graph').classList.contains('active')) drawGraph();
});

/* ======================================================
   9. FIND PATH BUTTON
   ====================================================== */

function findPath() {
    var start = parseInt(document.getElementById('startNode').value);
    var end   = parseInt(document.getElementById('endNode').value);

    if (start === end) {
        alert('Please select two different locations!');
        return;
    }

    var result = dijkstra(start, end);
    shortestPath = result.path;
    drawGraph();

    var content = document.getElementById('routeResultContent');

    if (!result.path || result.path.length === 0) {
        content.innerHTML = '<p style="color:#ef4444">No path found between these locations.</p>';
        return;
    }

    /* Build route steps */
    var steps = '';
    for (var i = 0; i < result.path.length; i++) {
        steps += '<span class="route-step">' + nodes[result.path[i]].name + '</span>';
        if (i < result.path.length - 1) steps += '<span class="route-arrow">→</span>';
    }

    var estTime = Math.round(result.dist * 1.1);

    content.innerHTML =
        '<p style="font-size:13px;font-weight:600;color:#9ca3af;margin-bottom:8px">Route:</p>'
        + '<div style="margin-bottom:14px;line-height:2">' + steps + '</div>'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">'
        + '<div class="result-box"><div class="val">' + result.dist + ' min</div><div class="lbl">Total Distance</div></div>'
        + '<div class="result-box"><div class="val">' + (result.path.length-1) + ' stops</div><div class="lbl">Road Segments</div></div>'
        + '</div>'
        + '<div style="background:#f8f7f5;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;font-size:13px">'
        + '<i class="bi bi-clock" style="color:#FF6B35"></i>'
        + '<span style="color:#6b7280">Estimated delivery: <strong>~' + estTime + ' min</strong></span>'
        + '</div>';
}

/* ======================================================
   10. INIT
   ====================================================== */

window.onload = function() {
    renderDashboard();
    renderOrders();
    renderAgents();
    populateDropdowns();
};