// let element = document.body;

export function enableGesture(element) {
    let context = Object.create(null);

    let MOUSE_SYMBOL = Symbol("mouse");
    
    if (document.ontouchstart !== null) {
        element.addEventListener("mousedown", (event) => {
            context[MOUSE_SYMBOL] = Object.create(null);
            start(event, context[MOUSE_SYMBOL])
        
            let mousemove = event => {
                move(event, context[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, context[MOUSE_SYMBOL]);
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseend);
            }
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseend);
        });
    }
    
    
    element.addEventListener("touchstart", event => {
        // console.log(event.changedTouches[0]);
        // console.log('start');
        for (let touch of event.changedTouches) {
            context[touch.identifier] = Object.create(null);
            start(touch, context[touch.identifier]) 
        }
    })
    
    element.addEventListener("touchmove", event => {
        // console.log(event.changedTouches[0]);
        for (let touch of event.changedTouches) {
            move(touch, context[touch.identifier])
        }
    })
    
    //touchend和touchcancel 只触发其中一个
    element.addEventListener("touchend", event => {
        for (let touch of event.changedTouches) {
            end(touch, context[touch.identifier])
            delete context[touch.identifier];
        }
    })
    
    element.addEventListener("touchcancel", event => {
        for (let touch of event.changedTouches) {
            cancel(touch, context[touch.identifier]);
            delete context[touch.identifier];
        }
    })
    
    let start = (point, context) => {
        element.dispatchEvent(Object.assign(new CustomEvent('start', {
            startX: context.clientX,
            startY: context.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        })));
        context.startX = point.clientX, context.startY = point.clientY;
    
        context.moves = []; //离开前的速度
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
    
        context.timeoutHandler = setTimeout(() => {
            if (context.isPan) {
                return;
            }
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500);
    }
    
    let move = (point, context) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                element.dispatchEvent(new CustomEvent('presscancel', {}));
                console.log("press cancel");
            }
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }));
        }
    
    
        if (context.isPan) {
            context.moves.push({
                dx, dy,
                t: Date.now()
            });
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
    
            element.dispatchEvent(Object.assign(new CustomEvent("pan"), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }));
            // console.log("move", dx, dy)
        }
    }
    
    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            console.log(speed);
            
            let isFlick = speed > 0.6;

            if (isFlick) {
                console.log("flick");
                element.dispatchEvent(Object.assign(new CustomEvent('flick'), {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed
                }));
            }
            element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed,
                isFlick: isFlick 
            }));
        } 
        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap', {}))
            console.log('tap end')
        }

        if (context.isPress) {
            console.log('press end')
            element.dispatchEvent(new CustomEvent('pressend', {}))
        }
        clearTimeout(context.timeoutHandler)
    }
    
    let cancel = (point, context) => {
        console.log('canceled');
        element.dispatchEvent(new CustomEvent('canceled', {}))
        clearTimeout(context.timeoutHandler)
    }
}

