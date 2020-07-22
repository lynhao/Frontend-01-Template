import {createElement} from './createElement'

export class Carousel {
    constructor() {
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
        let children =  this.data.map( url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        })
        let root = 
            <div class="carousel">
                {children}
                <button class="play-btn">播放</button>
                <button class="pause-btn">暂停</button>
                <button class="resume-btn">继续</button>
            </div>
        
        let play = document.getElementsByClassName('play-btn')[0];
        let pause = document.getElementsByClassName('pause-btn')[0];
        let resume = document.getElementsByClassName('resume-btn')[0]

        let position = 0;
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = root.children[position].root;
            let next = root.children[nextPosition].root;
            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(-${100 * position}%)`
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
            setTimeout(() => {
                // current.style.transition = "ease 0.5s";
                // next.style.transition = "ease 0.5s";
                current.style.transition = "";  // use css rule
                next.style.transition = "";

                current.style.transform = `translateX(-${100 + 100 * position}%)`
                next.style.transform = `translateX(-${100 * nextPosition}%)`

                position = nextPosition;
            }, 16)

            setTimeout(nextPic, 3000);
        }
        // setTimeout(nextPic, 3000);

        root.addEventListener("mousedown", event => {
            let startX = event.clientX;

            let nextPosition = (position + 1) % this.data.length;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = root.children[position].root;
            let last = root.children[lastPosition].root;
            let next = root.children[nextPosition].root;

            current.style.transform = `translateX(${event.clientX - 500 * position}px)`

            current.style.transition = "ease 0s";
            last.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(-${500 * position}px)`
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`
            last.style.transform = `translateX(-${500 + 500 * lastPosition}px)`

            let move = (event) => {

                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`

            };

            let up = (event) => {
                let offset = 0;
                
                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX -startX < -250) {
                    offset = -1;
                }

                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${ offset * 500 - 500 * position}px)`
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`
                position = (position - offset + this.data.length ) % this.data.length;
                console.log(position, offset)
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })

        console.log(root)
        // play.addEventListener("click", (event) => {
        //     console.log('play')
        // })

        // pause.addEventListener("click", (event) => {
        //     console.log('pause')
        // })

        // resume.addEventListener("click", (event) => {
        //     console.log('resume')
        // })

        return root;
    }
    get style() {
        return this.root.style;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
    
}