// https://openprocessing.org/sketch/1968674

/**
 * -- Cut Here --
 * For #WCChallenge << Nodes >> (join the discord! https://discord.gg/S8c7qcjw2b)
 *
 * This sketch was me learning and playing with the space-colonization algorithm
 * https://medium.com/@jason.webb/space-colonization-algorithm-in-javascript-6f683b743dc5
 * This is a modified version that also includes random "exploration" (branches can grow even without
 * attractors under some circumstances), and "looping" (branches can attach to existing nodes)
 * Also used some spatial indexing (https://www.gorillasun.de/blog/particle-system-optimization-grid-lookup-spatial-hashing/)
 * and clipping for the final framing
 */

let NUM_NODES = 10000; // Total "attractors"
let ATTRACTION_DISTANCE = 50; // Distance in which branches are influenced
let KILL_DISTANCE = 30; // Distance in which attractors are killed if too close to a branch
let SEGMENT_LENGTH = 20; // Grow segment length
let EXPLORE_CHANCE = 1; // Chance to continue growing a leaf node if no attractor is present. Lower number means more open tree (i.e. fewer loops)
let SIBLING_DISTANCE = 10; // Min distance between two nodes for them to "loop". Lower number results in shorter loops
let MIN_NODE_DISTANCE = 10; // Min space required between nodes
let RANDOM_ANGLE_ROTATION = Math.PI / 4; // Random angle in which growing nodes are rotated. Higher number means more jagged lines
let BATCH_SIZE = 1; // Steps per draw cycle

// Auxiliary variables
let ATTRACTION_DISTANCE_2 = ATTRACTION_DISTANCE ** 2;
let KILL_DISTANCE_2 = KILL_DISTANCE ** 2;
let CELL_SIZE = ATTRACTION_DISTANCE / 2;

let cw, ch;
let tree, gen;
let done = false;

function setup() {
  cw = windowWidth;
  ch = windowHeight;
  createCanvas(cw, ch);
  regenerate();
  tree = new Tree();
  gen = inChunks(tree.grow(), 3);
}

function regenerate() {
  tree = new Tree();
  gen = inChunks(tree.grow(), BATCH_SIZE);
  done = false;
}

function draw() {
  background("#ebedec");
  drawingContext.save();
  strokeWeight(4);
  drawingContext.setLineDash([15, 10]);
  rect(cw * 0.1, ch * 0.1, cw * 0.8, ch * 0.8, min(cw * 0.05, ch * 0.05));
  drawingContext.clip();
  drawingContext.setLineDash([10, 8]);
  tree.draw();
  if (!done) {
    done = gen.next().done;
  }
  drawingContext.restore();
}

function mouseClicked() {
  regenerate();
}

function touchEnded() {
  regenerate();
}

class Grid {
  constructor(i, t, s) {
    (this.cellSize = s),
      (this.numCols = Math.ceil(i / s)),
      (this.numRows = Math.ceil(t / s)),
      (this.cells = []);
    for (let e = 0; e < this.numCols; e++) {
      this.cells[e] = [];
      for (let l = 0; l < this.numRows; l++) {
        this.cells[e][l] = [];
      }
    }
  }

  insert(i) {
    let t = Math.floor(i.pos.x / this.cellSize);
    let s = Math.floor(i.pos.y / this.cellSize);

    this.cells[t][s].push(i);
    i.gridCell = {
      col: t,
      row: s,
    };
  }

  getNeighborhood(pos, radius, particle = null) {
    let top_left = [
      floor((pos.x - radius) / this.cellSize),
      floor((pos.y - radius) / this.cellSize),
    ];

    let bottom_right = [
      floor((pos.x + radius) / this.cellSize),
      floor((pos.y + radius) / this.cellSize),
    ];

    let neighbors = [];
    for (let i = top_left[0]; i <= bottom_right[0]; i++) {
      for (let j = top_left[1]; j <= bottom_right[1]; j++) {
        if (i < 0 || j < 0 || i >= this.numCols || j >= this.numRows) continue;
        let c = this.cells[i][j];
        for (let p of c) {
          if (p != particle) neighbors.push(p);
        }
      }
    }
    return neighbors;
  }
}

class Attractor {
  constructor(pos) {
    this.pos = pos;
    this.reached = false; // Update to counter
  }
}
class Node {
  constructor(parent, pos, dir) {
    this.parent = parent;
    this.pos = pos;
    this.dir = dir;
    this.originalDir = dir.copy();
    this.count = 0;
    this.len = SEGMENT_LENGTH;
    this.thickness = 0.5;
    this.children = [];
  }

  reset() {
    this.dir = this.originalDir.copy();
    this.count = 0;
  }

  next() {
    this.dir.normalize();
    let nextDir = p5.Vector.mult(this.dir, this.len);
    nextDir.rotate(random(-RANDOM_ANGLE_ROTATION, RANDOM_ANGLE_ROTATION));

    let nextPos = p5.Vector.add(this.pos, nextDir);
    let nextBranch = new Node(this, nextPos, this.dir.copy());
    return nextBranch;
  }

  isWithinBranch(other) {
    if (this.parent === null) {
      return false;
    }
    return this.parent === other || this.parent.isWithinBranch(other);
  }

  isRelativeSibling(other, n) {
    let parents = [];
    let current = this;
    for (let i = 0; i < n; i++) {
      if (current.parent) {
        parents.push(current.parent);
        current = current.parent;
      }
    }
    current = other;
    for (let i = 0; i < n; i++) {
      if (parents.includes(current)) {
        return true;
      }
      if (current.parent) {
        current = current.parent;
      }
    }
    return false;
  }

  drawChain(nodes) {
    strokeWeight(2);
    stroke(0);
    noFill();
    beginShape();
    curveVertex(nodes[0].pos.x, nodes[0].pos.y);
    for (let node of nodes) {
      curveVertex(node.pos.x, node.pos.y);
    }
    curveVertex(nodes[nodes.length - 1].pos.x, nodes[nodes.length - 1].pos.y);
    endShape();
  }

  drawRoot() {
    if (this.children.length > 1) {
      for (let child of this.children) {
        this.drawChain([this, child]);
        child.drawRoot();
      }
    } else {
      let nodes = [];
      let current = this;
      while (current && current.children.length === 1) {
        nodes.push(current);
        current = current.children[0];
      }
      if (current) {
        nodes.push(current);
      }
      if (nodes.length > 0) {
        this.drawChain(nodes);
      }

      if (current !== this) {
        current.drawRoot();
      }
    }
  }

  draw() {
    if (this.parent === null) {
      this.drawRoot();
    }
  }
}

class Tree {
  constructor() {
    this.nodes = []; // Branches
    this.attractors = []; // Leaves
    this.grid = new Grid(cw, ch, CELL_SIZE);
    let mx = cw * 0.05,
      my = ch * 0.05;
    for (let i = 0; i < NUM_NODES; i++) {
      let pos = createVector(
        mx + random(cw - 2 * mx),
        my + random(ch - 2 * my)
      );
      this.attractors.push(new Attractor(pos));
    }
    let initialPos = createVector(
      random(cw / 4, (cw * 3) / 4),
      random(ch / 4, (ch * 3) / 4)
    );
    let dir = createVector(1, 0);
    let rootNode = new Node(null, initialPos, dir);

    this.addNode(rootNode);
    this.nodesAdded = 0;
    this.done = false;
  }

  addNode(node, parent = null) {
    this.grid.insert(node);
    this.nodes.push(node);
    if (parent) {
      parent.children.push(node);
    }
    this.nodesAdded++;
  }

  *grow() {
    while (!this.done) {
      this.nodesAdded = 0;
      // Step 1. Determine which attractors influence nodes, and pick the closest one
      for (let attractor of this.attractors) {
        let closestNode = null;
        let record = ATTRACTION_DISTANCE_2;
        for (let [node, distance] of this.closeNodes(attractor)) {
          if (node.rejoined) {
            continue;
          }
          if (distance <= KILL_DISTANCE_2) {
            attractor.reached = true;
            closestNode = null;
            break;
          } else if (distance < record) {
            closestNode = node;
            record = distance;
          }
        }
        if (closestNode !== null) {
          let newDir = p5.Vector.sub(attractor.pos, closestNode.pos);
          newDir.normalize();
          closestNode.dir.add(newDir);
          closestNode.count++;
        }
      }
      // Step 2. For each node, calculate the average direction using all attractors influencing it
      for (let node of this.nodes) {
        node.frameCount ||= 0;
        node.frameCount++;
        if (node.count > 0) {
          node.dir.div(node.count + 1);
          let newNode = node.next();
          // Step 3 - Create the node
          if (this.isValid(newNode.pos)) {
            this.addNode(newNode, node);
            node.reset();
            node.fresh = true;
          }
          // Step 2.1 - If the node is not being influenced and is a leaf node, "explore" in a random direction
        } else if (
          node.children.length === 0 &&
          !node.fresh &&
          !node.rejoined
        ) {
          if (random() < EXPLORE_CHANCE) {
            node.dir.rotate(random(-PI / 4, PI / 4));
            let created = false;
            let closeNodes = [...this.closeNodes(node, KILL_DISTANCE / 2)];
            let closestWithinKillDistance = null;
            let closestDistance = KILL_DISTANCE_2 / 2;
            for (let [n, distance] of closeNodes) {
              if (
                node === n ||
                n.fresh ||
                node.isWithinBranch(n) ||
                node.isRelativeSibling(n, SIBLING_DISTANCE)
              ) {
                continue;
              }
              if (distance < closestDistance) {
                closestWithinKillDistance = n;
                closestDistance = distance;
              }
            }
            // Step 2.2 - If the node is close to an existing node, and is not a relative sibling, "join" the node to create a loop
            if (closestWithinKillDistance) {
              created = true;
              let newNode = new Node(
                node,
                closestWithinKillDistance.pos.copy(),
                closestWithinKillDistance.dir.copy()
              );
              newNode.dir.normalize();
              this.addNode(newNode, node);
              node.rejoined = true;
              newNode.rejoined = true;
            }
            // Else, just pick a random direction and continue growing
            if (!created) {
              node.dir.rotate(random(-PI / 6, PI / 6));
              let newNode = node.next();
              if (this.isValid(newNode.pos)) {
                this.addNode(newNode, node);
                node.fresh = true;
                node.reset();
              }
            }
          }
        }
      }
      // Step 3. Remove attractors that were determined within the kill zone of a node
      this.attractors = this.attractors.filter((a) => !a.reached);
      for (let node of this.nodes) {
        node.fresh = false;
      }
      if (this.nodesAdded === 0 || this.attractors.length === 0) {
        this.done = true;
      }
      yield (this.nodes.length, this.attractors.length);
    }
  }

  *closeNodes(attractor) {
    let neighborhood = this.grid.getNeighborhood(
      attractor.pos,
      ATTRACTION_DISTANCE
    );
    for (let node of neighborhood) {
      let distance = squareDistance(node.pos, attractor.pos);
      if (distance <= ATTRACTION_DISTANCE_2) {
        yield [node, distance];
      }
    }
  }

  isValid(pos) {
    let min_distance_sq = MIN_NODE_DISTANCE ** 2;
    let isInBounds = pos.x > 0 && pos.x < cw && pos.y > 0 && pos.y < ch;
    let existsAlready = this.nodes.find(
      (n) => n.pos.x === pos.x && n.pos.y === n.pos.y
    );
    let areNodesTooClose = false;
    for (let node of this.grid.getNeighborhood(pos, min_distance_sq)) {
      let distance = squareDistance(pos, node.pos);
      if (node !== this && distance < min_distance_sq) {
        areNodesTooClose = true;
      }
    }
    return isInBounds && !existsAlready && !areNodesTooClose;
  }

  draw() {
    for (let node of this.nodes) {
      node.draw();
    }
  }
}

let squareDistance = (p1, p2) => {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
};

let inChunks = function* (generator, chunkSize) {
  let chunk = [];
  let p = generator.next();
  while (!p.done) {
    chunk.push(p.value);
    if (chunk.length === chunkSize) {
      yield chunk;
      chunk = [];
    }
    p = generator.next();
  }
  if (chunk.length > 0) {
    // Remaining
    yield chunk;
  }
};
