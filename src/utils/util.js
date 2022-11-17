/**
 * 日期格式化
 * @param {Date} date
 * @param {string} format格式
 */
export function formatDate(date, format = 'YYYY-MM-DD hh:mm') {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const YYYY = date.getFullYear();
    const MM = ('0' + (date.getMonth() + 1)).slice(-2);
    const DD = ('0' + date.getDate()).slice(-2);
    const hh = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);

    const result = format
        .replace(/YYYY/, YYYY)
        .replace(/MM/, MM)
        .replace(/DD/, DD)
        .replace(/hh/, hh)
        .replace(/mm/, mm)
        .replace(/ss/, ss);
    return result;
}

/**
 * 复制文本
 * @param {string} content 内容
 */
export async function copy(content) {
    return await navigator.clipboard.writeText(content);
}
