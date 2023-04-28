const _alphabet: string = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
const _base: number = _alphabet.length;

/**
 * 将数字转成短字符串
 */
export const encode = (num: number): string => {
    let str = '';
    while (num >= 0) {
        str = _alphabet.charAt(num % _base) + str;
        num = Math.floor(num / _base) === 0 ? -1 : Math.floor(num / _base);
    }
    return str;
}

/**
 * 将短字符串转成数字
 */
export const decode = (str: string): number => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * _base + _alphabet.indexOf(str.charAt(i));
    }
    return num;
};
