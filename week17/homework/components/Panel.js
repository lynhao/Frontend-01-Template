import { createElement } from './createElement'

export class Panel {
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
    select(i) {
        for (let view of this.chidlView) {
            view.style.display = 'none';
        }
        this.chidlView[i].style.display = "";
        this.titleView.innerText = this.children[i]
    }

    render() {
        this.chidlrenViews = this.chidlView.map(child => <div style="width:300px;min-height:300px">{child}</div>)
        this.titleView = this.chidlView.map(child => <span style="width:300px;min-height:300px">{child.title}</span>)
        
        setTimeout(() => this.select(0));
        return <div class='panel' style="border: solid 1px lightgreen;width:300px;">
            <h1 style="background-color: lightgreen; width:300px;margin: 0">{title}</h1>            <div style="width: 300px;min-height: 300px">
            {this.createElementchidlrenViews}
            </div>
        </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

}
