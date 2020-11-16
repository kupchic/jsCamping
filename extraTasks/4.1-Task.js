class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.root = null;
    this._length = 1;
  }

  addNode(value, index) {
    if (index <= 0 || index > this._length) {
      return false;
    }
    let currentNode = this.root;
    let node = new Node(value);
    if (!currentNode) {
      this.root = node;
      return true;
    }

    for (let i = 0; i < this._length - 1; i++) {
      if (index - 1 === i) {
        break;
      }
      currentNode = currentNode.next;
    }

    if (index !== undefined) {
      node.next = currentNode.next;
    }
    currentNode.next = node;
    this._length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index > this._length) {
      return false;
    }
    let currentNode = this.root;
    let previousNode;
    if (index === 0) {
      this.root = currentNode.next;
      this._length--;
      return true;
    }
    for (let i = 0; i < this._length - 1; i++) {
      if (index - 1 === i) {
        break;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    previousNode.next = currentNode.next;
    this._length--;
    return true;

  }

  print() {
    let currentNode = this.root;
    let arr = [];
    while (currentNode.next) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    arr.push(currentNode.value);
    console.log(this._length);
    return arr;
  }

}

let list = new List();

list.addNode('q');
list.addNode('w');
list.addNode('е');
list.addNode('r');
list.addNode('t', 6);
list.addNode('t', 5);
list.addNode('t', 1);
list.addNode('y');
list.remove(0);
list.remove(3);
list.remove(7);
list.remove(5);


console.log('list.print(): ', list.print());