/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}


/**
 * @returns {string} (xx-xx-xx xx:xx:xx)
 */
//获取当前时间
export function getNowTime() {
  var date = new Date();
  //年 getFullYear()：四位数字返回年份
  var year = date.getFullYear();  //getFullYear()代替getYear()
  //月 getMonth()：0 ~ 11
  var month = date.getMonth() + 1;
  //日 getDate()：(1 ~ 31)
  var day = date.getDate();
  //时 getHours()：(0 ~ 23)
  var hour = date.getHours();
  //分 getMinutes()： (0 ~ 59)
  var minute = date.getMinutes();
  //秒 getSeconds()：(0 ~ 59)
  var second = date.getSeconds();

  var time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
  return time;
}


//小于10的拼接上0字符串
export function addZero(s) {
  return s < 10 ? ('0' + s) : s;
}

export function dateToString(date_old) {
  let date = {
    year: date_old.getFullYear(),
    month: date_old.getMonth() + 1,
    date: date_old.getDate(),
    hour: date_old.getHours(),
    minute: date_old.getMinutes(),
    second: date_old.getSeconds()
  }
  return date.year + '-' + addZero(date.month) + '-' + addZero(date.date) + ' ' + addZero(date.hour) + ':' + addZero(date.minute) + ':' + addZero(date.second)
}