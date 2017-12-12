import Logger from "./Logger";
import model from "./Model";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnitFunTest extends cc.Component {

    @property({
        default: null,
        type: cc.Node
    })
    content: cc.Node =null;

    onLoad() {
        // init logic
        model.getInstance().pushValue("testStep",0);
        model.getInstance().pushValue("testSubStep",0);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        model.getInstance().pushValue("marqueetext","恭喜 <color=#00ff00>'賭神'</c> 在炸金花500元場贏得23590元");
    }

    start(){
       // this.debugNodeInit();
    }

    debugNodeInit(){
         //取得Canvas所有一級子節點
         this.content = cc.find("Canvas");

         var debugNode = new cc.Node();
         this.content.addChild(debugNode);
         debugNode.name = "debug";
         debugNode.position = cc.v2(0, 417);
         debugNode.addComponent(cc.Layout);

         var lay = debugNode.getComponent("cc.Layout");
         debugNode.width = 1920;
         lay.width = 1920
         lay.type = cc.Layout.Type.GRID;
         lay.spacingX = 10;
          lay.spacingY = 10;

         var n = this.content.childrenCount;
         for(var i=0;i< n;i++)
         {
                 var node = new cc.Node();
                 debugNode.addChild(node);
                 node.position = cc.v2(0, 0-(50*i));
                 var la = node.addComponent(cc.Label);
                 la.string =  this.content.children[i].name; 
                 node.name = la.string;
                 node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseDown, this);
         }
    }

    /** 動態刷新debug list */
    debugNodeFlush(){
        var debugNode = this.content.getChildByName("debug");
        
        var n = debugNode.childrenCount;
        for(var i=0;i< n;i++){
            debugNode.children[i].destroy();
        }
        debugNode.removeAllChildren();
       
        var n = this.content.childrenCount;
        for(var i=0;i< n;i++)
        {
               
                var node = new cc.Node();
                debugNode.addChild(node);
                node.position = cc.v2(0, 0-(50*i));
                var la = node.addComponent(cc.Label);
                la.string =  this.content.children[i].name; 
                node.name = la.string;
                node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseDown, this);
        }
   }

    mouseDown(event){
        Logger.Debug(event);
        
        model.getInstance().pushValue("debugNode",this.content.getChildByName(event.currentTarget.name));
    }

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown (event) {
        var self = this;
        switch(event.keyCode) {
            case cc.KEY.q:
                 var step = this.NextStep();
                 switch( step){
                    case 1:
                        model.getInstance().pushValue("round_code","1111");
                        model.getInstance().dispatchEvent("init");
                    break;
                    case 2:
                        model.getInstance().pushValue("history",[[7,"b"],[3,"p","bp"],[0,"t","pp"],[5,"b"]])

                        model.getInstance().pushValue("round_code","1111");
                        model.getInstance().pushValue("reset_time",15);
                        model.getInstance().dispatchEvent("wait_bet");
                    break;
                    case 3:
                        model.getInstance().dispatchEvent("BetTimeOut");
                    break;
                    case 4:
                        model.getInstance().pushValue("round_code","1111");
                        model.getInstance().pushValue("sttleState","player");
                        model.getInstance().pushValue("sttlepoint",[7,4]);
                        model.getInstance().pushValue("sttlepaytable",[0, 2, 0, 0, 0]);
                        model.getInstance().dispatchEvent("settle");
        
                       // model.getInstance().pushValue("playerpoker",["H_1"]);
                        //model.getInstance().pushValue("bankerpoker",["C_1"]);   
                    break;
                 }
            break;
            case cc.KEY.e:
                switch( model.getInstance().getValue("testStep") ){
                    case 1:
                        var substep = this.NextSubStep();
                        switch(substep){
                            case 1:
                            break;
                        }
                    break;
                    case 2:
                    var substep = this.NextSubStep();
                    switch(substep){
                        case 1:
                            model.getInstance().pushValue("history",[[7,"b"],[3,"p","bp"],[0,"t","pp"],[5,"b"],[9,"p"],[7,"b","pp"],[0,"p"]])
                            model.getInstance().dispatchEvent("update_history");
                        break;
                    }
                    break;
                    case 3:
                        var substep = this.NextSubStep();
                        switch(substep){
                            case 1:
                                model.getInstance().pushValue("round_code","1111");
                                model.getInstance().pushValue("playerpoker",["H_1"]);
                                model.getInstance().pushValue("bankerpoker",[]);
                                model.getInstance().dispatchEvent("player_card");
                            break;
                            case 2:
                                model.getInstance().pushValue("round_code","1111");
                                model.getInstance().pushValue("playerpoker",["H_1"]);
                                model.getInstance().pushValue("bankerpoker",["D_3"]);
                                model.getInstance().dispatchEvent("banker_card");
                            break;
                            case 3:
                                model.getInstance().pushValue("round_code","1111");
                                model.getInstance().pushValue("playerpoker",["H_1","H_4","D_1"]);
                                model.getInstance().pushValue("bankerpoker",["D_3","D_5"]);
                                model.getInstance().dispatchEvent("player_card");
                            break;
                            case 4:
                                model.getInstance().pushValue("round_code","1111");
                                model.getInstance().pushValue("playerpoker",["H_1","H_4","D_1"]);
                                model.getInstance().pushValue("bankerpoker",["D_3","D_5","C_2"]);
                                model.getInstance().dispatchEvent("banker_card");
                            break;
                            case 5:
                           
                            break;
                            
                        }
                    break;
                    case 4:
                        var substep = this.NextSubStep();
                        switch(substep){
                            // case 1:
                            //     model.getInstance().pushValue("ActionSeat",1);
                            //     model.getInstance().dispatchEvent("playerAction");
                            // break;
                            case 1:
                               //右家出牌
                               model.getInstance().pushValue("playerPokerArr",[39,40,41,42]);
                               model.getInstance().pushValue("playerPokerPo",cc.p(533,132));
                               model.getInstance().pushValue("ActionSeat",1);

                               model.getInstance().dispatchEvent("otherPlayerOutPoker");

                                //左家代打
                                model.getInstance().pushValue("AIplaySeat",1);
                                model.getInstance().dispatchEvent("OhterAIplay");

                                //右家取消
                                model.getInstance().pushValue("AIplaySeat",2);
                                model.getInstance().dispatchEvent("AIplayCancel");
                                
                                //特效通知
                                model.getInstance().pushValue("effectType",1);
                                model.getInstance().dispatchEvent("playerEffetc");
                            break;
                            case 2:
                                //左家出牌
                                model.getInstance().pushValue("playerPokerArr",[34,35,36,37,38]);
                                model.getInstance().pushValue("playerPokerPo",cc.p(-533,132));
                                model.getInstance().pushValue("ActionSeat",2);
 
                                model.getInstance().dispatchEvent("otherPlayerOutPoker");

                                //右家代打
                                model.getInstance().pushValue("AIplaySeat",2);
                                model.getInstance().dispatchEvent("OhterAIplay");

                                //左家取消
                                model.getInstance().pushValue("AIplaySeat",1);
                                model.getInstance().dispatchEvent("AIplayCancel");
                                
                                //特效通知
                                model.getInstance().pushValue("effectType",2);
                                model.getInstance().dispatchEvent("playerEffetc");
                            break;
                            case 3:
                                //自己出牌 提示
                                model.getInstance().dispatchEvent("Playaction");
                            break;
                        }
                    break;
                }
         
                 
                 
            break;
            case cc.KEY.a:
               var node = model.getInstance().getValue("debugNode");
                node.x -=10;
                Logger.Debug("x = "+node.x + "y = "+node.y);
            break;
            case cc.KEY.d:
                var node = model.getInstance().getValue("debugNode");
                node.x +=10;
                Logger.Debug("x = "+node.x + "y = "+node.y);
            break;
            case cc.KEY.s:
                var node = model.getInstance().getValue("debugNode");
                node.y -=10;
                Logger.Debug("x = "+node.x + "y = "+node.y);
            break;
            case cc.KEY.w:
                var node = model.getInstance().getValue("debugNode");
                node.y +=10;
                Logger.Debug("x = "+node.x + "y = "+node.y);
            break;
            case cc.KEY.left:
                break;
           
            case cc.KEY.right:
                break;
        }
    }
    
    private NextStep():number{
        var step = model.getInstance().getValue("testStep");
        step +=1;
        model.getInstance().pushValue("testStep",step);

        if( step == 5 ) step =0;
        //substop set 0
        model.getInstance().pushValue("testSubStep",0);

        return step;
    }

    private NextSubStep():number{
        var step = model.getInstance().getValue("testSubStep");
        step +=1;
        model.getInstance().pushValue("testSubStep",step);

        return step;
    }
}
