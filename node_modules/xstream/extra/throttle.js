"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var ThrottleOperator = /** @class */ (function () {
    function ThrottleOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'throttle';
        this.out = null;
        this.id = null;
    }
    ThrottleOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ThrottleOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    ThrottleOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    ThrottleOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        if (this.id)
            return;
        u._n(t);
        this.id = setInterval(function () {
            _this.clearInterval();
        }, this.dt);
    };
    ThrottleOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    ThrottleOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._c();
    };
    return ThrottleOperator;
}());
/**
 * Emits event and drops subsequent events until a certain amount of silence has passed.
 *
 * Marble diagram:
 *
 * ```text
 * --1-2-----3--4----5|
 *     throttle(60)
 * --1-------3-------5-|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import throttle from 'xstream/extra/throttle'
 *
 * const stream = fromDiagram('--1-2-----3--4----5|')
 *  .compose(throttle(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 3
 * > 5
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function throttle(period) {
    return function throttleOperator(ins) {
        return new index_1.Stream(new ThrottleOperator(period, ins));
    };
}
exports.default = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXh0cmEvdGhyb3R0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEM7QUFFMUM7SUFLRSwwQkFBbUIsRUFBVSxFQUNWLEdBQWM7UUFEZCxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUwxQixTQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2xCLFFBQUcsR0FBYyxJQUFXLENBQUM7UUFDNUIsT0FBRSxHQUFRLElBQUksQ0FBQztJQUl2QixDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLEdBQWM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBVyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQ0UsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQixJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDO0lBRUQsNkJBQUUsR0FBRixVQUFHLENBQUk7UUFBUCxpQkFRQztRQVBDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDcEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELDZCQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCw2QkFBRSxHQUFGO1FBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxTQUF3QixRQUFRLENBQUksTUFBYztJQUNoRCxPQUFPLFNBQVMsZ0JBQWdCLENBQUMsR0FBYztRQUM3QyxPQUFPLElBQUksY0FBTSxDQUFJLElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELDJCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvciwgU3RyZWFtfSBmcm9tICcuLi9pbmRleCc7XG5cbmNsYXNzIFRocm90dGxlT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ3Rocm90dGxlJztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgaWQ6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGR0OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnM6IFN0cmVhbTxUPikge1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgfVxuXG4gIGNsZWFySW50ZXJ2YWwoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmlkO1xuICAgIGlmIChpZCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfVxuICAgIHRoaXMuaWQgPSBudWxsO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICBpZiAodGhpcy5pZCkgcmV0dXJuO1xuICAgIHUuX24odCk7XG4gICAgdGhpcy5pZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xuICAgIH0sIHRoaXMuZHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdGhpcy5jbGVhckludGVydmFsKCk7XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbCgpO1xuICAgIHUuX2MoKTtcbiAgfVxufVxuXG4vKipcbiAqIEVtaXRzIGV2ZW50IGFuZCBkcm9wcyBzdWJzZXF1ZW50IGV2ZW50cyB1bnRpbCBhIGNlcnRhaW4gYW1vdW50IG9mIHNpbGVuY2UgaGFzIHBhc3NlZC5cbiAqXG4gKiBNYXJibGUgZGlhZ3JhbTpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLTEtMi0tLS0tMy0tNC0tLS01fFxuICogICAgIHRocm90dGxlKDYwKVxuICogLS0xLS0tLS0tLTMtLS0tLS0tNS18XG4gKiBgYGBcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgZnJvbURpYWdyYW0gZnJvbSAneHN0cmVhbS9leHRyYS9mcm9tRGlhZ3JhbSdcbiAqIGltcG9ydCB0aHJvdHRsZSBmcm9tICd4c3RyZWFtL2V4dHJhL3Rocm90dGxlJ1xuICpcbiAqIGNvbnN0IHN0cmVhbSA9IGZyb21EaWFncmFtKCctLTEtMi0tLS0tMy0tNC0tLS01fCcpXG4gKiAgLmNvbXBvc2UodGhyb3R0bGUoNjApKVxuICpcbiAqIHN0cmVhbS5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6IGkgPT4gY29uc29sZS5sb2coaSksXG4gKiAgIGVycm9yOiBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICogICBjb21wbGV0ZTogKCkgPT4gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcpXG4gKiB9KVxuICogYGBgXG4gKlxuICogYGBgdGV4dFxuICogPiAxXG4gKiA+IDNcbiAqID4gNVxuICogPiBjb21wbGV0ZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJpb2QgVGhlIGFtb3VudCBvZiBzaWxlbmNlIHJlcXVpcmVkIGluIG1pbGxpc2Vjb25kcy5cbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGhyb3R0bGU8VD4ocGVyaW9kOiBudW1iZXIpOiAoaW5zOiBTdHJlYW08VD4pID0+IFN0cmVhbTxUPiB7XG4gIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZU9wZXJhdG9yKGluczogU3RyZWFtPFQ+KSB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IFRocm90dGxlT3BlcmF0b3IocGVyaW9kLCBpbnMpKTtcbiAgfTtcbn1cbiJdfQ==