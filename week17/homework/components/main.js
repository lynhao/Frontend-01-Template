import {createElement} from './createElement'
import { Carousel } from './Carousel.js';
import { Panel } from './Panel.js';
import { TabPanel } from './TabPanel.js';
import {ListView} from './ListView.js';

import carousel from "./carousel.css";

// let style = document.createElement("style");

// style.innerHTML = carousel[0][1];
// document.documentElement.appendChild(style);
// import { Carousel } from './test/Carousel.js';


// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
// ]}/>
// component.mountTo(document.body);
let pane = <TabPanel class="t" title="this is my panel">
    <span title="title1"> this is content1</span>
    {/* <span title="title2"> this is content2</span>
    <span title="title3"> this is content3</span>
    <span title="title4"> this is content4</span> */}
</TabPanel>
pane.mountTo(document.body);
// window.panel = pane
let data = [
    {title: "蓝猫", url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {title: "橘猫加白", url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {title: "白猫", url:"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {title: "橘猫", url:"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
]

// let list = <ListView data={data}>
//     {record => <figure>
//         <img src={record.url}/>
//         <figcaption>{record.title}</figcaption>
//     </figure>}
// </ListView>
// list.mountTo(document.body);

