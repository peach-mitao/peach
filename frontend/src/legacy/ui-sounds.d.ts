/* `web/js/ui-sounds.js` 的类型声明。由 Peach 以 `/js/ui-sounds.js` 提供，不进 bundle：
 * 开关状态只能有一份，设置面板打开的和菜单开合时响的是同一个。只声明用得到的那一样。 */

/** 响一声；关着、浏览器没有 Web Audio 时什么都不做并返回 false。没有这种音效就抛错。 */
export declare function playUiSound(name: string): boolean;
