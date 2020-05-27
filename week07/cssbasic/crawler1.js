var lis = document.getElementById('container').children;
var ret = []
for (let item of lis) {
    if(item.getAttribute('data-tag').match(/css/)) {
        ret.push({
            name: item.children[1].innerText,
            url: item.children[1].children[0].href
        })
    }
}

module.exports = ret