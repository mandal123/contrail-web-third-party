/*
* Kendo UI Complete v2012.3.1315 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
﻿(function( window, undefined ) {
    kendo.cultures["mi"] = {
        name: "mi",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-%n","%n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Rātapu","Rāhina","Rātū","Rāapa","Rāpare","Rāmere","Rāhoroi"],
                    namesAbbr: ["Ta","Hi","Tū","Apa","Pa","Me","Ho"],
                    namesShort: ["Ta","Hi","Tū","Aa","Pa","Me","Ho"]
                },
                months: {
                    names: ["Kohi-tātea","Hui-tanguru","Poutū-te-rangi","Paenga-whāwhā","Haratua","Pipiri","Hōngongoi","Here-turi-kōkā","Mahuru","Whiringa-ā-nuku","Whiringa-ā-rangi","Hakihea",""],
                    namesAbbr: ["Kohi","Hui","Pou","Pae","Hara","Pipi","Hōngo","Here","Mahu","Nuku","Rangi","Haki",""]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd MMMM, yyyy",
                    F: "dddd, dd MMMM, yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yy",
                    Y: "MMMM, yy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
