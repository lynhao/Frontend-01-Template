export class Timeline {
    constructor() {
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.requestId = null;
        this.addTimes = new Map();
        this.state = "inited";
        // this.pauseTime = null;
        // this.startTime = Date.now();
        this.tick = () => {
            let t = Date.now() - this.startTime;
            for(let animation of this.animations) {
                let {object, property, template, start, end, duration, timinfFunction, delay} = animation;
                
                let addTime = this.addTimes.get(animation);

                if (t < delay + addTime) {
                    continue;
                }

                let progression = timinfFunction((t - delay - addTime) / duration); // 0 - 1

                if(t > duration + delay + addTime) {
                    progression = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(this.animation);
                }
                let value = animation.valueFromProgression(progression);
                // object[property] = template(timinfFunction(start, end)(t - delay));
                object[property] = template(value);
            }
            if (this.animations.size) {
                this.requestId = requestAnimationFrame(this.tick);
                // this.requestId = requestAnimationFrame(() => this.tick());
            } else {
                this.requestId = null
            }
        }
    }

    // tick() {
    //     let t = Date.now() - this.startTime;
    //     for(let animation of this.animations) {
    //         let {object, property, template, start, end, duration, timinfFunction, delay} = animation;
            
    //         let addTime = this.addTimes.get(animation);

    //         if (t < delay + addTime) {
    //             continue;
    //         }

    //         let progression = timinfFunction((t - delay - addTime) / duration); // 0 - 1
    //         // console.log('progression', progression)

    //         if(t > duration + delay + addTime) {
    //             progression = 1;
    //             this.animations.delete(animation);
    //             this.finishedAnimations.add(animation);
    //         }
    //         let value = animation.valueFromProgression(progression);
    //         // console.log(value)
    //         // object[property] = template(timinfFunction(start, end)(t - delay));
    //         object[property] = template(value);
    //     }
    //     if (this.animations.size) {
    //         this.requestId = requestAnimationFrame(() => this.tick());
    //         // this.requestId = requestAnimationFrame(() => this.tick());
    //     } else {
    //         this.requestId = null
    //     }
    // }

    pause() {
        if (this.state !== "playing") {
            return;
        }
        this.state = "paused";
        this.pauseTime = Date.now();
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }

    resume() {
        if (this.state !== "paused") {
            return;
        }
        this.state = "playing";
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    start() {
        if (this.state !== "inited") {
            return;
        }
        this.state = "playing";
        this.startTime = Date.now();
        this.tick();
    }
    
    reset() {
        // debugger
        console.log(this.state)
        if (this.state === "playing") {
            this.pause();
        }
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTimes = new Map();
        this.requestId = null;
        this.startTime = Date.now();
        this.pauseTime = null;
        this.state = "inited";
    }

    restart() {
        if (this.state === "playing") {
            this.pause();
        }
        for (let animation of this.finishedAnimations) {
            this.animations.add(animation);
        }
        this.finishedAnimations = new Set();
        this.requestId = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add (animation, addTime) {
        // debugger
        this.animations.add(animation);
        if(this.state === "playing" && this.requestId === null) {
            this.requestId = requestAnimationFrame(this.tick)
        }
        if (this.state === "playing") {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
            // animation.addTime = ;
        } else {
            this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
            // animation.addTime = ;
        }
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timinfFunction,template) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timinfFunction = timinfFunction;
    }
    valueFromProgression(progression) {
        return this.start + progression * (this.end- this.start)
    }
}

export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timinfFunction, template) {
        this.object = object;
        this.template = template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        // this.timinfFunction = timinfFunction || ((start, end) => {
        //     return (t) => {
        //         console.log(start + (t / duration) * (end -start))
        //         return  start + (t / duration) * (end -start)
        //     };
        // })
        this.timinfFunction = timinfFunction;
    }
    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r- this.start.r),
            g: this.start.g + progression * (this.end.g- this.start.r),
            b: this.start.b + progression * (this.end.b- this.start.r),
            a: this.start.a + progression * (this.end.a- this.start.a),
        }
    }
}

