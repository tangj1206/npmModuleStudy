/**
 * 抛出一个异常
 * @param {Boolean} condition 
 * @param {String} s 
 */
const invariant = (condition, s) => {
    if (!condition) throw new Error(s);
};

/**
 * 模仿 Python 的分片操作
 * @param {Array} v 
 * @param {Number} start 
 * @param {Number} end 
 * @param {Number} step 
 */
const slice = (v, start, end, step) => {
    const r = [];
    let i;
    if (step > 0) {
        for (i = start; i < end; i += step) {
            r.push(v[i])
        }
    } else {
        for (i = start; i > end; i += step) {
            r.push(v[i]);
        }
    }
    return r;
};

/**
 * parse a string / number to number.
 * 
 * parseInt('') === NaN
 * Number('') === 0
 * @param {Number / String} n 
 */
const parseNumber = n => isNaN(parseInt(n)) ? NaN : Number(n);

/**
 * parse slice string 
 * start:end:step
 * @param path 
 * @param l 
 */
const parseSliceString = (path, l) => {
    let [start, end, step] = path.split(':').map(s => parseNumber(s));
    //异常的时候默认值
    start = isNaN(start) ? 0 :
        start < 0 ? l + start : 0;

    end = isNaN(end) ? l :
        end < 0 ? l + end : //小于0 转成正数
            end > l ? l : end;//最大为长度

    step = isNaN(step) ? 1 : step;

    invariant(step !== 0, 'Step can not be zero!');

    return [
        start,
        end,
        step
    ];
};

module.exports = v => {
    //校验输入必须为字符串或者数组
    invariant(
        typeof v === 'string' || Array.isArray(v),
        'Only string and array can be sliced'
    );

    return new Proxy({
        get: (_, path) => {
            const l = v.length;
            const n = Number(path);
            if (isNaN(n)) {
                const r = slice(v, ...parseSliceString(path, l));
                return Array.isArray(v) ? r : r.join('');
            }

            //integer / integer string
            return v[n < 0 ? n + 1 : n]
        }
    });
}
