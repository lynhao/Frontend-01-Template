export function createElement(Cls, attributes, ...children) {
    let o;
    if (typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }
    for (let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }

    let visit = (children) => {
        for (let child of children) {
            if (typeof child === "object" && child instanceof Array) {
                visit(child);
                continue;
            }
            if(typeof child === "string") {
                child = new Text(child);
            }
            o.appendChild(child);
        }
    }
    visit(children);
    
    return o;
}
export class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
        // console.log(config);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
export class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
        // console.log(config);
    }
    setAttribute(name, value) {
        // console.log(name, value)
        this.root.setAttribute(name, value)
    }

    addEventListener(type, handler, config) {
        this.root.addEventListener(...arguments);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
    appendChild(child) {
        this.children.push(child)
        // console.log(child);
        // child.mountTo(this.root);
    }
}