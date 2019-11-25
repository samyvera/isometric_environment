class Scene {
    constructor(rawData) {
        this.size = new Vector3D(rawData[0][0].length, rawData[0].length, rawData.length);

        // this.actors = new Map()
        //     .set("cursor", new Cursor(new Vector3D(1.5, 1, 8.5), new Vector3D(1, 1, 1), null, "cursor"))
        //     .set("unit", new Unit(new Vector3D(1, 1, 8), new Vector3D(1, 1, 1), null, "unit", new UnitStats(4, 20, 5)));

        this.tiles = new Map();
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                for (let z = 0; z < this.size.z; z++) {
                    var char = rawData[z][y][x];

                    var name;
                    var size;
                    var texturePos;
                    var textureSpeed;

                    switch (char) {
                        case 'D':
                            name = 'dirt';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(0, 3)
                            ];
                            textureSpeed = null;
                            break;
                        case 'G':
                            name = 'grass';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(0, 1)
                            ];
                            textureSpeed = null;
                            break;
                        case 'w':
                            name = 'water';
                            size = new Vector3D(1, 1, 0);
                            texturePos = [
                                new Vector2D(2, 0),
                                new Vector2D(3, 0)
                            ];
                            textureSpeed = 32;
                            break;
                        case 'F':
                            name = 'flower';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(2, 1),
                                new Vector2D(3, 1)
                            ];
                            textureSpeed = 16;
                            break;
                        case 'R':
                            name = 'road';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(1, 1)
                            ];
                            textureSpeed = null;
                            break;
                        case 'r':
                            name = 'roadSlab';
                            size = new Vector3D(1, 1, 0.5);
                            texturePos = [
                                new Vector2D(1, 2)
                            ];
                            textureSpeed = null;
                            break;
                        case 'g':
                            name = 'grassSlab';
                            size = new Vector3D(1, 1, 0.5);
                            texturePos = [
                                new Vector2D(0, 2)
                            ];
                            textureSpeed = null;
                            break;
                        case 'B':
                            name = 'bric';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(1, 3)
                            ];
                            textureSpeed = null;
                            break;
                        case 'b':
                            name = 'bricSlab';
                            size = new Vector3D(1, 1, 0.5);
                            texturePos = [
                                new Vector2D(2, 2)
                            ];
                            textureSpeed = null;
                            break;
                        case 'S':
                            name = 'sand';
                            size = new Vector3D(1, 1, 1);
                            texturePos = [
                                new Vector2D(2, 3)
                            ];
                            textureSpeed = null;
                            break;
                        case 's':
                            name = 'sandSlab';
                            size = new Vector3D(1, 1, 0.5);
                            texturePos = [
                                new Vector2D(3, 2)
                            ];
                            textureSpeed = null;
                            break;
                        case 'W':
                            name = 'waterfall';
                            size = new Vector3D(1, 1, 0);
                            texturePos = [
                                new Vector2D(4, 0),
                                new Vector2D(4, 1),
                                new Vector2D(4, 2)
                            ];
                            textureSpeed = 8;
                            break;
                        case '0':
                            name = 'waterfallBottom';
                            size = new Vector3D(1, 1, 0);
                            texturePos = [
                                new Vector2D(5, 0),
                                new Vector2D(5, 1),
                                new Vector2D(5, 2)
                            ];
                            textureSpeed = 8;
                            break;
                        case '1':
                            name = 'waterfallTop';
                            size = new Vector3D(1, 1, 0);
                            texturePos = [
                                new Vector2D(6, 0),
                                new Vector2D(6, 1),
                                new Vector2D(6, 2)
                            ];
                            textureSpeed = 8;
                            break;
                        case '.':
                            name = 'invisible';
                            size = new Vector3D(1, 1, 1);
                            texturePos = null;
                            textureSpeed = null;
                            break;
                        default:
                            continue;
                    }

                    this.tiles.set((x - this.size.x / 2) + ", " + (y - this.size.y / 2) + ", " + z,
                        new Tile(
                            new Vector3D(x - this.size.x / 2, y - this.size.y / 2, z),
                            size,
                            name,
                            texturePos,
                            textureSpeed
                        )
                    );
                }
            }
        }

        this.gravity = new Vector3D(0, 0, 0.015625);

        this.player = new Player(
            new Vector3D(-9.75, 9.25, 1),
            new Vector3D(0.5, 0.5, 1)
        );

        this.update = game => {
            this.player.update(game);
        }
    }
}