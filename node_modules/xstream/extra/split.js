"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitOperator = void 0;
var index_1 = require("../index");
var SeparatorIL = /** @class */ (function () {
    function SeparatorIL(out, op) {
        this.out = out;
        this.op = op;
    }
    SeparatorIL.prototype._n = function (_t) {
        this.op.up();
    };
    SeparatorIL.prototype._e = function (err) {
        this.out._e(err);
    };
    SeparatorIL.prototype._c = function () {
        this.op.curr._c();
        this.out._c();
    };
    return SeparatorIL;
}());
var SplitOperator = /** @class */ (function () {
    function SplitOperator(s, // s = separator
    ins) {
        this.s = s;
        this.ins = ins;
        this.type = 'split';
        this.curr = new index_1.Stream();
        this.out = null;
        this.sil = index_1.NO_IL; // sil = separator InternalListener
    }
    SplitOperator.prototype._start = function (out) {
        this.out = out;
        this.s._add(this.sil = new SeparatorIL(out, this));
        this.ins._add(this);
        out._n(this.curr);
    };
    SplitOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.s._remove(this.sil);
        this.curr = new index_1.Stream();
        this.out = null;
        this.sil = index_1.NO_IL;
    };
    SplitOperator.prototype.up = function () {
        this.curr._c();
        this.out._n(this.curr = new index_1.Stream());
    };
    SplitOperator.prototype._n = function (t) {
        if (!this.out)
            return;
        this.curr._n(t);
    };
    SplitOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    SplitOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.curr._c();
        u._c();
    };
    return SplitOperator;
}());
exports.SplitOperator = SplitOperator;
/**
 * Splits a stream using a separator stream. Returns a stream that emits
 * streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 *  split( --a----b--- )
 * ---------------------------|
 *   :        :    :
 *   1--2--3-|:    :
 *            4--5|:
 *                 -6--7--8--9|
 * ```
 *
 * Example:
 *
 * ```js
 * import split from 'xstream/extra/split'
 * import concat from 'xstream/extra/concat'
 *
 * const source = xs.periodic(50).take(10)
 * const separator = concat(xs.periodic(167).take(2), xs.never())
 * const result = source.compose(split(separator))
 *
 * result.addListener({
 *   next: stream => {
 *     stream.addListener({
 *       next: i => console.log(i),
 *       error: err => console.error(err),
 *       complete: () => console.log('inner completed')
 *     })
 *   },
 *   error: err => console.error(err),
 *   complete: () => console.log('outer completed')
 * })
 * ```
 *
 * ```text
 * > 0
 * > 1
 * > 2
 * > inner completed
 * > 3
 * > 4
 * > 5
 * > inner completed
 * > 6
 * > 7
 * > 8
 * > 9
 * > inner completed
 * > outer completed
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
function split(separator) {
    return function splitOperator(ins) {
        return new index_1.Stream(new SplitOperator(separator, ins));
    };
}
exports.default = split;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXh0cmEvc3BsaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQThFO0FBRTlFO0lBQ0UscUJBQW1CLEdBQXNCLEVBQ3JCLEVBQW9CO1FBRHJCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3JCLE9BQUUsR0FBRixFQUFFLENBQWtCO0lBQ3hDLENBQUM7SUFFRCx3QkFBRSxHQUFGLFVBQUcsRUFBTztRQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsd0JBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0JBQUUsR0FBRjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQUVEO0lBTUUsdUJBQW1CLENBQWMsRUFBRSxnQkFBZ0I7SUFDaEMsR0FBYztRQURkLE1BQUMsR0FBRCxDQUFDLENBQWE7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBTjFCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFDZixTQUFJLEdBQWMsSUFBSSxjQUFNLEVBQUssQ0FBQztRQUNsQyxRQUFHLEdBQXNCLElBQVcsQ0FBQztRQUNwQyxRQUFHLEdBQTBCLGFBQUssQ0FBQyxDQUFDLG1DQUFtQztJQUkvRSxDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLEdBQXNCO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBTSxFQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELDBCQUFFLEdBQUY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQU0sRUFBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDBCQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsMEJBQUUsR0FBRixVQUFHLEdBQVE7UUFDVCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsMEJBQUUsR0FBRjtRQUNFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNULENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEvQ1ksc0NBQWE7QUFpRDFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJERztBQUNILFNBQXdCLEtBQUssQ0FBSSxTQUFzQjtJQUNyRCxPQUFPLFNBQVMsYUFBYSxDQUFDLEdBQWM7UUFDMUMsT0FBTyxJQUFJLGNBQU0sQ0FBWSxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsd0JBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBJbnRlcm5hbExpc3RlbmVyLCBTdHJlYW0sIE91dFNlbmRlciwgTk9fSUx9IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgU2VwYXJhdG9ySUw8VD4gaW1wbGVtZW50cyBJbnRlcm5hbExpc3RlbmVyPGFueT4sIE91dFNlbmRlcjxTdHJlYW08VD4+IHtcbiAgY29uc3RydWN0b3IocHVibGljIG91dDogU3RyZWFtPFN0cmVhbTxUPj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgb3A6IFNwbGl0T3BlcmF0b3I8VD4pIHtcbiAgfVxuXG4gIF9uKF90OiBhbnkpIHtcbiAgICB0aGlzLm9wLnVwKCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIHRoaXMub3V0Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICB0aGlzLm9wLmN1cnIuX2MoKTtcbiAgICB0aGlzLm91dC5fYygpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTcGxpdE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgU3RyZWFtPFQ+PiB7XG4gIHB1YmxpYyB0eXBlID0gJ3NwbGl0JztcbiAgcHVibGljIGN1cnI6IFN0cmVhbTxUPiA9IG5ldyBTdHJlYW08VD4oKTtcbiAgcHVibGljIG91dDogU3RyZWFtPFN0cmVhbTxUPj4gPSBudWxsIGFzIGFueTtcbiAgcHJpdmF0ZSBzaWw6IEludGVybmFsTGlzdGVuZXI8YW55PiA9IE5PX0lMOyAvLyBzaWwgPSBzZXBhcmF0b3IgSW50ZXJuYWxMaXN0ZW5lclxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzOiBTdHJlYW08YW55PiwgLy8gcyA9IHNlcGFyYXRvclxuICAgICAgICAgICAgICBwdWJsaWMgaW5zOiBTdHJlYW08VD4pIHtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxTdHJlYW08VD4+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5zLl9hZGQodGhpcy5zaWwgPSBuZXcgU2VwYXJhdG9ySUw8VD4ob3V0LCB0aGlzKSk7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgICBvdXQuX24odGhpcy5jdXJyKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5zLl9yZW1vdmUodGhpcy5zaWwpO1xuICAgIHRoaXMuY3VyciA9IG5ldyBTdHJlYW08VD4oKTtcbiAgICB0aGlzLm91dCA9IG51bGwgYXMgYW55O1xuICAgIHRoaXMuc2lsID0gTk9fSUw7XG4gIH1cblxuICB1cCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnIuX2MoKTtcbiAgICB0aGlzLm91dC5fbih0aGlzLmN1cnIgPSBuZXcgU3RyZWFtPFQ+KCkpO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGlmICghdGhpcy5vdXQpIHJldHVybjtcbiAgICB0aGlzLmN1cnIuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdGhpcy5jdXJyLl9jKCk7XG4gICAgdS5fYygpO1xuICB9XG59XG5cbi8qKlxuICogU3BsaXRzIGEgc3RyZWFtIHVzaW5nIGEgc2VwYXJhdG9yIHN0cmVhbS4gUmV0dXJucyBhIHN0cmVhbSB0aGF0IGVtaXRzXG4gKiBzdHJlYW1zLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tMS0tMi0tMy0tNC0tNS0tNi0tNy0tOC0tOXxcbiAqICBzcGxpdCggLS1hLS0tLWItLS0gKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogICA6ICAgICAgICA6ICAgIDpcbiAqICAgMS0tMi0tMy18OiAgICA6XG4gKiAgICAgICAgICAgIDQtLTV8OlxuICogICAgICAgICAgICAgICAgIC02LS03LS04LS05fFxuICogYGBgXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHNwbGl0IGZyb20gJ3hzdHJlYW0vZXh0cmEvc3BsaXQnXG4gKiBpbXBvcnQgY29uY2F0IGZyb20gJ3hzdHJlYW0vZXh0cmEvY29uY2F0J1xuICpcbiAqIGNvbnN0IHNvdXJjZSA9IHhzLnBlcmlvZGljKDUwKS50YWtlKDEwKVxuICogY29uc3Qgc2VwYXJhdG9yID0gY29uY2F0KHhzLnBlcmlvZGljKDE2NykudGFrZSgyKSwgeHMubmV2ZXIoKSlcbiAqIGNvbnN0IHJlc3VsdCA9IHNvdXJjZS5jb21wb3NlKHNwbGl0KHNlcGFyYXRvcikpXG4gKlxuICogcmVzdWx0LmFkZExpc3RlbmVyKHtcbiAqICAgbmV4dDogc3RyZWFtID0+IHtcbiAqICAgICBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICAgICAgbmV4dDogaSA9PiBjb25zb2xlLmxvZyhpKSxcbiAqICAgICAgIGVycm9yOiBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICogICAgICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdpbm5lciBjb21wbGV0ZWQnKVxuICogICAgIH0pXG4gKiAgIH0sXG4gKiAgIGVycm9yOiBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICogICBjb21wbGV0ZTogKCkgPT4gY29uc29sZS5sb2coJ291dGVyIGNvbXBsZXRlZCcpXG4gKiB9KVxuICogYGBgXG4gKlxuICogYGBgdGV4dFxuICogPiAwXG4gKiA+IDFcbiAqID4gMlxuICogPiBpbm5lciBjb21wbGV0ZWRcbiAqID4gM1xuICogPiA0XG4gKiA+IDVcbiAqID4gaW5uZXIgY29tcGxldGVkXG4gKiA+IDZcbiAqID4gN1xuICogPiA4XG4gKiA+IDlcbiAqID4gaW5uZXIgY29tcGxldGVkXG4gKiA+IG91dGVyIGNvbXBsZXRlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJlYW19IHNlcGFyYXRvciBTb21lIG90aGVyIHN0cmVhbSB0aGF0IGlzIHVzZWQgdG8ga25vdyB3aGVuIHRvXG4gKiBzcGxpdCB0aGUgb3V0cHV0IHN0cmVhbS5cbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BsaXQ8VD4oc2VwYXJhdG9yOiBTdHJlYW08YW55Pik6IChpbnM6IFN0cmVhbTxUPikgPT4gU3RyZWFtPFN0cmVhbTxUPj4ge1xuICByZXR1cm4gZnVuY3Rpb24gc3BsaXRPcGVyYXRvcihpbnM6IFN0cmVhbTxUPik6IFN0cmVhbTxTdHJlYW08VD4+IHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxTdHJlYW08VD4+KG5ldyBTcGxpdE9wZXJhdG9yKHNlcGFyYXRvciwgaW5zKSk7XG4gIH07XG59XG4iXX0=