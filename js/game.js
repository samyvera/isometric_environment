class Game {
    constructor(keys) {
        this.frame = 0;

        this.keys = keys;
        this.lastKeys = {};

        this.scene = new Scene(OVERWORLD);

        this.update = () => {

            this.scene.update(this);

            this.lastKeys = JSON.parse(JSON.stringify(this.keys));
            this.frame++;
        }
    }
}