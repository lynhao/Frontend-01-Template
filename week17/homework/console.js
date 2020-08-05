var tty = require('tty');
var ttys = require('ttys');
// var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

// stdout.write("hello  world \n");
// stdout.write("\033[1A");
// stdout.write("badguy \n");

// const readline = require("readline");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question("what?", (answer) => {
//     console.log('thx you')
// })

// async function ask(question) {
//     return new Promise((resolve, reject) => {
//         rl.question(question, answer => {
//             setTimeout(() => {
//                 resolve(answer)
//             }, 2000);
//         })
//     })
// }

// void async function() {
//     console.log(await ask("that's what i'm saying!!!"))
// }()

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// stdin.on('data', function(key) {
//     if(key === '\u0003') {
//         process.exit();
//     }

//     process.stdout.write(key.toString().charCodeAt(0).toString());
// });

function getChar() {
    return new Promise(resolve => {
        stdin.once('data', function(key) {
            resolve(key)
        })
    });
}

function up(n = 1) {
    stdout.write("\033["+n+"A")
}

function down(n = 1) {
    stdout.write("\033["+n+"B")
}

function right(n = 1) {
    stdout.write("\033["+n+"C")
}

function left(n = 1) {
    stdout.write("\033["+n+"D")
}

void async function() {
    stdout.write("which framework do you wanna use? \n");
    let answer = await select(["vue", "react", "angular"])
    stdout.write("you selected " + answer + "\n");
    process.exit();
}()

async function select(choices) {
    let selected = 0;
    for(let i =0; i < choices.length; i++) {
        let choice = choices[i];
        if (i === selected) {
            stdout.write("[\x1b[33mx\x1b[0m] " + choice + "\n")
        } else {
            stdout.write("[ ] " + choice + "\n")
        }
    }
    up(choices.length);
    right();
    while(true) {
        let char = await getChar();
        // if (char === "\u0003") {
        //     process.exit();
        //     break;
        // }
        if (char === "w" && selected > 0) {
            stdout.write(" ");
            left()
            selected--;
            up()
            stdout.write("\x1b[33mx\x1b[0m");
            // left();
        }
        if (char === "s" && selected < choices.length - 1) {
            stdout.write(" ");
            left();
            selected++;
            down();
            stdout.write("\x1b[33mx\x1b[0m");
            left();
        }
        if (char === "\r") {
            down(choices.length - selected);
            left();
            return choices[selected];
        }

        // if (char === "\n") {
        //     return choices[selected]
        // }
        // if (char === "d" && selected > 0) {
        //     selected --;
        //     down()
        // }
        // console.log(char.split('').map(c => c.codePointAt(0)))
    }
}