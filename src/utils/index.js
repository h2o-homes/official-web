const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
};

const decimalToHumanNumber = (i, d) => {
    let s = i.toString();
    if (s === '0') return '0';
    d = s.length - parseInt(d);
    if (d <= 0) {
        while (d < 0) {
            s = '0' + s;
            d++;
        }
        s = '0.' + s;
    } else
        s = s.slice(0, d) + '.' + s.slice(d);
    return stripTrillingZeros(s);
};

const humanNumberChangeScale = (s = '', d = 6) => {
    d = parseInt(d);
    s = stripTrillingZeros(s.toString());
    let i = s.indexOf('.');
    if (i < 0) return s;
    if (s.slice(0, 1) === '0') {
        ++i;
        while (s.slice(i, i + 1) === '0') {
            ++i;
        }
        s = s.slice(0, d + i);
    } else {
        s = s.slice(0, Math.max(i, d + 1));
    }
    return stripTrillingZeros(s);
};

const stripTrillingZeros = (s) => {
    if (s.indexOf('.') < 0) return s;
    while (s.slice(-1) === '0') {
        s = s.slice(0, -1);
    }
    if (s.slice(-1) === '.') {
        s = s.slice(0, -1);
    }
    return s;
};

const shortString = (str, start = 6, end = 4) => {
    if (!str) {
        return '--'
    }

    const originStr = String(str);
    if (start + end + 3 >= str.length) {
        return str
    }

    if (!end) {
        return originStr.slice(0, start) + '...'
    }

    return originStr.slice(0, start) + '...' + originStr.slice(-1 * end)

};

const toThousandFilter = (num) => {
    if (!num) {
        return num
    }
    const numStr = String(num);
    let numDeci = '';
    let numInt = numStr.split('.')[0];
    if (numStr.indexOf('.') > -1) {
        numDeci = '.' + numStr.split('.')[1]
    }

    let numPrefix = '';
    let numArr = '';
    let numDist = '';

    if (numInt < 0) {
        numPrefix = '-';
        numArr = String(numInt).slice(1).split('').reverse()
    } else {
        numArr = String(numInt).split('').reverse()
    }

    for (let i = 0; i < numArr.length; i++) {
        numDist += numArr[i];
        if ((i + 1) % 3 === 0 && (i + 1) < numArr.length) {
            numDist += ','
        }
    }

    numDist = numPrefix + numDist.split('').reverse().join('');
    return numDist + numDeci
};

const converter = (n, fraction = 2) => {
    if (!n) {
        return '--'
    }
    if (isNaN(Number(n))) {
        return n
    }

    const num = Number(n);
    if (num < 1e6) return toThousandFilter(num.toFixed(fraction));
    // if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(2) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(fraction) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(fraction) + "B";
    if (num >= 1e12 && num < 1e15) return +(num / 1e12).toFixed(fraction) + "T";
    if (num >= 1e15) return +(num / 1e15).toFixed(fraction) + "P";
};

const humanNumberToDecimal = (i, d) => {
    d = parseInt(d);
    let s = stripTrillingZeros(i.toString());
    if (s !== '0') {
        i = s.indexOf('.');
        if (i > 0) {
            const l = s.length;
            s = s.slice(0, i) + s.slice(i + 1, i + 1 + d);
            d -= (l - i - 1);
        }
        while (d-- > 0) {
            s += '0';
        }
        while (s.slice(0, 1) === '0') {
            s = s.slice(1);
        }
    }
    return s;
};

const formatHex = (h) => {
    if (!h) {
        return
    }
    if (h.indexOf('0x') !== 0) {
        return
    }
    return h.replace('0x0', '0x')
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const timeago = (ptime, ctime) =>{
    if (!ptime || !ctime) return ''
        let ntime = new Date(ptime * 1000),
         seconds = Math.floor((ctime - ntime) / 1000),
             intervals = [Math.floor(seconds / 31536000), Math.floor(seconds / 2592000), Math.floor(seconds / 604800), 
                Math.floor(seconds / 86400), Math.floor(seconds / 3600),Math.floor(seconds / 60)
             ],
             times = ['year', 'month', 'week', 'day', 'hr', 'min'],
             key, res;
         for (key in intervals) {
             if (intervals[key] > 1){
                 res  = intervals[key] + ' ' + times[key] + 's ';
                 return res;
             }else if (intervals[key] === 1){
                 res = intervals[key] + ' ' + times[key] + ' ';
                 return res;
             }
         }
      return '0 min';
}

const formatTime = (timeStamp, patten = 'yyyy-MM-dd hh:mm:ss') => {
  let date = new Date(timeStamp)
  let pattenMap = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(patten)) {
    patten = patten.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in pattenMap) {
    if (new RegExp('(' + k + ')').test(patten)) {
      patten = patten.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? pattenMap[k] : ('00' + pattenMap[k]).substr(('' + pattenMap[k]).length)
      )
    }
  }
  return patten
};

export {
    sleep,
    toThousandFilter,
    converter,
    decimalToHumanNumber,
    shortString,
    humanNumberToDecimal,
    humanNumberChangeScale,
    stripTrillingZeros,
    formatHex,
    isExternal,
    timeago,
    formatTime
};
