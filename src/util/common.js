
/**
 * 存储storage
 * @param {String, ALL Type} key 键值名 data 存储数据
 */
export function setStorage (key, data) {
  if (!key) return
  if (typeof data == 'object') {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.setItem(key, data)
  }
}

/**
 * 获取storage
 * @param {String} key 键值名
 */
export function getStorage (key) {
  if(!key) return
  let res = localStorage.getItem(key);
  console.log('res', res);
  console.log('res', typeof res);
  if (res) {
    return JSON.parse(res)
  } else {
    return false
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
