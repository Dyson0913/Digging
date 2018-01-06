
import Logger from "../Utils/Logger";
import model from "../Utils/Model";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainRole extends cc.Component {

    @property({type:cc.Node})
    role: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
       var follow = cc.follow(this.role, cc.rect(0,0, 2000,2000));
        this.node.runAction(follow);
        Logger.Debug("aaa");
    }

    start () {
       
    }

   
    // update (dt) {},
}
