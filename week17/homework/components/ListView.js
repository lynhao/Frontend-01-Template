import { createElement } from './createElement'

export class ListView {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }
    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }
    getAttribute(name) {
        return this[name];
    }

    render() {
        let data = this.getAttribute("data");
        debugger
        return <div class="list-view" style="width:300px;">
          {
              data.map(this.children[0])
          }
        </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}
