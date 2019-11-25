/**
 * 分割url search key value，返回decode后的[key, value]
 *
 * @exports WPT/Util/splitSearchKeyValue
 * @param {String} [str=''] query
 * @returns {Array}
 */
function splitSearchKeyValue(str = '') {
  const [key, ...valueArr] = str.split('=');
  const value = valueArr.length ? valueArr.join('=') : undefined;
  return [key, value].filter(i => i !== undefined).map((item: any)=>{
    return decodeURIComponent(item)
  });
}

/**
 * 从url上获取query对象
 *
 * @exports WPT/Util/query
 * @param {String} [url=window.location.href] url
 * @returns {Object}
 */
function query(url = window.location.href) {
  let search = '';
  const obj: any = {};
  if (typeof search !== 'string') {
      return obj;
  }
  if (url.includes('?')) {
      const a = document.createElement('a');
      a.href = url;
      search = a.search.slice(1);
  } else {
      search = '';
  }
  search.split('&').forEach(i => {
      const [k, v] = splitSearchKeyValue(i);
      if (k) {
          obj[k] = v;
      }
  });
  return obj;
}

export {
  query
}