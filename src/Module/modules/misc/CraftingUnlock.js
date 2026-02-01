import Module from "../../Module";

export default class CraftingUnlock extends Module {
    constructor() {
        super("CraftingUnlock", "Misc");
        this.observer = null;
        this.button = null;
    }

    onEnable() {
        this.observer = new MutationObserver(() => this.tryInject());
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.tryInject();
    }

    onDisable() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        if (this.button) {
            this.button.remove();
            this.button = null;
        }
    }

    tryInject() {
        if (this.button && document.contains(this.button)) return;

        const inventoryText = [...document.getElementsByClassName("chakra-text")]
            .find(el => el.innerText === "Inventory");
        if (!inventoryText) return;

        const inventoryEl = inventoryText.nextSibling;
        if (!inventoryEl) return;

        const craftingEl = inventoryEl.children[inventoryEl.children.length - 1];
        if (!craftingEl) return;

        const button = document.createElement("button");
        button.innerText = "Crafting Table";
        button.style.border = "1px grey solid";
        button.style.width = "100%";

        button.addEventListener("click", () => {
            ballcrack.hooks.game.player.displayGui({
                getGuiID() {
                    return "workbench";
                }
            });
        });

        craftingEl.append(button);
        this.button = button;
    }
}