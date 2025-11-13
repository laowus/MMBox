import axios from "axios";
import qs from "qs";

//TODO
const DOM_PARSER = new DOMParser();
//axios.defaults.withCredentials = true

// 添加请求拦截器配置函数
function setupRequestHeaders(config) {
  const url = config.url || "";
  const headers = { ...config.headers };

  // 平台特定请求头处理
  const platformHeaders = {
    // QQ音乐
    qq: {
      test: (u) => u.includes("y.qq.com") || u.includes("c.y.qq.com") || u.includes("u.y.qq.com"),
      headers: {
        // 移除 origin 头，它是浏览器限制修改的安全头
        referer: "https://y.qq.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36"
      }
    },
    // 网易云音乐
    netease: {
      test: (u) => u.includes("music.163.com"),
      headers: {
        // 移除 origin 头，它是浏览器限制修改的安全头
        referer: "https://music.163.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36"
      }
    }
    // 可以添加更多平台...
  };

  // 应用匹配的平台请求头
  Object.values(platformHeaders).forEach((platform) => {
    if (platform.test(url)) {
      Object.assign(headers, platform.headers);
    }
  });

  // 添加通用请求头
  headers["Content-Type"] = headers["Content-Type"] || "application/x-www-form-urlencoded";

  return headers;
}
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers = setupRequestHeaders(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const __get = (url, data, config, parseContentType) => {
  return new Promise((resolve, reject) => {
    if (data && typeof data === "object") {
      data = qs.stringify(data);
      url = url.includes("?") ? url : url + "?";
      url = url.endsWith("?") ? url + data : url + "&" + data;
    }
    axios.get(url, config).then(
      (resp) => {
        try {
          const result = parseContentType(resp);
          resolve(result);
        } catch (err) {
          resolve(resp.data);
        }
      },
      (error) => reject(error)
    );
    //.catch(error => reject(error))
  });
};

const __post = (url, data, config, parseContentType) => {
  return new Promise((resolve, reject) => {
    if (data && typeof data === "object") {
      data = qs.stringify(data);
    }
    axios.post(url, data, config).then(
      (resp) => {
        try {
          const result = parseContentType(resp);
          resolve(result);
        } catch (err) {
          resolve(resp.data);
        }
      },
      (error) => reject(error)
    );
    //.catch(error => reject(error))
  });
};

export const getRaw = (url, data, config) => {
  return __get(url, data, config, (resp) => resp.data);
};

export const getDoc = (url, data, config) => {
  return __get(url, data, config, (resp) => DOM_PARSER.parseFromString(resp.data, "text/html"));
};

export const getJson = (url, data, config) => {
  return __get(url, data, config, (resp) => JSON.parse(resp.data));
};

export const postRaw = (url, data, config) => {
  return __post(url, data, config, (resp) => resp.data);
};

export const postJson = (url, data, config) => {
  return __post(url, data, config, (resp) => JSON.parse(resp.data));
};
