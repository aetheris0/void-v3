(()=>{var c={listeners:{},activeKeys:new Set,on:function(r,e){this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push(e)},remove:function(r,e){this.listeners[r]&&(this.listeners[r]=this.listeners[r].filter(t=>t!==e))},emit:function(r,e){this.listeners[r]&&this.listeners[r].forEach(t=>t(e))},trackKey:function(r,e,t){r==="keydown"&&moduleManager.handleKeyPress(t),r==="keydown"&&!this.activeKeys.has(e)&&(this.activeKeys.add(e),this.emit("keyPress",{key:e,code:t})),r==="keyup"&&this.activeKeys.has(e)&&(this.activeKeys.delete(e),this.emit("keyRelease",{key:e,code:t}))}};var a={get game(){return this._game?this._game:this._game=Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game},hookOnTick(){let r=this;this._fixedUpdate=this.game.fixedUpdate,this.game.fixedUpdate=function(){c.emit("beforeTick");let e=r._fixedUpdate.apply(this,arguments);return c.emit("afterTick"),e}}};var h={fromBlockStateId(r){let e=a.game.world.chunkProvider.posToChunk.values().next().value.constructor,t=null;return e.prototype.setBlockState.bind({getBlockState:function(){return{equals:function(o){return t=o,!0}}}})(0,r),t},get BlockPos(){if(this._cBlockPos)return this._cBlockPos;let r={};return a.game.world.setAirXYZ.bind({setBlockState:function(e){r=e}})(0,0,0),this._cBlockPos=r.constructor,this._cBlockPos}};var W={init(){let r=a.game.player.inventory.sendInventoryToServer();this.$Message2=r.constructor.__proto__,this.proto2=r.constructor.runtime,this._toJson=this.$Message2.prototype.toJson;let e=this;this.$Message2.prototype.toJson=function(){let t=e._toJson.apply(this,arguments),o=this.getType().typeName;return c.emit("packet",{name:o,data:t}),t},this.PBFloatVector3=this.createPacketClass("PBFloatVector3",this.fields.PBFloatVector3),this.PBBlockPos=this.createPacketClass("PBBlockPos",this.fields.PBBlockPos),this.Vector3=this.createPacketClass("Vector3",this.fields.Vector3),this.PBAction={0:"START_DESTROY_BLOCK",1:"ABORT_DESTROY_BLOCK",2:"STOP_DESTROY_BLOCK",3:"DROP_ALL_ITEMS",4:"DROP_ITEM",5:"RELEASE_USE_ITEM",START_DESTROY_BLOCK:0,ABORT_DESTROY_BLOCK:1,STOP_DESTROY_BLOCK:2,DROP_ALL_ITEMS:3,DROP_ITEM:4,RELEASE_USE_ITEM:5},this.proto2.util.setEnumType(this.PBAction,"PBAction",[{no:0,name:"START_DESTROY_BLOCK"},{no:1,name:"ABORT_DESTROY_BLOCK"},{no:2,name:"STOP_DESTROY_BLOCK"},{no:3,name:"DROP_ALL_ITEMS"},{no:4,name:"DROP_ITEM"},{no:5,name:"RELEASE_USE_ITEM"}]),this.PBEnumFacing={0:"UNDEFINED_FACE",1:"DOWN",2:"UP",3:"NORTH",4:"SOUTH",5:"WEST",6:"EAST",UNDEFINED_FACE:0,DOWN:1,UP:2,NORTH:3,SOUTH:4,WEST:5,EAST:6},this.proto2.util.setEnumType(this.PBEnumFacing,"PBEnumFacing",[{no:0,name:"UNDEFINED_FACE"},{no:1,name:"DOWN"},{no:2,name:"UP"},{no:3,name:"NORTH"},{no:4,name:"SOUTH"},{no:5,name:"WEST"},{no:6,name:"EAST"}])},createPacketClass(r,e=[]){let t=this.$Message2,o=this.proto2,i=class extends t{constructor(n){super(),o.util.initPartial(n,this)}static fromBinary(n,l){return new i().fromBinary(n,l)}static fromJson(n,l){return new i().fromJson(n,l)}static fromJsonString(n,l){return new i().fromJsonString(n,l)}static equals(n,l){return o.util.equals(i,n,l)}};return i.typeName=r,i.runtime=o,i.fields=o.util.newFieldList(()=>e),i},createPacket(r,e=[],t={}){let o=this.createPacketClass(r,e),i=new o(t);for(let n in t)i[n]=t[n];return i},sendPacket(r){let e=a.game.player,t=e.inventory.sendInventoryToServer,o=e.abilities.creative,i=e.inventory.main[e.inventory.currentItem];e.abilities.creative=!0,e.inventory.sendInventoryToServer=()=>r;try{a.game.controller.pickBlock.bind({getTargetedBlockState:function(){return h.fromBlockStateId(1)},findHotbarSlotForPickBlock:function(){return e.inventory.currentItem}})()}catch{}e.inventory.main[e.inventory.currentItem]=i,e.inventory.sendInventoryToServer=t,e.abilities.creative=o},fields:{PBFloatVector3:[{no:1,name:"x",kind:"scalar",T:2},{no:2,name:"y",kind:"scalar",T:2},{no:3,name:"z",kind:"scalar",T:2}],PBBlockPos:[{no:1,name:"x",kind:"scalar",T:17},{no:2,name:"y",kind:"scalar",T:17},{no:3,name:"z",kind:"scalar",T:17}],Vector3:[{no:1,name:"x",kind:"scalar",T:2},{no:2,name:"y",kind:"scalar",T:2},{no:3,name:"z",kind:"scalar",T:2}],get SPacketPlayerPosLook(){return[{no:1,name:"pos",kind:"message",T:W.Vector3,opt:!0},{no:2,name:"yaw",kind:"scalar",T:2,opt:!0},{no:3,name:"pitch",kind:"scalar",T:2,opt:!0},{no:4,name:"onGround",kind:"scalar",T:8}]}}},f=W;var s=class{constructor(e,t,o,i){this.name=e,this.category=t,this.options=o,this.keybind=i,this.waitingForBind=!1,this.isEnabled=!1,this.modes={},this.toggle=this.toggle.bind(this)}registerMode(e,t){this.modes[e]=t}onEnable(){}onDisable(){}onRender(){}beforeTick(){}afterTick(){}onSettingUpdate(){}onChunkAdded(){}onChunkRemoved(){}onGameEntered(){}onGameExited(){}onNoaTick(){}onPacket(e){}enable(){this.isEnabled=!0,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!0}),this.onEnable()}disable(){this.isEnabled=!1,c.emit("module.update",this),c.emit("module.toggle",{name:this.name,enabled:!1}),this.onDisable()}toggle(){this.isEnabled?this.disable():this.enable()}};var y=class extends s{constructor(){super("Criticals","Combat")}CRIT_OFFSETS=[.08,-.07840000152];onPacket(e){if(e.name=="SPacketUseEntity"&&e.data.action=="ATTACK")for(let t of this.CRIT_OFFSETS)f.sendPacket(f.createPacket("SPacketPlayerPosLook",f.fields.SPacketPlayerPosLook,{pos:new f.Vector3({x:a.game.player.pos.x,y:a.game.player.pos.y+t,z:a.game.player.pos.z}),onGround:!1}))}};var G={normalizeVector(r){let e=r.x*r.x+r.y*r.y+r.z*r.z;if(e>0){let t=1/Math.sqrt(e);return[r.x*t,r.y*t,r.z*t]}return r},distanceBetween(r,e){let t=e.x-r.x,o=e.y-r.y,i=e.z-r.z;return t*t+o*o+i*i},distanceBetweenSqrt(r,e){return Math.sqrt(this.distanceBetween(r,e))}};var k=class extends s{constructor(){super("Killaura","Combat",{Delay:100,"Auto Block":"true"}),this.lastExecutionTime=null,this.blocking=!1}ignoreEntities=["EntityItem","EntityXPOrb"];afterTick(){let e=Date.now();e-this.lastExecutionTime>=this.options.Delay&&(this.lastExecutionTime=e,this.tryKill())}block(){a.game.controller.sendUseItem(a.game.player,a.game.world,a.game.player.inventory.getCurrentItem()),this.blocking=!0}unblock(){a.game.controller.onStoppedUsingItem(a.game.player),this.blocking=!1}tryKill(){let e=!1,t=ballcrack.hooks.game.player.inventory.getCurrentItem()?.item?.constructor?.name,o=this.options["Auto Block"]=="true";t!=="ItemSword"&&(o=!1),a.game.world.loadedEntityList.forEach(i=>{let n=G.distanceBetween(i.pos,a.game.player.pos);a.game.player.id!==i.id&&n<14&&!this.ignoreEntities.includes(i.constructor.name)&&(e=!0,o&&this.unblock(),a.game.controller.objectMouseOver.hitVec=i.pos.clone(),a.game.controller.attackEntity(i),o&&this.block())}),e||o&&this.unblock()}};var w=class extends s{constructor(){super("ChatBypass","Misc")}onPacket(e){e.name=="SPacketMessage"&&(e.data.text=e.data.text.split(" ").map(t=>`${t.charAt(0)}\\${t.slice(1)}`).join(" "))}};var v=class extends s{constructor(){super("NoFall","Misc")}afterTick(){a.game.player.motion.y<-.5&&!a.game.player.jumping&&(a.game.player.onGround=!0,a.game.player.sendPositionAndRotation(),a.game.player.onGround=!1)}};var C=class extends s{constructor(){super("PacketLogger","Misc",{})}trimName(e){return e.substring(0,15)}onPacket(e){let t=this.trimName(e.name);this.options[t]||(this.options[t]="true",b.modules.ClickGUI.panels.find(o=>o.title==this.category).refreshModuleSettings()),this.options[t]=="true"&&console.log(e.name,e.data)}};var E=class extends s{constructor(){super("SelfHarm","Misc")}onEnable(){a.game.controller.objectMouseOver.hitVec=a.game.player.pos.clone(),a.game.controller.attackEntity(a.game.player),this.disable()}};var B=class extends s{constructor(){super("ViewCmdBlockCode","Misc")}get CommandBlockLogic(){return Blocks.command_block.createNewTileEntity().commandBlockLogic.constructor.prototype}onEnable(){this._tryOpenEditCommandBlock=this._tryOpenEditCommandBlock||this.CommandBlockLogic.tryOpenEditCommandBlock,this.CommandBlockLogic.tryOpenEditCommandBlock=function(e){e.openEditCommandBlock(this)}}onDisable(){this.CommandBlockLogic.tryOpenEditCommandBlock=this._tryOpenEditCommandBlock}};var S=class extends s{constructor(){super("Airjump","Movement",null)}beforeTick(){a.game.player.jumping&&(a.game.player.onGround=!0)}};var T=class extends s{constructor(){super("HighJump","Movement",{"Jump Velocity":.6})}onEnable(){a.game.player.initialJumpVelocity=parseFloat(this.options["Jump Velocity"])}onDisable(){a.game.player.initialJumpVelocity=.42}};var H=34,Y=1,P=class extends s{constructor(){super("Jesus","Movement",null)}onEnable(){let e=h.fromBlockStateId(H).manager,t=h.fromBlockStateId(Y).manager.block.constructor;this.waterBlock||(this.waterBlock=e.block),e.block=new t,e.block.id=H,e.block.isReplaceable=!0,e.block.transparent=!0,e.block.fullBlock=!1}onDisable(){let e=h.fromBlockStateId(H).manager;e.block=this.waterBlock}};var M=class extends s{constructor(){super("Phase","Movement",null)}onEnable(){a.game.player.height=0}onDisable(){a.game.player.height=1.8}};var U={placeBlock(r,e,t){a.game.controller.onPlayerRightClick({sneak:!1,getActiveItemStack:()=>null,mode:{isSpectator:()=>!1}},{getBlockState:function(){return{getBlock:function(){return{onBlockActivated:function(){}}}}}},{item:{canPlaceBlockOnSide:()=>!1,isItemBlock:()=>!0}},r,{toProto:()=>e},t)}};var O=class extends s{constructor(){super("Scaffold","Movement",{"Client Place":!0,Extend:3})}tryPlace(e,t,o){let i=a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState,n=new h.BlockPos(e,t,o);a.game.world.getBlockState(n)?.id===0&&(this.options["Client Place"]&&a.game.world.setBlockState(n,i),U.placeBlock(n,1,{x:0,y:0,z:0}))}afterTick(){if(!a.game.player.inventory.getCurrentItem()?.item?.block?.defaultState)return;let t=a.game.player.pos.clone().floor(),o=a.game.player.yaw,i=-Math.sin(o),n=-Math.cos(o);if(this.tryPlace(t.x,t.y-1,t.z),!a.game.player.onGround)return;let l=parseInt(this.options.Extend);for(let d=1;d<=l;d++){let u=Math.floor(t.x+i*d+.5),g=t.y-1,m=Math.floor(t.z+n*d+.5);this.tryPlace(u,g,m)}}};var A=class extends s{constructor(){super("Speed","Movement",{"Air Speed":.03})}onEnable(){a.game.player.speedInAir=parseFloat(this.options["Air Speed"])}onDisable(){a.game.player.speedInAir=.02}};var L=class extends s{constructor(){super("Spider","Movement",{"Climb Speed":.2})}afterTick(){a.game.player.isCollidedHorizontally&&(a.game.player.motion.y=parseFloat(this.options["Climb Speed"]))}};var I=class extends s{constructor(){super("Step","Movement",{Height:2})}onEnable(){a.game.player.stepHeight=parseFloat(this.options.Height)}onDisable(){a.game.player.stepHeight=.6}};var x={parseRGBString(r){let e=r.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","").replaceAll(" ","").split(",");return{r:parseFloat(e?.[0]||1),g:parseFloat(e?.[1]||1),b:parseFloat(e?.[2]||1),a:parseFloat(e?.[3]||1)}},normalizeColor(r){return r?r.r<=1&&r.g<=1&&r.b<=1?r:{r:r.r/255,g:r.g/255,b:r.b/255}:{r:1,g:1,b:1}},hexToRGBA(r,e=1,t=1){let o=r.startsWith("#")?r.substring(1):r;o.length===3&&(o=o.split("").map(d=>d+d).join(""));let i=parseInt(o.substring(0,2),16)*t,n=parseInt(o.substring(2,4),16)*t,l=parseInt(o.substring(4,6),16)*t;return`rgba(${Math.round(i)}, ${Math.round(n)}, ${Math.round(l)}, ${e})`},hexToRgb(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}};var p={instance:null,get wrapper(){if(!this.instance){let r=document.createElement("iframe");document.body.appendChild(r);let e=r.contentWindow.Element.prototype.attachShadow;r.remove();let t=document.createElement("div");this.root=e.apply(t,[{mode:"closed"}]);let o=document.createElement("div");this.root.appendChild(o),this.instance=o,document.body.appendChild(t)}return this.instance}};var D=class extends s{constructor(){super("Arraylist","Visual",{Opacity:1,"Background Opacity":.1,"Darkness Multiplier":.3,"Accent Darkness":.5,Blur:1}),this.namesMap={},this.arraylistContainer=null,this.initialized=!1}getAccentColors(){let e=getComputedStyle(p.wrapper);return["--Ballcrack-accent-color-1","--Ballcrack-accent-color-2"].map(t=>e.getPropertyValue(t).trim())}update(e,t){if(t){if(!this.namesMap[e]){let i=document.createElement("div"),n=this.getAccentColors(),l=parseFloat(this.options["Background Opacity"]),d=parseFloat(this.options["Darkness Multiplier"]),u=parseFloat(this.options["Accent Darkness"]),g=parseFloat(this.options.Blur);i.style.background=`linear-gradient(to right, ${x.hexToRGBA(n[0],l,u)}, ${x.hexToRGBA(n[1],l+.2,u+.2)})`,i.style.backdropFilter=`blur(${g}px) brightness(${d})`,i.style.color="white",i.style.padding="2px 10px",i.style.display="flex",i.style.alignItems="center",i.style.boxSizing="border-box",i.style.margin="0",i.style.lineHeight="1",i.style.gap="0",i.style.fontFamily="'Product Sans', sans-serif",i.style.boxShadow="rgb(0, 0, 0, 0.05) -5px 1px",i.style.transition="opacity 0.2s ease-in-out, max-height 0.2s ease-in-out",i.style.overflow="hidden",i.style.maxHeight="0",i.style.opacity=parseFloat(this.options.Opacity);let m=document.createElement("span");m.style.fontWeight="800",m.style.fontSize="16px",m.style.backgroundImage="var(--Ballcrack-accent-color)",m.style.color="transparent",m.style.backgroundClip="text",m.style.webkitBackgroundClip="text",m.innerHTML=e,i.appendChild(m),this.arraylistContainer.appendChild(i),setTimeout(()=>{i.style.maxHeight="50px",i.style.opacity="1"},1),this.namesMap[e]=i}}else if(this.namesMap[e]){let i=this.namesMap[e];i.style.maxHeight="0",i.style.opacity="0",setTimeout(()=>{this.arraylistContainer.contains(i)&&this.arraylistContainer.removeChild(i),delete this.namesMap[e]},200)}let o=Object.values(this.namesMap).sort((i,n)=>this.measureElementWidth(n)-this.measureElementWidth(i));this.arraylistContainer.innerHTML="",o.forEach(i=>this.arraylistContainer.appendChild(i))}onEnable(){this.initialized?this.arraylistContainer.style.opacity="1":(this.arraylistContainer=document.createElement("div"),this.arraylistContainer.style.flexDirection="column",this.arraylistContainer.style.display="flex",this.arraylistContainer.style.gap="0",this.arraylistContainer.style.lineHeight="0",this.arraylistContainer.style.position="absolute",this.arraylistContainer.style.zIndex="99999",this.arraylistContainer.style.right="5px",this.arraylistContainer.style.top="5px",this.arraylistContainer.style.alignItems="flex-end",this.arraylistContainer.style.pointerEvents="none",this.arraylistContainer.style.textTransform="lowercase",this.arraylistContainer.style.border="2px solid transparent",this.arraylistContainer.style.borderImage="var(--Ballcrack-accent-color)",this.arraylistContainer.style.borderImageSlice="1",this.arraylistContainer.style.borderBottom="0",this.arraylistContainer.style.borderLeft="0",p.wrapper.appendChild(this.arraylistContainer),c.on("module.update",e=>{this.update(e.name,e.isEnabled)}),this.initialized=!0)}onSettingUpdate(e){if(e=="ClickGUI"||e=="Arraylist"){let t=this.getAccentColors(),o=parseFloat(this.options["Background Opacity"]),i=parseFloat(this.options["Darkness Multiplier"]),n=parseFloat(this.options["Accent Darkness"]),l=parseFloat(this.options.Blur);Object.values(this.namesMap).forEach(d=>{d.style.background=`linear-gradient(to right, ${x.hexToRGBA(t[0],o,n)}, ${x.hexToRGBA(t[1],o+.2,n+.2)})`,d.style.backdropFilter=`blur(${l}px) brightness(${i})`,d.style.opacity=parseFloat(this.options.Opacity)})}}measureElementWidth(e){return e.getBoundingClientRect().width}onDisable(){this.arraylistContainer.style.opacity="0"}};var z=class extends s{constructor(){super("Chams","Visual","")}onEnable(){let e=a.game.player.mesh.constructor.prototype;this._renderPlayers=this.__renderPlayers||e.render;let t=this;e.render=function(){for(let o in this.meshes)this.meshes[o].material.depthTest=!1,this.meshes[o].renderOrder=3;for(let o in this.armorMesh)this.armorMesh[o].material.depthTest=!1,this.armorMesh[o].renderOrder=4;if(this.capeMesh&&(this.capeMesh.children[0].material.depthTest=!1,this.capeMesh.children[0].renderOrder=5),this.hatMesh)for(let o of this.hatMesh.children[0].children)o.material&&(o.material.depthTest=!1,o.renderOrder=4);return t._renderPlayers.apply(this,arguments)}}onDisable(){let e=a.game.player.mesh.constructor.prototype;e.render=this._renderPlayers}};var _=class{constructor(e,t){this.module=e,this.container=t,this.components=[],this.renderedOptions=new Set,this.initialized=!1,this.isOpen=!1,this.activeDropdown=null,this.currentOptionsList=null,this.activeDropdownListeners=null}initialize(){if(this.initialized||!this.module?.options)return;this.settingsWrapper=document.createElement("div"),this.settingsWrapper.className="module-settings-wrapper",this.container.appendChild(this.settingsWrapper),this.settingsContainer=document.createElement("div"),this.settingsContainer.className="module-settings scrollable",this.settingsWrapper.appendChild(this.settingsContainer),this.container.style.position="relative";let e=Object.keys(this.module.options),t=this.groupSettings(e);this.createSettings(t),this.initialized=!0}groupSettings(e){return e.reduce((t,o)=>{let i=this.module.options[o],n=typeof i;return o.toLowerCase().includes("color")?t.color.push(o):this.module.modes&&this.module.modes[o]?t.mode.push(o):n==="boolean"||i==="true"||i==="false"?t.boolean.push(o):t.other.push(o),t},{boolean:[],mode:[],other:[],color:[]})}createSettings(e){[...e.boolean,...e.mode,...e.other,...e.color].forEach(t=>{if(this.renderedOptions.has(t))return;this.renderedOptions.add(t);let o=this.module.options[t],i=typeof o;t.toLowerCase().includes("color")?this.addColorPicker(t):this.module.modes&&this.module.modes[t]?this.addModeSelector(t):i==="boolean"||o==="true"||o==="false"?this.addCheckbox(t):i==="string"?this.addStringInput(t):this.addNumberInput(t)})}toggle(){this.isOpen=!this.isOpen,this.isOpen?(this.settingsWrapper.classList.add("module-settings-open"),this.checkPositionWithinViewport()):(this.settingsWrapper.classList.remove("module-settings-open"),this.closeAllDropdowns())}checkPositionWithinViewport(){let e=this.settingsWrapper.getBoundingClientRect();if(e.bottom>window.innerHeight){let t=e.bottom-window.innerHeight;this.settingsWrapper.style.maxHeight=`${e.height-t-10}px`}}closeAllDropdowns(){document.querySelectorAll(".gui-dropdown-options").forEach(e=>{p.wrapper.contains(e)&&p.wrapper.removeChild(e)}),this.activeDropdownListeners&&(document.removeEventListener("click",this.activeDropdownListeners.outsideClickHandler),window.removeEventListener("scroll",this.activeDropdownListeners.hideDropdown,!0),window.removeEventListener("resize",this.activeDropdownListeners.hideDropdown,!0),this.activeDropdownListeners=null),this.activeDropdown&&(this.activeDropdown.classList.remove("open"),this.activeDropdown=null),this.currentOptionsList=null}addNumberInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-number";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("input");i.type="text",i.className="gui-text-input number-input",i.value=this.module.options[e],i.addEventListener("input",()=>{let n=i.value.trim();!isNaN(n)&&n!==""&&(this.module.options[e]=n,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:n}))}),t.append(o,i),this.settingsContainer.appendChild(t),this.components.push(t)}addStringInput(e){let t=document.createElement("div");t.className="gui-setting-container setting-string";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("input");i.type="text",i.className="gui-text-input string-input",i.value=this.module.options[e],i.addEventListener("input",()=>{this.module.options[e]=i.value,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:i.value})}),t.append(o,i),this.settingsContainer.appendChild(t),this.components.push(t)}addCheckbox(e){let t=document.createElement("div");t.className="gui-setting-container setting-boolean";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-checkbox",i.classList.toggle("enabled",this.module.options[e]===!0||this.module.options[e]==="true"),t.addEventListener("click",()=>{let n=!(this.module.options[e]===!0||this.module.options[e]==="true");this.module.options[e]=n.toString(),i.classList.toggle("enabled",n),c.emit("setting.update",{moduleName:this.module.name,setting:e,value:n.toString()})}),t.append(o,i),this.settingsContainer.appendChild(t),this.components.push(t)}addColorPicker(e){let t=document.createElement("div");t.className="gui-setting-container setting-color";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-color-picker",i.style.background=this.module.options[e];let n=document.createElement("input");n.type="color",n.value=this.rgbToHex(this.module.options[e]),n.addEventListener("input",l=>{i.style.background=l.target.value,this.module.options[e]=l.target.value,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:l.target.value})}),i.appendChild(n),t.append(o,i),this.settingsContainer.appendChild(t),this.components.push(t)}addModeSelector(e){let t=document.createElement("div");t.className="gui-setting-container setting-mode";let o=document.createElement("div");o.className="gui-setting-label",o.textContent=e;let i=document.createElement("div");i.className="gui-dropdown";let n=document.createElement("div");n.className="gui-dropdown-selected",n.textContent=this.module.options[e],i.appendChild(n),i.addEventListener("click",l=>{l.stopPropagation(),this.closeAllDropdowns();let d=document.createElement("div");d.className="gui-dropdown-options",this.module.modes[e].forEach(u=>{let g=document.createElement("div");g.textContent=u,g.addEventListener("click",()=>{this.module.options[e]=u,n.textContent=u,c.emit("setting.update",{moduleName:this.module.name,setting:e,value:u}),this.closeAllDropdowns()}),d.appendChild(g)}),p.wrapper.appendChild(d),this.currentOptionsList=d,this.activeDropdown=i}),t.append(o,i),this.settingsContainer.appendChild(t),this.components.push(t)}refresh(){if(!this.initialized)return;let e=Object.keys(this.module.options).filter(t=>!this.renderedOptions.has(t));if(e.length){let t=this.groupSettings(e);this.createSettings(t)}for(let t of this.components){let o=t.querySelector(".gui-setting-label")?.textContent;if(!(o in this.module.options))continue;let i=this.module.options[o],n=t.querySelector(".gui-checkbox");if(n){n.classList.toggle("enabled",i===!0||i==="true");continue}let l=t.querySelector(".gui-dropdown-selected");if(l){l.textContent=i;continue}let d=t.querySelector("input");if(d){d.value=i;continue}let u=t.querySelector(".gui-color-picker");u&&(u.style.background=i)}}rgbToHex(e){if(!e)return"#000000";if(e.startsWith("#"))return e;let t=e.match(/(\d+),\s*(\d+),\s*(\d+)/);return t?"#"+((1<<24)+(+t[1]<<16)+(+t[2]<<8)+ +t[3]).toString(16).slice(1):"#000000"}};var F=class{constructor(e,t={top:"200px",left:"200px"}){this.title=e,this.panel=document.createElement("div"),this.panel.className="gui-panel",this.panel.style.top=t.top,this.panel.style.left=t.left,this.header=document.createElement("div"),this.header.className="gui-header",this.header.textContent=e,this.panel.appendChild(this.header),p.wrapper.appendChild(this.panel),this.buttons=[],this.settings=[],this.setupDragHandling()}setupDragHandling(){let e=!1,t={x:0,y:0};this.header.addEventListener("mousedown",o=>{e=!0,t.x=o.clientX-this.panel.offsetLeft,t.y=o.clientY-this.panel.offsetTop}),document.addEventListener("mousemove",o=>{e&&(this.panel.style.left=o.clientX-t.x+"px",this.panel.style.top=o.clientY-t.y+"px")}),document.addEventListener("mouseup",()=>e=!1)}addButton(e){let t=document.createElement("div");t.className="gui-button-container";let o=document.createElement("div");o.className=`gui-button ${e.isEnabled?"enabled":""}`,o.textContent=e.name;let i=new _(e,t);return this.settings.push(i),o.addEventListener("mousedown",n=>{n.button===0&&(e.toggle(),o.classList.toggle("enabled",e.isEnabled)),n.button===1&&(o.textContent="waiting for bind..",e.waitingForBind=!0)}),o.addEventListener("contextmenu",n=>{n.preventDefault(),i.initialize(),i.toggle()}),o.setAttribute("tabindex",-1),o.addEventListener("keydown",n=>{o.textContent=e.name,e.waitingForBind&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation(),e.keybind=n.key==="Escape"?null:String(n.code),e.waitingForBind=!1)}),t.appendChild(o),this.panel.appendChild(t),this.buttons.push(o),o}refreshModuleSettings(){for(let e of this.settings)typeof e.refresh=="function"&&e.refresh()}show(){this.panel.style.display="block"}hide(){this.panel.style.display="none"}};var N=class extends s{constructor(){super("ClickGUI","Visual",{"Accent Color 1":"#40beffff","Accent Color 2":"#81e1ffff","Button Color":"rgb(40, 40, 40, 0.9)","Hover Color":"rgb(50, 50, 50, 0.9)","Header Color":"rgb(0, 0, 0, 0.85)","Panel Color":"rgb(18 18 18)","Text Color":"#ffffff","Glow Alpha":"0.8","Enable Animations":!0},"ShiftRight"),this.GUILoaded=!1,this.panels=[],this.blurredBackground=null,this.updateColors()}updateAnimations(){this.options["Enable Animations"]?p.wrapper.classList.add("with-animations"):p.wrapper.classList.remove("with-animations")}updateColors(){let e=`linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`;p.wrapper.style.setProperty("--Ballcrack-accent-color",e),p.wrapper.style.setProperty("--Ballcrack-accent-color",e),p.wrapper.style.setProperty("--Ballcrack-accent-color-1",this.options["Accent Color 1"]),p.wrapper.style.setProperty("--Ballcrack-accent-color-2",this.options["Accent Color 2"]),p.wrapper.style.setProperty("--Ballcrack-button-color",this.options["Button Color"]),p.wrapper.style.setProperty("--button-color",this.options["Button Color"]),p.wrapper.style.setProperty("--hover-color",this.options["Hover Color"]),p.wrapper.style.setProperty("--header-bg",this.options["Header Color"]),p.wrapper.style.setProperty("--panel-bg",this.options["Panel Color"]),p.wrapper.style.setProperty("--text-color",this.options["Text Color"]),p.wrapper.style.setProperty("--glow-color",x.hexToRGBA(this.options["Accent Color 1"],parseFloat(this.options["Glow Alpha"]),1.2))}onEnable(){document.pointerLockElement&&document.exitPointerLock(),this.GUILoaded?(this.showGUI(),this.updateAnimations()):(this.setupBackground(),this.createPanels(),this.setupEventListeners(),this.GUILoaded=!0,this.updateAnimations())}setupBackground(){this.blurredBackground=document.createElement("div"),this.blurredBackground.className="gui-background",p.wrapper.appendChild(this.blurredBackground)}createPanels(){let e=[{title:"Combat",position:{top:"100px",left:"100px"}},{title:"Movement",position:{top:"100px",left:"338px"}},{title:"Visual",position:{top:"100px",left:"576px"}},{title:"World",position:{top:"100px",left:"814px"}},{title:"Misc",position:{top:"100px",left:"1052px"}}];this.panels.forEach(o=>{o.panel&&o.panel.parentNode&&o.panel.parentNode.removeChild(o.panel)}),this.panels=[],e.forEach(o=>{let i=new F(o.title,o.position);this.panels.push(i)});let t={};Object.values(b.modules).forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)}),Object.entries(t).forEach(([o,i])=>{let n=this.panels.find(d=>d.header.textContent===o);if(!n)return;let l=document.createElement("span");l.style.visibility="hidden",l.style.position="absolute",l.style.font="'Product Sans', sans-serif",p.wrapper.appendChild(l),i.sort((d,u)=>{l.textContent=d.name;let g=l.getBoundingClientRect().width;return l.textContent=u.name,l.getBoundingClientRect().width-g}),l.remove(),i.forEach(d=>n.addButton(d))})}setupEventListeners(){c.on("module.update",e=>{let t=this.panels.find(i=>i.header.textContent===e.category);if(!t)return;let o=t.buttons.find(i=>i.textContent===e.name);o&&o.classList.toggle("enabled",e.isEnabled)})}showGUI(){this.panels.forEach(e=>e.show()),this.blurredBackground.style.display="block"}returnToGame(){}onDisable(){this.panels.forEach(e=>e.hide()),this.blurredBackground.style.display="none",this.returnToGame()}onSettingUpdate(){this.updateColors(),this.updateAnimations()}};var R=class extends s{constructor(){super("Watermark","Visual",{Text:"Ballcrack"},""),this.watermarkElement=null,this.mainText=null}onSettingUpdate(){this.mainText&&(this.mainText.textContent=this.options.Text)}onEnable(){if(!this.watermarkElement){let e=document.createElement("div");e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.padding="0.5em",e.style.userSelect="none",e.style.display="flex",e.style.zIndex="999999",e.style.fontFamily="'Product Sans', sans-serif",e.style.fontSize="24px",e.style.backgroundClip="text",e.style.webkitFontSmoothing="antialiased",e.style.webkitTextFillColor="transparent",e.style.textShadow="var(--Ballcrack-accent-color) 0px 0px 10px",e.style.background="var(--Ballcrack-accent-color)",e.style.backgroundClip="text",this.mainText=document.createElement("span"),this.mainText.textContent="Ballcrack";let t=document.createElement("span");t.textContent="v1",t.style.fontSize="14px",t.style.paddingBottom="15px",t.style.marginLeft="4px",t.style.alignSelf="flex-end",e.appendChild(this.mainText),e.appendChild(t),p.wrapper.appendChild(e),this.watermarkElement=e}this.watermarkElement.style.display="flex"}onDisable(){this.watermarkElement.style.display="none"}};var b={modules:{},addModules:function(...r){for(let e of r){let t=new e;this.modules[t.name]=t}},addModule:function(r){this.modules[r.name]=r},handleKeyPress:function(r){for(let e in this.modules){let t=this.modules[e];t.waitingForBind?(t.keybind=r,t.waitingForBind=!1):r&&t.keybind==r&&t.toggle()}},init(){this.addModules(R,N,D,z,S,M,I,T,A,O,L,P,k,y,E,v,w,C,B),c.on("render",()=>{for(let r in this.modules)this.modules[r].isEnabled&&this.modules[r].onRender()}),c.on("beforeTick",()=>{for(let r in this.modules)this.modules[r].isEnabled&&this.modules[r].beforeTick()}),c.on("afterTick",()=>{for(let r in this.modules)this.modules[r].isEnabled&&this.modules[r].afterTick()}),c.on("packet",r=>{for(let e in this.modules)this.modules[e].isEnabled&&this.modules[e].onPacket(r)}),c.on("keydown",this.handleKeyPress.bind(this)),c.on("setting.update",r=>{for(let e in this.modules)(this.modules[e].isEnabled||r.moduleName===e)&&this.modules[e].onSettingUpdate(r.moduleName,r.setting,r.value)}),this.modules.Arraylist.enable(),this.modules.Watermark.enable()}};var V=`:host {\r
    --Ballcrack-accent-color: linear-gradient(90deg, rgb(64, 190, 255) 0%, rgb(129, 225, 255) 100%);\r
    --Ballcrack-accent-color: linear-gradient(90deg, rgb(64, 190, 255) 0%, rgb(129, 225, 255) 100%);\r
    --button-color: rgb(40, 40, 40, 0.9);\r
    --hover-color: rgb(50, 50, 50, 0.9);\r
    --panel-bg: rgb(18, 18, 18, 0.95);\r
    --header-bg: rgb(0, 0, 0, 0.85);\r
    --text-color: #ffffff;\r
    --header-text-size: 24px;\r
    --button-text-size: 18px;\r
    --setting-text-size: 15px;\r
    --animation-scale: 1;\r
    --border-radius: 6px;\r
    --shadow-color: rgba(0, 0, 0, 0.5);\r
    --transition-timing: cubic-bezier(0.19, 1, 0.22, 1);\r
    --spring-easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);\r
    --bounce-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);\r
    --elastic-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);\r
    --standard-easing: cubic-bezier(0.4, 0, 0.2, 1);\r
    --decelerate-easing: cubic-bezier(0, 0, 0.2, 1);\r
    --accelerate-easing: cubic-bezier(0.4, 0, 1, 1);\r
    --hover-transition-duration: 120ms;\r
    --panel-appear-duration: 300ms;\r
    --button-appear-duration: 200ms;\r
    --setting-appear-duration: 200ms;\r
    --background-appear-duration: 250ms;\r
    --glow-color: rgba(64, 190, 255, 0.4);\r
    --scroller-size: 4px;\r
    --blur-intensity: 10px;\r
\r
    text-shadow: none; /* miniblox global css override */\r
}\r
\r
.gui-panel {\r
    position: fixed;\r
    z-index: 1000;\r
    width: 215px;\r
    border-radius: var(--border-radius);\r
    background-color: var(--panel-bg);\r
    box-shadow: 0 8px 24px var(--shadow-color),\r
                0 0 0 1px rgba(255, 255, 255, 0.05),\r
                0 0 40px rgba(0, 0, 0, 0.2);\r
    transform-style: preserve-3d;\r
    font-family: 'Inter', sans-serif;\r
    color: var(--text-color);\r
    overflow: hidden;\r
    border: 1px solid rgba(255, 255, 255, 0.05);\r
    backdrop-filter: blur(var(--blur-intensity));\r
    will-change: transform, opacity;\r
    transform: perspective(1200px);\r
    backface-visibility: hidden;\r
    user-select: none;\r
    -webkit-user-select: none;\r
    -moz-user-select: none;\r
    -ms-user-select: none;\r
}\r
\r
.gui-panel.dragging {\r
    animation: none !important;\r
    transition: none !important;\r
    will-change: transform;\r
}\r
\r
.with-animations .gui-panel.dragging {\r
    transition: transform 0.2s ease, box-shadow 0.2s ease;\r
    transform: scale(1.05);\r
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);\r
}\r
\r
.gui-header {\r
    background-color: var(--header-bg);\r
    height: 40px;\r
    font-weight: 600;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    font-size: var(--header-text-size);\r
    cursor: grab;\r
    backdrop-filter: blur(5px);\r
    position: relative;\r
    letter-spacing: 0.5px;\r
    will-change: transform;\r
}\r
\r
.gui-header:active {\r
    cursor: grabbing;\r
}\r
\r
.gui-button {\r
    height: 35px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    box-sizing: border-box;\r
    cursor: pointer;\r
    font-size: var(--button-text-size);\r
    font-weight: 400;\r
    outline: none;\r
    background: var(--button-color);\r
    color: var(--text-color);\r
    position: relative;\r
    overflow: hidden;\r
    letter-spacing: 0.3px;\r
    will-change: transform, background-color, box-shadow;\r
    transition: transform var(--hover-transition-duration) var(--spring-easing),\r
                background-color var(--hover-transition-duration) var(--standard-easing),\r
                box-shadow var(--hover-transition-duration) var(--standard-easing);\r
}\r
\r
.gui-button.enabled {\r
    background: var(--Ballcrack-accent-color);\r
    font-weight: 500;\r
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\r
    box-shadow: 0 0 16px var(--glow-color);\r
}\r
\r
.gui-button:not(.enabled):hover {\r
    background: var(--hover-color);\r
    transform: none;\r
    box-shadow: none;\r
}\r
\r
.gui-background {\r
    position: fixed;\r
    left: 0;\r
    top: 0;\r
    z-index: 999;\r
    height: 100%;\r
    width: 100%;\r
    backdrop-filter: blur(0px);\r
    background: rgba(0, 0, 0, 0);\r
    transition: backdrop-filter 300ms var(--decelerate-easing),\r
                background-color 300ms var(--decelerate-easing);\r
    will-change: backdrop-filter, background-color;\r
    pointer-events: auto;\r
}\r
\r
.gui-button-container {\r
    background-color: var(--panel-bg);\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.gui-setting-container {\r
    margin-bottom: 12px;\r
    padding: 10px;\r
    background: rgba(30, 30, 30, 0.4);\r
    border-radius: 4px;\r
    width: 100%;\r
    box-sizing: border-box;\r
    transition: background 0.2s ease;\r
}\r
\r
.gui-setting-container:hover {\r
    background: rgba(35, 35, 35, 0.5);\r
}\r
\r
.gui-setting-container .gui-setting-label {\r
    font-size: 14px;\r
    font-weight: 500;\r
    color: rgba(255, 255, 255, 0.85);\r
    margin-bottom: 6px;\r
}\r
\r
.setting-boolean {\r
    display: flex;\r
    flex-direction: row;\r
    align-items: center;\r
    justify-content: space-between;\r
    cursor: pointer;\r
    padding: 10px 12px;\r
}\r
\r
.setting-boolean .gui-setting-label {\r
    margin-bottom: 0;\r
    flex: 1;\r
}\r
\r
.checkbox-container {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    position: relative;\r
}\r
\r
.gui-checkbox {\r
    position: relative;\r
    width: 22px;\r
    height: 22px;\r
    border-radius: 6px;\r
    background: linear-gradient(145deg, #2a2a2a, #222222);\r
    cursor: pointer;\r
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), \r
                inset 0 -1px 3px rgba(0, 0, 0, 0.2);\r
    transition: all 0.3s var(--spring-easing);\r
    overflow: hidden;\r
}\r
\r
.gui-checkbox:hover {\r
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2),\r
                0 2px 6px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-checkbox.enabled {\r
    background: var(--Ballcrack-accent-color);\r
    transform: scale(1.05);\r
    box-shadow: 0 0 12px var(--glow-color),\r
                inset 0 -1px 3px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-checkbox.enabled::after {\r
    content: '';\r
    position: absolute;\r
    display: block;\r
    width: 6px;\r
    height: 12px;\r
    border: solid white;\r
    border-width: 0 2px 2px 0;\r
    top: 2px;\r
    left: 7px;\r
    transform: rotate(45deg);\r
    animation: checkmark-pulse 0.5s var(--spring-easing) forwards;\r
}\r
\r
.gui-checkbox.enabled::before {\r
    content: "";\r
    position: absolute;\r
    top: 50%;\r
    left: 50%;\r
    width: 120%;\r
    height: 120%;\r
    background: radial-gradient(\r
        circle,\r
        rgba(255, 255, 255, 0.5),\r
        transparent 80%\r
    );\r
    transform: translate(-50%, -50%) scale(0);\r
    opacity: 0;\r
    border-radius: 50%;\r
    animation: checkbox-sparkle 0.6s ease-out forwards;\r
}\r
\r
@keyframes checkmark-pulse {\r
    0% {\r
        transform: scale(0) rotate(45deg);\r
        opacity: 0;\r
    }\r
    70% {\r
        transform: scale(1.1) rotate(45deg);\r
        opacity: 1;\r
    }\r
    100% {\r
        transform: scale(1) rotate(45deg);\r
        opacity: 1;\r
    }\r
}\r
\r
@keyframes checkbox-sparkle {\r
    0% {\r
        transform: translate(-50%, -50%) scale(0);\r
        opacity: 0.5;\r
    }\r
    70% {\r
        transform: translate(-50%, -50%) scale(1);\r
        opacity: 0.8;\r
    }\r
    100% {\r
        transform: translate(-50%, -50%) scale(0);\r
        opacity: 0;\r
    }\r
}\r
\r
.setting-string, .setting-number {\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.string-input-container, .number-input-container {\r
    width: 100%;\r
}\r
\r
.gui-text-input {\r
    width: 100%;\r
    height: 30px;\r
    background: rgba(40, 40, 40, 0.9);\r
    border: 1px solid rgba(60, 60, 60, 0.8);\r
    border-radius: 4px;\r
    color: rgba(255, 255, 255, 0.9);\r
    padding: 0 10px;\r
    font-size: 13px;\r
    box-sizing: border-box;\r
    transition: all 0.2s ease;\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-text-input:hover {\r
    border-color: rgba(80, 80, 80, 0.9);\r
    background: rgba(45, 45, 45, 0.9);\r
}\r
\r
.gui-text-input:focus {\r
    border-color: rgba(100, 100, 100, 1);\r
    background: rgba(50, 50, 50, 0.9);\r
    outline: none;\r
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.setting-color {\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
.gui-color-row {\r
    display: flex;\r
    width: 100%;\r
    gap: 8px;\r
}\r
\r
.color-picker-container {\r
    position: relative;\r
    width: 40px;\r
    height: 30px;\r
}\r
\r
.gui-color-picker {\r
    width: 100%;\r
    height: 100%;\r
    border-radius: 4px;\r
    position: relative;\r
    cursor: pointer;\r
    border: 1px solid rgba(60, 60, 60, 0.8);\r
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r
    transition: border-color 0.2s ease, box-shadow 0.2s ease;\r
}\r
\r
.gui-color-picker:hover {\r
    border-color: rgba(80, 80, 80, 0.9);\r
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-color-input {\r
    position: absolute;\r
    width: 100%;\r
    height: 100%;\r
    opacity: 0;\r
    cursor: pointer;\r
}\r
\r
.color-text-input {\r
    flex: 1;\r
}\r
\r
.module-settings-wrapper {\r
    display: none;\r
    background-color: rgba(20, 20, 20, 0.9);\r
    border-radius: 5px;\r
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
    margin-top: 5px;\r
    padding: 0 8px;\r
    box-sizing: border-box;\r
    max-height: 0;\r
    overflow: hidden;\r
    opacity: 0;\r
    transition: max-height 500ms linear, \r
                opacity 500ms linear, \r
                padding 500ms linear;\r
    will-change: max-height, opacity, padding;\r
}\r
\r
.module-settings-wrapper.module-settings-open {\r
    display: block;\r
    max-height: 400px;\r
    opacity: 1;\r
    padding: 8px;\r
}\r
\r
.module-settings {\r
    overflow-y: auto;\r
    overflow-x: hidden;\r
    scroll-behavior: smooth;\r
    -webkit-overflow-scrolling: touch;\r
    scrollbar-width: none;\r
    -ms-overflow-style: none;\r
}\r
\r
.module-settings::-webkit-scrollbar {\r
    display: none;\r
    width: 0;\r
    height: 0;\r
}\r
\r
.gui-text-input:focus, \r
.gui-color-picker:focus,\r
.gui-dropdown:focus {\r
    outline: none;\r
    box-shadow: 0 0 0 1px rgba(80, 80, 80, 1), 0 0 5px rgba(0, 0, 0, 0.3);\r
}\r
\r
.scrollable-container {\r
    scrollbar-width: thin;\r
    scrollbar-color: rgba(255, 255, 255, 0.1) rgba(0, 0, 0, 0.1);\r
}\r
\r
.scrollable-container::-webkit-scrollbar {\r
    width: var(--scroller-size);\r
    height: var(--scroller-size);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-track {\r
    background: rgba(0, 0, 0, 0.1);\r
    border-radius: 10px;\r
}\r
\r
.scrollable-container::-webkit-scrollbar-thumb {\r
    background: rgba(255, 255, 255, 0.1);\r
    border-radius: 10px;\r
    transition: background 300ms var(--standard-easing);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-thumb:hover {\r
    background: rgba(255, 255, 255, 0.2);\r
}\r
\r
.scrollable-container::-webkit-scrollbar-corner {\r
    background: transparent;\r
}\r
\r
.with-animations .gui-panel:not(.dragging) {\r
    animation: panelAppear var(--panel-appear-duration) var(--standard-easing) both;\r
    transform-origin: center center;\r
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);\r
}\r
\r
@keyframes panelAppear {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(30px) scale(0.95);\r
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0) scale(1);\r
        box-shadow: 0 8px 24px var(--shadow-color),\r
                    0 0 0 1px rgba(255, 255, 255, 0.05),\r
                    0 0 40px rgba(0, 0, 0, 0.2);\r
    }\r
}\r
\r
.with-animations .gui-background {\r
    animation: backgroundFadeIn var(--background-appear-duration) var(--standard-easing) forwards;\r
}\r
\r
@keyframes backgroundFadeIn {\r
    0% { \r
        opacity: 0; \r
        backdrop-filter: blur(0px); \r
        background: rgba(0, 0, 0, 0);\r
    }\r
    100% { \r
        opacity: 1; \r
        backdrop-filter: blur(8px); \r
        background: rgba(0, 0, 0, 0.4);\r
    }\r
}\r
\r
.with-animations .gui-setting-container {\r
    animation: settingReveal var(--setting-appear-duration) var(--standard-easing) both;\r
}\r
\r
@keyframes settingReveal {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(10px);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0);\r
    }\r
}\r
\r
.module-settings {\r
    max-height: 300px;\r
    overflow-y: auto;\r
    overflow-x: hidden;\r
    padding: 4px 5px;\r
    cursor: default;\r
    background: var(--panel-bg);\r
    border-radius: 4px;\r
    margin-top: 2px;\r
    will-change: transform, scroll-position;\r
    perspective: 1000px;\r
    backface-visibility: hidden;\r
}\r
\r
.module-settings-container {\r
    position: relative;\r
    padding: 0;\r
    background: var(--panel-bg);\r
    border-radius: 4px;\r
}\r
\r
.gui-dropdown {\r
    position: relative;\r
    width: 100%;\r
    height: 28px;\r
    background: rgba(30, 30, 30, 0.95);\r
    border-radius: 3px;\r
    border: 1px solid rgba(60, 60, 60, 0.7);\r
    cursor: pointer;\r
    transition: all 0.2s ease;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
}\r
\r
.gui-dropdown:hover {\r
    background: rgba(40, 40, 40, 1);\r
    border-color: rgba(60, 60, 60, 0.9);\r
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\r
}\r
\r
.gui-dropdown-selected {\r
    display: flex;\r
    align-items: center;\r
    height: 100%;\r
    padding: 0 8px;\r
    color: white;\r
    font-size: 13px;\r
    box-sizing: border-box;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    user-select: none;\r
}\r
\r
.gui-dropdown-arrow {\r
    width: 0;\r
    height: 0;\r
    margin-right: 10px;\r
    border-left: 4px solid transparent;\r
    border-right: 4px solid transparent;\r
    border-top: 5px solid rgba(255, 255, 255, 0.7);\r
    pointer-events: none;\r
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
\r
.gui-dropdown.open .gui-dropdown-arrow {\r
    transform: rotate(180deg);\r
    border-top-color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.gui-dropdown.open {\r
    background: rgba(40, 40, 40, 1);\r
    border-color: rgba(70, 70, 70, 1);\r
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);\r
}\r
\r
.gui-dropdown-options {\r
    position: fixed;\r
    z-index: 9999;\r
    background: rgba(35, 35, 35, 1);\r
    border-radius: 3px;\r
    width: 100%;\r
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);\r
    border: 1px solid rgba(70, 70, 70, 0.9);\r
    max-height: 150px;\r
    overflow-y: auto;\r
    scrollbar-width: none;\r
    -ms-overflow-style: none;\r
    transform-origin: top center;\r
    animation: dropdown-appear 180ms var(--spring-easing) forwards;\r
    will-change: transform, opacity;\r
}\r
\r
@keyframes dropdown-appear {\r
    from {\r
        opacity: 0;\r
        transform: translateY(-5px) scaleY(0.95);\r
    }\r
    to {\r
        opacity: 1;\r
        transform: translateY(0) scaleY(1);\r
    }\r
}\r
\r
.gui-dropdown-options::-webkit-scrollbar {\r
    display: none;\r
}\r
\r
.gui-dropdown-option {\r
    padding: 8px 10px;\r
    color: white;\r
    font-size: 13px;\r
    cursor: pointer;\r
    transition: background 0.15s ease, color 0.15s ease;\r
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\r
}\r
\r
.gui-dropdown-option:last-child {\r
    border-bottom: none;\r
}\r
\r
.gui-dropdown-option:hover {\r
    background: rgba(50, 50, 50, 0.9);\r
    color: rgba(255, 255, 255, 1);\r
}\r
\r
.gui-dropdown-option.selected {\r
    background: rgba(55, 55, 55, 0.9);\r
    color: rgba(255, 255, 255, 1);\r
    font-weight: 500;\r
}\r
\r
.gui-dropdown-option.selected:hover {\r
    background: rgba(60, 60, 60, 0.95);\r
}\r
\r
.dropdown-up {\r
    bottom: calc(100% + 1px);\r
    top: auto !important;\r
    transform-origin: bottom center;\r
    animation: dropdown-appear-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\r
}\r
\r
@keyframes dropdown-appear-up {\r
    from {\r
        opacity: 0;\r
        transform: translateY(5px) scaleY(0.95);\r
    }\r
    to {\r
        opacity: 1;\r
        transform: translateY(0) scaleY(1);\r
    }\r
}\r
\r
.with-animations .gui-button {\r
    animation: buttonReveal var(--button-appear-duration) var(--standard-easing) both;\r
}\r
\r
@keyframes buttonReveal {\r
    0% {\r
        opacity: 0;\r
        transform: translateY(8px);\r
    }\r
    100% {\r
        opacity: 1;\r
        transform: translateY(0);\r
    }\r
}\r
\r
@keyframes gui-panel-hide {\r
    0% {\r
        opacity: 1;\r
        transform: perspective(1200px) scale(1) translateY(0);\r
    }\r
    100% {\r
        opacity: 0;\r
        transform: perspective(1200px) scale(0.97) translateY(8px);\r
    }\r
}\r
\r
@keyframes gui-background-hide {\r
    0% {\r
        opacity: 1; \r
        backdrop-filter: blur(8px);\r
        background: rgba(0, 0, 0, 0.4);\r
    }\r
    100% { \r
        opacity: 0; \r
        backdrop-filter: blur(0px);\r
        background: rgba(0, 0, 0, 0);\r
    }\r
}\r
\r
input, textarea, [contenteditable="true"], .module-settings-wrapper {\r
    user-select: text !important;\r
    -webkit-user-select: text !important;\r
}\r
\r
.gui-button-container {\r
    user-select: none;\r
}`;function $(r){let e=document.createElement("style");e.textContent=r,p.wrapper.appendChild(e)}var j=new FontFace("Product Sans","url(https://fonts.gstatic.com/s/productsans/v19/pxiDypQkot1TnFhsFMOfGShVF9eO.woff2)",{style:"normal",weight:"400"});j.load().then(r=>document.fonts.add(r));var q=new FontFace("Inter","url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa.woff2)",{style:"normal",weight:"300"});q.load().then(r=>document.fonts.add(r));$(V);b.init();a.hookOnTick();f.init();document.addEventListener("keydown",r=>{c.emit("keydown",r.code)});setInterval(()=>{c.emit("render")},1e3/60);var J=!0;J&&(window.ballcrack={hooks:a,shadowWrapper:p,moduleManager:b,interactionUtils:U,blockUtils:h,packetUtils:f});})();
