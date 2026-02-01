import hooks from "../../../hooks";
import packetUtils from "../../../utils/packetUtils";
import Module from "../../Module";

export default class Criticals extends Module {
    constructor() {
        super("Criticals", "Combat");

    }

    CRIT_OFFSETS = [
		0.08, -0.07840000152
	];

    onPacket(pkt) {
        if (pkt.name == "SPacketUseEntity" && pkt.data.action == "ATTACK") {
            for (const offset of this.CRIT_OFFSETS) {
                let pos = packetUtils.createPacket("Vector3", packetUtils.fields.Vector3, {
                    x: hooks.game.player.pos.x,
                    y: hooks.game.player.pos.y + offset,
                    z: hooks.game.player.pos.z
                });

                packetUtils.sendPacket(packetUtils.createPacket("SPacketPlayerPosLook", packetUtils.fields.SPacketPlayerPosLook, {
                    pos: pos,
                    onGround: false
                }));
            }
        }
    }
}