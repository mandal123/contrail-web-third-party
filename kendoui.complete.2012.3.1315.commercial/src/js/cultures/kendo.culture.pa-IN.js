/*
* Kendo UI Complete v2012.3.1315 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
﻿(function( window, undefined ) {
    kendo.cultures["pa-IN"] = {
        name: "pa-IN",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                pattern: ["$ -n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "ਰੁ"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁੱਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨਿੱਚਰਵਾਰ"],
                    namesAbbr: ["ਐਤ.","ਸੋਮ.","ਮੰਗਲ.","ਬੁੱਧ.","ਵੀਰ.","ਸ਼ੁਕਰ.","ਸ਼ਨਿੱਚਰ."],
                    namesShort: ["ਐ","ਸ","ਮ","ਬ","ਵ","ਸ਼","ਸ਼"]
                },
                months: {
                    names: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""],
                    namesAbbr: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""]
                },
                AM: ["ਸਵੇਰ","ਸਵੇਰ","ਸਵੇਰ"],
                PM: ["ਸ਼ਾਮ","ਸ਼ਾਮ","ਸ਼ਾਮ"],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy dddd",
                    F: "dd MMMM yyyy dddd tt hh:mm:ss",
                    g: "dd-MM-yy tt hh:mm",
                    G: "dd-MM-yy tt hh:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
