class Player {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.walkSpeed = 0.03125;
        this.jumpSpeed = 0.15625;
        this.speed = new Vector3D(0, 0, 0);
        this.isJumping = false;

        this.moveXY = game => {
            this.speed.x = 0;
            this.speed.y = 0;

            if (game.keys.left) {
                this.speed.x -= this.walkSpeed;
                this.speed.y -= this.walkSpeed;
            }
            if (game.keys.right) {
                this.speed.x += this.walkSpeed;
                this.speed.y += this.walkSpeed;
            }
            if (game.keys.up) {
                this.speed.x += this.walkSpeed;
                this.speed.y -= this.walkSpeed;
            }
            if (game.keys.down) {
                this.speed.x -= this.walkSpeed;
                this.speed.y += this.walkSpeed;
            }

            var newPosX = this.pos.plus(new Vector3D(this.speed.x, 0, 0));
            if (!obstaclesAt(newPosX, this.size, game.scene.tiles).length &&
                inBound3D(newPosX, this.size, game.scene)) {
                this.pos = newPosX;
            }

            var newPosY = this.pos.plus(new Vector3D(0, this.speed.y, 0));
            if (!obstaclesAt(newPosY, this.size, game.scene.tiles).length &&
                inBound3D(newPosY, this.size, game.scene)) {
                this.pos = newPosY;
            }
        }

        this.moveZ = game => {
            this.speed.z -= game.scene.gravity.z;
            if (this.isJumping) this.speed.z = this.jumpSpeed;

            var newPosZ = this.pos.plus(new Vector3D(0, 0, this.speed.z));
            if (!obstaclesAt(newPosZ, this.size, game.scene.tiles).length &&
                inBound3D(newPosZ, this.size, game.scene)) {
                this.pos = newPosZ;
            }
            else {
                this.speed.z = 0;
            }
        }

        this.update = game => {

            if (this.isJumping) this.isJumping = false;
            else if (
                game.keys.a &&
                !this.speed.z &&
                obstaclesAt(this.pos.plus(new Vector3D(0, 0, -this.jumpSpeed)), new Vector3D(this.size.x, this.size.y, this.jumpSpeed), game.scene.tiles).length) {    
                this.isJumping = true;
            }

            this.moveXY(game);
            this.moveZ(game);
        }
    }
}