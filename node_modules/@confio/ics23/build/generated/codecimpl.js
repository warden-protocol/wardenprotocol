/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ics23 = (function() {

    /**
     * Namespace ics23.
     * @exports ics23
     * @namespace
     */
    var ics23 = {};

    /**
     * HashOp enum.
     * @name ics23.HashOp
     * @enum {string}
     * @property {number} NO_HASH=0 NO_HASH value
     * @property {number} SHA256=1 SHA256 value
     * @property {number} SHA512=2 SHA512 value
     * @property {number} KECCAK=3 KECCAK value
     * @property {number} RIPEMD160=4 RIPEMD160 value
     * @property {number} BITCOIN=5 BITCOIN value
     * @property {number} SHA512_256=6 SHA512_256 value
     */
    ics23.HashOp = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_HASH"] = 0;
        values[valuesById[1] = "SHA256"] = 1;
        values[valuesById[2] = "SHA512"] = 2;
        values[valuesById[3] = "KECCAK"] = 3;
        values[valuesById[4] = "RIPEMD160"] = 4;
        values[valuesById[5] = "BITCOIN"] = 5;
        values[valuesById[6] = "SHA512_256"] = 6;
        return values;
    })();

    /**
     * LengthOp defines how to process the key and value of the LeafOp
     * to include length information. After encoding the length with the given
     * algorithm, the length will be prepended to the key and value bytes.
     * (Each one with it's own encoded length)
     * @name ics23.LengthOp
     * @enum {string}
     * @property {number} NO_PREFIX=0 NO_PREFIX value
     * @property {number} VAR_PROTO=1 VAR_PROTO value
     * @property {number} VAR_RLP=2 VAR_RLP value
     * @property {number} FIXED32_BIG=3 FIXED32_BIG value
     * @property {number} FIXED32_LITTLE=4 FIXED32_LITTLE value
     * @property {number} FIXED64_BIG=5 FIXED64_BIG value
     * @property {number} FIXED64_LITTLE=6 FIXED64_LITTLE value
     * @property {number} REQUIRE_32_BYTES=7 REQUIRE_32_BYTES value
     * @property {number} REQUIRE_64_BYTES=8 REQUIRE_64_BYTES value
     */
    ics23.LengthOp = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_PREFIX"] = 0;
        values[valuesById[1] = "VAR_PROTO"] = 1;
        values[valuesById[2] = "VAR_RLP"] = 2;
        values[valuesById[3] = "FIXED32_BIG"] = 3;
        values[valuesById[4] = "FIXED32_LITTLE"] = 4;
        values[valuesById[5] = "FIXED64_BIG"] = 5;
        values[valuesById[6] = "FIXED64_LITTLE"] = 6;
        values[valuesById[7] = "REQUIRE_32_BYTES"] = 7;
        values[valuesById[8] = "REQUIRE_64_BYTES"] = 8;
        return values;
    })();

    ics23.ExistenceProof = (function() {

        /**
         * Properties of an ExistenceProof.
         * @memberof ics23
         * @interface IExistenceProof
         * @property {Uint8Array|null} [key] ExistenceProof key
         * @property {Uint8Array|null} [value] ExistenceProof value
         * @property {ics23.ILeafOp|null} [leaf] ExistenceProof leaf
         * @property {Array.<ics23.IInnerOp>|null} [path] ExistenceProof path
         */

        /**
         * Constructs a new ExistenceProof.
         * @memberof ics23
         * @classdesc ExistenceProof takes a key and a value and a set of steps to perform on it.
         * The result of peforming all these steps will provide a "root hash", which can
         * be compared to the value in a header.
         * 
         * Since it is computationally infeasible to produce a hash collission for any of the used
         * cryptographic hash functions, if someone can provide a series of operations to transform
         * a given key and value into a root hash that matches some trusted root, these key and values
         * must be in the referenced merkle tree.
         * 
         * The only possible issue is maliablity in LeafOp, such as providing extra prefix data,
         * which should be controlled by a spec. Eg. with lengthOp as NONE,
         * prefix = FOO, key = BAR, value = CHOICE
         * and
         * prefix = F, key = OOBAR, value = CHOICE
         * would produce the same value.
         * 
         * With LengthOp this is tricker but not impossible. Which is why the "leafPrefixEqual" field
         * in the ProofSpec is valuable to prevent this mutability. And why all trees should
         * length-prefix the data before hashing it.
         * @implements IExistenceProof
         * @constructor
         * @param {ics23.IExistenceProof=} [properties] Properties to set
         */
        function ExistenceProof(properties) {
            this.path = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExistenceProof key.
         * @member {Uint8Array} key
         * @memberof ics23.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * ExistenceProof value.
         * @member {Uint8Array} value
         * @memberof ics23.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.value = $util.newBuffer([]);

        /**
         * ExistenceProof leaf.
         * @member {ics23.ILeafOp|null|undefined} leaf
         * @memberof ics23.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.leaf = null;

        /**
         * ExistenceProof path.
         * @member {Array.<ics23.IInnerOp>} path
         * @memberof ics23.ExistenceProof
         * @instance
         */
        ExistenceProof.prototype.path = $util.emptyArray;

        /**
         * Creates a new ExistenceProof instance using the specified properties.
         * @function create
         * @memberof ics23.ExistenceProof
         * @static
         * @param {ics23.IExistenceProof=} [properties] Properties to set
         * @returns {ics23.ExistenceProof} ExistenceProof instance
         */
        ExistenceProof.create = function create(properties) {
            return new ExistenceProof(properties);
        };

        /**
         * Encodes the specified ExistenceProof message. Does not implicitly {@link ics23.ExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.ExistenceProof
         * @static
         * @param {ics23.IExistenceProof} message ExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && message.hasOwnProperty("value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                $root.ics23.LeafOp.encode(message.leaf, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.path != null && message.path.length)
                for (var i = 0; i < message.path.length; ++i)
                    $root.ics23.InnerOp.encode(message.path[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ExistenceProof message, length delimited. Does not implicitly {@link ics23.ExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.ExistenceProof
         * @static
         * @param {ics23.IExistenceProof} message ExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.ExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.ExistenceProof} ExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.ExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.leaf = $root.ics23.LeafOp.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.path && message.path.length))
                        message.path = [];
                    message.path.push($root.ics23.InnerOp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.ExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.ExistenceProof} ExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExistenceProof message.
         * @function verify
         * @memberof ics23.ExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            if (message.leaf != null && message.hasOwnProperty("leaf")) {
                var error = $root.ics23.LeafOp.verify(message.leaf);
                if (error)
                    return "leaf." + error;
            }
            if (message.path != null && message.hasOwnProperty("path")) {
                if (!Array.isArray(message.path))
                    return "path: array expected";
                for (var i = 0; i < message.path.length; ++i) {
                    var error = $root.ics23.InnerOp.verify(message.path[i]);
                    if (error)
                        return "path." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.ExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.ExistenceProof} ExistenceProof
         */
        ExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.ExistenceProof)
                return object;
            var message = new $root.ics23.ExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length)
                    message.value = object.value;
            if (object.leaf != null) {
                if (typeof object.leaf !== "object")
                    throw TypeError(".ics23.ExistenceProof.leaf: object expected");
                message.leaf = $root.ics23.LeafOp.fromObject(object.leaf);
            }
            if (object.path) {
                if (!Array.isArray(object.path))
                    throw TypeError(".ics23.ExistenceProof.path: array expected");
                message.path = [];
                for (var i = 0; i < object.path.length; ++i) {
                    if (typeof object.path[i] !== "object")
                        throw TypeError(".ics23.ExistenceProof.path: object expected");
                    message.path[i] = $root.ics23.InnerOp.fromObject(object.path[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.ExistenceProof
         * @static
         * @param {ics23.ExistenceProof} message ExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.path = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
                object.leaf = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                object.leaf = $root.ics23.LeafOp.toObject(message.leaf, options);
            if (message.path && message.path.length) {
                object.path = [];
                for (var j = 0; j < message.path.length; ++j)
                    object.path[j] = $root.ics23.InnerOp.toObject(message.path[j], options);
            }
            return object;
        };

        /**
         * Converts this ExistenceProof to JSON.
         * @function toJSON
         * @memberof ics23.ExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExistenceProof;
    })();

    ics23.NonExistenceProof = (function() {

        /**
         * Properties of a NonExistenceProof.
         * @memberof ics23
         * @interface INonExistenceProof
         * @property {Uint8Array|null} [key] NonExistenceProof key
         * @property {ics23.IExistenceProof|null} [left] NonExistenceProof left
         * @property {ics23.IExistenceProof|null} [right] NonExistenceProof right
         */

        /**
         * Constructs a new NonExistenceProof.
         * @memberof ics23
         * @classdesc Represents a NonExistenceProof.
         * @implements INonExistenceProof
         * @constructor
         * @param {ics23.INonExistenceProof=} [properties] Properties to set
         */
        function NonExistenceProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NonExistenceProof key.
         * @member {Uint8Array} key
         * @memberof ics23.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * NonExistenceProof left.
         * @member {ics23.IExistenceProof|null|undefined} left
         * @memberof ics23.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.left = null;

        /**
         * NonExistenceProof right.
         * @member {ics23.IExistenceProof|null|undefined} right
         * @memberof ics23.NonExistenceProof
         * @instance
         */
        NonExistenceProof.prototype.right = null;

        /**
         * Creates a new NonExistenceProof instance using the specified properties.
         * @function create
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {ics23.INonExistenceProof=} [properties] Properties to set
         * @returns {ics23.NonExistenceProof} NonExistenceProof instance
         */
        NonExistenceProof.create = function create(properties) {
            return new NonExistenceProof(properties);
        };

        /**
         * Encodes the specified NonExistenceProof message. Does not implicitly {@link ics23.NonExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {ics23.INonExistenceProof} message NonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NonExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.left != null && message.hasOwnProperty("left"))
                $root.ics23.ExistenceProof.encode(message.left, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.right != null && message.hasOwnProperty("right"))
                $root.ics23.ExistenceProof.encode(message.right, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified NonExistenceProof message, length delimited. Does not implicitly {@link ics23.NonExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {ics23.INonExistenceProof} message NonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NonExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NonExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.NonExistenceProof} NonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NonExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.NonExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.left = $root.ics23.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.right = $root.ics23.ExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NonExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.NonExistenceProof} NonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NonExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NonExistenceProof message.
         * @function verify
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NonExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.left != null && message.hasOwnProperty("left")) {
                var error = $root.ics23.ExistenceProof.verify(message.left);
                if (error)
                    return "left." + error;
            }
            if (message.right != null && message.hasOwnProperty("right")) {
                var error = $root.ics23.ExistenceProof.verify(message.right);
                if (error)
                    return "right." + error;
            }
            return null;
        };

        /**
         * Creates a NonExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.NonExistenceProof} NonExistenceProof
         */
        NonExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.NonExistenceProof)
                return object;
            var message = new $root.ics23.NonExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.left != null) {
                if (typeof object.left !== "object")
                    throw TypeError(".ics23.NonExistenceProof.left: object expected");
                message.left = $root.ics23.ExistenceProof.fromObject(object.left);
            }
            if (object.right != null) {
                if (typeof object.right !== "object")
                    throw TypeError(".ics23.NonExistenceProof.right: object expected");
                message.right = $root.ics23.ExistenceProof.fromObject(object.right);
            }
            return message;
        };

        /**
         * Creates a plain object from a NonExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.NonExistenceProof
         * @static
         * @param {ics23.NonExistenceProof} message NonExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NonExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                object.left = null;
                object.right = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.left != null && message.hasOwnProperty("left"))
                object.left = $root.ics23.ExistenceProof.toObject(message.left, options);
            if (message.right != null && message.hasOwnProperty("right"))
                object.right = $root.ics23.ExistenceProof.toObject(message.right, options);
            return object;
        };

        /**
         * Converts this NonExistenceProof to JSON.
         * @function toJSON
         * @memberof ics23.NonExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NonExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NonExistenceProof;
    })();

    ics23.CommitmentProof = (function() {

        /**
         * Properties of a CommitmentProof.
         * @memberof ics23
         * @interface ICommitmentProof
         * @property {ics23.IExistenceProof|null} [exist] CommitmentProof exist
         * @property {ics23.INonExistenceProof|null} [nonexist] CommitmentProof nonexist
         * @property {ics23.IBatchProof|null} [batch] CommitmentProof batch
         * @property {ics23.ICompressedBatchProof|null} [compressed] CommitmentProof compressed
         */

        /**
         * Constructs a new CommitmentProof.
         * @memberof ics23
         * @classdesc Represents a CommitmentProof.
         * @implements ICommitmentProof
         * @constructor
         * @param {ics23.ICommitmentProof=} [properties] Properties to set
         */
        function CommitmentProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CommitmentProof exist.
         * @member {ics23.IExistenceProof|null|undefined} exist
         * @memberof ics23.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.exist = null;

        /**
         * CommitmentProof nonexist.
         * @member {ics23.INonExistenceProof|null|undefined} nonexist
         * @memberof ics23.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.nonexist = null;

        /**
         * CommitmentProof batch.
         * @member {ics23.IBatchProof|null|undefined} batch
         * @memberof ics23.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.batch = null;

        /**
         * CommitmentProof compressed.
         * @member {ics23.ICompressedBatchProof|null|undefined} compressed
         * @memberof ics23.CommitmentProof
         * @instance
         */
        CommitmentProof.prototype.compressed = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * CommitmentProof proof.
         * @member {"exist"|"nonexist"|"batch"|"compressed"|undefined} proof
         * @memberof ics23.CommitmentProof
         * @instance
         */
        Object.defineProperty(CommitmentProof.prototype, "proof", {
            get: $util.oneOfGetter($oneOfFields = ["exist", "nonexist", "batch", "compressed"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CommitmentProof instance using the specified properties.
         * @function create
         * @memberof ics23.CommitmentProof
         * @static
         * @param {ics23.ICommitmentProof=} [properties] Properties to set
         * @returns {ics23.CommitmentProof} CommitmentProof instance
         */
        CommitmentProof.create = function create(properties) {
            return new CommitmentProof(properties);
        };

        /**
         * Encodes the specified CommitmentProof message. Does not implicitly {@link ics23.CommitmentProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.CommitmentProof
         * @static
         * @param {ics23.ICommitmentProof} message CommitmentProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommitmentProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.exist != null && message.hasOwnProperty("exist"))
                $root.ics23.ExistenceProof.encode(message.exist, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.nonexist != null && message.hasOwnProperty("nonexist"))
                $root.ics23.NonExistenceProof.encode(message.nonexist, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.batch != null && message.hasOwnProperty("batch"))
                $root.ics23.BatchProof.encode(message.batch, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.compressed != null && message.hasOwnProperty("compressed"))
                $root.ics23.CompressedBatchProof.encode(message.compressed, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CommitmentProof message, length delimited. Does not implicitly {@link ics23.CommitmentProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.CommitmentProof
         * @static
         * @param {ics23.ICommitmentProof} message CommitmentProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommitmentProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CommitmentProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.CommitmentProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.CommitmentProof} CommitmentProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommitmentProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.CommitmentProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.exist = $root.ics23.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = $root.ics23.NonExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.batch = $root.ics23.BatchProof.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.compressed = $root.ics23.CompressedBatchProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CommitmentProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.CommitmentProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.CommitmentProof} CommitmentProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommitmentProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CommitmentProof message.
         * @function verify
         * @memberof ics23.CommitmentProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommitmentProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                properties.proof = 1;
                {
                    var error = $root.ics23.ExistenceProof.verify(message.exist);
                    if (error)
                        return "exist." + error;
                }
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.ics23.NonExistenceProof.verify(message.nonexist);
                    if (error)
                        return "nonexist." + error;
                }
            }
            if (message.batch != null && message.hasOwnProperty("batch")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.ics23.BatchProof.verify(message.batch);
                    if (error)
                        return "batch." + error;
                }
            }
            if (message.compressed != null && message.hasOwnProperty("compressed")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.ics23.CompressedBatchProof.verify(message.compressed);
                    if (error)
                        return "compressed." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CommitmentProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.CommitmentProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.CommitmentProof} CommitmentProof
         */
        CommitmentProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.CommitmentProof)
                return object;
            var message = new $root.ics23.CommitmentProof();
            if (object.exist != null) {
                if (typeof object.exist !== "object")
                    throw TypeError(".ics23.CommitmentProof.exist: object expected");
                message.exist = $root.ics23.ExistenceProof.fromObject(object.exist);
            }
            if (object.nonexist != null) {
                if (typeof object.nonexist !== "object")
                    throw TypeError(".ics23.CommitmentProof.nonexist: object expected");
                message.nonexist = $root.ics23.NonExistenceProof.fromObject(object.nonexist);
            }
            if (object.batch != null) {
                if (typeof object.batch !== "object")
                    throw TypeError(".ics23.CommitmentProof.batch: object expected");
                message.batch = $root.ics23.BatchProof.fromObject(object.batch);
            }
            if (object.compressed != null) {
                if (typeof object.compressed !== "object")
                    throw TypeError(".ics23.CommitmentProof.compressed: object expected");
                message.compressed = $root.ics23.CompressedBatchProof.fromObject(object.compressed);
            }
            return message;
        };

        /**
         * Creates a plain object from a CommitmentProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.CommitmentProof
         * @static
         * @param {ics23.CommitmentProof} message CommitmentProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommitmentProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                object.exist = $root.ics23.ExistenceProof.toObject(message.exist, options);
                if (options.oneofs)
                    object.proof = "exist";
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                object.nonexist = $root.ics23.NonExistenceProof.toObject(message.nonexist, options);
                if (options.oneofs)
                    object.proof = "nonexist";
            }
            if (message.batch != null && message.hasOwnProperty("batch")) {
                object.batch = $root.ics23.BatchProof.toObject(message.batch, options);
                if (options.oneofs)
                    object.proof = "batch";
            }
            if (message.compressed != null && message.hasOwnProperty("compressed")) {
                object.compressed = $root.ics23.CompressedBatchProof.toObject(message.compressed, options);
                if (options.oneofs)
                    object.proof = "compressed";
            }
            return object;
        };

        /**
         * Converts this CommitmentProof to JSON.
         * @function toJSON
         * @memberof ics23.CommitmentProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommitmentProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CommitmentProof;
    })();

    ics23.LeafOp = (function() {

        /**
         * Properties of a LeafOp.
         * @memberof ics23
         * @interface ILeafOp
         * @property {ics23.HashOp|null} [hash] LeafOp hash
         * @property {ics23.HashOp|null} [prehashKey] LeafOp prehashKey
         * @property {ics23.HashOp|null} [prehashValue] LeafOp prehashValue
         * @property {ics23.LengthOp|null} [length] LeafOp length
         * @property {Uint8Array|null} [prefix] LeafOp prefix
         */

        /**
         * Constructs a new LeafOp.
         * @memberof ics23
         * @classdesc LeafOp represents the raw key-value data we wish to prove, and
         * must be flexible to represent the internal transformation from
         * the original key-value pairs into the basis hash, for many existing
         * merkle trees.
         * 
         * key and value are passed in. So that the signature of this operation is:
         * leafOp(key, value) -> output
         * 
         * To process this, first prehash the keys and values if needed (ANY means no hash in this case):
         * hkey = prehashKey(key)
         * hvalue = prehashValue(value)
         * 
         * Then combine the bytes, and hash it
         * output = hash(prefix || length(hkey) || hkey || length(hvalue) || hvalue)
         * @implements ILeafOp
         * @constructor
         * @param {ics23.ILeafOp=} [properties] Properties to set
         */
        function LeafOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeafOp hash.
         * @member {ics23.HashOp} hash
         * @memberof ics23.LeafOp
         * @instance
         */
        LeafOp.prototype.hash = 0;

        /**
         * LeafOp prehashKey.
         * @member {ics23.HashOp} prehashKey
         * @memberof ics23.LeafOp
         * @instance
         */
        LeafOp.prototype.prehashKey = 0;

        /**
         * LeafOp prehashValue.
         * @member {ics23.HashOp} prehashValue
         * @memberof ics23.LeafOp
         * @instance
         */
        LeafOp.prototype.prehashValue = 0;

        /**
         * LeafOp length.
         * @member {ics23.LengthOp} length
         * @memberof ics23.LeafOp
         * @instance
         */
        LeafOp.prototype.length = 0;

        /**
         * LeafOp prefix.
         * @member {Uint8Array} prefix
         * @memberof ics23.LeafOp
         * @instance
         */
        LeafOp.prototype.prefix = $util.newBuffer([]);

        /**
         * Creates a new LeafOp instance using the specified properties.
         * @function create
         * @memberof ics23.LeafOp
         * @static
         * @param {ics23.ILeafOp=} [properties] Properties to set
         * @returns {ics23.LeafOp} LeafOp instance
         */
        LeafOp.create = function create(properties) {
            return new LeafOp(properties);
        };

        /**
         * Encodes the specified LeafOp message. Does not implicitly {@link ics23.LeafOp.verify|verify} messages.
         * @function encode
         * @memberof ics23.LeafOp
         * @static
         * @param {ics23.ILeafOp} message LeafOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeafOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hash);
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.prehashKey);
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.prehashValue);
            if (message.length != null && message.hasOwnProperty("length"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.length);
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.prefix);
            return writer;
        };

        /**
         * Encodes the specified LeafOp message, length delimited. Does not implicitly {@link ics23.LeafOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.LeafOp
         * @static
         * @param {ics23.ILeafOp} message LeafOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeafOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeafOp message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.LeafOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.LeafOp} LeafOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeafOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.LeafOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prehashKey = reader.int32();
                    break;
                case 3:
                    message.prehashValue = reader.int32();
                    break;
                case 4:
                    message.length = reader.int32();
                    break;
                case 5:
                    message.prefix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeafOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.LeafOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.LeafOp} LeafOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeafOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeafOp message.
         * @function verify
         * @memberof ics23.LeafOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeafOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                switch (message.hash) {
                default:
                    return "hash: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                switch (message.prehashKey) {
                default:
                    return "prehashKey: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                switch (message.prehashValue) {
                default:
                    return "prehashValue: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.length != null && message.hasOwnProperty("length"))
                switch (message.length) {
                default:
                    return "length: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            return null;
        };

        /**
         * Creates a LeafOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.LeafOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.LeafOp} LeafOp
         */
        LeafOp.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.LeafOp)
                return object;
            var message = new $root.ics23.LeafOp();
            switch (object.hash) {
            case "NO_HASH":
            case 0:
                message.hash = 0;
                break;
            case "SHA256":
            case 1:
                message.hash = 1;
                break;
            case "SHA512":
            case 2:
                message.hash = 2;
                break;
            case "KECCAK":
            case 3:
                message.hash = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.hash = 4;
                break;
            case "BITCOIN":
            case 5:
                message.hash = 5;
                break;
            case "SHA512_256":
            case 6:
                message.hash = 6;
                break;
            }
            switch (object.prehashKey) {
            case "NO_HASH":
            case 0:
                message.prehashKey = 0;
                break;
            case "SHA256":
            case 1:
                message.prehashKey = 1;
                break;
            case "SHA512":
            case 2:
                message.prehashKey = 2;
                break;
            case "KECCAK":
            case 3:
                message.prehashKey = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.prehashKey = 4;
                break;
            case "BITCOIN":
            case 5:
                message.prehashKey = 5;
                break;
            case "SHA512_256":
            case 6:
                message.prehashKey = 6;
                break;
            }
            switch (object.prehashValue) {
            case "NO_HASH":
            case 0:
                message.prehashValue = 0;
                break;
            case "SHA256":
            case 1:
                message.prehashValue = 1;
                break;
            case "SHA512":
            case 2:
                message.prehashValue = 2;
                break;
            case "KECCAK":
            case 3:
                message.prehashValue = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.prehashValue = 4;
                break;
            case "BITCOIN":
            case 5:
                message.prehashValue = 5;
                break;
            case "SHA512_256":
            case 6:
                message.prehashValue = 6;
                break;
            }
            switch (object.length) {
            case "NO_PREFIX":
            case 0:
                message.length = 0;
                break;
            case "VAR_PROTO":
            case 1:
                message.length = 1;
                break;
            case "VAR_RLP":
            case 2:
                message.length = 2;
                break;
            case "FIXED32_BIG":
            case 3:
                message.length = 3;
                break;
            case "FIXED32_LITTLE":
            case 4:
                message.length = 4;
                break;
            case "FIXED64_BIG":
            case 5:
                message.length = 5;
                break;
            case "FIXED64_LITTLE":
            case 6:
                message.length = 6;
                break;
            case "REQUIRE_32_BYTES":
            case 7:
                message.length = 7;
                break;
            case "REQUIRE_64_BYTES":
            case 8:
                message.length = 8;
                break;
            }
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length)
                    message.prefix = object.prefix;
            return message;
        };

        /**
         * Creates a plain object from a LeafOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.LeafOp
         * @static
         * @param {ics23.LeafOp} message LeafOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeafOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hash = options.enums === String ? "NO_HASH" : 0;
                object.prehashKey = options.enums === String ? "NO_HASH" : 0;
                object.prehashValue = options.enums === String ? "NO_HASH" : 0;
                object.length = options.enums === String ? "NO_PREFIX" : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.enums === String ? $root.ics23.HashOp[message.hash] : message.hash;
            if (message.prehashKey != null && message.hasOwnProperty("prehashKey"))
                object.prehashKey = options.enums === String ? $root.ics23.HashOp[message.prehashKey] : message.prehashKey;
            if (message.prehashValue != null && message.hasOwnProperty("prehashValue"))
                object.prehashValue = options.enums === String ? $root.ics23.HashOp[message.prehashValue] : message.prehashValue;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = options.enums === String ? $root.ics23.LengthOp[message.length] : message.length;
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            return object;
        };

        /**
         * Converts this LeafOp to JSON.
         * @function toJSON
         * @memberof ics23.LeafOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeafOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LeafOp;
    })();

    ics23.InnerOp = (function() {

        /**
         * Properties of an InnerOp.
         * @memberof ics23
         * @interface IInnerOp
         * @property {ics23.HashOp|null} [hash] InnerOp hash
         * @property {Uint8Array|null} [prefix] InnerOp prefix
         * @property {Uint8Array|null} [suffix] InnerOp suffix
         */

        /**
         * Constructs a new InnerOp.
         * @memberof ics23
         * @classdesc InnerOp represents a merkle-proof step that is not a leaf.
         * It represents concatenating two children and hashing them to provide the next result.
         * 
         * The result of the previous step is passed in, so the signature of this op is:
         * innerOp(child) -> output
         * 
         * The result of applying InnerOp should be:
         * output = op.hash(op.prefix || child || op.suffix)
         * 
         * where the || operator is concatenation of binary data,
         * and child is the result of hashing all the tree below this step.
         * 
         * Any special data, like prepending child with the length, or prepending the entire operation with
         * some value to differentiate from leaf nodes, should be included in prefix and suffix.
         * If either of prefix or suffix is empty, we just treat it as an empty string
         * @implements IInnerOp
         * @constructor
         * @param {ics23.IInnerOp=} [properties] Properties to set
         */
        function InnerOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InnerOp hash.
         * @member {ics23.HashOp} hash
         * @memberof ics23.InnerOp
         * @instance
         */
        InnerOp.prototype.hash = 0;

        /**
         * InnerOp prefix.
         * @member {Uint8Array} prefix
         * @memberof ics23.InnerOp
         * @instance
         */
        InnerOp.prototype.prefix = $util.newBuffer([]);

        /**
         * InnerOp suffix.
         * @member {Uint8Array} suffix
         * @memberof ics23.InnerOp
         * @instance
         */
        InnerOp.prototype.suffix = $util.newBuffer([]);

        /**
         * Creates a new InnerOp instance using the specified properties.
         * @function create
         * @memberof ics23.InnerOp
         * @static
         * @param {ics23.IInnerOp=} [properties] Properties to set
         * @returns {ics23.InnerOp} InnerOp instance
         */
        InnerOp.create = function create(properties) {
            return new InnerOp(properties);
        };

        /**
         * Encodes the specified InnerOp message. Does not implicitly {@link ics23.InnerOp.verify|verify} messages.
         * @function encode
         * @memberof ics23.InnerOp
         * @static
         * @param {ics23.IInnerOp} message InnerOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hash);
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.prefix);
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.suffix);
            return writer;
        };

        /**
         * Encodes the specified InnerOp message, length delimited. Does not implicitly {@link ics23.InnerOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.InnerOp
         * @static
         * @param {ics23.IInnerOp} message InnerOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InnerOp message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.InnerOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.InnerOp} InnerOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.InnerOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hash = reader.int32();
                    break;
                case 2:
                    message.prefix = reader.bytes();
                    break;
                case 3:
                    message.suffix = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InnerOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.InnerOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.InnerOp} InnerOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InnerOp message.
         * @function verify
         * @memberof ics23.InnerOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InnerOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                switch (message.hash) {
                default:
                    return "hash: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                if (!(message.suffix && typeof message.suffix.length === "number" || $util.isString(message.suffix)))
                    return "suffix: buffer expected";
            return null;
        };

        /**
         * Creates an InnerOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.InnerOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.InnerOp} InnerOp
         */
        InnerOp.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.InnerOp)
                return object;
            var message = new $root.ics23.InnerOp();
            switch (object.hash) {
            case "NO_HASH":
            case 0:
                message.hash = 0;
                break;
            case "SHA256":
            case 1:
                message.hash = 1;
                break;
            case "SHA512":
            case 2:
                message.hash = 2;
                break;
            case "KECCAK":
            case 3:
                message.hash = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.hash = 4;
                break;
            case "BITCOIN":
            case 5:
                message.hash = 5;
                break;
            case "SHA512_256":
            case 6:
                message.hash = 6;
                break;
            }
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length)
                    message.prefix = object.prefix;
            if (object.suffix != null)
                if (typeof object.suffix === "string")
                    $util.base64.decode(object.suffix, message.suffix = $util.newBuffer($util.base64.length(object.suffix)), 0);
                else if (object.suffix.length)
                    message.suffix = object.suffix;
            return message;
        };

        /**
         * Creates a plain object from an InnerOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.InnerOp
         * @static
         * @param {ics23.InnerOp} message InnerOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InnerOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hash = options.enums === String ? "NO_HASH" : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
                if (options.bytes === String)
                    object.suffix = "";
                else {
                    object.suffix = [];
                    if (options.bytes !== Array)
                        object.suffix = $util.newBuffer(object.suffix);
                }
            }
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.enums === String ? $root.ics23.HashOp[message.hash] : message.hash;
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            if (message.suffix != null && message.hasOwnProperty("suffix"))
                object.suffix = options.bytes === String ? $util.base64.encode(message.suffix, 0, message.suffix.length) : options.bytes === Array ? Array.prototype.slice.call(message.suffix) : message.suffix;
            return object;
        };

        /**
         * Converts this InnerOp to JSON.
         * @function toJSON
         * @memberof ics23.InnerOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InnerOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InnerOp;
    })();

    ics23.ProofSpec = (function() {

        /**
         * Properties of a ProofSpec.
         * @memberof ics23
         * @interface IProofSpec
         * @property {ics23.ILeafOp|null} [leafSpec] ProofSpec leafSpec
         * @property {ics23.IInnerSpec|null} [innerSpec] ProofSpec innerSpec
         * @property {number|null} [maxDepth] ProofSpec maxDepth
         * @property {number|null} [minDepth] ProofSpec minDepth
         */

        /**
         * Constructs a new ProofSpec.
         * @memberof ics23
         * @classdesc ProofSpec defines what the expected parameters are for a given proof type.
         * This can be stored in the client and used to validate any incoming proofs.
         * 
         * verify(ProofSpec, Proof) -> Proof | Error
         * 
         * As demonstrated in tests, if we don't fix the algorithm used to calculate the
         * LeafHash for a given tree, there are many possible key-value pairs that can
         * generate a given hash (by interpretting the preimage differently).
         * We need this for proper security, requires client knows a priori what
         * tree format server uses. But not in code, rather a configuration object.
         * @implements IProofSpec
         * @constructor
         * @param {ics23.IProofSpec=} [properties] Properties to set
         */
        function ProofSpec(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProofSpec leafSpec.
         * @member {ics23.ILeafOp|null|undefined} leafSpec
         * @memberof ics23.ProofSpec
         * @instance
         */
        ProofSpec.prototype.leafSpec = null;

        /**
         * ProofSpec innerSpec.
         * @member {ics23.IInnerSpec|null|undefined} innerSpec
         * @memberof ics23.ProofSpec
         * @instance
         */
        ProofSpec.prototype.innerSpec = null;

        /**
         * ProofSpec maxDepth.
         * @member {number} maxDepth
         * @memberof ics23.ProofSpec
         * @instance
         */
        ProofSpec.prototype.maxDepth = 0;

        /**
         * ProofSpec minDepth.
         * @member {number} minDepth
         * @memberof ics23.ProofSpec
         * @instance
         */
        ProofSpec.prototype.minDepth = 0;

        /**
         * Creates a new ProofSpec instance using the specified properties.
         * @function create
         * @memberof ics23.ProofSpec
         * @static
         * @param {ics23.IProofSpec=} [properties] Properties to set
         * @returns {ics23.ProofSpec} ProofSpec instance
         */
        ProofSpec.create = function create(properties) {
            return new ProofSpec(properties);
        };

        /**
         * Encodes the specified ProofSpec message. Does not implicitly {@link ics23.ProofSpec.verify|verify} messages.
         * @function encode
         * @memberof ics23.ProofSpec
         * @static
         * @param {ics23.IProofSpec} message ProofSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProofSpec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec"))
                $root.ics23.LeafOp.encode(message.leafSpec, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec"))
                $root.ics23.InnerSpec.encode(message.innerSpec, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.maxDepth != null && message.hasOwnProperty("maxDepth"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxDepth);
            if (message.minDepth != null && message.hasOwnProperty("minDepth"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.minDepth);
            return writer;
        };

        /**
         * Encodes the specified ProofSpec message, length delimited. Does not implicitly {@link ics23.ProofSpec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.ProofSpec
         * @static
         * @param {ics23.IProofSpec} message ProofSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProofSpec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ProofSpec message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.ProofSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.ProofSpec} ProofSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProofSpec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.ProofSpec();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.leafSpec = $root.ics23.LeafOp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.innerSpec = $root.ics23.InnerSpec.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxDepth = reader.int32();
                    break;
                case 4:
                    message.minDepth = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ProofSpec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.ProofSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.ProofSpec} ProofSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProofSpec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ProofSpec message.
         * @function verify
         * @memberof ics23.ProofSpec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ProofSpec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec")) {
                var error = $root.ics23.LeafOp.verify(message.leafSpec);
                if (error)
                    return "leafSpec." + error;
            }
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec")) {
                var error = $root.ics23.InnerSpec.verify(message.innerSpec);
                if (error)
                    return "innerSpec." + error;
            }
            if (message.maxDepth != null && message.hasOwnProperty("maxDepth"))
                if (!$util.isInteger(message.maxDepth))
                    return "maxDepth: integer expected";
            if (message.minDepth != null && message.hasOwnProperty("minDepth"))
                if (!$util.isInteger(message.minDepth))
                    return "minDepth: integer expected";
            return null;
        };

        /**
         * Creates a ProofSpec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.ProofSpec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.ProofSpec} ProofSpec
         */
        ProofSpec.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.ProofSpec)
                return object;
            var message = new $root.ics23.ProofSpec();
            if (object.leafSpec != null) {
                if (typeof object.leafSpec !== "object")
                    throw TypeError(".ics23.ProofSpec.leafSpec: object expected");
                message.leafSpec = $root.ics23.LeafOp.fromObject(object.leafSpec);
            }
            if (object.innerSpec != null) {
                if (typeof object.innerSpec !== "object")
                    throw TypeError(".ics23.ProofSpec.innerSpec: object expected");
                message.innerSpec = $root.ics23.InnerSpec.fromObject(object.innerSpec);
            }
            if (object.maxDepth != null)
                message.maxDepth = object.maxDepth | 0;
            if (object.minDepth != null)
                message.minDepth = object.minDepth | 0;
            return message;
        };

        /**
         * Creates a plain object from a ProofSpec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.ProofSpec
         * @static
         * @param {ics23.ProofSpec} message ProofSpec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProofSpec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.leafSpec = null;
                object.innerSpec = null;
                object.maxDepth = 0;
                object.minDepth = 0;
            }
            if (message.leafSpec != null && message.hasOwnProperty("leafSpec"))
                object.leafSpec = $root.ics23.LeafOp.toObject(message.leafSpec, options);
            if (message.innerSpec != null && message.hasOwnProperty("innerSpec"))
                object.innerSpec = $root.ics23.InnerSpec.toObject(message.innerSpec, options);
            if (message.maxDepth != null && message.hasOwnProperty("maxDepth"))
                object.maxDepth = message.maxDepth;
            if (message.minDepth != null && message.hasOwnProperty("minDepth"))
                object.minDepth = message.minDepth;
            return object;
        };

        /**
         * Converts this ProofSpec to JSON.
         * @function toJSON
         * @memberof ics23.ProofSpec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProofSpec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ProofSpec;
    })();

    ics23.InnerSpec = (function() {

        /**
         * Properties of an InnerSpec.
         * @memberof ics23
         * @interface IInnerSpec
         * @property {Array.<number>|null} [childOrder] InnerSpec childOrder
         * @property {number|null} [childSize] InnerSpec childSize
         * @property {number|null} [minPrefixLength] InnerSpec minPrefixLength
         * @property {number|null} [maxPrefixLength] InnerSpec maxPrefixLength
         * @property {Uint8Array|null} [emptyChild] InnerSpec emptyChild
         * @property {ics23.HashOp|null} [hash] InnerSpec hash
         */

        /**
         * Constructs a new InnerSpec.
         * @memberof ics23
         * @classdesc Represents an InnerSpec.
         * @implements IInnerSpec
         * @constructor
         * @param {ics23.IInnerSpec=} [properties] Properties to set
         */
        function InnerSpec(properties) {
            this.childOrder = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InnerSpec childOrder.
         * @member {Array.<number>} childOrder
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.childOrder = $util.emptyArray;

        /**
         * InnerSpec childSize.
         * @member {number} childSize
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.childSize = 0;

        /**
         * InnerSpec minPrefixLength.
         * @member {number} minPrefixLength
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.minPrefixLength = 0;

        /**
         * InnerSpec maxPrefixLength.
         * @member {number} maxPrefixLength
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.maxPrefixLength = 0;

        /**
         * InnerSpec emptyChild.
         * @member {Uint8Array} emptyChild
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.emptyChild = $util.newBuffer([]);

        /**
         * InnerSpec hash.
         * @member {ics23.HashOp} hash
         * @memberof ics23.InnerSpec
         * @instance
         */
        InnerSpec.prototype.hash = 0;

        /**
         * Creates a new InnerSpec instance using the specified properties.
         * @function create
         * @memberof ics23.InnerSpec
         * @static
         * @param {ics23.IInnerSpec=} [properties] Properties to set
         * @returns {ics23.InnerSpec} InnerSpec instance
         */
        InnerSpec.create = function create(properties) {
            return new InnerSpec(properties);
        };

        /**
         * Encodes the specified InnerSpec message. Does not implicitly {@link ics23.InnerSpec.verify|verify} messages.
         * @function encode
         * @memberof ics23.InnerSpec
         * @static
         * @param {ics23.IInnerSpec} message InnerSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerSpec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.childOrder != null && message.childOrder.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.childOrder.length; ++i)
                    writer.int32(message.childOrder[i]);
                writer.ldelim();
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.childSize);
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minPrefixLength);
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxPrefixLength);
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.emptyChild);
            if (message.hash != null && message.hasOwnProperty("hash"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.hash);
            return writer;
        };

        /**
         * Encodes the specified InnerSpec message, length delimited. Does not implicitly {@link ics23.InnerSpec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.InnerSpec
         * @static
         * @param {ics23.IInnerSpec} message InnerSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InnerSpec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InnerSpec message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.InnerSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.InnerSpec} InnerSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerSpec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.InnerSpec();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.childOrder && message.childOrder.length))
                        message.childOrder = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.childOrder.push(reader.int32());
                    } else
                        message.childOrder.push(reader.int32());
                    break;
                case 2:
                    message.childSize = reader.int32();
                    break;
                case 3:
                    message.minPrefixLength = reader.int32();
                    break;
                case 4:
                    message.maxPrefixLength = reader.int32();
                    break;
                case 5:
                    message.emptyChild = reader.bytes();
                    break;
                case 6:
                    message.hash = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InnerSpec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.InnerSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.InnerSpec} InnerSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InnerSpec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InnerSpec message.
         * @function verify
         * @memberof ics23.InnerSpec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InnerSpec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.childOrder != null && message.hasOwnProperty("childOrder")) {
                if (!Array.isArray(message.childOrder))
                    return "childOrder: array expected";
                for (var i = 0; i < message.childOrder.length; ++i)
                    if (!$util.isInteger(message.childOrder[i]))
                        return "childOrder: integer[] expected";
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                if (!$util.isInteger(message.childSize))
                    return "childSize: integer expected";
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                if (!$util.isInteger(message.minPrefixLength))
                    return "minPrefixLength: integer expected";
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                if (!$util.isInteger(message.maxPrefixLength))
                    return "maxPrefixLength: integer expected";
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                if (!(message.emptyChild && typeof message.emptyChild.length === "number" || $util.isString(message.emptyChild)))
                    return "emptyChild: buffer expected";
            if (message.hash != null && message.hasOwnProperty("hash"))
                switch (message.hash) {
                default:
                    return "hash: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            return null;
        };

        /**
         * Creates an InnerSpec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.InnerSpec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.InnerSpec} InnerSpec
         */
        InnerSpec.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.InnerSpec)
                return object;
            var message = new $root.ics23.InnerSpec();
            if (object.childOrder) {
                if (!Array.isArray(object.childOrder))
                    throw TypeError(".ics23.InnerSpec.childOrder: array expected");
                message.childOrder = [];
                for (var i = 0; i < object.childOrder.length; ++i)
                    message.childOrder[i] = object.childOrder[i] | 0;
            }
            if (object.childSize != null)
                message.childSize = object.childSize | 0;
            if (object.minPrefixLength != null)
                message.minPrefixLength = object.minPrefixLength | 0;
            if (object.maxPrefixLength != null)
                message.maxPrefixLength = object.maxPrefixLength | 0;
            if (object.emptyChild != null)
                if (typeof object.emptyChild === "string")
                    $util.base64.decode(object.emptyChild, message.emptyChild = $util.newBuffer($util.base64.length(object.emptyChild)), 0);
                else if (object.emptyChild.length)
                    message.emptyChild = object.emptyChild;
            switch (object.hash) {
            case "NO_HASH":
            case 0:
                message.hash = 0;
                break;
            case "SHA256":
            case 1:
                message.hash = 1;
                break;
            case "SHA512":
            case 2:
                message.hash = 2;
                break;
            case "KECCAK":
            case 3:
                message.hash = 3;
                break;
            case "RIPEMD160":
            case 4:
                message.hash = 4;
                break;
            case "BITCOIN":
            case 5:
                message.hash = 5;
                break;
            case "SHA512_256":
            case 6:
                message.hash = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an InnerSpec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.InnerSpec
         * @static
         * @param {ics23.InnerSpec} message InnerSpec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InnerSpec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.childOrder = [];
            if (options.defaults) {
                object.childSize = 0;
                object.minPrefixLength = 0;
                object.maxPrefixLength = 0;
                if (options.bytes === String)
                    object.emptyChild = "";
                else {
                    object.emptyChild = [];
                    if (options.bytes !== Array)
                        object.emptyChild = $util.newBuffer(object.emptyChild);
                }
                object.hash = options.enums === String ? "NO_HASH" : 0;
            }
            if (message.childOrder && message.childOrder.length) {
                object.childOrder = [];
                for (var j = 0; j < message.childOrder.length; ++j)
                    object.childOrder[j] = message.childOrder[j];
            }
            if (message.childSize != null && message.hasOwnProperty("childSize"))
                object.childSize = message.childSize;
            if (message.minPrefixLength != null && message.hasOwnProperty("minPrefixLength"))
                object.minPrefixLength = message.minPrefixLength;
            if (message.maxPrefixLength != null && message.hasOwnProperty("maxPrefixLength"))
                object.maxPrefixLength = message.maxPrefixLength;
            if (message.emptyChild != null && message.hasOwnProperty("emptyChild"))
                object.emptyChild = options.bytes === String ? $util.base64.encode(message.emptyChild, 0, message.emptyChild.length) : options.bytes === Array ? Array.prototype.slice.call(message.emptyChild) : message.emptyChild;
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.enums === String ? $root.ics23.HashOp[message.hash] : message.hash;
            return object;
        };

        /**
         * Converts this InnerSpec to JSON.
         * @function toJSON
         * @memberof ics23.InnerSpec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InnerSpec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InnerSpec;
    })();

    ics23.BatchProof = (function() {

        /**
         * Properties of a BatchProof.
         * @memberof ics23
         * @interface IBatchProof
         * @property {Array.<ics23.IBatchEntry>|null} [entries] BatchProof entries
         */

        /**
         * Constructs a new BatchProof.
         * @memberof ics23
         * @classdesc Represents a BatchProof.
         * @implements IBatchProof
         * @constructor
         * @param {ics23.IBatchProof=} [properties] Properties to set
         */
        function BatchProof(properties) {
            this.entries = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BatchProof entries.
         * @member {Array.<ics23.IBatchEntry>} entries
         * @memberof ics23.BatchProof
         * @instance
         */
        BatchProof.prototype.entries = $util.emptyArray;

        /**
         * Creates a new BatchProof instance using the specified properties.
         * @function create
         * @memberof ics23.BatchProof
         * @static
         * @param {ics23.IBatchProof=} [properties] Properties to set
         * @returns {ics23.BatchProof} BatchProof instance
         */
        BatchProof.create = function create(properties) {
            return new BatchProof(properties);
        };

        /**
         * Encodes the specified BatchProof message. Does not implicitly {@link ics23.BatchProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.BatchProof
         * @static
         * @param {ics23.IBatchProof} message BatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entries != null && message.entries.length)
                for (var i = 0; i < message.entries.length; ++i)
                    $root.ics23.BatchEntry.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BatchProof message, length delimited. Does not implicitly {@link ics23.BatchProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.BatchProof
         * @static
         * @param {ics23.IBatchProof} message BatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BatchProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.BatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.BatchProof} BatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.BatchProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.entries && message.entries.length))
                        message.entries = [];
                    message.entries.push($root.ics23.BatchEntry.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BatchProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.BatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.BatchProof} BatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BatchProof message.
         * @function verify
         * @memberof ics23.BatchProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BatchProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (var i = 0; i < message.entries.length; ++i) {
                    var error = $root.ics23.BatchEntry.verify(message.entries[i]);
                    if (error)
                        return "entries." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BatchProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.BatchProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.BatchProof} BatchProof
         */
        BatchProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.BatchProof)
                return object;
            var message = new $root.ics23.BatchProof();
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".ics23.BatchProof.entries: array expected");
                message.entries = [];
                for (var i = 0; i < object.entries.length; ++i) {
                    if (typeof object.entries[i] !== "object")
                        throw TypeError(".ics23.BatchProof.entries: object expected");
                    message.entries[i] = $root.ics23.BatchEntry.fromObject(object.entries[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BatchProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.BatchProof
         * @static
         * @param {ics23.BatchProof} message BatchProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BatchProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (var j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $root.ics23.BatchEntry.toObject(message.entries[j], options);
            }
            return object;
        };

        /**
         * Converts this BatchProof to JSON.
         * @function toJSON
         * @memberof ics23.BatchProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BatchProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BatchProof;
    })();

    ics23.BatchEntry = (function() {

        /**
         * Properties of a BatchEntry.
         * @memberof ics23
         * @interface IBatchEntry
         * @property {ics23.IExistenceProof|null} [exist] BatchEntry exist
         * @property {ics23.INonExistenceProof|null} [nonexist] BatchEntry nonexist
         */

        /**
         * Constructs a new BatchEntry.
         * @memberof ics23
         * @classdesc Represents a BatchEntry.
         * @implements IBatchEntry
         * @constructor
         * @param {ics23.IBatchEntry=} [properties] Properties to set
         */
        function BatchEntry(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BatchEntry exist.
         * @member {ics23.IExistenceProof|null|undefined} exist
         * @memberof ics23.BatchEntry
         * @instance
         */
        BatchEntry.prototype.exist = null;

        /**
         * BatchEntry nonexist.
         * @member {ics23.INonExistenceProof|null|undefined} nonexist
         * @memberof ics23.BatchEntry
         * @instance
         */
        BatchEntry.prototype.nonexist = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * BatchEntry proof.
         * @member {"exist"|"nonexist"|undefined} proof
         * @memberof ics23.BatchEntry
         * @instance
         */
        Object.defineProperty(BatchEntry.prototype, "proof", {
            get: $util.oneOfGetter($oneOfFields = ["exist", "nonexist"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new BatchEntry instance using the specified properties.
         * @function create
         * @memberof ics23.BatchEntry
         * @static
         * @param {ics23.IBatchEntry=} [properties] Properties to set
         * @returns {ics23.BatchEntry} BatchEntry instance
         */
        BatchEntry.create = function create(properties) {
            return new BatchEntry(properties);
        };

        /**
         * Encodes the specified BatchEntry message. Does not implicitly {@link ics23.BatchEntry.verify|verify} messages.
         * @function encode
         * @memberof ics23.BatchEntry
         * @static
         * @param {ics23.IBatchEntry} message BatchEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchEntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.exist != null && message.hasOwnProperty("exist"))
                $root.ics23.ExistenceProof.encode(message.exist, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.nonexist != null && message.hasOwnProperty("nonexist"))
                $root.ics23.NonExistenceProof.encode(message.nonexist, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BatchEntry message, length delimited. Does not implicitly {@link ics23.BatchEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.BatchEntry
         * @static
         * @param {ics23.IBatchEntry} message BatchEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BatchEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BatchEntry message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.BatchEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.BatchEntry} BatchEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchEntry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.BatchEntry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.exist = $root.ics23.ExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = $root.ics23.NonExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BatchEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.BatchEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.BatchEntry} BatchEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BatchEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BatchEntry message.
         * @function verify
         * @memberof ics23.BatchEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BatchEntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                properties.proof = 1;
                {
                    var error = $root.ics23.ExistenceProof.verify(message.exist);
                    if (error)
                        return "exist." + error;
                }
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.ics23.NonExistenceProof.verify(message.nonexist);
                    if (error)
                        return "nonexist." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BatchEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.BatchEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.BatchEntry} BatchEntry
         */
        BatchEntry.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.BatchEntry)
                return object;
            var message = new $root.ics23.BatchEntry();
            if (object.exist != null) {
                if (typeof object.exist !== "object")
                    throw TypeError(".ics23.BatchEntry.exist: object expected");
                message.exist = $root.ics23.ExistenceProof.fromObject(object.exist);
            }
            if (object.nonexist != null) {
                if (typeof object.nonexist !== "object")
                    throw TypeError(".ics23.BatchEntry.nonexist: object expected");
                message.nonexist = $root.ics23.NonExistenceProof.fromObject(object.nonexist);
            }
            return message;
        };

        /**
         * Creates a plain object from a BatchEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.BatchEntry
         * @static
         * @param {ics23.BatchEntry} message BatchEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BatchEntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                object.exist = $root.ics23.ExistenceProof.toObject(message.exist, options);
                if (options.oneofs)
                    object.proof = "exist";
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                object.nonexist = $root.ics23.NonExistenceProof.toObject(message.nonexist, options);
                if (options.oneofs)
                    object.proof = "nonexist";
            }
            return object;
        };

        /**
         * Converts this BatchEntry to JSON.
         * @function toJSON
         * @memberof ics23.BatchEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BatchEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BatchEntry;
    })();

    ics23.CompressedBatchProof = (function() {

        /**
         * Properties of a CompressedBatchProof.
         * @memberof ics23
         * @interface ICompressedBatchProof
         * @property {Array.<ics23.ICompressedBatchEntry>|null} [entries] CompressedBatchProof entries
         * @property {Array.<ics23.IInnerOp>|null} [lookupInners] CompressedBatchProof lookupInners
         */

        /**
         * Constructs a new CompressedBatchProof.
         * @memberof ics23
         * @classdesc Represents a CompressedBatchProof.
         * @implements ICompressedBatchProof
         * @constructor
         * @param {ics23.ICompressedBatchProof=} [properties] Properties to set
         */
        function CompressedBatchProof(properties) {
            this.entries = [];
            this.lookupInners = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompressedBatchProof entries.
         * @member {Array.<ics23.ICompressedBatchEntry>} entries
         * @memberof ics23.CompressedBatchProof
         * @instance
         */
        CompressedBatchProof.prototype.entries = $util.emptyArray;

        /**
         * CompressedBatchProof lookupInners.
         * @member {Array.<ics23.IInnerOp>} lookupInners
         * @memberof ics23.CompressedBatchProof
         * @instance
         */
        CompressedBatchProof.prototype.lookupInners = $util.emptyArray;

        /**
         * Creates a new CompressedBatchProof instance using the specified properties.
         * @function create
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {ics23.ICompressedBatchProof=} [properties] Properties to set
         * @returns {ics23.CompressedBatchProof} CompressedBatchProof instance
         */
        CompressedBatchProof.create = function create(properties) {
            return new CompressedBatchProof(properties);
        };

        /**
         * Encodes the specified CompressedBatchProof message. Does not implicitly {@link ics23.CompressedBatchProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {ics23.ICompressedBatchProof} message CompressedBatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedBatchProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entries != null && message.entries.length)
                for (var i = 0; i < message.entries.length; ++i)
                    $root.ics23.CompressedBatchEntry.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.lookupInners != null && message.lookupInners.length)
                for (var i = 0; i < message.lookupInners.length; ++i)
                    $root.ics23.InnerOp.encode(message.lookupInners[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CompressedBatchProof message, length delimited. Does not implicitly {@link ics23.CompressedBatchProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {ics23.ICompressedBatchProof} message CompressedBatchProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedBatchProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompressedBatchProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.CompressedBatchProof} CompressedBatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedBatchProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.CompressedBatchProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.entries && message.entries.length))
                        message.entries = [];
                    message.entries.push($root.ics23.CompressedBatchEntry.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.lookupInners && message.lookupInners.length))
                        message.lookupInners = [];
                    message.lookupInners.push($root.ics23.InnerOp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompressedBatchProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.CompressedBatchProof} CompressedBatchProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedBatchProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompressedBatchProof message.
         * @function verify
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompressedBatchProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (var i = 0; i < message.entries.length; ++i) {
                    var error = $root.ics23.CompressedBatchEntry.verify(message.entries[i]);
                    if (error)
                        return "entries." + error;
                }
            }
            if (message.lookupInners != null && message.hasOwnProperty("lookupInners")) {
                if (!Array.isArray(message.lookupInners))
                    return "lookupInners: array expected";
                for (var i = 0; i < message.lookupInners.length; ++i) {
                    var error = $root.ics23.InnerOp.verify(message.lookupInners[i]);
                    if (error)
                        return "lookupInners." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CompressedBatchProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.CompressedBatchProof} CompressedBatchProof
         */
        CompressedBatchProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.CompressedBatchProof)
                return object;
            var message = new $root.ics23.CompressedBatchProof();
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".ics23.CompressedBatchProof.entries: array expected");
                message.entries = [];
                for (var i = 0; i < object.entries.length; ++i) {
                    if (typeof object.entries[i] !== "object")
                        throw TypeError(".ics23.CompressedBatchProof.entries: object expected");
                    message.entries[i] = $root.ics23.CompressedBatchEntry.fromObject(object.entries[i]);
                }
            }
            if (object.lookupInners) {
                if (!Array.isArray(object.lookupInners))
                    throw TypeError(".ics23.CompressedBatchProof.lookupInners: array expected");
                message.lookupInners = [];
                for (var i = 0; i < object.lookupInners.length; ++i) {
                    if (typeof object.lookupInners[i] !== "object")
                        throw TypeError(".ics23.CompressedBatchProof.lookupInners: object expected");
                    message.lookupInners[i] = $root.ics23.InnerOp.fromObject(object.lookupInners[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CompressedBatchProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.CompressedBatchProof
         * @static
         * @param {ics23.CompressedBatchProof} message CompressedBatchProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompressedBatchProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.entries = [];
                object.lookupInners = [];
            }
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (var j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $root.ics23.CompressedBatchEntry.toObject(message.entries[j], options);
            }
            if (message.lookupInners && message.lookupInners.length) {
                object.lookupInners = [];
                for (var j = 0; j < message.lookupInners.length; ++j)
                    object.lookupInners[j] = $root.ics23.InnerOp.toObject(message.lookupInners[j], options);
            }
            return object;
        };

        /**
         * Converts this CompressedBatchProof to JSON.
         * @function toJSON
         * @memberof ics23.CompressedBatchProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompressedBatchProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompressedBatchProof;
    })();

    ics23.CompressedBatchEntry = (function() {

        /**
         * Properties of a CompressedBatchEntry.
         * @memberof ics23
         * @interface ICompressedBatchEntry
         * @property {ics23.ICompressedExistenceProof|null} [exist] CompressedBatchEntry exist
         * @property {ics23.ICompressedNonExistenceProof|null} [nonexist] CompressedBatchEntry nonexist
         */

        /**
         * Constructs a new CompressedBatchEntry.
         * @memberof ics23
         * @classdesc Represents a CompressedBatchEntry.
         * @implements ICompressedBatchEntry
         * @constructor
         * @param {ics23.ICompressedBatchEntry=} [properties] Properties to set
         */
        function CompressedBatchEntry(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompressedBatchEntry exist.
         * @member {ics23.ICompressedExistenceProof|null|undefined} exist
         * @memberof ics23.CompressedBatchEntry
         * @instance
         */
        CompressedBatchEntry.prototype.exist = null;

        /**
         * CompressedBatchEntry nonexist.
         * @member {ics23.ICompressedNonExistenceProof|null|undefined} nonexist
         * @memberof ics23.CompressedBatchEntry
         * @instance
         */
        CompressedBatchEntry.prototype.nonexist = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * CompressedBatchEntry proof.
         * @member {"exist"|"nonexist"|undefined} proof
         * @memberof ics23.CompressedBatchEntry
         * @instance
         */
        Object.defineProperty(CompressedBatchEntry.prototype, "proof", {
            get: $util.oneOfGetter($oneOfFields = ["exist", "nonexist"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new CompressedBatchEntry instance using the specified properties.
         * @function create
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {ics23.ICompressedBatchEntry=} [properties] Properties to set
         * @returns {ics23.CompressedBatchEntry} CompressedBatchEntry instance
         */
        CompressedBatchEntry.create = function create(properties) {
            return new CompressedBatchEntry(properties);
        };

        /**
         * Encodes the specified CompressedBatchEntry message. Does not implicitly {@link ics23.CompressedBatchEntry.verify|verify} messages.
         * @function encode
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {ics23.ICompressedBatchEntry} message CompressedBatchEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedBatchEntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.exist != null && message.hasOwnProperty("exist"))
                $root.ics23.CompressedExistenceProof.encode(message.exist, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.nonexist != null && message.hasOwnProperty("nonexist"))
                $root.ics23.CompressedNonExistenceProof.encode(message.nonexist, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CompressedBatchEntry message, length delimited. Does not implicitly {@link ics23.CompressedBatchEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {ics23.ICompressedBatchEntry} message CompressedBatchEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedBatchEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompressedBatchEntry message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.CompressedBatchEntry} CompressedBatchEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedBatchEntry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.CompressedBatchEntry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.exist = $root.ics23.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nonexist = $root.ics23.CompressedNonExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompressedBatchEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.CompressedBatchEntry} CompressedBatchEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedBatchEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompressedBatchEntry message.
         * @function verify
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompressedBatchEntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                properties.proof = 1;
                {
                    var error = $root.ics23.CompressedExistenceProof.verify(message.exist);
                    if (error)
                        return "exist." + error;
                }
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                if (properties.proof === 1)
                    return "proof: multiple values";
                properties.proof = 1;
                {
                    var error = $root.ics23.CompressedNonExistenceProof.verify(message.nonexist);
                    if (error)
                        return "nonexist." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CompressedBatchEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.CompressedBatchEntry} CompressedBatchEntry
         */
        CompressedBatchEntry.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.CompressedBatchEntry)
                return object;
            var message = new $root.ics23.CompressedBatchEntry();
            if (object.exist != null) {
                if (typeof object.exist !== "object")
                    throw TypeError(".ics23.CompressedBatchEntry.exist: object expected");
                message.exist = $root.ics23.CompressedExistenceProof.fromObject(object.exist);
            }
            if (object.nonexist != null) {
                if (typeof object.nonexist !== "object")
                    throw TypeError(".ics23.CompressedBatchEntry.nonexist: object expected");
                message.nonexist = $root.ics23.CompressedNonExistenceProof.fromObject(object.nonexist);
            }
            return message;
        };

        /**
         * Creates a plain object from a CompressedBatchEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.CompressedBatchEntry
         * @static
         * @param {ics23.CompressedBatchEntry} message CompressedBatchEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompressedBatchEntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.exist != null && message.hasOwnProperty("exist")) {
                object.exist = $root.ics23.CompressedExistenceProof.toObject(message.exist, options);
                if (options.oneofs)
                    object.proof = "exist";
            }
            if (message.nonexist != null && message.hasOwnProperty("nonexist")) {
                object.nonexist = $root.ics23.CompressedNonExistenceProof.toObject(message.nonexist, options);
                if (options.oneofs)
                    object.proof = "nonexist";
            }
            return object;
        };

        /**
         * Converts this CompressedBatchEntry to JSON.
         * @function toJSON
         * @memberof ics23.CompressedBatchEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompressedBatchEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompressedBatchEntry;
    })();

    ics23.CompressedExistenceProof = (function() {

        /**
         * Properties of a CompressedExistenceProof.
         * @memberof ics23
         * @interface ICompressedExistenceProof
         * @property {Uint8Array|null} [key] CompressedExistenceProof key
         * @property {Uint8Array|null} [value] CompressedExistenceProof value
         * @property {ics23.ILeafOp|null} [leaf] CompressedExistenceProof leaf
         * @property {Array.<number>|null} [path] CompressedExistenceProof path
         */

        /**
         * Constructs a new CompressedExistenceProof.
         * @memberof ics23
         * @classdesc Represents a CompressedExistenceProof.
         * @implements ICompressedExistenceProof
         * @constructor
         * @param {ics23.ICompressedExistenceProof=} [properties] Properties to set
         */
        function CompressedExistenceProof(properties) {
            this.path = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompressedExistenceProof key.
         * @member {Uint8Array} key
         * @memberof ics23.CompressedExistenceProof
         * @instance
         */
        CompressedExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * CompressedExistenceProof value.
         * @member {Uint8Array} value
         * @memberof ics23.CompressedExistenceProof
         * @instance
         */
        CompressedExistenceProof.prototype.value = $util.newBuffer([]);

        /**
         * CompressedExistenceProof leaf.
         * @member {ics23.ILeafOp|null|undefined} leaf
         * @memberof ics23.CompressedExistenceProof
         * @instance
         */
        CompressedExistenceProof.prototype.leaf = null;

        /**
         * CompressedExistenceProof path.
         * @member {Array.<number>} path
         * @memberof ics23.CompressedExistenceProof
         * @instance
         */
        CompressedExistenceProof.prototype.path = $util.emptyArray;

        /**
         * Creates a new CompressedExistenceProof instance using the specified properties.
         * @function create
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {ics23.ICompressedExistenceProof=} [properties] Properties to set
         * @returns {ics23.CompressedExistenceProof} CompressedExistenceProof instance
         */
        CompressedExistenceProof.create = function create(properties) {
            return new CompressedExistenceProof(properties);
        };

        /**
         * Encodes the specified CompressedExistenceProof message. Does not implicitly {@link ics23.CompressedExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {ics23.ICompressedExistenceProof} message CompressedExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && message.hasOwnProperty("value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                $root.ics23.LeafOp.encode(message.leaf, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.path != null && message.path.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.path.length; ++i)
                    writer.int32(message.path[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified CompressedExistenceProof message, length delimited. Does not implicitly {@link ics23.CompressedExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {ics23.ICompressedExistenceProof} message CompressedExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompressedExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.CompressedExistenceProof} CompressedExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.CompressedExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.leaf = $root.ics23.LeafOp.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.path && message.path.length))
                        message.path = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.path.push(reader.int32());
                    } else
                        message.path.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompressedExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.CompressedExistenceProof} CompressedExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompressedExistenceProof message.
         * @function verify
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompressedExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            if (message.leaf != null && message.hasOwnProperty("leaf")) {
                var error = $root.ics23.LeafOp.verify(message.leaf);
                if (error)
                    return "leaf." + error;
            }
            if (message.path != null && message.hasOwnProperty("path")) {
                if (!Array.isArray(message.path))
                    return "path: array expected";
                for (var i = 0; i < message.path.length; ++i)
                    if (!$util.isInteger(message.path[i]))
                        return "path: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a CompressedExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.CompressedExistenceProof} CompressedExistenceProof
         */
        CompressedExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.CompressedExistenceProof)
                return object;
            var message = new $root.ics23.CompressedExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length)
                    message.value = object.value;
            if (object.leaf != null) {
                if (typeof object.leaf !== "object")
                    throw TypeError(".ics23.CompressedExistenceProof.leaf: object expected");
                message.leaf = $root.ics23.LeafOp.fromObject(object.leaf);
            }
            if (object.path) {
                if (!Array.isArray(object.path))
                    throw TypeError(".ics23.CompressedExistenceProof.path: array expected");
                message.path = [];
                for (var i = 0; i < object.path.length; ++i)
                    message.path[i] = object.path[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a CompressedExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.CompressedExistenceProof
         * @static
         * @param {ics23.CompressedExistenceProof} message CompressedExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompressedExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.path = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
                object.leaf = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            if (message.leaf != null && message.hasOwnProperty("leaf"))
                object.leaf = $root.ics23.LeafOp.toObject(message.leaf, options);
            if (message.path && message.path.length) {
                object.path = [];
                for (var j = 0; j < message.path.length; ++j)
                    object.path[j] = message.path[j];
            }
            return object;
        };

        /**
         * Converts this CompressedExistenceProof to JSON.
         * @function toJSON
         * @memberof ics23.CompressedExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompressedExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompressedExistenceProof;
    })();

    ics23.CompressedNonExistenceProof = (function() {

        /**
         * Properties of a CompressedNonExistenceProof.
         * @memberof ics23
         * @interface ICompressedNonExistenceProof
         * @property {Uint8Array|null} [key] CompressedNonExistenceProof key
         * @property {ics23.ICompressedExistenceProof|null} [left] CompressedNonExistenceProof left
         * @property {ics23.ICompressedExistenceProof|null} [right] CompressedNonExistenceProof right
         */

        /**
         * Constructs a new CompressedNonExistenceProof.
         * @memberof ics23
         * @classdesc Represents a CompressedNonExistenceProof.
         * @implements ICompressedNonExistenceProof
         * @constructor
         * @param {ics23.ICompressedNonExistenceProof=} [properties] Properties to set
         */
        function CompressedNonExistenceProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CompressedNonExistenceProof key.
         * @member {Uint8Array} key
         * @memberof ics23.CompressedNonExistenceProof
         * @instance
         */
        CompressedNonExistenceProof.prototype.key = $util.newBuffer([]);

        /**
         * CompressedNonExistenceProof left.
         * @member {ics23.ICompressedExistenceProof|null|undefined} left
         * @memberof ics23.CompressedNonExistenceProof
         * @instance
         */
        CompressedNonExistenceProof.prototype.left = null;

        /**
         * CompressedNonExistenceProof right.
         * @member {ics23.ICompressedExistenceProof|null|undefined} right
         * @memberof ics23.CompressedNonExistenceProof
         * @instance
         */
        CompressedNonExistenceProof.prototype.right = null;

        /**
         * Creates a new CompressedNonExistenceProof instance using the specified properties.
         * @function create
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {ics23.ICompressedNonExistenceProof=} [properties] Properties to set
         * @returns {ics23.CompressedNonExistenceProof} CompressedNonExistenceProof instance
         */
        CompressedNonExistenceProof.create = function create(properties) {
            return new CompressedNonExistenceProof(properties);
        };

        /**
         * Encodes the specified CompressedNonExistenceProof message. Does not implicitly {@link ics23.CompressedNonExistenceProof.verify|verify} messages.
         * @function encode
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {ics23.ICompressedNonExistenceProof} message CompressedNonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedNonExistenceProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.left != null && message.hasOwnProperty("left"))
                $root.ics23.CompressedExistenceProof.encode(message.left, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.right != null && message.hasOwnProperty("right"))
                $root.ics23.CompressedExistenceProof.encode(message.right, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CompressedNonExistenceProof message, length delimited. Does not implicitly {@link ics23.CompressedNonExistenceProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {ics23.ICompressedNonExistenceProof} message CompressedNonExistenceProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CompressedNonExistenceProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CompressedNonExistenceProof message from the specified reader or buffer.
         * @function decode
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ics23.CompressedNonExistenceProof} CompressedNonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedNonExistenceProof.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ics23.CompressedNonExistenceProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.left = $root.ics23.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.right = $root.ics23.CompressedExistenceProof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CompressedNonExistenceProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ics23.CompressedNonExistenceProof} CompressedNonExistenceProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CompressedNonExistenceProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CompressedNonExistenceProof message.
         * @function verify
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CompressedNonExistenceProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.left != null && message.hasOwnProperty("left")) {
                var error = $root.ics23.CompressedExistenceProof.verify(message.left);
                if (error)
                    return "left." + error;
            }
            if (message.right != null && message.hasOwnProperty("right")) {
                var error = $root.ics23.CompressedExistenceProof.verify(message.right);
                if (error)
                    return "right." + error;
            }
            return null;
        };

        /**
         * Creates a CompressedNonExistenceProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ics23.CompressedNonExistenceProof} CompressedNonExistenceProof
         */
        CompressedNonExistenceProof.fromObject = function fromObject(object) {
            if (object instanceof $root.ics23.CompressedNonExistenceProof)
                return object;
            var message = new $root.ics23.CompressedNonExistenceProof();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.left != null) {
                if (typeof object.left !== "object")
                    throw TypeError(".ics23.CompressedNonExistenceProof.left: object expected");
                message.left = $root.ics23.CompressedExistenceProof.fromObject(object.left);
            }
            if (object.right != null) {
                if (typeof object.right !== "object")
                    throw TypeError(".ics23.CompressedNonExistenceProof.right: object expected");
                message.right = $root.ics23.CompressedExistenceProof.fromObject(object.right);
            }
            return message;
        };

        /**
         * Creates a plain object from a CompressedNonExistenceProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ics23.CompressedNonExistenceProof
         * @static
         * @param {ics23.CompressedNonExistenceProof} message CompressedNonExistenceProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompressedNonExistenceProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                object.left = null;
                object.right = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.left != null && message.hasOwnProperty("left"))
                object.left = $root.ics23.CompressedExistenceProof.toObject(message.left, options);
            if (message.right != null && message.hasOwnProperty("right"))
                object.right = $root.ics23.CompressedExistenceProof.toObject(message.right, options);
            return object;
        };

        /**
         * Converts this CompressedNonExistenceProof to JSON.
         * @function toJSON
         * @memberof ics23.CompressedNonExistenceProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompressedNonExistenceProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompressedNonExistenceProof;
    })();

    return ics23;
})();

module.exports = $root;
