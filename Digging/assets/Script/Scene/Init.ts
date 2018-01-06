
import Logger from "../Utils/Logger";
import model from "../Utils/Model";

const {ccclass, property} = cc._decorator;

@ccclass
export default class init extends cc.Component {

    @property({type:cc.Node})
    role: cc.Node = null;

    @property({type:cc.Node})
    worldmask: cc.Node = null;

    @property([cc.Node])
    public mapVerticalNodes: cc.Node[] = [];

    @property([cc.Node])
    public mapHorizonNodes: cc.Node[] = [];


    onLoad() {
      
    }

    start () {
        var finished = cc.callFunc(this.logoOver, this);
        var seq = cc.sequence(cc.fadeIn(2),cc.delayTime(1),cc.fadeOut(2),finished);
        this.node.getChildByName("logo").runAction(seq)
    }

    logoOver(event){
        var finished = cc.callFunc(this.startTouch, this);
        var seq = cc.sequence(cc.scaleTo(2,1,1),finished);
        this.worldmask.runAction(seq);
    }

    startTouch(event){
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
         //this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    }

    touchStart(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        
        Logger.Debug(touchLoc);
        var c = this.role.parent.convertToNodeSpaceAR(touchLoc);
        Logger.Debug("c "+c)
        this.node.off(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        if( c.y > 0){
            if( Math.abs(c.x) > Math.abs(c.y)){
                if( c.x >0)  this.moveRight();
                else this.moveLeft();
            }
            else this.moveUp();
        }
        else{
            if( Math.abs(c.x) > Math.abs(c.y)){
                if( c.x >0)  this.moveRight();
                else this.moveLeft();
            }
            else this.moveDown();
        }
       // this.role.setPosition(c);
    }

    touchMove(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        var c = this.role.parent.convertToNodeSpaceAR(touchLoc);
        Logger.Debug(c);
        
       // this.role.setPosition(c);
        //     var follow = cc.follow(this.role, cc.rect(0,0, 2000,2000));
        //    this.node.runAction(follow);
    }

    touchEnd(event){
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        //this.role.setPosition(0,559);
        var c = this.role.parent.convertToNodeSpaceAR(touchLoc);
        this.role.setPosition(c);
    }

    moveRight(){
        var n = this.mapHorizonNodes.length;
        for(var i=0;i< n;i++){
            var finished = cc.callFunc(this.endR, this,i);
            var seq = cc.spawn(cc.moveBy(0.5,-181,0),cc.delayTime(0.5),finished);
            this.mapHorizonNodes[i].runAction(seq);
        }
        
    }

    endR(target,data){
        if( data ==3){
            setTimeout(function () {
                this.RChange();
            }.bind(this), 500);
        }
    }

    RChange(){
        var node = this.mapHorizonNodes.shift();
        this.mapHorizonNodes.push(node);
        node.setPosition(this.mapHorizonNodes[2].x+181,0);

        //verticel adjust
        this.mapVerticalNodes[1] =this.mapHorizonNodes[1];
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
    }


    moveLeft(){
        var n = this.mapHorizonNodes.length;
        this.LChange();
        for(var i=0;i< n;i++){
            var finished = cc.callFunc(this.endL, this,i);
            var seq = cc.spawn(cc.moveBy(0.5,181,0),cc.delayTime(0.5),finished);
            this.mapHorizonNodes[i].runAction(seq);
        }
    }

    endL(target,data){
        if( data ==3){
            setTimeout(function () {
               // this.LChange();
               this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
            }.bind(this), 500);
        }
    }
    
    LChange(){
        var node = this.mapHorizonNodes.pop();
        node.setPosition(this.mapHorizonNodes[0].x-181,0);
        this.mapHorizonNodes.unshift(node);
        //verticel adjust
        this.mapVerticalNodes[1] =this.mapHorizonNodes[1];
    }

    moveDown(){
        var n = this.mapVerticalNodes.length;
        for(var i=0;i< n;i++){
            var finished = cc.callFunc(this.endD, this,i);
            var seq = cc.spawn(cc.moveBy(0.5,0,181),cc.delayTime(0.5),finished);
            this.mapVerticalNodes[i].runAction(seq);
        }
    }

    endD(target,data){
        if( data ==3){
            setTimeout(function () {
                this.DChange();
            }.bind(this), 500);
        }
    }

    DChange(){
        var node = this.mapVerticalNodes.shift();
        this.mapVerticalNodes.push(node);
        node.setPosition(0,this.mapVerticalNodes[2].y-181);

        //verticel adjust
        this.mapHorizonNodes[1] = this.mapVerticalNodes[1];
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
    }

    moveUp(){
        var n = this.mapVerticalNodes.length;
        this.UChange();
        for(var i=0;i< n;i++){
            var finished = cc.callFunc(this.endU, this,i);
            var seq = cc.spawn(cc.moveBy(0.5,0,-181),cc.delayTime(0.5),finished);
            this.mapVerticalNodes[i].runAction(seq);
        }
    }

    endU(target,data){
        if( data ==3){
            setTimeout(function () {
                this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
             }.bind(this), 500);
        }
    }

    UChange(){
        var node = this.mapVerticalNodes.pop();
        node.setPosition(0,this.mapVerticalNodes[0].y+181);
        this.mapVerticalNodes.unshift(node);

        //verticel adjust
        this.mapHorizonNodes[1] = this.mapVerticalNodes[1];

    }

    // update (dt) {},
}
