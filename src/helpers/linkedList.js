const tail = Symbol('tail');

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this[tail] = null;
  }

  add(data) {
    const newNode = new Node(data);

    if (this[tail] === null) {
      newNode.next = newNode;
    } else {
      newNode.next = this[tail].next;
      this[tail].next = newNode;
    }
    this[tail] = newNode;
  }

  insertBefore(data, index) {
    const newNode = new Node(data);

    if (this[tail] === null) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    if (index === 0) {
      newNode.next = this[tail].next;
      this[tail].next = newNode;
    } else {
      let current = this[tail].next;
      let previous = null;
      let i = 0;

      while (current.next !== this[tail].next && i < index) {
        previous = current;
        current = current.next;
        i++;
      }

      if (i < index) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
      }

      previous.next = newNode;
      newNode.next = current;
    }
  }

  insertAfter(data, index) {
    const newNode = new Node(data);

    if (this[tail] === null) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    let current = this[tail].next;

    if (index > 0) {
      let i = 0;

      do {
        current = current.next;
        i++;
      } while (current !== this[tail] && i < index);

      if (i < index) {
        throw new RangeError(`Index ${index} does not exist in the list.`);
      }
    }

    newNode.next = current.next;
    current.next = newNode;

    if (current === this[tail]) {
      this[tail] = newNode;
    }
  }

  get(index) {
    if (index > -1 && this[tail] !== null) {
      let current = this[tail].next;
      let i = 0;

      do {
        if (i === index) {
          return current.data;
        }

        current = current.next;
        i++;
      } while (current !== this[tail].next && i <= index);
    }

    return undefined;
  }

  indexOf(data) {
    if (this[tail] === null) {
      return -1;
    }

    let current = this[tail].next;
    let index = 0;

    do {
      if (current.data === data) {
        return index;
      }

      current = current.next;
      index++;
    } while (current !== this[tail].next);

    return -1;
  }

  remove(index) {
    if (this[tail] === null) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    if (index < 0) {
      throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    let current = this[tail].next;

    if (index === 0) {
      if (current.next === this[tail]) {
        this[tail] = null;
      } else {
        this[tail].next = current.next;
      }

      return current.data;
    }

    let previous = null;
    let i = 0;

    do {
      previous = current;
      current = current.next;
      i++;
    } while (current !== this[tail].next && i < index);

    if (current !== this[tail].next) {
      previous.next = current.next;

      return current.data;
    }

    throw new RangeError(`Index ${index} does not exist in the list.`);
  }

  clear() {
    this[tail] = null;
  }

  get size() {
    if (this[tail] === null) {
      return 0;
    }

    let current = this[tail].next;
    let count = 0;

    do {
      count++;
      current = current.next;
    } while (current !== this[tail].next);

    return count;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  *values() {
    if (this[tail] !== null) {
      if (this[tail].next === this[tail]) {
        yield this[tail].data;
      } else {
        let current = this[tail].next;

        do {
          yield current.data;
          current = current.next;
        } while (current !== this[tail].next);
      }
    }
  }

  *circularValues() {
    if (this[tail] !== null) {
      let current = this[tail].next;

      do {
        yield current.data;
        current = current.next;
      } while (current !== null);
    }
  }

  toString() {
    return [...this].toString();
  }
}

export { LinkedList };
