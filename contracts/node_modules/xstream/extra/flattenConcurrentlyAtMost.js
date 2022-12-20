"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlattenConcAMOperator = void 0;
var index_1 = require("../index");
var FCAMIL = /** @class */ (function () {
    function FCAMIL(out, op) {
        this.out = out;
        this.op = op;
    }
    FCAMIL.prototype._n = function (t) {
        this.out._n(t);
    };
    FCAMIL.prototype._e = function (err) {
        this.out._e(err);
    };
    FCAMIL.prototype._c = function () {
        this.op.less();
    };
    return FCAMIL;
}());
var FlattenConcAMOperator = /** @class */ (function () {
    function FlattenConcAMOperator(n, ins) {
        this.n = n;
        this.ins = ins;
        this.type = 'flattenConcurrentlyAtMost';
        this.out = null;
        this._l = 0;
        this._d = false;
        this._seq = [];
    }
    FlattenConcAMOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    FlattenConcAMOperator.prototype._stop = function () {
        this.ins._remove(this);
        this._l = 0;
        this.out = null;
        this._seq = [];
    };
    FlattenConcAMOperator.prototype.less = function () {
        var seq = this._seq;
        if (--this._l === 0 && seq.length === 0 && this._d) {
            var u = this.out;
            if (!u)
                return;
            u._c();
        }
        if (this._l < this.n && seq.length > 0) {
            this._n(seq.shift());
        }
    };
    FlattenConcAMOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        if (this._l < this.n) {
            this._l++;
            s._add(new FCAMIL(u, this));
        }
        else {
            this._seq.push(s);
        }
    };
    FlattenConcAMOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenConcAMOperator.prototype._c = function () {
        var seq = this._seq;
        this._d = true;
        if (this._l === 0 && seq.length === 0) {
            var u = this.out;
            if (!u)
                return;
            u._c();
        }
    };
    return FlattenConcAMOperator;
}());
exports.FlattenConcAMOperator = FlattenConcAMOperator;
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously, up to some limit `n`.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently, up to the configured limit. It works like
 * this: when the input stream emits a nested stream,
 * *flattenConcurrentlyAtMost* will start imitating that nested one. When the
 * next nested stream is emitted on the input stream,
 * *flattenConcurrentlyAtMost* will check to see how many streams it is connected
 * to. If it is connected to a number of streams less than the limit, it will also
 * imitate that new one, but will continue to imitate the previous nested streams
 * as well.
 *
 * If the limit has already been reached, *flattenConcurrentlyAtMost* will put the
 * stream in a queue. When any of the streams it is listening to completes, a stream
 * is taken out of the queue and `flattenConcurrentlyAtMost` will connect to it.
 *
 * This process continues until the metastream completes and there are no more
 * connected streams or streams in the queue.
 *
 * Marble diagrams:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----|
 *     flattenConcurrentlyAtMost(1)
 * -----a--b----c-1----2---3--|
 * ```
 *
 * ```text
 * --+---+---+-|
 *    \   \   \
 *     \   \   ---fgh----i-----jh--|
 *      \   -----1----2----3--|
 *       ---a--b-----c--|
 *     flattenConcurrentlyAtMost(2)
 * ---------a--b-1---c2--i-3------fgh----i-----jh--|
 * ```
 *
 * @return {Stream}
 */
function flattenConcurrentlyAtMost(n) {
    return function flattenConcAMOperator(ins) {
        return new index_1.Stream(new FlattenConcAMOperator(n, ins));
    };
}
exports.default = flattenConcurrentlyAtMost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbkNvbmN1cnJlbnRseUF0TW9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYS9mbGF0dGVuQ29uY3VycmVudGx5QXRNb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUF1RjtBQUV2RjtJQUNFLGdCQUFtQixHQUFjLEVBQ2IsRUFBNEI7UUFEN0IsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNiLE9BQUUsR0FBRixFQUFFLENBQTBCO0lBQ2hELENBQUM7SUFFRCxtQkFBRSxHQUFGLFVBQUcsQ0FBSTtRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQkFBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxtQkFBRSxHQUFGO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFFRDtJQU9FLCtCQUFtQixDQUFTLEVBQVMsR0FBc0I7UUFBeEMsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBTnBELFNBQUksR0FBRywyQkFBMkIsQ0FBQztRQUNuQyxRQUFHLEdBQWMsSUFBVyxDQUFDO1FBQzVCLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFDZixPQUFFLEdBQVksS0FBSyxDQUFDO1FBQ3BCLFNBQUksR0FBcUIsRUFBRSxDQUFDO0lBR3BDLENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQU8sR0FBYztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxxQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLElBQVcsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ2YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQWUsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELGtDQUFFLEdBQUYsVUFBRyxDQUFZO1FBQ2IsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRCxrQ0FBRSxHQUFGLFVBQUcsR0FBUTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCxrQ0FBRSxHQUFGO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ2YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ1I7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBNURELElBNERDO0FBNURZLHNEQUFxQjtBQThEbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBQ0gsU0FBd0IseUJBQXlCLENBQUksQ0FBUztJQUM1RCxPQUFPLFNBQVMscUJBQXFCLENBQUMsR0FBd0M7UUFDNUUsT0FBTyxJQUFJLGNBQU0sQ0FBSSxJQUFJLHFCQUFxQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCw0Q0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yLCBTdHJlYW0sIE1lbW9yeVN0cmVhbSwgT3V0U2VuZGVyLCBJbnRlcm5hbExpc3RlbmVyIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jbGFzcyBGQ0FNSUw8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPFQ+LCBPdXRTZW5kZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3V0OiBTdHJlYW08VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgb3A6IEZsYXR0ZW5Db25jQU1PcGVyYXRvcjxUPikge1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIHRoaXMub3V0Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICB0aGlzLm91dC5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgdGhpcy5vcC5sZXNzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZsYXR0ZW5Db25jQU1PcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFN0cmVhbTxUPiwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmbGF0dGVuQ29uY3VycmVudGx5QXRNb3N0JztcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+ID0gbnVsbCBhcyBhbnk7XG4gIHByaXZhdGUgX2w6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VxOiBBcnJheTxTdHJlYW08VD4+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIG46IG51bWJlciwgcHVibGljIGluczogU3RyZWFtPFN0cmVhbTxUPj4pIHtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMuX2wgPSAwO1xuICAgIHRoaXMub3V0ID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5fc2VxID0gW107XG4gIH1cblxuICBsZXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlcSA9IHRoaXMuX3NlcTtcbiAgICBpZiAoLS10aGlzLl9sID09PSAwICYmIHNlcS5sZW5ndGggPT09IDAgJiYgdGhpcy5fZCkge1xuICAgICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgICAgaWYgKCF1KSByZXR1cm47XG4gICAgICB1Ll9jKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9sIDwgdGhpcy5uICYmIHNlcS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9uKHNlcS5zaGlmdCgpIGFzIFN0cmVhbTxUPik7XG4gICAgfVxuICB9XG5cbiAgX24oczogU3RyZWFtPFQ+KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9sIDwgdGhpcy5uKSB7XG4gICAgICB0aGlzLl9sKys7XG4gICAgICBzLl9hZGQobmV3IEZDQU1JTCh1LCB0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcS5wdXNoKHMpO1xuICAgIH1cbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHNlcSA9IHRoaXMuX3NlcTtcbiAgICB0aGlzLl9kID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fbCA9PT0gMCAmJiBzZXEubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgICBpZiAoIXUpIHJldHVybjtcbiAgICAgIHUuX2MoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGbGF0dGVucyBhIFwic3RyZWFtIG9mIHN0cmVhbXNcIiwgaGFuZGxpbmcgbXVsdGlwbGUgY29uY3VycmVudCBuZXN0ZWQgc3RyZWFtc1xuICogc2ltdWx0YW5lb3VzbHksIHVwIHRvIHNvbWUgbGltaXQgYG5gLlxuICpcbiAqIElmIHRoZSBpbnB1dCBzdHJlYW0gaXMgYSBzdHJlYW0gdGhhdCBlbWl0cyBzdHJlYW1zLCB0aGVuIHRoaXMgb3BlcmF0b3Igd2lsbFxuICogcmV0dXJuIGFuIG91dHB1dCBzdHJlYW0gd2hpY2ggaXMgYSBmbGF0IHN0cmVhbTogZW1pdHMgcmVndWxhciBldmVudHMuIFRoZVxuICogZmxhdHRlbmluZyBoYXBwZW5zIGNvbmN1cnJlbnRseSwgdXAgdG8gdGhlIGNvbmZpZ3VyZWQgbGltaXQuIEl0IHdvcmtzIGxpa2VcbiAqIHRoaXM6IHdoZW4gdGhlIGlucHV0IHN0cmVhbSBlbWl0cyBhIG5lc3RlZCBzdHJlYW0sXG4gKiAqZmxhdHRlbkNvbmN1cnJlbnRseUF0TW9zdCogd2lsbCBzdGFydCBpbWl0YXRpbmcgdGhhdCBuZXN0ZWQgb25lLiBXaGVuIHRoZVxuICogbmV4dCBuZXN0ZWQgc3RyZWFtIGlzIGVtaXR0ZWQgb24gdGhlIGlucHV0IHN0cmVhbSxcbiAqICpmbGF0dGVuQ29uY3VycmVudGx5QXRNb3N0KiB3aWxsIGNoZWNrIHRvIHNlZSBob3cgbWFueSBzdHJlYW1zIGl0IGlzIGNvbm5lY3RlZFxuICogdG8uIElmIGl0IGlzIGNvbm5lY3RlZCB0byBhIG51bWJlciBvZiBzdHJlYW1zIGxlc3MgdGhhbiB0aGUgbGltaXQsIGl0IHdpbGwgYWxzb1xuICogaW1pdGF0ZSB0aGF0IG5ldyBvbmUsIGJ1dCB3aWxsIGNvbnRpbnVlIHRvIGltaXRhdGUgdGhlIHByZXZpb3VzIG5lc3RlZCBzdHJlYW1zXG4gKiBhcyB3ZWxsLlxuICpcbiAqIElmIHRoZSBsaW1pdCBoYXMgYWxyZWFkeSBiZWVuIHJlYWNoZWQsICpmbGF0dGVuQ29uY3VycmVudGx5QXRNb3N0KiB3aWxsIHB1dCB0aGVcbiAqIHN0cmVhbSBpbiBhIHF1ZXVlLiBXaGVuIGFueSBvZiB0aGUgc3RyZWFtcyBpdCBpcyBsaXN0ZW5pbmcgdG8gY29tcGxldGVzLCBhIHN0cmVhbVxuICogaXMgdGFrZW4gb3V0IG9mIHRoZSBxdWV1ZSBhbmQgYGZsYXR0ZW5Db25jdXJyZW50bHlBdE1vc3RgIHdpbGwgY29ubmVjdCB0byBpdC5cbiAqXG4gKiBUaGlzIHByb2Nlc3MgY29udGludWVzIHVudGlsIHRoZSBtZXRhc3RyZWFtIGNvbXBsZXRlcyBhbmQgdGhlcmUgYXJlIG5vIG1vcmVcbiAqIGNvbm5lY3RlZCBzdHJlYW1zIG9yIHN0cmVhbXMgaW4gdGhlIHF1ZXVlLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtczpcbiAqXG4gKiBgYGB0ZXh0XG4gKiAtLSstLS0tLS0tLSstLS0tLS0tLS0tLS0tLS1cbiAqICAgXFwgICAgICAgIFxcXG4gKiAgICBcXCAgICAgICAtLS0tMS0tLS0yLS0tMy0tfFxuICogICAgLS1hLS1iLS0tLWMtLS0tfFxuICogICAgIGZsYXR0ZW5Db25jdXJyZW50bHlBdE1vc3QoMSlcbiAqIC0tLS0tYS0tYi0tLS1jLTEtLS0tMi0tLTMtLXxcbiAqIGBgYFxuICpcbiAqIGBgYHRleHRcbiAqIC0tKy0tLSstLS0rLXxcbiAqICAgIFxcICAgXFwgICBcXFxuICogICAgIFxcICAgXFwgICAtLS1mZ2gtLS0taS0tLS0tamgtLXxcbiAqICAgICAgXFwgICAtLS0tLTEtLS0tMi0tLS0zLS18XG4gKiAgICAgICAtLS1hLS1iLS0tLS1jLS18XG4gKiAgICAgZmxhdHRlbkNvbmN1cnJlbnRseUF0TW9zdCgyKVxuICogLS0tLS0tLS0tYS0tYi0xLS0tYzItLWktMy0tLS0tLWZnaC0tLS1pLS0tLS1qaC0tfFxuICogYGBgXG4gKlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuQ29uY3VycmVudGx5QXRNb3N0PFQ+KG46IG51bWJlcik6IChpbnM6IFN0cmVhbTxTdHJlYW08VD4gfCBNZW1vcnlTdHJlYW08VD4+KSA9PiBTdHJlYW08VD4ge1xuICByZXR1cm4gZnVuY3Rpb24gZmxhdHRlbkNvbmNBTU9wZXJhdG9yKGluczogU3RyZWFtPFN0cmVhbTxUPiB8IE1lbW9yeVN0cmVhbTxUPj4pIHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRmxhdHRlbkNvbmNBTU9wZXJhdG9yKG4sIGlucykpO1xuICB9O1xufVxuIl19