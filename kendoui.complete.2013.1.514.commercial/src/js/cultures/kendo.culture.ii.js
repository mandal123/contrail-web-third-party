/*
* Kendo UI Complete v2013.1.514 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
﻿(function( window, undefined ) {
    kendo.cultures["ii"] = {
        name: "ii",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,0],
                symbol: "%"
            },
            currency: {
                pattern: ["$-n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "¥"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ꑭꆏꑍ","ꆏꊂ꒔","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"],
                    namesAbbr: ["ꑭꆏ","ꆏ꒔","ꆏꑍ","ꆏꌕ","ꆏꇖ","ꆏꉬ","ꆏꃘ"],
                    namesShort: ["ꆏ","꒔","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"]
                },
                months: {
                    names: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""],
                    namesAbbr: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""]
                },
                AM: ["ꂵꆪꈌꈐ","ꂵꆪꈌꈐ","ꂵꆪꈌꈐ"],
                PM: ["ꂵꆪꈌꉈ","ꂵꆪꈌꉈ","ꂵꆪꈌꉈ"],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy'ꈎ' M'ꆪ' d'ꑍ'",
                    F: "yyyy'ꈎ' M'ꆪ' d'ꑍ' H:mm:ss",
                    g: "yyyy/M/d tt h:mm",
                    G: "yyyy/M/d H:mm:ss",
                    m: "M'ꆪ' d'ꑍ'",
                    M: "M'ꆪ' d'ꑍ'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt h:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy'ꈎ' M'ꆪ'",
                    Y: "yyyy'ꈎ' M'ꆪ'"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
