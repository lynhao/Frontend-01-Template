import { createElement } from './createElement'

export class TabPanel {
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
    select(i) {
        for (let view of this.chidlView) {
            view.style.display = 'none';
        }
        this.chidlView[i].style.display = "";

        for (let view of this.titleView) {
            // debugger
            view.classList.remove('selected');
        }
        this.titleView[i].classList.add("selected");
    }

    render() {
        console.log(this.children)
        this.chidlView = this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>)
        this.titleView = this.children.map((child,i) => <span onClick={() => this.select(i)} style="width:300px;min-height:300px;padding: 5px 5px 0 5px">{child.getAttribute("title") || ' '}</span>)
        
        // setTimeout(() => this.select(0), 16);
        return <div class='tab-panel' style="border: solid 1px lightgreen;width:300px;">
            <h1 style="background-color: lightgreen; width:300px;margin: 0">{this.titleView}</h1> 
            {/* <div class="test" style="border: solid 1px lightgreen">
            {this.chidlView}
            </div> */}
        </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}
