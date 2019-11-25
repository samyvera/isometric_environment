class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.plus = other => new Vector2D(this.x + other.x, this.y + other.y);
        this.times = factor => new Vector2D(this.x * factor, this.y * factor);
    }
}

class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.plus = other => new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
        this.times = factor => new Vector3D(this.x * factor, this.y * factor, this.z * factor);
        this.equals = other => this.x === other.x && this.y === other.y && this.z === other.z;
        this.floor = () => new Vector3D(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }
}


var v3toV2 = pos => new Vector2D(
    pos.x * 0.5 + pos.y * 0.5,
    -pos.z * 0.5 - pos.x * 0.25 + pos.y * 0.25
);

// var flipHorizontally = (context, around) => {
//     context.translate(around, 0);
//     context.scale(-1, 1);
//     context.translate(-around, 0);
// }

var inBound3D = (pos, size, bound) => {
    return !(
        pos.x < -bound.size.x / 2 ||
        pos.x + size.x > bound.size.x / 2 ||
        pos.y < -bound.size.y / 2 ||
        pos.y + size.y > bound.size.y / 2 ||
        pos.z < 0 ||
        pos.z + size.z > bound.size.z
    );
}

var collide3D = (aPos, aSize, bPos, bSize) => {
    return !(
        bPos.x > aPos.x + aSize.x ||
        bPos.x + bSize.x < aPos.x ||
        bPos.y > aPos.y + aSize.y ||
        bPos.y + bSize.y < aPos.y ||
        bPos.z > aPos.z + aSize.z ||
        bPos.z + bSize.z < aPos.z
    );
}

var intersect3D = (aPos, aSize, bPos, bSize) => {
    return !(
        bPos.x >= aPos.x + aSize.x ||
        bPos.x + bSize.x <= aPos.x ||
        bPos.y >= aPos.y + aSize.y ||
        bPos.y + bSize.y <= aPos.y ||
        bPos.z >= aPos.z + aSize.z ||
        bPos.z + bSize.z <= aPos.z
    );
}

var obstaclesAt = (pos, size, obstacles) => {
    var result = [];
    obstacles.forEach(obstacle => {
        if (intersect3D(
                pos, size,
                obstacle.pos, obstacle.size
            )) {
            result.push(obstacle);
        }
    });
    return result;
}