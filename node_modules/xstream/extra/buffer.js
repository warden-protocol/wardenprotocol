"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var SeparatorIL = /** @class */ (function () {
    function SeparatorIL(out, op) {
        this.out = out;
        this.op = op;
    }
    SeparatorIL.prototype._n = function (_t) {
        this.op.flush();
    };
    SeparatorIL.prototype._e = function (err) {
        this.out._e(err);
    };
    SeparatorIL.prototype._c = function () {
        this.op.flush();
        this.out._c();
    };
    return SeparatorIL;
}());
var BufferOperator = /** @class */ (function () {
    function BufferOperator(s, ins) {
        this.s = s;
        this.ins = ins;
        this.type = 'buffer';
        this.out = null;
        this.acc = [];
    }
    BufferOperator.prototype.flush = function () {
        if (this.acc.length > 0) {
            this.out._n(this.acc);
            this.acc = [];
        }
    };
    BufferOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
        this.sil = new SeparatorIL(out, this);
        this.s._add(this.sil);
    };
    BufferOperator.prototype._stop = function () {
        this.flush();
        this.ins._remove(this);
        this.out = null;
        this.s._remove(this.sil);
        this.sil = index_1.NO_IL;
    };
    BufferOperator.prototype._n = function (t) {
        this.acc.push(t);
    };
    BufferOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    BufferOperator.prototype._c = function () {
        var out = this.out;
        if (!out)
            return;
        this.flush();
        out._c();
    };
    return BufferOperator;
}());
/**
 * Buffers a stream using a separator stream. Returns a stream that emits
 * arrays.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 * buffer( -a---------b---------c| )
 * ---------[1,2,3]---[4,5,6]---[7,8,9]|
 * ```
 *
 * Example:
 *
 * ```js
 * import buffer from 'xstream/extra/buffer'
 *
 * const source = xs.periodic(50).take(10);
 * const separator = xs.periodic(170).take(3);
 * const buffered = source.compose(buffer(separator));
 *
 * buffered.addListener({
 *   next: arr => console.log(arr),
 *   error: err => console.error(err)
 * });
 * ```
 *
 * ```text
 * > [0, 1, 2]
 * > [3, 4, 5]
 * > [6, 7, 8]
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
function buffer(s) {
    return function bufferOperator(ins) {
        return new index_1.Stream(new BufferOperator(s, ins));
    };
}
exports.default = buffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4dHJhL2J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUE4RTtBQUU5RTtJQUNFLHFCQUFtQixHQUFxQixFQUFVLEVBQXFCO1FBQXBELFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFDdkUsQ0FBQztJQUVELHdCQUFFLEdBQUYsVUFBRyxFQUFPO1FBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsd0JBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0JBQUUsR0FBRjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBRUQ7SUFNRSx3QkFBbUIsQ0FBYyxFQUFTLEdBQWM7UUFBckMsTUFBQyxHQUFELENBQUMsQ0FBYTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFMakQsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUNoQixRQUFHLEdBQXFCLElBQVcsQ0FBQztRQUVuQyxRQUFHLEdBQWEsRUFBRSxDQUFDO0lBRzNCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFPLEdBQXFCO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsYUFBSyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCwyQkFBRSxHQUFGO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxTQUF3QixNQUFNLENBQUksQ0FBYztJQUM5QyxPQUFPLFNBQVMsY0FBYyxDQUFDLEdBQWM7UUFDM0MsT0FBTyxJQUFJLGNBQU0sQ0FBVyxJQUFJLGNBQWMsQ0FBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQseUJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBTdHJlYW0sIEludGVybmFsTGlzdGVuZXIsIE91dFNlbmRlciwgTk9fSUx9IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgU2VwYXJhdG9ySUw8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPGFueT4sIE91dFNlbmRlcjxBcnJheTxUPj4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3V0OiBTdHJlYW08QXJyYXk8VD4+LCBwcml2YXRlIG9wOiBCdWZmZXJPcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24oX3Q6IGFueSkge1xuICAgIHRoaXMub3AuZmx1c2goKTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgdGhpcy5vdXQuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIHRoaXMub3AuZmx1c2goKTtcbiAgICB0aGlzLm91dC5fYygpO1xuICB9XG59XG5cbmNsYXNzIEJ1ZmZlck9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgQXJyYXk8VD4+IHtcbiAgcHVibGljIHR5cGUgPSAnYnVmZmVyJztcbiAgcHVibGljIG91dDogU3RyZWFtPEFycmF5PFQ+PiA9IG51bGwgYXMgYW55O1xuICBwcml2YXRlIHNpbD86IEludGVybmFsTGlzdGVuZXI8YW55PjtcbiAgcHJpdmF0ZSBhY2M6IEFycmF5PFQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIHM6IFN0cmVhbTxhbnk+LCBwdWJsaWMgaW5zOiBTdHJlYW08VD4pIHtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICh0aGlzLmFjYy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm91dC5fbih0aGlzLmFjYyk7XG4gICAgICB0aGlzLmFjYyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxBcnJheTxUPj4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmlucy5fYWRkKHRoaXMpO1xuICAgIHRoaXMuc2lsID0gbmV3IFNlcGFyYXRvcklMKG91dCwgdGhpcyk7XG4gICAgdGhpcy5zLl9hZGQodGhpcy5zaWwpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgICB0aGlzLnMuX3JlbW92ZSh0aGlzLnNpbCEpO1xuICAgIHRoaXMuc2lsID0gTk9fSUw7XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgdGhpcy5hY2MucHVzaCh0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IG91dCA9IHRoaXMub3V0O1xuICAgIGlmICghb3V0KSByZXR1cm47XG4gICAgdGhpcy5mbHVzaCgpO1xuICAgIG91dC5fYygpO1xuICB9XG59XG5cbi8qKlxuICogQnVmZmVycyBhIHN0cmVhbSB1c2luZyBhIHNlcGFyYXRvciBzdHJlYW0uIFJldHVybnMgYSBzdHJlYW0gdGhhdCBlbWl0c1xuICogYXJyYXlzLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tMS0tMi0tMy0tNC0tNS0tNi0tNy0tOC0tOXxcbiAqIGJ1ZmZlciggLWEtLS0tLS0tLS1iLS0tLS0tLS0tY3wgKVxuICogLS0tLS0tLS0tWzEsMiwzXS0tLVs0LDUsNl0tLS1bNyw4LDldfFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGJ1ZmZlciBmcm9tICd4c3RyZWFtL2V4dHJhL2J1ZmZlcidcbiAqXG4gKiBjb25zdCBzb3VyY2UgPSB4cy5wZXJpb2RpYyg1MCkudGFrZSgxMCk7XG4gKiBjb25zdCBzZXBhcmF0b3IgPSB4cy5wZXJpb2RpYygxNzApLnRha2UoMyk7XG4gKiBjb25zdCBidWZmZXJlZCA9IHNvdXJjZS5jb21wb3NlKGJ1ZmZlcihzZXBhcmF0b3IpKTtcbiAqXG4gKiBidWZmZXJlZC5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6IGFyciA9PiBjb25zb2xlLmxvZyhhcnIpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBgYGB0ZXh0XG4gKiA+IFswLCAxLCAyXVxuICogPiBbMywgNCwgNV1cbiAqID4gWzYsIDcsIDhdXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmVhbX0gc2VwYXJhdG9yIFNvbWUgb3RoZXIgc3RyZWFtIHRoYXQgaXMgdXNlZCB0byBrbm93IHdoZW4gdG9cbiAqIHNwbGl0IHRoZSBvdXRwdXQgc3RyZWFtLlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWZmZXI8VD4oczogU3RyZWFtPGFueT4pOiAoaW5zOiBTdHJlYW08VD4pID0+IFN0cmVhbTxBcnJheTxUPj4ge1xuICByZXR1cm4gZnVuY3Rpb24gYnVmZmVyT3BlcmF0b3IoaW5zOiBTdHJlYW08VD4pIHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxBcnJheTxUPj4obmV3IEJ1ZmZlck9wZXJhdG9yPFQ+KHMsIGlucykpO1xuICB9O1xufVxuIl19