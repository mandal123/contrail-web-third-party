/*
* Kendo UI Complete v2012.3.1315 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
﻿(function( window, undefined ) {
    kendo.cultures["dsb"] = {
        name: "dsb",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["njeźela","ponjeźele","wałtora","srjoda","stwortk","pětk","sobota"],
                    namesAbbr: ["nje","pon","wał","srj","stw","pět","sob"],
                    namesShort: ["n","p","w","s","s","p","s"]
                },
                months: {
                    names: ["januar","februar","měrc","apryl","maj","junij","julij","awgust","september","oktober","nowember","december",""],
                    namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd, 'dnja' d. MMMM yyyy",
                    F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
                    g: "d. M. yyyy H.mm 'goź.'",
                    G: "d. M. yyyy H:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H.mm 'goź.'",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ". ",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
