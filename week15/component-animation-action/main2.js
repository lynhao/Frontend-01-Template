import { createElement } from './createElement'
import { TimeLine, Animation, Timeline } from './animation.js';
import { cubicBezier } from './cubicBezier.js';

// // component.mountTo(document.body);

// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
// ]}/>
// let component = new Carousel();
// console.log(component)
// component.mountTo(document.body);

// console.log(component)
console.log(1)
let el = document.getElementById("el")
let linear = t => t;
let ease = cubicBezier(.25, .1, .25, 1);
let el2 = document.getElementById("el2")

let tl = <Timeline />
tl.add(new Animation(el.style, "transform", v => `translateX(${v}px)`, 0, 200, 5000, 0, linear));

console.log(tl)
// tl.add(new Animation(el.style, "transform", v => `translateX(${v}px)`, 0, 200, 5000, 0, linear));
tl.start();
document.getElementById("pause").addEventListener('click', () => {
    tl.pause()
})
document.getElementById("resume").addEventListener('click', () => {
    tl.resume()
})

document.getElementById("el2-start-btn").addEventListener('click', () => {
    tl.add(new Animation(el2.style, "transform", v => `translateX(${v}px)`, 0, 200, 5000, 0, linear), 0);
    tl.add(new ColorAnimation(el2.style, "backgroundColor", { r: 0, g: 0, b: 0, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }, 5000, 0, linear));
})