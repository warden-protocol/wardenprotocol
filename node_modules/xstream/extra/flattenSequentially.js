"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlattenSeqOperator = void 0;
var index_1 = require("../index");
var FSInner = /** @class */ (function () {
    function FSInner(out, op) {
        this.out = out;
        this.op = op;
    }
    FSInner.prototype._n = function (t) {
        this.out._n(t);
    };
    FSInner.prototype._e = function (err) {
        this.out._e(err);
    };
    FSInner.prototype._c = function () {
        this.op.less();
    };
    return FSInner;
}());
var FlattenSeqOperator = /** @class */ (function () {
    function FlattenSeqOperator(ins) {
        this.type = 'flattenSequentially';
        this.ins = ins;
        this.out = null;
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
    }
    FlattenSeqOperator.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.active = null;
        this.activeIL = new FSInner(out, this);
        this.seq = [];
        this.ins._add(this);
    };
    FlattenSeqOperator.prototype._stop = function () {
        this.ins._remove(this);
        if (this.active && this.activeIL) {
            this.active._remove(this.activeIL);
        }
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
        this.out = null;
    };
    FlattenSeqOperator.prototype.less = function () {
        this.active = null;
        var seq = this.seq;
        if (seq.length > 0) {
            this._n(seq.shift());
        }
        if (!this.open && !this.active) {
            this.out._c();
        }
    };
    FlattenSeqOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        if (this.active) {
            this.seq.push(s);
        }
        else {
            this.active = s;
            s._add(this.activeIL);
        }
    };
    FlattenSeqOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenSeqOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.open = false;
        if (!this.active && this.seq.length === 0) {
            u._c();
        }
    };
    return FlattenSeqOperator;
}());
exports.FlattenSeqOperator = FlattenSeqOperator;
/**
 * Flattens a "stream of streams", handling only one nested stream at a time,
 * with no concurrency, but does not drop nested streams like `flatten` does.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens sequentially and without concurrency. It works like this:
 * when the input stream emits a nested stream, *flattenSequentially* will start
 * imitating that nested one. When the next nested stream is emitted on the
 * input stream, *flattenSequentially* will keep that in a buffer, and only
 * start imitating it once the previous nested stream completes.
 *
 * In essence, `flattenSequentially` concatenates all nested streams.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+-------------------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----d--|
 *          flattenSequentially
 * -----a--b----c----d------1----2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenSequentially(ins) {
    return new index_1.Stream(new FlattenSeqOperator(ins));
}
exports.default = flattenSequentially;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlblNlcXVlbnRpYWxseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYS9mbGF0dGVuU2VxdWVudGlhbGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUE0RTtBQUU1RTtJQUNFLGlCQUFvQixHQUFjLEVBQ2QsRUFBeUI7UUFEekIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNkLE9BQUUsR0FBRixFQUFFLENBQXVCO0lBQzdDLENBQUM7SUFFRCxvQkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxvQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxvQkFBRSxHQUFGO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFFRDtJQVNFLDRCQUFZLEdBQXNCO1FBUjNCLFNBQUksR0FBRyxxQkFBcUIsQ0FBQztRQVNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBVyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElB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LCBNZW1vcnlTdHJlYW0sIEludGVybmFsTGlzdGVuZXIgfSBmcm9tICcuLi9pbmRleCc7XG5cbmNsYXNzIEZTSW5uZXI8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdXQ6IFN0cmVhbTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvcDogRmxhdHRlblNlcU9wZXJhdG9yPFQ+KSB7XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgdGhpcy5vdXQuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIHRoaXMub3V0Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICB0aGlzLm9wLmxlc3MoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmxhdHRlblNlcU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8U3RyZWFtPFQ+LCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ2ZsYXR0ZW5TZXF1ZW50aWFsbHknO1xuICBwdWJsaWMgaW5zOiBTdHJlYW08U3RyZWFtPFQ+PjtcbiAgcHJpdmF0ZSBvcGVuOiBib29sZWFuO1xuICBwcml2YXRlIGFjdGl2ZTogU3RyZWFtPFQ+IHwgbnVsbDtcbiAgcHJpdmF0ZSBhY3RpdmVJTDogRlNJbm5lcjxUPiB8IG51bGw7XG4gIHByaXZhdGUgc2VxOiBBcnJheTxTdHJlYW08VD4+O1xuICBwdWJsaWMgb3V0OiBTdHJlYW08VD47XG5cbiAgY29uc3RydWN0b3IoaW5zOiBTdHJlYW08U3RyZWFtPFQ+Pikge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2ZSA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVJTCA9IG51bGw7XG4gICAgdGhpcy5zZXEgPSBbXTtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlSUwgPSBuZXcgRlNJbm5lcihvdXQsIHRoaXMpO1xuICAgIHRoaXMuc2VxID0gW107XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIHRoaXMuYWN0aXZlSUwpIHtcbiAgICAgIHRoaXMuYWN0aXZlLl9yZW1vdmUodGhpcy5hY3RpdmVJTCk7XG4gICAgfVxuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlSUwgPSBudWxsO1xuICAgIHRoaXMuc2VxID0gW107XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgfVxuXG4gIGxlc3MoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUgPSBudWxsO1xuICAgIGNvbnN0IHNlcSA9IHRoaXMuc2VxO1xuICAgIGlmIChzZXEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbihzZXEuc2hpZnQoKSBhcyBTdHJlYW08VD4pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3BlbiAmJiAhdGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMub3V0Ll9jKCk7XG4gICAgfVxuICB9XG5cbiAgX24oczogU3RyZWFtPFQ+KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zZXEucHVzaChzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmUgPSBzO1xuICAgICAgcy5fYWRkKHRoaXMuYWN0aXZlSUwgYXMgRlNJbm5lcjxUPik7XG4gICAgfVxuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5hY3RpdmUgJiYgdGhpcy5zZXEubGVuZ3RoID09PSAwKSB7XG4gICAgICB1Ll9jKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYSBcInN0cmVhbSBvZiBzdHJlYW1zXCIsIGhhbmRsaW5nIG9ubHkgb25lIG5lc3RlZCBzdHJlYW0gYXQgYSB0aW1lLFxuICogd2l0aCBubyBjb25jdXJyZW5jeSwgYnV0IGRvZXMgbm90IGRyb3AgbmVzdGVkIHN0cmVhbXMgbGlrZSBgZmxhdHRlbmAgZG9lcy5cbiAqXG4gKiBJZiB0aGUgaW5wdXQgc3RyZWFtIGlzIGEgc3RyZWFtIHRoYXQgZW1pdHMgc3RyZWFtcywgdGhlbiB0aGlzIG9wZXJhdG9yIHdpbGxcbiAqIHJldHVybiBhbiBvdXRwdXQgc3RyZWFtIHdoaWNoIGlzIGEgZmxhdCBzdHJlYW06IGVtaXRzIHJlZ3VsYXIgZXZlbnRzLiBUaGVcbiAqIGZsYXR0ZW5pbmcgaGFwcGVucyBzZXF1ZW50aWFsbHkgYW5kIHdpdGhvdXQgY29uY3VycmVuY3kuIEl0IHdvcmtzIGxpa2UgdGhpczpcbiAqIHdoZW4gdGhlIGlucHV0IHN0cmVhbSBlbWl0cyBhIG5lc3RlZCBzdHJlYW0sICpmbGF0dGVuU2VxdWVudGlhbGx5KiB3aWxsIHN0YXJ0XG4gKiBpbWl0YXRpbmcgdGhhdCBuZXN0ZWQgb25lLiBXaGVuIHRoZSBuZXh0IG5lc3RlZCBzdHJlYW0gaXMgZW1pdHRlZCBvbiB0aGVcbiAqIGlucHV0IHN0cmVhbSwgKmZsYXR0ZW5TZXF1ZW50aWFsbHkqIHdpbGwga2VlcCB0aGF0IGluIGEgYnVmZmVyLCBhbmQgb25seVxuICogc3RhcnQgaW1pdGF0aW5nIGl0IG9uY2UgdGhlIHByZXZpb3VzIG5lc3RlZCBzdHJlYW0gY29tcGxldGVzLlxuICpcbiAqIEluIGVzc2VuY2UsIGBmbGF0dGVuU2VxdWVudGlhbGx5YCBjb25jYXRlbmF0ZXMgYWxsIG5lc3RlZCBzdHJlYW1zLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tKy0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgXFwgICAgICAgIFxcXG4gKiAgICBcXCAgICAgICAtLS0tMS0tLS0yLS0tMy0tfFxuICogICAgLS1hLS1iLS0tLWMtLS0tZC0tfFxuICogICAgICAgICAgZmxhdHRlblNlcXVlbnRpYWxseVxuICogLS0tLS1hLS1iLS0tLWMtLS0tZC0tLS0tLTEtLS0tMi0tLTMtLVxuICogYGBgXG4gKlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuU2VxdWVudGlhbGx5PFQ+KGluczogU3RyZWFtPFN0cmVhbTxUPiB8IE1lbW9yeVN0cmVhbTxUPj4pOiBTdHJlYW08VD4ge1xuICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRmxhdHRlblNlcU9wZXJhdG9yKGlucykpO1xufVxuIl19