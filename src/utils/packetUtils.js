import events from "../events";
import hooks from "../hooks";
import blockUtils from "./blockUtils";

export default {
    init () {
        let SPacketUpdateInventory = hooks.game.player.inventory.sendInventoryToServer();
        this.$Message2 = SPacketUpdateInventory.constructor.__proto__;
        this.proto2 = SPacketUpdateInventory.constructor.runtime;

        this._toJson = this.$Message2.prototype.toJson;
        let context = this;
        this.$Message2.prototype.toJson = function () {
            let retVal = context._toJson.apply(this, arguments);
            let packetName = this.getType().typeName;

            events.emit("packet", {
                name: packetName,
                data: retVal
            });
            
            return retVal;
        }

        this.PBFloatVector3 = this.createPacket("PBFloatVector3", this.fields.PBFloatVector3);
        this.PBBlockPos = this.createPacket("PBBlockPos", this.fields.PBBlockPos);

        this.PBAction = {
            "0": "START_DESTROY_BLOCK",
            "1": "ABORT_DESTROY_BLOCK",
            "2": "STOP_DESTROY_BLOCK",
            "3": "DROP_ALL_ITEMS",
            "4": "DROP_ITEM",
            "5": "RELEASE_USE_ITEM",
            "START_DESTROY_BLOCK": 0,
            "ABORT_DESTROY_BLOCK": 1,
            "STOP_DESTROY_BLOCK": 2,
            "DROP_ALL_ITEMS": 3,
            "DROP_ITEM": 4,
            "RELEASE_USE_ITEM": 5
        };

        this.proto2.util.setEnumType(this.PBAction, "PBAction", [{
            no: 0,
            name: "START_DESTROY_BLOCK"
        }, {
            no: 1,
            name: "ABORT_DESTROY_BLOCK"
        }, {
            no: 2,
            name: "STOP_DESTROY_BLOCK"
        }, {
            no: 3,
            name: "DROP_ALL_ITEMS"
        }, {
            no: 4,
            name: "DROP_ITEM"
        }, {
            no: 5,
            name: "RELEASE_USE_ITEM"
        }]);

        this.PBEnumFacing = {
            "0": "UNDEFINED_FACE",
            "1": "DOWN",
            "2": "UP",
            "3": "NORTH",
            "4": "SOUTH",
            "5": "WEST",
            "6": "EAST",
            "UNDEFINED_FACE": 0,
            "DOWN": 1,
            "UP": 2,
            "NORTH": 3,
            "SOUTH": 4,
            "WEST": 5,
            "EAST": 6
        };

        this.proto2.util.setEnumType(this.PBEnumFacing, "PBEnumFacing", [{
            no: 0,
            name: "UNDEFINED_FACE"
        }, {
            no: 1,
            name: "DOWN"
        }, {
            no: 2,
            name: "UP"
        }, {
            no: 3,
            name: "NORTH"
        }, {
            no: 4,
            name: "SOUTH"
        }, {
            no: 5,
            name: "WEST"
        }, {
            no: 6,
            name: "EAST"
        }]);
    },

    createPacket (name, fields = [], data = {}) {
        let $Message2 = this.$Message2;
        let proto2 = this.proto2;

        let packetClass = class extends $Message2 {
            constructor(args) {
                super();
                proto2.util.initPartial(args, this);
            }

            static fromBinary(a, b) {
                return new packetClass().fromBinary(a, b)
            }
            static fromJson(a, b) {
                return new packetClass().fromJson(a, b)
            }
            static fromJsonString(a, b) {
                return new packetClass().fromJsonString(a, b)
            }
            static equals(a, b) {
                return proto2.util.equals(packetClass, a, b)
            }
        };

        packetClass.typeName = name;
        packetClass.runtime = proto2;
        packetClass.fields = proto2.util.newFieldList(() => fields);

        let packet = new packetClass();

        for (let key in data) {
            packet[key] = data[key];
        }

        return packet;
    },

    sendPacket (packet) {
        let player = hooks.game.player;

        let _og = player.inventory.sendInventoryToServer;
        let isCreative = player.abilities.creative;
        let ogItem = player.inventory.main[player.inventory.currentItem];
        player.abilities.creative = true;

        player.inventory.sendInventoryToServer = () => packet;

        try {
            hooks.game.controller.pickBlock.bind({
                getTargetedBlockState: function () {
                    return blockUtils.fromBlockStateId(1);
                },
                findHotbarSlotForPickBlock: function () {
                    return player.inventory.currentItem;
                }
            })();
        } catch (e) {}

        player.inventory.main[player.inventory.currentItem] = ogItem;
        player.inventory.sendInventoryToServer = _og;
        player.abilities.creative = isCreative;
    },

    fields: {
        "PBFloatVector3": [{
            no: 1,
            name: "x",
            kind: "scalar",
            T: 2
        }, {
            no: 2,
            name: "y",
            kind: "scalar",
            T: 2
        }, {
            no: 3,
            name: "z",
            kind: "scalar",
            T: 2
        }],
        "PBBlockPos": [{
            no: 1,
            name: "x",
            kind: "scalar",
            T: 17
        }, {
            no: 2,
            name: "y",
            kind: "scalar",
            T: 17
        }, {
            no: 3,
            name: "z",
            kind: "scalar",
            T: 17
        }]
    }
}
