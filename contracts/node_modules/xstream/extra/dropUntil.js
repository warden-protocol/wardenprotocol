"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropUntilOperator = void 0;
var index_1 = require("../index");
var OtherIL = /** @class */ (function () {
    function OtherIL(out, op) {
        this.out = out;
        this.op = op;
    }
    OtherIL.prototype._n = function (_t) {
        this.op.up();
    };
    OtherIL.prototype._e = function (err) {
        this.out._e(err);
    };
    OtherIL.prototype._c = function () { };
    return OtherIL;
}());
var DropUntilOperator = /** @class */ (function () {
    function DropUntilOperator(o, // o = other
    ins) {
        this.o = o;
        this.ins = ins;
        this.type = 'dropUntil';
        this.out = null;
        this.oil = index_1.NO_IL; // oil = other InternalListener
        this.on = false;
    }
    DropUntilOperator.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new OtherIL(out, this));
        this.ins._add(this);
    };
    DropUntilOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = null;
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype.up = function () {
        this.on = true;
        this.o._remove(this.oil);
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        if (!this.on)
            return;
        u._n(t);
    };
    DropUntilOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropUntilOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this._stop();
        u._c();
    };
    return DropUntilOperator;
}());
exports.DropUntilOperator = DropUntilOperator;
/**
 * Starts emitting the input stream when another stream emits a next event. The
 * output stream will emit no items if another stream is empty.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   dropUntil( --------a--b--| )
 * ---------------------5----6|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropUntil from 'xstream/extra/dropUntil'
 *
 * const other = xs.periodic(220).take(1)
 *
 * const stream = xs.periodic(50)
 *   .take(6)
 *   .compose(dropUntil(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 4
 * > 5
 * > completed
 * ```
 *
 * #### Arguments:
 *
 * @param {Stream} other Some other stream that is used to know when the output
 * stream of this operator should start emitting.
 * @return {Stream}
 */
function dropUntil(other) {
    return function dropUntilOperator(ins) {
        return new index_1.Stream(new DropUntilOperator(other, ins));
    };
}
exports.default = dropUntil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcFVudGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V4dHJhL2Ryb3BVbnRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBOEU7QUFFOUU7SUFDRSxpQkFBbUIsR0FBYyxFQUNiLEVBQXdCO1FBRHpCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDYixPQUFFLEdBQUYsRUFBRSxDQUFzQjtJQUM1QyxDQUFDO0lBRUQsb0JBQUUsR0FBRixVQUFHLEVBQUs7UUFDTixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELG9CQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELG9CQUFFLEdBQUYsY0FBTSxDQUFDO0lBQ1QsY0FBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBRUQ7SUFNRSwyQkFBbUIsQ0FBYyxFQUFFLFlBQVk7SUFDNUIsR0FBYztRQURkLE1BQUMsR0FBRCxDQUFDLENBQWE7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBTjFCLFNBQUksR0FBRyxXQUFXLENBQUM7UUFDbkIsUUFBRyxHQUFjLElBQVcsQ0FBQztRQUM1QixRQUFHLEdBQTBCLGFBQUssQ0FBQyxDQUFDLCtCQUErQjtRQUNuRSxPQUFFLEdBQVksS0FBSyxDQUFDO0lBSTVCLENBQUM7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELDhCQUFFLEdBQUY7UUFDRSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLGFBQUssQ0FBQztJQUNuQixDQUFDO0lBRUQsOEJBQUUsR0FBRixVQUFHLENBQUk7UUFDTCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDckIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCw4QkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCw4QkFBRSxHQUFGO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDO0FBaERZLDhDQUFpQjtBQWtEOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBQ0gsU0FBd0IsU0FBUyxDQUFJLEtBQWtCO0lBQ3JELE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxHQUFjO1FBQzlDLE9BQU8sSUFBSSxjQUFNLENBQUksSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsNEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBJbnRlcm5hbExpc3RlbmVyLCBTdHJlYW0sIE91dFNlbmRlciwgTk9fSUx9IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgT3RoZXJJTDxUPiBpbXBsZW1lbnRzIEludGVybmFsTGlzdGVuZXI8YW55PiwgT3V0U2VuZGVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIG91dDogU3RyZWFtPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wOiBEcm9wVW50aWxPcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24oX3Q6IFQpIHtcbiAgICB0aGlzLm9wLnVwKCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIHRoaXMub3V0Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBEcm9wVW50aWxPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgcHVibGljIHR5cGUgPSAnZHJvcFVudGlsJztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgb2lsOiBJbnRlcm5hbExpc3RlbmVyPGFueT4gPSBOT19JTDsgLy8gb2lsID0gb3RoZXIgSW50ZXJuYWxMaXN0ZW5lclxuICBwcml2YXRlIG9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG86IFN0cmVhbTxhbnk+LCAvLyBvID0gb3RoZXJcbiAgICAgICAgICAgICAgcHVibGljIGluczogU3RyZWFtPFQ+KSB7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLm8uX2FkZCh0aGlzLm9pbCA9IG5ldyBPdGhlcklMKG91dCwgdGhpcykpO1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMuby5fcmVtb3ZlKHRoaXMub2lsKTtcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICAgIHRoaXMub2lsID0gTk9fSUw7XG4gIH1cblxuICB1cCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uID0gdHJ1ZTtcbiAgICB0aGlzLm8uX3JlbW92ZSh0aGlzLm9pbCk7XG4gICAgdGhpcy5vaWwgPSBOT19JTDtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgaWYgKCF0aGlzLm9uKSByZXR1cm47XG4gICAgdS5fbih0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB0aGlzLl9zdG9wKCk7XG4gICAgdS5fYygpO1xuICB9XG59XG5cbi8qKlxuICogU3RhcnRzIGVtaXR0aW5nIHRoZSBpbnB1dCBzdHJlYW0gd2hlbiBhbm90aGVyIHN0cmVhbSBlbWl0cyBhIG5leHQgZXZlbnQuIFRoZVxuICogb3V0cHV0IHN0cmVhbSB3aWxsIGVtaXQgbm8gaXRlbXMgaWYgYW5vdGhlciBzdHJlYW0gaXMgZW1wdHkuXG4gKlxuICogTWFyYmxlIGRpYWdyYW06XG4gKlxuICogYGBgdGV4dFxuICogLS0tMS0tLTItLS0tLTMtLTQtLS0tNS0tLS02LS0tXG4gKiAgIGRyb3BVbnRpbCggLS0tLS0tLS1hLS1iLS18IClcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLTUtLS0tNnxcbiAqIGBgYFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGltcG9ydCBkcm9wVW50aWwgZnJvbSAneHN0cmVhbS9leHRyYS9kcm9wVW50aWwnXG4gKlxuICogY29uc3Qgb3RoZXIgPSB4cy5wZXJpb2RpYygyMjApLnRha2UoMSlcbiAqXG4gKiBjb25zdCBzdHJlYW0gPSB4cy5wZXJpb2RpYyg1MClcbiAqICAgLnRha2UoNilcbiAqICAgLmNvbXBvc2UoZHJvcFVudGlsKG90aGVyKSlcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiBpID0+IGNvbnNvbGUubG9nKGkpLFxuICogICBlcnJvcjogZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqID4gNFxuICogPiA1XG4gKiA+IGNvbXBsZXRlZFxuICogYGBgXG4gKlxuICogIyMjIyBBcmd1bWVudHM6XG4gKlxuICogQHBhcmFtIHtTdHJlYW19IG90aGVyIFNvbWUgb3RoZXIgc3RyZWFtIHRoYXQgaXMgdXNlZCB0byBrbm93IHdoZW4gdGhlIG91dHB1dFxuICogc3RyZWFtIG9mIHRoaXMgb3BlcmF0b3Igc2hvdWxkIHN0YXJ0IGVtaXR0aW5nLlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcm9wVW50aWw8VD4ob3RoZXI6IFN0cmVhbTxhbnk+KTogKGluczogU3RyZWFtPFQ+KSA9PiBTdHJlYW08VD4ge1xuICByZXR1cm4gZnVuY3Rpb24gZHJvcFVudGlsT3BlcmF0b3IoaW5zOiBTdHJlYW08VD4pOiBTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPFQ+KG5ldyBEcm9wVW50aWxPcGVyYXRvcihvdGhlciwgaW5zKSk7XG4gIH07XG59XG4iXX0=