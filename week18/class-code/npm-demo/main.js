const npm = require("npm");

let config = ""
npm.load(config, (err) => {
    npm.install("webpack", (err) => {
        console.log(err);
    })
})

