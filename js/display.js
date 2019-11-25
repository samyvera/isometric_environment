class Display {
    constructor(game) {
        this.frame = 0;
        this.zoom = 3;

        this.game = game;
        this.scale = 16;
        this.shadowStep = 1 / 16;

        this.tileset = document.createElement("img");
        this.tileset.src = "img/tileset.png";
        this.playerImg = document.createElement("img");
        this.playerImg.src = "img/player.png";

        this.update = () => {

            //skybox

            var gradient = this.cx.createLinearGradient(0, 0, 0, this.canvas.height / this.zoom);
            gradient.addColorStop(0, "rgba(128, 128, 160, 1)");
            gradient.addColorStop(1, "rgba(32, 32, 64, 1)");

            this.cx.fillStyle = gradient;
            this.cx.fillRect(
                0,
                0,
                this.canvas.width / this.zoom,
                this.canvas.height / this.zoom
            );

            var scene = this.game.scene;
            var player = this.game.scene.player;
            var viewRadius = 8;

            //background
            
            var viewPos = v3toV2(new Vector3D(player.pos.x, player.pos.y, 0));

            this.cx.translate(
                this.canvas.width / 2 / this.zoom - viewPos.x * this.scale,
                this.canvas.height / 2 / this.zoom - viewPos.y * this.scale
            );

            for (let x = Math.floor(player.pos.x + player.size.x / 2 + viewRadius) - 1; x >= Math.floor(player.pos.x + player.size.x / 2 - viewRadius) + 1; x--) {
                for (let y = Math.floor(player.pos.y + player.size.y / 2 - viewRadius) + 1; y < Math.floor(player.pos.y + player.size.y / 2 + viewRadius); y++) {
                    for (let z = 0; z < scene.size.z; z++) {
                        if (scene.tiles.has(x + ', ' + y + ', ' + z)) {
                            var tile = scene.tiles.get(x + ', ' + y + ', ' + z);
                            if (!tile.texturePos) continue;

                            var tilePos = v3toV2(new Vector3D(x, y, z));
                            var texturePos = tile.texturePos.length > 1 ?
                                tile.texturePos[Math.floor(this.frame / tile.textureSpeed) % tile.texturePos.length] :
                                tile.texturePos[0];

                            this.cx.drawImage(this.tileset,
                                texturePos.x * this.scale,
                                texturePos.y * this.scale,
                                this.scale, this.scale,
                                tilePos.x * this.scale,
                                tilePos.y * this.scale,
                                this.scale, this.scale
                            );

                            if (tile.size.z) {
                                var slab = tile.size.z === 0.5 ? this.scale : 0;
                                this.cx.globalAlpha = this.shadowStep * (
                                    Math.abs(player.pos.x - tile.pos.x) +
                                    Math.abs(player.pos.y - tile.pos.y) +
                                    (scene.size.z - z - 2)) / 3;
                                this.cx.drawImage(this.tileset,
                                    slab, 0,
                                    this.scale, this.scale,
                                    tilePos.x * this.scale,
                                    tilePos.y * this.scale,
                                    this.scale, this.scale
                                );
                                this.cx.globalAlpha = 1;
                            }
                        }
                    }
                }
            }

            //player

            var playerPos = v3toV2(player.pos);

            this.cx.drawImage(this.playerImg,
                0, 0,
                this.scale, this.scale,
                playerPos.x * this.scale,
                playerPos.y * this.scale,
                this.scale, this.scale
            );

            this.cx.translate(
                -this.canvas.width / 2 / this.zoom + viewPos.x * this.scale,
                -this.canvas.height / 2 / this.zoom + viewPos.y * this.scale
            );

            //interface

            this.cx.fillStyle = "#fff";
            this.cx.font = 8 + "px consolas";
            this.cx.fillText(
                "x:" + player.pos.x + " y:" + player.pos.y + " z:" + player.pos.z,
                2,
                8
            );

            this.frame++;
        }

        this.canvas = document.createElement('canvas');
        this.canvas.width = innerWidth - (innerWidth % 2);
        this.canvas.height = innerHeight - (innerHeight % 2);

        this.cx = this.canvas.getContext("2d");
        this.cx.scale(this.zoom, this.zoom);
        this.cx.imageSmoothingEnabled = false;

        document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => {
            this.canvas.width = innerWidth - (innerWidth % 2);
            this.canvas.height = innerHeight - (innerHeight % 2);
            this.cx.scale(this.zoom, this.zoom);
            this.cx.imageSmoothingEnabled = false;
        });
    }
}