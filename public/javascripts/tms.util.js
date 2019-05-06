/*
* isEmpty
 isEmptyStr
 isNotEmpty
 LPad
 RPad
 setComma
 removeComma
 dateFormat
 currentDate
* */
let self = {

    isEmpty: function (str) {
        if (typeof str === 'undefined' || str == null || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || ( str != null && typeof str == "object" && !Object.keys(str).length )) {
            return true;
        } else {
            return false;
        }
    },
    isEmptyStr: function (str) {
        if (typeof str === 'undefined' || str == null || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || ( str != null && typeof str == "object" && !Object.keys(str).length )) {
            return "";
        } else {
            return str;
        }
    },
    isNotEmpty: function (str) {
        return !self.isEmpty(str);
    },
    LPad: function (obj, charator, num) {
        var str = obj + "";
        if (!str || !charator || str.length >= num) {
            return str;
        }

        var max = (num - str.length) / charator.length;
        for (var i = 0; i < max; i++) {
            str = charator + str;
        }

        return str;
    },
    RPad: function (obj, charator, num) {
        var str = obj + "";
        if (!str || !charator || str.length >= num) {
            return str;
        }

        var max = (num - str.length) / charator.length;
        for (var i = 0; i < max; i++) {
            str += charator;
        }

        return str;
    },
    setComma: function (obj) {
        return obj.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    },
    removeComma: function (str) {
        return obj.replace(/,\s?/g, "");
    },
    dateFormat: function (dt, format) {
        var d = dt;
        var weekName = ["Sunday", "Monday", "Tuesday", "Wendesday", "Thursday", "Friday", "Saturday"];
        return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
            switch ($1) {
                case "yyyy":
                    return d.getFullYear();
                case "yy":
                    return (LPad(d.getFullYear() % 1000), '0', 2);
                case "MM":
                    return LPad(d.getMonth() + 1, '0', 2);
                case "dd":
                    return LPad(d.getDate(), '0', 2);
                case "E":
                    return weekName[d.getDay()];
                case "HH":
                    return LPad(d.getHours(), '0', 2);
                case "hh":
                    return (h = d.getHours() % 12) ? LPad(h, '0', 2) : 12;
                case "mm":
                    return LPad(d.getMinutes(), '0', 2);
                case "ss":
                    return LPad(d.getSeconds(), '0', 2);
                case "a/p":
                    return d.getHours() < 12 ? "Mornig" : "Afternoon";
                default:
                    return $1;
            }
        });
    },
    currentDate: function (format) {
        if (this.isEmpty(format)) {
            format = 'yyyy-MM-dd';
        }
        return self.dateFormat(new Date(), format);
    }
}

module.exports = self;