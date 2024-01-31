export function scrollTop() {
  return window.scrollY || window.pageYOffset; // for ie11
}

export function isMobile() {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
}
/**
 *
 * @param {String} browserName наименование браузера
 * - "firefox"
 * - "chrome"
 * - "opera"
 * - "edge"
 * - "safari"
 */
export function browserEqualsTo(browserName) {
  const { userAgent } = navigator;
  let _browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    _browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    _browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    _browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    _browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    _browserName = "edge";
  } else {
    _browserName = "No browser detection";
  }
  return _browserName === browserName;
}
/**
 *
 * @param {*} value Любой тип данных
 * @returns Возвращает массив. Если был передан обычный тип, то вернется объект с этим типом.
 */
export function toArray(value) {
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
}

export function isAuth() {
  return !!document.querySelector("body.is-auth");
}

export function numberWithSpaces(x, commaInsteadOfDot = false) {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  if (commaInsteadOfDot) {
    return parts.join(",");
  } else {
    return parts.join(".");
  }
}

/*
 * Траслит в читабельный текст
 * если reverse True, то скрипт переводит русский в английский
 *
 * 'rfvfp' --> 'камаз'
 * 'камаз' --> 'камаз'
 */
export function normalizeKeymap(str, reverse = false) {
  const ru = "йцукенгшщзхъфывапролджэячсмитьбю";
  const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,.";

  const alphabet = reverse ? [ru, en] : [en, ru];

  return [...str]
    .map((letter) => {
      const index = alphabet[0].indexOf(letter.toLowerCase());
      const newLetter = index > -1 ? alphabet[1][index] : letter;

      return letter === letter.toLowerCase() ? newLetter : newLetter.toUpperCase();
    })
    .join("");
}

/*
  После миграции с Jquery на dom-cache(более легковестную альтернативу)
  некоторые моменты сломались. Пример:
  $('.PRODUCTS').html(html.find('.no-result'))            -- неработает
  $('.PRODUCTS').html(jqToHTML(html.find('.no-result')))  -- работает
 */
export function jqToHTML(collection) {
  const result = Array.from(collection).reduce((acc, cur) => {
    let tmpNode = document.createElement("div");
    tmpNode.appendChild(cur);
    const str = tmpNode.innerHTML;
    tmpNode = cur = null; // prevent memory leaks in IE
    return (acc += str);
  }, "");

  return result;
}

/*
  Слушаем когда врезки(технология CMS Netcat) встявятся в DOM
 */
export function listenPartials(name, cb) {
  $(document).on("ncPartialUpdate", function (event) {
    const vrezki = event.detail.newTemplateContent;

    for (const vrezka in vrezki) {
      if (vrezka.split("?")[0] === name) {
        cb();
      }
    }
  });
}
/**
 * @param {Function} fn
 * @param {Number} ms
 * @returns Function with throttling effect
 */
export function Throttle(fn, ms) {
  let timer = null;

  return function throttling(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, ms);
  };
}

export function Debounce(callee, timeoutMs) {
  let lastCall = null;
  let lastCallTimer = null;
  return function perform(...args) {
    let previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timeoutMs) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}

export function el(selector, node = document) {
  return node.querySelector(selector);
}

export function els(selector, node = document) {
  return node.querySelectorAll(selector);
}

export function toggleClassName(element, className) {
  if (!element) {
    return;
  }

  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
/**
 * @param {Boolean} condition
 * @param {HTMLElement} element
 * @param {String} className
 * @description add or remove ClassName of Element depending on Condition
 */
export function changeClassnameByCond(condition, element, className) {
  if (condition) element.classList.add(className);
  else element.classList.remove(className);
}

export function load_file(selector, cb) {
  if (document.querySelector(selector)) {
    cb();
  }
}

/**
 * @param {Number} number
 * @returns Возвращает форматированную строку: 222222.5 -> 222 222
 */
export function formatNumber(number) {
  return String(~~number)
    .split("")
    .reverse()
    .join("")
    .match(/\d{1,3}/g)
    .join(" ")
    .split("")
    .reverse()
    .join("");
}

/**
 * @param {Number} price
 * @returns Возвращает форматированную строку: 222222.5 -> 222 222
 */

export function formatPrice(price, rounded = 2) {
  const [val1, val2] = String(price).split(/[,.]/);
  const formatVal1 = [...val1].reverse().join("").match(/[0-9-]{1,3}/g);
  const formatVal2 = ((val2 ?? "0") + "0".repeat(rounded)).slice(0, rounded);

  if (!formatVal1) {
    return "0,00";
  }

  return `${[...formatVal1.join(" ")].reverse().join("")}${rounded ? ',' : ''}${formatVal2}`.replace("- ", "-");
}

/**
 * @param {String} str да что угодно
 * @returns Возвращает форматированную строку: "Газ ПАО(:,)" -> _газ_пао
 */
export const getStyleSearch = (str) =>
  `_${str
    ?.toLowerCase()
    .trim()
    .replace(/['";:.,()]/gi, "")
    .replace(/\ /gi, "_")}`;

/**
 * @param {String} text
 */
export function copyToClipboard(text) {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    unsecuredCopyToClipboard(text);
  }
}

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.opacity = 0;
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}
/**
 *
 * @returns Возвращает имя страницы
 */
export function getPageName() {
  if (document.querySelector(".Page-product_card")) {
    return "product-card";
  }
  if (document.querySelector(".Page-account-bookmarks") || document.querySelector(".Page-account_tracked_items")) {
    return "bookmarks";
  }
  if (document.querySelector(".Page-scheme")) {
    return "scheme";
  }

  return "";
}

export function initDefaultTooltips() { }
