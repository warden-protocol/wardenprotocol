"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramProducer = void 0;
var index_1 = require("../index");
var DiagramProducer = /** @class */ (function () {
    function DiagramProducer(diagram, opt) {
        this.diagram = diagram.trim();
        this.errorVal = (opt && opt.errorValue) ? opt.errorValue : '#';
        this.timeUnit = (opt && opt.timeUnit) ? opt.timeUnit : 20;
        this.values = (opt && opt.values) ? opt.values : {};
        this.tasks = [];
    }
    DiagramProducer.prototype._start = function (out) {
        var L = this.diagram.length;
        for (var i = 0; i < L; i++) {
            var c = this.diagram[i];
            var time = this.timeUnit * i;
            switch (c) {
                case '-':
                    break;
                case '#':
                    this.schedule({ type: 'error', value: this.errorVal, time: time }, out);
                    break;
                case '|':
                    this.schedule({ type: 'complete', time: time }, out);
                    break;
                default:
                    var val = this.values.hasOwnProperty(c) ? this.values[c] : c;
                    this.schedule({ type: 'next', value: val, time: time }, out);
                    break;
            }
        }
    };
    DiagramProducer.prototype.schedule = function (notification, out) {
        var id = setInterval(function () {
            switch (notification.type) {
                case 'next':
                    out._n(notification.value);
                    break;
                case 'error':
                    out._e(notification.value);
                    break;
                case 'complete':
                    out._c();
                    break;
            }
            clearInterval(id);
        }, notification.time);
        this.tasks.push(id);
    };
    DiagramProducer.prototype._stop = function () {
        this.tasks.forEach(function (id) { return clearInterval(id); });
    };
    return DiagramProducer;
}());
exports.DiagramProducer = DiagramProducer;
/**
 * Creates a real stream out of an ASCII drawing of a stream. Each string
 * character represents an amount of time passed (by default, 20 milliseconds).
 * `-` characters represent nothing special, `|` is a symbol to mark the
 * completion of the stream, `#` is an error on the stream, and any other
 * character is a "next" event.
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 *
 * const stream = fromDiagram('--a--b---c-d--|')
 *
 * stream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * The character `a` represent emission of the event `'a'`, a string. If you
 * want to emit something else than a string, you need to provide those values
 * in the options argument.
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 *
 * const stream = fromDiagram('--a--b---c-d--|', {
 *   values: {a: 10, b: 20, c: 30, d: 40}
 * })
 *
 * stream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * That way, the stream will emit the numbers 10, 20, 30, 40. The `options`
 * argument may also take `timeUnit`, a number to configure how many
 * milliseconds does each represents, and `errorValue`, a value to send out as
 * the error which `#` represents.
 *
 * @factory true
 * @param {string} diagram A string representing a timeline of values, error,
 * or complete notifications that should happen on the output stream.
 * @param options An options object that allows you to configure some additional
 * details of the creation of the stream.
 * @return {Stream}
 */
function fromDiagram(diagram, options) {
    return new index_1.Stream(new DiagramProducer(diagram, options));
}
exports.default = fromDiagram;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbURpYWdyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXh0cmEvZnJvbURpYWdyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQW9FO0FBY3BFO0lBT0UseUJBQVksT0FBZSxFQUNmLEdBQXdCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sR0FBMEI7UUFDL0IsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxFQUFFO2dCQUNULEtBQUssR0FBRztvQkFDTixNQUFNO2dCQUNSLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3RFLE1BQU07Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDbkQsTUFBTTtnQkFDUjtvQkFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDM0QsTUFBTTthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sa0NBQVEsR0FBaEIsVUFBaUIsWUFBMEIsRUFBRSxHQUEwQjtRQUNyRSxJQUFNLEVBQUUsR0FBRyxXQUFXLENBQUM7WUFDckIsUUFBUSxZQUFZLENBQUMsSUFBSSxFQUFFO2dCQUN6QixLQUFLLE1BQU07b0JBQ1QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLE1BQU07Z0JBQ1IsS0FBSyxPQUFPO29CQUNWLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixNQUFNO2dCQUNSLEtBQUssVUFBVTtvQkFDYixHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ1QsTUFBTTthQUNUO1lBQ0QsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELCtCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksMENBQWU7QUE4RDVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RHO0FBQ0gsU0FBd0IsV0FBVyxDQUFDLE9BQWUsRUFBRSxPQUE0QjtJQUMvRSxPQUFPLElBQUksY0FBTSxDQUFNLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFGRCw4QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RyZWFtLCBJbnRlcm5hbFByb2R1Y2VyLCBJbnRlcm5hbExpc3RlbmVyfSBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbURpYWdyYW1PcHRpb25zIHtcbiAgdmFsdWVzPzogT2JqZWN0O1xuICBlcnJvclZhbHVlPzogYW55O1xuICB0aW1lVW5pdD86IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE5vdGlmaWNhdGlvbiB7XG4gIHR5cGU6ICduZXh0JyB8ICdlcnJvcicgfCAnY29tcGxldGUnO1xuICB2YWx1ZT86IGFueTtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGlhZ3JhbVByb2R1Y2VyIGltcGxlbWVudHMgSW50ZXJuYWxQcm9kdWNlcjxhbnk+IHtcbiAgcHJpdmF0ZSBkaWFncmFtOiBzdHJpbmc7XG4gIHByaXZhdGUgdmFsdWVzOiBPYmplY3Q7XG4gIHByaXZhdGUgZXJyb3JWYWw6IGFueTtcbiAgcHJpdmF0ZSB0aW1lVW5pdDogbnVtYmVyO1xuICBwcml2YXRlIHRhc2tzOiBBcnJheTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKGRpYWdyYW06IHN0cmluZyxcbiAgICAgICAgICAgICAgb3B0PzogRnJvbURpYWdyYW1PcHRpb25zKSB7XG4gICAgdGhpcy5kaWFncmFtID0gZGlhZ3JhbS50cmltKCk7XG4gICAgdGhpcy5lcnJvclZhbCA9IChvcHQgJiYgb3B0LmVycm9yVmFsdWUpID8gb3B0LmVycm9yVmFsdWUgOiAnIyc7XG4gICAgdGhpcy50aW1lVW5pdCA9IChvcHQgJiYgb3B0LnRpbWVVbml0KSA/IG9wdC50aW1lVW5pdCA6IDIwO1xuICAgIHRoaXMudmFsdWVzID0gKG9wdCAmJiBvcHQudmFsdWVzKSA/IG9wdC52YWx1ZXMgOiB7fTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICBfc3RhcnQob3V0OiBJbnRlcm5hbExpc3RlbmVyPGFueT4pIHtcbiAgICBjb25zdCBMID0gdGhpcy5kaWFncmFtLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEw7IGkrKykge1xuICAgICAgY29uc3QgYyA9IHRoaXMuZGlhZ3JhbVtpXTtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVVbml0ICogaTtcbiAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgICAgdGhpcy5zY2hlZHVsZSh7dHlwZTogJ2Vycm9yJywgdmFsdWU6IHRoaXMuZXJyb3JWYWwsIHRpbWU6IHRpbWV9LCBvdXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd8JzpcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlKHt0eXBlOiAnY29tcGxldGUnLCB0aW1lOiB0aW1lfSwgb3V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjKSA/IHRoaXMudmFsdWVzW2NdIDogYztcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlKHt0eXBlOiAnbmV4dCcsIHZhbHVlOiB2YWwsIHRpbWU6IHRpbWV9LCBvdXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGUobm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24sIG91dDogSW50ZXJuYWxMaXN0ZW5lcjxhbnk+KSB7XG4gICAgY29uc3QgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgIG91dC5fbihub3RpZmljYXRpb24udmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgb3V0Ll9lKG5vdGlmaWNhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbXBsZXRlJzpcbiAgICAgICAgICBvdXQuX2MoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgIH0sIG5vdGlmaWNhdGlvbi50aW1lKTtcblxuICAgIHRoaXMudGFza3MucHVzaChpZCk7XG4gIH1cblxuICBfc3RvcCgpIHtcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goaWQgPT4gY2xlYXJJbnRlcnZhbChpZCkpO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlYWwgc3RyZWFtIG91dCBvZiBhbiBBU0NJSSBkcmF3aW5nIG9mIGEgc3RyZWFtLiBFYWNoIHN0cmluZ1xuICogY2hhcmFjdGVyIHJlcHJlc2VudHMgYW4gYW1vdW50IG9mIHRpbWUgcGFzc2VkIChieSBkZWZhdWx0LCAyMCBtaWxsaXNlY29uZHMpLlxuICogYC1gIGNoYXJhY3RlcnMgcmVwcmVzZW50IG5vdGhpbmcgc3BlY2lhbCwgYHxgIGlzIGEgc3ltYm9sIHRvIG1hcmsgdGhlXG4gKiBjb21wbGV0aW9uIG9mIHRoZSBzdHJlYW0sIGAjYCBpcyBhbiBlcnJvciBvbiB0aGUgc3RyZWFtLCBhbmQgYW55IG90aGVyXG4gKiBjaGFyYWN0ZXIgaXMgYSBcIm5leHRcIiBldmVudC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgZnJvbURpYWdyYW0gZnJvbSAneHN0cmVhbS9leHRyYS9mcm9tRGlhZ3JhbSdcbiAqXG4gKiBjb25zdCBzdHJlYW0gPSBmcm9tRGlhZ3JhbSgnLS1hLS1iLS0tYy1kLS18JylcbiAqXG4gKiBzdHJlYW0uYWRkTGlzdGVuZXIoe1xuICogICBuZXh0OiAoeCkgPT4gY29uc29sZS5sb2coeCksXG4gKiAgIGVycm9yOiAoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gKiAgIGNvbXBsZXRlOiAoKSA9PiBjb25zb2xlLmxvZygnY29uY2F0IGNvbXBsZXRlZCcpLFxuICogfSlcbiAqIGBgYFxuICpcbiAqIFRoZSBjaGFyYWN0ZXIgYGFgIHJlcHJlc2VudCBlbWlzc2lvbiBvZiB0aGUgZXZlbnQgYCdhJ2AsIGEgc3RyaW5nLiBJZiB5b3VcbiAqIHdhbnQgdG8gZW1pdCBzb21ldGhpbmcgZWxzZSB0aGFuIGEgc3RyaW5nLCB5b3UgbmVlZCB0byBwcm92aWRlIHRob3NlIHZhbHVlc1xuICogaW4gdGhlIG9wdGlvbnMgYXJndW1lbnQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IGZyb21EaWFncmFtIGZyb20gJ3hzdHJlYW0vZXh0cmEvZnJvbURpYWdyYW0nXG4gKlxuICogY29uc3Qgc3RyZWFtID0gZnJvbURpYWdyYW0oJy0tYS0tYi0tLWMtZC0tfCcsIHtcbiAqICAgdmFsdWVzOiB7YTogMTAsIGI6IDIwLCBjOiAzMCwgZDogNDB9XG4gKiB9KVxuICpcbiAqIHN0cmVhbS5hZGRMaXN0ZW5lcih7XG4gKiAgIG5leHQ6ICh4KSA9PiBjb25zb2xlLmxvZyh4KSxcbiAqICAgZXJyb3I6IChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSxcbiAqICAgY29tcGxldGU6ICgpID0+IGNvbnNvbGUubG9nKCdjb25jYXQgY29tcGxldGVkJyksXG4gKiB9KVxuICogYGBgXG4gKlxuICogVGhhdCB3YXksIHRoZSBzdHJlYW0gd2lsbCBlbWl0IHRoZSBudW1iZXJzIDEwLCAyMCwgMzAsIDQwLiBUaGUgYG9wdGlvbnNgXG4gKiBhcmd1bWVudCBtYXkgYWxzbyB0YWtlIGB0aW1lVW5pdGAsIGEgbnVtYmVyIHRvIGNvbmZpZ3VyZSBob3cgbWFueVxuICogbWlsbGlzZWNvbmRzIGRvZXMgZWFjaCByZXByZXNlbnRzLCBhbmQgYGVycm9yVmFsdWVgLCBhIHZhbHVlIHRvIHNlbmQgb3V0IGFzXG4gKiB0aGUgZXJyb3Igd2hpY2ggYCNgIHJlcHJlc2VudHMuXG4gKlxuICogQGZhY3RvcnkgdHJ1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRpYWdyYW0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgdGltZWxpbmUgb2YgdmFsdWVzLCBlcnJvcixcbiAqIG9yIGNvbXBsZXRlIG5vdGlmaWNhdGlvbnMgdGhhdCBzaG91bGQgaGFwcGVuIG9uIHRoZSBvdXRwdXQgc3RyZWFtLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGNvbmZpZ3VyZSBzb21lIGFkZGl0aW9uYWxcbiAqIGRldGFpbHMgb2YgdGhlIGNyZWF0aW9uIG9mIHRoZSBzdHJlYW0uXG4gKiBAcmV0dXJuIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyb21EaWFncmFtKGRpYWdyYW06IHN0cmluZywgb3B0aW9ucz86IEZyb21EaWFncmFtT3B0aW9ucyk6IFN0cmVhbTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBTdHJlYW08YW55PihuZXcgRGlhZ3JhbVByb2R1Y2VyKGRpYWdyYW0sIG9wdGlvbnMpKTtcbn1cbiJdfQ==