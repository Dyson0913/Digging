import Logger from "./Logger";

const {ccclass, property} = cc._decorator;

/** 數據存放處 */
export default class Model {
    private static _instance:Model = new Model();
    private dicVaule;
    private dicEvent;

    constructor(){
        this.dicVaule ={};
        this.dicEvent ={};

        if(Model._instance){
            throw new Error("Error: Instantiation failed: Use Model.getInstance() instead of new.");
        }
        Model._instance = this;
    }

    public static getInstance():Model
    {
        return Model._instance;
    }
   
    pushValue(key:string,value:any):any
    {
        this.dicVaule[key] = value ;
        return value;
    }
    
    getValue(key:string):any
    {    
        return this.dicVaule[key];
    }
    
    /**場景切換 */
    SceneSwitch(sence:string)
    {
        this.dicEvent ={};
        cc.director.loadScene(sence);
    }

    /** 註冊事件 */
    eventRegister(eventType:string,callback:Function,caller:any):void
    {
        if( this.dicEvent[eventType])
        {
            var funlist = this.dicEvent[eventType];
            //不同元件才放入,相同元件覆蓋
            var add:boolean = true;
            for(var i =0 ;i< funlist.length;i++)
            {
                var set = funlist[i];
                if( caller === set[1]){
                    add = false;
                } 
            }
            if( add ){
                funlist.push([callback,caller]);
                this.dicEvent[eventType] = funlist;
            }
            
        }
        else{
            this.dicEvent[eventType] = [[callback,caller]];
        }
         
    }

    /** 事件發派 */
    dispatchEvent(eventType:string)
    {
        var callback =  this.dicEvent[eventType];
        if (callback)
        {
            for(var i = 0;i< callback.length;i++)
            {
                var aa = callback[i];
                aa[0].call(aa[1]);
                //callback[i][0].apply();
            }
        } 
    }

    /** 彈窗 文字內容及回調事件設定
     * btnType 0:只有確認  1:確認,取消
    */
    PopHintmsg(text:string,okEvent:string = undefined,btnType:number = 0,cancelEvent:string = undefined){
        Model.getInstance().pushValue("hintText",text);
        Model.getInstance().pushValue("hintbtnType",btnType);
        Model.getInstance().pushValue("hintEventOK",okEvent);
        Model.getInstance().pushValue("hintEventCancel",cancelEvent);
        
        Model.getInstance().dispatchEvent("popMsg");
    }

    /** 創建動態節點 */
    CreatePrefab(prefab:cc.Prefab,displayObject:cc.Node,posistion:cc.Vec2 = cc.p(0,0),order =0):any{
        var p = cc.instantiate(prefab);
        if( order !=0) displayObject.addChild(p,order);
        else displayObject.addChild(p);
        p.setPosition(posistion);
        return p;
    }

    playMusic(musicName:string,delay:number =1){
        Model.getInstance().pushValue("music",musicName);

        setTimeout(function () {
            Model.getInstance().dispatchEvent("playMusic");
        }.bind(this), delay*1000);
        
    }
    
    playSound(soundName:string){
        Model.getInstance().pushValue("sound",soundName);
        Model.getInstance().dispatchEvent("playsound");
    }

    getParantNode(Father:string ="Canvas"){
        var node = new cc.Node();
        var Canvas = cc.find("Canvas/"+Father);
        return node;
    }

    getNode(pareant:cc.Node){
        var node = new cc.Node();
        pareant.addChild(node);
        return node;
    }

    getParantWithChild(Father:string ="Canvas"){
        var node = this.getParantNode(Father);
        var child = this.getNode(node);
        return child;
    }

    putItem(itemName:string,item:any){
        var arr = Model.getInstance().getValue(itemName);
        arr.push(item);
        Model.getInstance().pushValue(itemName,arr);
    }
}

