export class Timeline {
    constructor() {
        this.animations = [];
        this.requestId = null;
        // this.tick = 
        this.state = "inited";
    }

    tick() {
        let t = Date.now() - this.startTime;
        let animations = this.animations.filter(animation => !animation.finished);

        for(let animation of this.animations) {
            // if(t > animation.duration + animation.delay) {
            //     // continue;
            //     t = animation.duration + animation.delay
            // }
            let {object, property, template, duration, timinfFunction, delay, addTime} = animation;
            let progression = timinfFunction((t - delay - addTime) / duration); // 0 - 1
            if (addTime > 0) {
            }
            if(t > duration + delay + addTime) {
                progression = 1;
                animation.finished = true;
            }
            let value = animation.valueFromProgression(progression);

            // object[property] = template(timinfFunction(start, end)(t - delay));
            object[property] = template(value);
        }
        if (animations.length) {
            this.requestId = requestAnimationFrame(() => this.tick())
        }
    }

    pause() {
        if (this.state !== "playing") {
            return;
        }
        this.state = "paused";
        this.pauseTime = Date.now();
        console.log(this)
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId)
        }
    }

    resume() {
        if (this.state !== "paused") {
            return;
        }
        this.state = "playing";
        this.startTime += Date.now() - this.pauseTime;
        console.log(this.startTime)
        this.tick();
    }

    start() {
        if (this.state !== "inited") {
            return;
        }
        this.state = "playing";
        this.startTime = Date.now();
        this.tick()
    }
    
    reStart() {
        if (this.state === "playing") {
            this.pause();
        }
        this.animations = [];
        this.requestId = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add (animation, addTime) {
        this.animations.push(animation);
        animation.finished = false;
        if (this.state === "playing") {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0;
        }
    }
}

export class Animation {
    constructor(object, property, template, start, end, duration, delay, timinfFunction) {
        this.object = object;
        this.template = template;
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

