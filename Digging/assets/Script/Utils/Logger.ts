const {ccclass} = cc._decorator;

/** 日志控制类 */
@ccclass
export default class Logger {
    /** 调试 */
    static Debug = console.log;
    /** 信息 */
    static Info = console.info;
    /** 警告 */
    static Warn = console.warn;
    /** 异常 */
    static Error = console.error;
}