"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var PairwiseOperator = /** @class */ (function () {
    function PairwiseOperator(ins) {
        this.ins = ins;
        this.type = 'pairwise';
        this.val = null;
        this.has = false;
        this.out = null;
    }
    PairwiseOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    PairwiseOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.has = false;
        this.out = null;
        this.val = null;
    };
    PairwiseOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        if (this.has) {
            var prev = this.val;
            this.val = t;
            u._n([prev, t]);
        }
        else {
            this.val = t;
            this.has = true;
        }
    };
    PairwiseOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    PairwiseOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return PairwiseOperator;
}());
/**
 * Group consecutive pairs of events as arrays. Each array has two items.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3-----4-----5--------|
 *       pairwise
 * -------[1,2]-[2,3]-[3,4]-[4,5]----|
 * ```
 *
 * Example:
 *
 * ```js
 * import pairwise from 'xstream/extra/pairwise'
 *
 * const stream = xs.of(1, 2, 3, 4, 5, 6).compose(pairwise)
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > [1,2]
 * > [2,3]
 * > [3,4]
 * > [4,5]
 * > [5,6]
 * > completed
 * ```
 *
 * @return {Stream}
 */
function pairwise(ins) {
    return new index_1.Stream(new PairwiseOperator(ins));
}
exports.default = pairwise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcndpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXh0cmEvcGFpcndpc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBMEM7QUFFMUM7SUFNRSwwQkFBbUIsR0FBYztRQUFkLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFMMUIsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQUNqQixRQUFHLEdBQWEsSUFBSSxDQUFDO1FBQ3JCLFFBQUcsR0FBWSxLQUFLLENBQUM7UUFDdEIsUUFBRyxHQUFtQixJQUFXLENBQUM7SUFHekMsQ0FBQztJQUVELGlDQUFNLEdBQU4sVUFBTyxHQUFtQjtRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQ0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFXLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELDZCQUFFLEdBQUYsVUFBRyxDQUFJO1FBQ0wsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVELDZCQUFFLEdBQUYsVUFBRyxHQUFRO1FBQ1QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDZCQUFFLEdBQUY7UUFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNULENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxTQUF3QixRQUFRLENBQUksR0FBYztJQUNoRCxPQUFPLElBQUksY0FBTSxDQUFTLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRkQsMkJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yLCBTdHJlYW19IGZyb20gJy4uL2luZGV4JztcblxuY2xhc3MgUGFpcndpc2VPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFtULCBUXT4ge1xuICBwdWJsaWMgdHlwZSA9ICdwYWlyd2lzZSc7XG4gIHByaXZhdGUgdmFsOiBUIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaGFzOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxbVCwgVF0+ID0gbnVsbCBhcyBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluczogU3RyZWFtPFQ+KSB7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08W1QsIFRdPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMuaGFzID0gZmFsc2U7XG4gICAgdGhpcy5vdXQgPSBudWxsIGFzIGFueTtcbiAgICB0aGlzLnZhbCA9IG51bGw7XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICghdSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmhhcykge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMudmFsO1xuICAgICAgdGhpcy52YWwgPSB0O1xuICAgICAgdS5fbihbcHJldiBhcyBULCB0XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsID0gdDtcbiAgICAgIHRoaXMuaGFzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAoIXUpIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKCF1KSByZXR1cm47XG4gICAgdS5fYygpO1xuICB9XG59XG5cbi8qKlxuICogR3JvdXAgY29uc2VjdXRpdmUgcGFpcnMgb2YgZXZlbnRzIGFzIGFycmF5cy4gRWFjaCBhcnJheSBoYXMgdHdvIGl0ZW1zLlxuICpcbiAqIE1hcmJsZSBkaWFncmFtOlxuICpcbiAqIGBgYHRleHRcbiAqIC0tLTEtLS0yLS0tLS0zLS0tLS00LS0tLS01LS0tLS0tLS18XG4gKiAgICAgICBwYWlyd2lzZVxuICogLS0tLS0tLVsxLDJdLVsyLDNdLVszLDRdLVs0LDVdLS0tLXxcbiAqIGBgYFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGltcG9ydCBwYWlyd2lzZSBmcm9tICd4c3RyZWFtL2V4dHJhL3BhaXJ3aXNlJ1xuICpcbiAqIGNvbnN0IHN0cmVhbSA9IHhzLm9mKDEsIDIsIDMsIDQsIDUsIDYpLmNvbXBvc2UocGFpcndpc2UpXG4gKlxuICogc3RyZWFtLmFkZExpc3RlbmVyKHtcbiAqICAgbmV4dDogaSA9PiBjb25zb2xlLmxvZyhpKSxcbiAqICAgZXJyb3I6IGVyciA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gKiAgIGNvbXBsZXRlOiAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGVkJylcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBgYGB0ZXh0XG4gKiA+IFsxLDJdXG4gKiA+IFsyLDNdXG4gKiA+IFszLDRdXG4gKiA+IFs0LDVdXG4gKiA+IFs1LDZdXG4gKiA+IGNvbXBsZXRlZFxuICogYGBgXG4gKlxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWlyd2lzZTxUPihpbnM6IFN0cmVhbTxUPik6IFN0cmVhbTxbVCwgVF0+IHtcbiAgcmV0dXJuIG5ldyBTdHJlYW08W1QsIFRdPihuZXcgUGFpcndpc2VPcGVyYXRvcihpbnMpKTtcbn1cbiJdfQ==