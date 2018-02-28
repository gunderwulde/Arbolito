function Vector3(x, y, z) {
    if (!(this instanceof Vector3)) return new Vector3(x, y, z);
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
}

Vector3.prototype.dot = function(v) {
    if (!(v instanceof Vector3)) throw new TypeError('v is not Vector3d object');
    return this.x*v.x + this.y*v.y + this.z*v.z;
};


Vector3.prototype.cross = function(v) {
    if (!(v instanceof Vector3)) throw new TypeError('v is not Vector3d object');
    var x = this.y*v.z - this.z*v.y;
    var y = this.z*v.x - this.x*v.z;
    var z = this.x*v.y - this.y*v.x;
    return new Vector3(x, y, z);
};

Vector3.prototype.magnitude = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
};

Vector3.prototype.normalized = function() {
    var norm = this.magnitude();
    if (norm == 1) return this;
    if (norm == 0) return this;
    var x = this.x/norm;
    var y = this.y/norm;
    var z = this.z/norm;
    return new Vector3(x, y, z);
};