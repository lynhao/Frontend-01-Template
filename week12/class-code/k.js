//<script>
    // function find(source, pattern) {
    //     for (let i = 0; i < source.length; i++) {
    //         let matched = true;
    //         for (let j = 0; j < pattern.length; j++) {
    //             if (source[i + j] !== pattern[j]) {
    //                 matched = false;
    //                 break;
    //             }
    //         }
    //         if(matched) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // function find(source, pattern) {
    //     let j = 0;
    //     for (let i = 0; i < source.length; i++) {
    //         let matched = true;
    //         if (source[i] === pattern[j]) {
    //             j++;
    //         } else {
    //             j = 0;
    //             if (source[i] === pattern[j]) {
    //                 j++;
    //             }
    //         }
    //         if (j === pattern.length) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // find('abcxxyz', 'xy')
    // find('abcabcabx', 'abcabx') //false 
    // abcabx => [0,0,0,1,2,0]
    function find(source, pattern) {
        let table = new Array(pattern.length).fill(0);
        let k = 0;
        for (let j = 1; j < pattern.length; j++ ) {
            if (pattern[j] === pattern[k]) {
                k++;
            } else {
                k = 0;
            }
            table[j] = k; 
        }
        let j = 0;
        for (let i = 0; i < source.length; i++) {
            let matched = true;
            if (source[i] === pattern[j]) {
                j++;
            } else {
                while (source[i] !== pattern[j] && j > 0) {
                    j = table[j - 1];
                } 
                // j = table[j - 1];
                if (source[i] === pattern[j]) {
                    j++;
                } else {
                    j = 0;
                }
            }
            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
    find('abcabcabx', 'abcabx') //false
    find('aaaaaaaaax', 'aaax')
    // function find(source, pattern) {
    //     let starCount = 0;
    //     for (let i = 0; i < pattern.length; i++) {
    //         if (pattern[i] === "*") {
    //             starCount++;
    //         }
    //     }
    //     if (starCount === 0) {
    //         for (let i = 0; i < pattern.length; i++) {
    //             if (pattern[i] !== source[i] && pattern[i] !== "?") {
    //                 return false;
    //             }
    //         }
    //         return;
    //     }
    //     let i = 0;
    //     let lastIndex = 0;

    //     for (i = 0; pattern[i] !== "*"; i++) {
    //         if (pattern[i] !== source[i] && pattern[i] !== "?") {
    //             return false;
    //         }
    //     }
    //     lastIndex = i;

    //     for (let p = 0; p < starCount - 1; p++) {
    //         i++;
    //         let subPattern = "";
    //         while (pattern[i] !== "*") {
    //             subPattern += pattern[i];
    //             i++;
    //         } 
    //         let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"));
    //         reg.lastIndex = lastIndex;

    //         console.log(reg.exec(source));
    //         lastIndex = reg.lastIndex;
    //     }

    //     for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== "*"; j++) {
    //         if (pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== "?") {
    //             return false;
    //         }
    //     }
    //     return true;

    // }
    // find("abcabcabxaac", "a*b*bx*c");
// </script>