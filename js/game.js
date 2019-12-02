class Game {
    constructor() {
        this.frame = 0;

        this.keys = {};
        this.lastKeys = {};

        this.scene = new Scene(OVERWORLD);

        this.antiCheat = () => {
            if (this.keys.up && this.keys.down) {
                this.keys.up = false;
                this.keys.down = false;
            }
            if (this.keys.left && this.keys.right) {
                this.keys.left = false;
                this.keys.right = false;
            }
        }
        
        this.update = keys => {
            this.keys = JSON.parse(JSON.stringify(keys));
            this.antiCheat();

            this.scene.update(this);

            this.lastKeys = JSON.parse(JSON.stringify(this.keys));
            this.frame++;
        }
    }
}