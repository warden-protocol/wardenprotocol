"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlattenConcOperator = void 0;
var index_1 = require("../index");
var FCIL = /** @class */ (function () {
    function FCIL(out, op) {
        this.out = out;
        this.op = op;
    }
    FCIL.prototype._n = function (t) {
        this.out._n(t);
    };
    FCIL.prototype._e = function (err) {
        this.out._e(err);
    };
    FCIL.prototype._c = function () {
        this.op.less();
    };
    return FCIL;
}());
var FlattenConcOperator = /** @class */ (function () {
    function FlattenConcOperator(ins) {
        this.ins = ins;
        this.type = 'flattenConcurrently';
        this.active = 1; // number of outers and inners that have not yet ended
        this.out = null;
    }
    FlattenConcOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenConcOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.active = 1;
        this.out = null;
    };
    FlattenConcOperator.prototype.less = function () {
        if (--this.active === 0) {
            var u = this.out;
            if (!u)
                return;
            u._c();
        }
    };
    FlattenConcOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        this.active++;
        s._add(new FCIL(u, this));
    };
    FlattenConcOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenConcOperator.prototype._c = function () {
        this.less();
    };
    return FlattenConcOperator;
}());
exports.FlattenConcOperator = FlattenConcOperator;
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently. It works like this: when the input stream
 * emits a nested stream, *flattenConcurrently* will start imitating that
 * nested one. When the next nested stream is emitted on the input stream,
 * *flattenConcurrently* will also imitate that new one, but will continue to
 * imitate the previous nested streams as well.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *     flattenConcurrently
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenConcurrently(ins) {
    return new index_1.Stream(new FlattenConcOperator(ins));
}
exports.default = flattenConcurrently;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbkNvbmN1cnJlbnRseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYS9mbGF0dGVuQ29uY3VycmVudGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUF1RjtBQUV2RjtJQUNFLGNBQW1CLEdBQWMsRUFDYixFQUEwQjtRQUQzQixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2IsT0FBRSxHQUFGLEVBQUUsQ0FBd0I7SUFDOUMsQ0FBQztJQUVELGlCQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELGlCQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGlCQUFFLEdBQUY7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQUVEO0lBS0UsNkJBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBSmxDLFNBQUksR0FBRyxxQkFBcUIsQ0FBQztRQUM1QixXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMsc0RBQXNEO1FBQzNFLFFBQUcsR0FBYyxJQUFXLENBQUM7SUFHcEMsQ0FBQztJQUVELG9DQUFNLEdBQU4sVUFBTyxHQUFjO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELG1DQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQUksR0FBSjtRQUNFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFDZixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDUjtJQUNILENBQUM7SUFFRCxnQ0FBRSxHQUFGLFVBQUcsQ0FBWTtRQUNiLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZ0NBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsZ0NBQUUsR0FBRjtRQUNFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7QUEzQ1ksa0RBQW1CO0FBNkNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsbUJBQW1CLENBQUksR0FBd0M7SUFDckYsT0FBTyxJQUFJLGNBQU0sQ0FBSSxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELHNDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IsIFN0cmVhbSwgTWVtb3J5U3RyZWFtLCBPdXRTZW5kZXIsIEludGVybmFsTGlzdGVuZXIgfSBmcm9tICcuLi9pbmRleCc7XG5cbmNsYXNzIEZDSUw8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPFQ+LCBPdXRTZW5kZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3V0OiBTdHJlYW08VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgb3A6IEZsYXR0ZW5Db25jT3BlcmF0b3I8VD4pIHtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICB0aGlzLm91dC5fbih0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgdGhpcy5vdXQuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIHRoaXMub3AubGVzcygpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGbGF0dGVuQ29uY09wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8U3RyZWFtPFQ+LCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ2ZsYXR0ZW5Db25jdXJyZW50bHknO1xuICBwcml2YXRlIGFjdGl2ZTogbnVtYmVyID0gMTsgLy8gbnVtYmVyIG9mIG91dGVycyBhbmQgaW5uZXJzIHRoYXQgaGF2ZSBub3QgeWV0IGVuZGVkXG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPiA9IG51bGwgYXMgYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnM6IFN0cmVhbTxTdHJlYW08VD4+KSB7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmlucy5fYWRkKHRoaXMpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5pbnMuX3JlbW92ZSh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IDE7XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgfVxuXG4gIGxlc3MoKTogdm9pZCB7XG4gICAgaWYgKC0tdGhpcy5hY3RpdmUgPT09IDApIHtcbiAgICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICAgIGlmICghdSkgcmV0dXJuO1xuICAgICAgdS5fYygpO1xuICAgIH1cbiAgfVxuXG4gIF9uKHM6IFN0cmVhbTxUPikge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLmFjdGl2ZSsrO1xuICAgIHMuX2FkZChuZXcgRkNJTCh1LCB0aGlzKSk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICB0aGlzLmxlc3MoKTtcbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGEgXCJzdHJlYW0gb2Ygc3RyZWFtc1wiLCBoYW5kbGluZyBtdWx0aXBsZSBjb25jdXJyZW50IG5lc3RlZCBzdHJlYW1zXG4gKiBzaW11bHRhbmVvdXNseS5cbiAqXG4gKiBJZiB0aGUgaW5wdXQgc3RyZWFtIGlzIGEgc3RyZWFtIHRoYXQgZW1pdHMgc3RyZWFtcywgdGhlbiB0aGlzIG9wZXJhdG9yIHdpbGxcbiAqIHJldHVybiBhbiBvdXRwdXQgc3RyZWFtIHdoaWNoIGlzIGEgZmxhdCBzdHJlYW06IGVtaXRzIHJlZ3VsYXIgZXZlbnRzLiBUaGVcbiAqIGZsYXR0ZW5pbmcgaGFwcGVucyBjb25jdXJyZW50bHkuIEl0IHdvcmtzIGxpa2UgdGhpczogd2hlbiB0aGUgaW5wdXQgc3RyZWFtXG4gKiBlbWl0cyBhIG5lc3RlZCBzdHJlYW0sICpmbGF0dGVuQ29uY3VycmVudGx5KiB3aWxsIHN0YXJ0IGltaXRhdGluZyB0aGF0XG4gKiBuZXN0ZWQgb25lLiBXaGVuIHRoZSBuZXh0IG5lc3RlZCBzdHJlYW0gaXMgZW1pdHRlZCBvbiB0aGUgaW5wdXQgc3RyZWFtLFxuICogKmZsYXR0ZW5Db25jdXJyZW50bHkqIHdpbGwgYWxzbyBpbWl0YXRlIHRoYXQgbmV3IG9uZSwgYnV0IHdpbGwgY29udGludWUgdG9cbiAqIGltaXRhdGUgdGhlIHByZXZpb3VzIG5lc3RlZCBzdHJlYW1zIGFzIHdlbGwuXG4gKlxuICogTWFyYmxlIGRpYWdyYW06XG4gKlxuICogYGBgdGV4dFxuICogLS0rLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tXG4gKiAgIFxcICAgICAgICBcXFxuICogICAgXFwgICAgICAgLS0tLTEtLS0tMi0tLTMtLVxuICogICAgLS1hLS1iLS0tLWMtLS0tZC0tLS0tLS0tXG4gKiAgICAgZmxhdHRlbkNvbmN1cnJlbnRseVxuICogLS0tLS1hLS1iLS0tLWMtMS0tZC0yLS0tMy0tXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZsYXR0ZW5Db25jdXJyZW50bHk8VD4oaW5zOiBTdHJlYW08U3RyZWFtPFQ+IHwgTWVtb3J5U3RyZWFtPFQ+Pik6IFN0cmVhbTxUPiB7XG4gIHJldHVybiBuZXcgU3RyZWFtPFQ+KG5ldyBGbGF0dGVuQ29uY09wZXJhdG9yKGlucykpO1xufVxuIl19