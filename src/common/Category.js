/**
 * 分类类 - 用于管理和组织具有键值对结构的数据
 */
export class Category {
  /**
   * 构造函数
   * @param {string} name - 分类名称
   * @param {string} [code] - 分类代码，可选，如果未提供则使用名称作为代码
   */
  constructor(name, code) {
    this.name = name; // 分类名称
    this.code = code ? code : name; // 分类代码，默认使用名称
    this.data = []; // 存储分类数据的数组，格式为 [{key, value}] 的键值对
    this.isolated = false; // 是否独立标志
  }

  /**
   * 向分类添加键值对数据
   * @param {*} key - 数据键名
   * @param {*} value - 数据值
   * @returns {Category} 返回当前分类实例，支持链式调用
   */
  add(key, value) {
    const item = { key, value };
    return this.addItem(item);
  }

  /**
   * 向分类的开头添加键值对数据
   * @param {*} key - 数据键名
   * @param {*} value - 数据值
   * @returns {Category} 返回当前分类实例，支持链式调用
   */
  addFirst(key, value) {
    const item = { key, value };
    // 检查数据是否已存在，避免重复添加
    if (!this.data.includes(item)) {
      this.data.unshift(item); // 在数组开头添加数据
    }
    return this;
  }

  /**
   * 添加数据项对象
   * @param {Object} item - 包含key和value的对象
   * @returns {Category} 返回当前分类实例，支持链式调用
   */
  addItem(item) {
    // 检查数据是否已存在，避免重复添加
    if (!this.data.includes(item)) {
      this.data.push(item); // 在数组末尾添加数据
    }
    return this;
  }

  /**
   * 根据键名获取数据项
   * @param {*} key - 要查找的数据键名
   * @returns {Object|null} 返回找到的数据对象，找不到则返回undefined
   */
  get(key) {
    return this.data.find((item) => item.key === key);
  }
}
