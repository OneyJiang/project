
/**
 * 存储storage
 * @param {String, ALL Type} key 键值名 data 存储数据
 */
export function setStorage (key, data) {
    if(!key) return
    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 获取storage
 * @param {String} key 键值名
 */
export function getStorage (key) {
    if(!key) return
    let res = localStorage.getItem(key);
    try {
        return JSON.parse(res)
    } catch (err) {
        return res
    }
}

/**
 * 移除某 storage
 * @param {String} key 键值名
 */
export function removeStorage (key) {
    if(!key) return
    localStorage.removeItem(key);
}
