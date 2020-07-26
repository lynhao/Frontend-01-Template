import { Timeline, Animation } from './animation.js';
import { ease, linear} from './cubicBezier.js';

export class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }
    render() {
        let position = 0;
        let timeline = new Timeline;
        window.xtimeline = timeline;
        timeline.start();

        let nextPicStopHandler = null;
        let children =  this.data.map( (url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;
           
            let offset = 0;

            let onStart = () => {
                timeline.pause()
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition].root;

                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;

            }
            let element = <img src={url} onStart={onStart}/>;
            // element.root.style.transform = "translateX(0px)";
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        })        
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next =  children[nextPosition];
            let currentAnimation = new Animation(
                current.root.style,
                "transform",
                -100 * position,
                -100 -100 * position,
                500,
                0,
                ease,
                v => `translateX(${5 * v}px)`
            )

            let nextAnimation = new Animation(
                next.root.style,
                "transform",
                100 -100 * nextPosition,
                - 100 * nextPosition,
                500,
                0,
                ease,
                v => `translateX(${5 * v}px)`
            )
            timeline.add(currentAnimation);
            timeline.add(nextAnimation);
            
            position = nextPosition;
            nextPicStopHandler =  setTimeout(nextPic, 3000);

            // window.xstophandler = setTimeout(nextPic, 3000);
        }
        nextPicStopHandler = setTimeout(nextPic, 3000);
        return <div class='carousel'>
            {children}
        </div>;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
    
}