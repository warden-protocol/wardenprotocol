"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var google;
(function (google) {
    var protobuf;
    (function (protobuf) {
        class FileDescriptorSet extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.file = data.file;
                }
            }
            get file() {
                return pb_1.Message.getRepeatedWrapperField(this, FileDescriptorProto, 1);
            }
            set file(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new FileDescriptorSet({
                    file: data.file.map(item => FileDescriptorProto.fromObject(item))
                });
                return message;
            }
            toObject() {
                const data = {
                    file: this.file.map((item) => item.toObject())
                };
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.file !== undefined)
                    writer.writeRepeatedMessage(1, this.file, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FileDescriptorSet();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.file, () => pb_1.Message.addToRepeatedWrapperField(message, 1, FileDescriptorProto.deserialize(reader), FileDescriptorProto));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return FileDescriptorSet.deserialize(bytes);
            }
        }
        protobuf.FileDescriptorSet = FileDescriptorSet;
        class FileDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 10, 11, 4, 5, 6, 7], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    if ("package" in data && data.package != undefined) {
                        this.package = data.package;
                    }
                    this.dependency = data.dependency;
                    this.public_dependency = data.public_dependency;
                    this.weak_dependency = data.weak_dependency;
                    this.message_type = data.message_type;
                    this.enum_type = data.enum_type;
                    this.service = data.service;
                    this.extension = data.extension;
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                    if ("source_code_info" in data && data.source_code_info != undefined) {
                        this.source_code_info = data.source_code_info;
                    }
                    if ("syntax" in data && data.syntax != undefined) {
                        this.syntax = data.syntax;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get package() {
                return pb_1.Message.getField(this, 2);
            }
            set package(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get dependency() {
                return pb_1.Message.getField(this, 3);
            }
            set dependency(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get public_dependency() {
                return pb_1.Message.getField(this, 10);
            }
            set public_dependency(value) {
                pb_1.Message.setField(this, 10, value);
            }
            get weak_dependency() {
                return pb_1.Message.getField(this, 11);
            }
            set weak_dependency(value) {
                pb_1.Message.setField(this, 11, value);
            }
            get message_type() {
                return pb_1.Message.getRepeatedWrapperField(this, DescriptorProto, 4);
            }
            set message_type(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            get enum_type() {
                return pb_1.Message.getRepeatedWrapperField(this, EnumDescriptorProto, 5);
            }
            set enum_type(value) {
                pb_1.Message.setRepeatedWrapperField(this, 5, value);
            }
            get service() {
                return pb_1.Message.getRepeatedWrapperField(this, ServiceDescriptorProto, 6);
            }
            set service(value) {
                pb_1.Message.setRepeatedWrapperField(this, 6, value);
            }
            get extension() {
                return pb_1.Message.getRepeatedWrapperField(this, FieldDescriptorProto, 7);
            }
            set extension(value) {
                pb_1.Message.setRepeatedWrapperField(this, 7, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, FileOptions, 8);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 8, value);
            }
            get source_code_info() {
                return pb_1.Message.getWrapperField(this, SourceCodeInfo, 9);
            }
            set source_code_info(value) {
                pb_1.Message.setWrapperField(this, 9, value);
            }
            get syntax() {
                return pb_1.Message.getField(this, 12);
            }
            set syntax(value) {
                pb_1.Message.setField(this, 12, value);
            }
            static fromObject(data) {
                const message = new FileDescriptorProto({
                    dependency: data.dependency,
                    public_dependency: data.public_dependency,
                    weak_dependency: data.weak_dependency,
                    message_type: data.message_type.map(item => DescriptorProto.fromObject(item)),
                    enum_type: data.enum_type.map(item => EnumDescriptorProto.fromObject(item)),
                    service: data.service.map(item => ServiceDescriptorProto.fromObject(item)),
                    extension: data.extension.map(item => FieldDescriptorProto.fromObject(item))
                });
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.package != null) {
                    message.package = data.package;
                }
                if (data.options != null) {
                    message.options = FileOptions.fromObject(data.options);
                }
                if (data.source_code_info != null) {
                    message.source_code_info = SourceCodeInfo.fromObject(data.source_code_info);
                }
                if (data.syntax != null) {
                    message.syntax = data.syntax;
                }
                return message;
            }
            toObject() {
                const data = {
                    dependency: this.dependency,
                    public_dependency: this.public_dependency,
                    weak_dependency: this.weak_dependency,
                    message_type: this.message_type.map((item) => item.toObject()),
                    enum_type: this.enum_type.map((item) => item.toObject()),
                    service: this.service.map((item) => item.toObject()),
                    extension: this.extension.map((item) => item.toObject())
                };
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.package != null) {
                    data.package = this.package;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                if (this.source_code_info != null) {
                    data.source_code_info = this.source_code_info.toObject();
                }
                if (this.syntax != null) {
                    data.syntax = this.syntax;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (typeof this.package === "string" && this.package.length)
                    writer.writeString(2, this.package);
                if (this.dependency !== undefined)
                    writer.writeRepeatedString(3, this.dependency);
                if (this.public_dependency !== undefined)
                    writer.writeRepeatedInt32(10, this.public_dependency);
                if (this.weak_dependency !== undefined)
                    writer.writeRepeatedInt32(11, this.weak_dependency);
                if (this.message_type !== undefined)
                    writer.writeRepeatedMessage(4, this.message_type, (item) => item.serialize(writer));
                if (this.enum_type !== undefined)
                    writer.writeRepeatedMessage(5, this.enum_type, (item) => item.serialize(writer));
                if (this.service !== undefined)
                    writer.writeRepeatedMessage(6, this.service, (item) => item.serialize(writer));
                if (this.extension !== undefined)
                    writer.writeRepeatedMessage(7, this.extension, (item) => item.serialize(writer));
                if (this.options !== undefined)
                    writer.writeMessage(8, this.options, () => this.options.serialize(writer));
                if (this.source_code_info !== undefined)
                    writer.writeMessage(9, this.source_code_info, () => this.source_code_info.serialize(writer));
                if (typeof this.syntax === "string" && this.syntax.length)
                    writer.writeString(12, this.syntax);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FileDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            message.package = reader.readString();
                            break;
                        case 3:
                            pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                            break;
                        case 10:
                            pb_1.Message.addToRepeatedField(message, 10, reader.readInt32());
                            break;
                        case 11:
                            pb_1.Message.addToRepeatedField(message, 11, reader.readInt32());
                            break;
                        case 4:
                            reader.readMessage(message.message_type, () => pb_1.Message.addToRepeatedWrapperField(message, 4, DescriptorProto.deserialize(reader), DescriptorProto));
                            break;
                        case 5:
                            reader.readMessage(message.enum_type, () => pb_1.Message.addToRepeatedWrapperField(message, 5, EnumDescriptorProto.deserialize(reader), EnumDescriptorProto));
                            break;
                        case 6:
                            reader.readMessage(message.service, () => pb_1.Message.addToRepeatedWrapperField(message, 6, ServiceDescriptorProto.deserialize(reader), ServiceDescriptorProto));
                            break;
                        case 7:
                            reader.readMessage(message.extension, () => pb_1.Message.addToRepeatedWrapperField(message, 7, FieldDescriptorProto.deserialize(reader), FieldDescriptorProto));
                            break;
                        case 8:
                            reader.readMessage(message.options, () => message.options = FileOptions.deserialize(reader));
                            break;
                        case 9:
                            reader.readMessage(message.source_code_info, () => message.source_code_info = SourceCodeInfo.deserialize(reader));
                            break;
                        case 12:
                            message.syntax = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return FileDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.FileDescriptorProto = FileDescriptorProto;
        class DescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 6, 3, 4, 5, 8, 9, 10], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    this.field = data.field;
                    this.extension = data.extension;
                    this.nested_type = data.nested_type;
                    this.enum_type = data.enum_type;
                    this.extension_range = data.extension_range;
                    this.oneof_decl = data.oneof_decl;
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                    this.reserved_range = data.reserved_range;
                    this.reserved_name = data.reserved_name;
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get field() {
                return pb_1.Message.getRepeatedWrapperField(this, FieldDescriptorProto, 2);
            }
            set field(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            get extension() {
                return pb_1.Message.getRepeatedWrapperField(this, FieldDescriptorProto, 6);
            }
            set extension(value) {
                pb_1.Message.setRepeatedWrapperField(this, 6, value);
            }
            get nested_type() {
                return pb_1.Message.getRepeatedWrapperField(this, DescriptorProto, 3);
            }
            set nested_type(value) {
                pb_1.Message.setRepeatedWrapperField(this, 3, value);
            }
            get enum_type() {
                return pb_1.Message.getRepeatedWrapperField(this, EnumDescriptorProto, 4);
            }
            set enum_type(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            get extension_range() {
                return pb_1.Message.getRepeatedWrapperField(this, DescriptorProto.ExtensionRange, 5);
            }
            set extension_range(value) {
                pb_1.Message.setRepeatedWrapperField(this, 5, value);
            }
            get oneof_decl() {
                return pb_1.Message.getRepeatedWrapperField(this, OneofDescriptorProto, 8);
            }
            set oneof_decl(value) {
                pb_1.Message.setRepeatedWrapperField(this, 8, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, MessageOptions, 7);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 7, value);
            }
            get reserved_range() {
                return pb_1.Message.getRepeatedWrapperField(this, DescriptorProto.ReservedRange, 9);
            }
            set reserved_range(value) {
                pb_1.Message.setRepeatedWrapperField(this, 9, value);
            }
            get reserved_name() {
                return pb_1.Message.getField(this, 10);
            }
            set reserved_name(value) {
                pb_1.Message.setField(this, 10, value);
            }
            static fromObject(data) {
                const message = new DescriptorProto({
                    field: data.field.map(item => FieldDescriptorProto.fromObject(item)),
                    extension: data.extension.map(item => FieldDescriptorProto.fromObject(item)),
                    nested_type: data.nested_type.map(item => DescriptorProto.fromObject(item)),
                    enum_type: data.enum_type.map(item => EnumDescriptorProto.fromObject(item)),
                    extension_range: data.extension_range.map(item => DescriptorProto.ExtensionRange.fromObject(item)),
                    oneof_decl: data.oneof_decl.map(item => OneofDescriptorProto.fromObject(item)),
                    reserved_range: data.reserved_range.map(item => DescriptorProto.ReservedRange.fromObject(item)),
                    reserved_name: data.reserved_name
                });
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.options != null) {
                    message.options = MessageOptions.fromObject(data.options);
                }
                return message;
            }
            toObject() {
                const data = {
                    field: this.field.map((item) => item.toObject()),
                    extension: this.extension.map((item) => item.toObject()),
                    nested_type: this.nested_type.map((item) => item.toObject()),
                    enum_type: this.enum_type.map((item) => item.toObject()),
                    extension_range: this.extension_range.map((item) => item.toObject()),
                    oneof_decl: this.oneof_decl.map((item) => item.toObject()),
                    reserved_range: this.reserved_range.map((item) => item.toObject()),
                    reserved_name: this.reserved_name
                };
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.field !== undefined)
                    writer.writeRepeatedMessage(2, this.field, (item) => item.serialize(writer));
                if (this.extension !== undefined)
                    writer.writeRepeatedMessage(6, this.extension, (item) => item.serialize(writer));
                if (this.nested_type !== undefined)
                    writer.writeRepeatedMessage(3, this.nested_type, (item) => item.serialize(writer));
                if (this.enum_type !== undefined)
                    writer.writeRepeatedMessage(4, this.enum_type, (item) => item.serialize(writer));
                if (this.extension_range !== undefined)
                    writer.writeRepeatedMessage(5, this.extension_range, (item) => item.serialize(writer));
                if (this.oneof_decl !== undefined)
                    writer.writeRepeatedMessage(8, this.oneof_decl, (item) => item.serialize(writer));
                if (this.options !== undefined)
                    writer.writeMessage(7, this.options, () => this.options.serialize(writer));
                if (this.reserved_range !== undefined)
                    writer.writeRepeatedMessage(9, this.reserved_range, (item) => item.serialize(writer));
                if (this.reserved_name !== undefined)
                    writer.writeRepeatedString(10, this.reserved_name);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            reader.readMessage(message.field, () => pb_1.Message.addToRepeatedWrapperField(message, 2, FieldDescriptorProto.deserialize(reader), FieldDescriptorProto));
                            break;
                        case 6:
                            reader.readMessage(message.extension, () => pb_1.Message.addToRepeatedWrapperField(message, 6, FieldDescriptorProto.deserialize(reader), FieldDescriptorProto));
                            break;
                        case 3:
                            reader.readMessage(message.nested_type, () => pb_1.Message.addToRepeatedWrapperField(message, 3, DescriptorProto.deserialize(reader), DescriptorProto));
                            break;
                        case 4:
                            reader.readMessage(message.enum_type, () => pb_1.Message.addToRepeatedWrapperField(message, 4, EnumDescriptorProto.deserialize(reader), EnumDescriptorProto));
                            break;
                        case 5:
                            reader.readMessage(message.extension_range, () => pb_1.Message.addToRepeatedWrapperField(message, 5, DescriptorProto.ExtensionRange.deserialize(reader), DescriptorProto.ExtensionRange));
                            break;
                        case 8:
                            reader.readMessage(message.oneof_decl, () => pb_1.Message.addToRepeatedWrapperField(message, 8, OneofDescriptorProto.deserialize(reader), OneofDescriptorProto));
                            break;
                        case 7:
                            reader.readMessage(message.options, () => message.options = MessageOptions.deserialize(reader));
                            break;
                        case 9:
                            reader.readMessage(message.reserved_range, () => pb_1.Message.addToRepeatedWrapperField(message, 9, DescriptorProto.ReservedRange.deserialize(reader), DescriptorProto.ReservedRange));
                            break;
                        case 10:
                            pb_1.Message.addToRepeatedField(message, 10, reader.readString());
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return DescriptorProto.deserialize(bytes);
            }
        }
        protobuf.DescriptorProto = DescriptorProto;
        (function (DescriptorProto) {
            class ExtensionRange extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("start" in data && data.start != undefined) {
                            this.start = data.start;
                        }
                        if ("end" in data && data.end != undefined) {
                            this.end = data.end;
                        }
                        if ("options" in data && data.options != undefined) {
                            this.options = data.options;
                        }
                    }
                }
                get start() {
                    return pb_1.Message.getField(this, 1);
                }
                set start(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get end() {
                    return pb_1.Message.getField(this, 2);
                }
                set end(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get options() {
                    return pb_1.Message.getWrapperField(this, ExtensionRangeOptions, 3);
                }
                set options(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ExtensionRange({});
                    if (data.start != null) {
                        message.start = data.start;
                    }
                    if (data.end != null) {
                        message.end = data.end;
                    }
                    if (data.options != null) {
                        message.options = ExtensionRangeOptions.fromObject(data.options);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.start != null) {
                        data.start = this.start;
                    }
                    if (this.end != null) {
                        data.end = this.end;
                    }
                    if (this.options != null) {
                        data.options = this.options.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.start !== undefined)
                        writer.writeInt32(1, this.start);
                    if (this.end !== undefined)
                        writer.writeInt32(2, this.end);
                    if (this.options !== undefined)
                        writer.writeMessage(3, this.options, () => this.options.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ExtensionRange();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.start = reader.readInt32();
                                break;
                            case 2:
                                message.end = reader.readInt32();
                                break;
                            case 3:
                                reader.readMessage(message.options, () => message.options = ExtensionRangeOptions.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return ExtensionRange.deserialize(bytes);
                }
            }
            DescriptorProto.ExtensionRange = ExtensionRange;
            class ReservedRange extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("start" in data && data.start != undefined) {
                            this.start = data.start;
                        }
                        if ("end" in data && data.end != undefined) {
                            this.end = data.end;
                        }
                    }
                }
                get start() {
                    return pb_1.Message.getField(this, 1);
                }
                set start(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get end() {
                    return pb_1.Message.getField(this, 2);
                }
                set end(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ReservedRange({});
                    if (data.start != null) {
                        message.start = data.start;
                    }
                    if (data.end != null) {
                        message.end = data.end;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.start != null) {
                        data.start = this.start;
                    }
                    if (this.end != null) {
                        data.end = this.end;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.start !== undefined)
                        writer.writeInt32(1, this.start);
                    if (this.end !== undefined)
                        writer.writeInt32(2, this.end);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ReservedRange();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.start = reader.readInt32();
                                break;
                            case 2:
                                message.end = reader.readInt32();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return ReservedRange.deserialize(bytes);
                }
            }
            DescriptorProto.ReservedRange = ReservedRange;
        })(DescriptorProto = protobuf.DescriptorProto || (protobuf.DescriptorProto = {}));
        class ExtensionRangeOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new ExtensionRangeOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ExtensionRangeOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ExtensionRangeOptions.deserialize(bytes);
            }
        }
        protobuf.ExtensionRangeOptions = ExtensionRangeOptions;
        class FieldDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    if ("number" in data && data.number != undefined) {
                        this.number = data.number;
                    }
                    if ("label" in data && data.label != undefined) {
                        this.label = data.label;
                    }
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("type_name" in data && data.type_name != undefined) {
                        this.type_name = data.type_name;
                    }
                    if ("extendee" in data && data.extendee != undefined) {
                        this.extendee = data.extendee;
                    }
                    if ("default_value" in data && data.default_value != undefined) {
                        this.default_value = data.default_value;
                    }
                    if ("oneof_index" in data && data.oneof_index != undefined) {
                        this.oneof_index = data.oneof_index;
                    }
                    if ("json_name" in data && data.json_name != undefined) {
                        this.json_name = data.json_name;
                    }
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                    if ("proto3_optional" in data && data.proto3_optional != undefined) {
                        this.proto3_optional = data.proto3_optional;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get number() {
                return pb_1.Message.getField(this, 3);
            }
            set number(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get label() {
                return pb_1.Message.getField(this, 4);
            }
            set label(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get type() {
                return pb_1.Message.getField(this, 5);
            }
            set type(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get type_name() {
                return pb_1.Message.getField(this, 6);
            }
            set type_name(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get extendee() {
                return pb_1.Message.getField(this, 2);
            }
            set extendee(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get default_value() {
                return pb_1.Message.getField(this, 7);
            }
            set default_value(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get oneof_index() {
                return pb_1.Message.getField(this, 9);
            }
            set oneof_index(value) {
                pb_1.Message.setField(this, 9, value);
            }
            get json_name() {
                return pb_1.Message.getField(this, 10);
            }
            set json_name(value) {
                pb_1.Message.setField(this, 10, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, FieldOptions, 8);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 8, value);
            }
            get proto3_optional() {
                return pb_1.Message.getField(this, 17);
            }
            set proto3_optional(value) {
                pb_1.Message.setField(this, 17, value);
            }
            static fromObject(data) {
                const message = new FieldDescriptorProto({});
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.number != null) {
                    message.number = data.number;
                }
                if (data.label != null) {
                    message.label = data.label;
                }
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.type_name != null) {
                    message.type_name = data.type_name;
                }
                if (data.extendee != null) {
                    message.extendee = data.extendee;
                }
                if (data.default_value != null) {
                    message.default_value = data.default_value;
                }
                if (data.oneof_index != null) {
                    message.oneof_index = data.oneof_index;
                }
                if (data.json_name != null) {
                    message.json_name = data.json_name;
                }
                if (data.options != null) {
                    message.options = FieldOptions.fromObject(data.options);
                }
                if (data.proto3_optional != null) {
                    message.proto3_optional = data.proto3_optional;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.number != null) {
                    data.number = this.number;
                }
                if (this.label != null) {
                    data.label = this.label;
                }
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.type_name != null) {
                    data.type_name = this.type_name;
                }
                if (this.extendee != null) {
                    data.extendee = this.extendee;
                }
                if (this.default_value != null) {
                    data.default_value = this.default_value;
                }
                if (this.oneof_index != null) {
                    data.oneof_index = this.oneof_index;
                }
                if (this.json_name != null) {
                    data.json_name = this.json_name;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                if (this.proto3_optional != null) {
                    data.proto3_optional = this.proto3_optional;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.number !== undefined)
                    writer.writeInt32(3, this.number);
                if (this.label !== undefined)
                    writer.writeEnum(4, this.label);
                if (this.type !== undefined)
                    writer.writeEnum(5, this.type);
                if (typeof this.type_name === "string" && this.type_name.length)
                    writer.writeString(6, this.type_name);
                if (typeof this.extendee === "string" && this.extendee.length)
                    writer.writeString(2, this.extendee);
                if (typeof this.default_value === "string" && this.default_value.length)
                    writer.writeString(7, this.default_value);
                if (this.oneof_index !== undefined)
                    writer.writeInt32(9, this.oneof_index);
                if (typeof this.json_name === "string" && this.json_name.length)
                    writer.writeString(10, this.json_name);
                if (this.options !== undefined)
                    writer.writeMessage(8, this.options, () => this.options.serialize(writer));
                if (this.proto3_optional !== undefined)
                    writer.writeBool(17, this.proto3_optional);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FieldDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 3:
                            message.number = reader.readInt32();
                            break;
                        case 4:
                            message.label = reader.readEnum();
                            break;
                        case 5:
                            message.type = reader.readEnum();
                            break;
                        case 6:
                            message.type_name = reader.readString();
                            break;
                        case 2:
                            message.extendee = reader.readString();
                            break;
                        case 7:
                            message.default_value = reader.readString();
                            break;
                        case 9:
                            message.oneof_index = reader.readInt32();
                            break;
                        case 10:
                            message.json_name = reader.readString();
                            break;
                        case 8:
                            reader.readMessage(message.options, () => message.options = FieldOptions.deserialize(reader));
                            break;
                        case 17:
                            message.proto3_optional = reader.readBool();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return FieldDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.FieldDescriptorProto = FieldDescriptorProto;
        (function (FieldDescriptorProto) {
            let Type;
            (function (Type) {
                Type[Type["TYPE_DOUBLE"] = 1] = "TYPE_DOUBLE";
                Type[Type["TYPE_FLOAT"] = 2] = "TYPE_FLOAT";
                Type[Type["TYPE_INT64"] = 3] = "TYPE_INT64";
                Type[Type["TYPE_UINT64"] = 4] = "TYPE_UINT64";
                Type[Type["TYPE_INT32"] = 5] = "TYPE_INT32";
                Type[Type["TYPE_FIXED64"] = 6] = "TYPE_FIXED64";
                Type[Type["TYPE_FIXED32"] = 7] = "TYPE_FIXED32";
                Type[Type["TYPE_BOOL"] = 8] = "TYPE_BOOL";
                Type[Type["TYPE_STRING"] = 9] = "TYPE_STRING";
                Type[Type["TYPE_GROUP"] = 10] = "TYPE_GROUP";
                Type[Type["TYPE_MESSAGE"] = 11] = "TYPE_MESSAGE";
                Type[Type["TYPE_BYTES"] = 12] = "TYPE_BYTES";
                Type[Type["TYPE_UINT32"] = 13] = "TYPE_UINT32";
                Type[Type["TYPE_ENUM"] = 14] = "TYPE_ENUM";
                Type[Type["TYPE_SFIXED32"] = 15] = "TYPE_SFIXED32";
                Type[Type["TYPE_SFIXED64"] = 16] = "TYPE_SFIXED64";
                Type[Type["TYPE_SINT32"] = 17] = "TYPE_SINT32";
                Type[Type["TYPE_SINT64"] = 18] = "TYPE_SINT64";
            })(Type = FieldDescriptorProto.Type || (FieldDescriptorProto.Type = {}));
            let Label;
            (function (Label) {
                Label[Label["LABEL_OPTIONAL"] = 1] = "LABEL_OPTIONAL";
                Label[Label["LABEL_REQUIRED"] = 2] = "LABEL_REQUIRED";
                Label[Label["LABEL_REPEATED"] = 3] = "LABEL_REPEATED";
            })(Label = FieldDescriptorProto.Label || (FieldDescriptorProto.Label = {}));
        })(FieldDescriptorProto = protobuf.FieldDescriptorProto || (protobuf.FieldDescriptorProto = {}));
        class OneofDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, OneofOptions, 2);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new OneofDescriptorProto({});
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.options != null) {
                    message.options = OneofOptions.fromObject(data.options);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.options !== undefined)
                    writer.writeMessage(2, this.options, () => this.options.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OneofDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            reader.readMessage(message.options, () => message.options = OneofOptions.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return OneofDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.OneofDescriptorProto = OneofDescriptorProto;
        class EnumDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 4, 5], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    this.value = data.value;
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                    this.reserved_range = data.reserved_range;
                    this.reserved_name = data.reserved_name;
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get value() {
                return pb_1.Message.getRepeatedWrapperField(this, EnumValueDescriptorProto, 2);
            }
            set value(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, EnumOptions, 3);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get reserved_range() {
                return pb_1.Message.getRepeatedWrapperField(this, EnumDescriptorProto.EnumReservedRange, 4);
            }
            set reserved_range(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            get reserved_name() {
                return pb_1.Message.getField(this, 5);
            }
            set reserved_name(value) {
                pb_1.Message.setField(this, 5, value);
            }
            static fromObject(data) {
                const message = new EnumDescriptorProto({
                    value: data.value.map(item => EnumValueDescriptorProto.fromObject(item)),
                    reserved_range: data.reserved_range.map(item => EnumDescriptorProto.EnumReservedRange.fromObject(item)),
                    reserved_name: data.reserved_name
                });
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.options != null) {
                    message.options = EnumOptions.fromObject(data.options);
                }
                return message;
            }
            toObject() {
                const data = {
                    value: this.value.map((item) => item.toObject()),
                    reserved_range: this.reserved_range.map((item) => item.toObject()),
                    reserved_name: this.reserved_name
                };
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.value !== undefined)
                    writer.writeRepeatedMessage(2, this.value, (item) => item.serialize(writer));
                if (this.options !== undefined)
                    writer.writeMessage(3, this.options, () => this.options.serialize(writer));
                if (this.reserved_range !== undefined)
                    writer.writeRepeatedMessage(4, this.reserved_range, (item) => item.serialize(writer));
                if (this.reserved_name !== undefined)
                    writer.writeRepeatedString(5, this.reserved_name);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EnumDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            reader.readMessage(message.value, () => pb_1.Message.addToRepeatedWrapperField(message, 2, EnumValueDescriptorProto.deserialize(reader), EnumValueDescriptorProto));
                            break;
                        case 3:
                            reader.readMessage(message.options, () => message.options = EnumOptions.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.reserved_range, () => pb_1.Message.addToRepeatedWrapperField(message, 4, EnumDescriptorProto.EnumReservedRange.deserialize(reader), EnumDescriptorProto.EnumReservedRange));
                            break;
                        case 5:
                            pb_1.Message.addToRepeatedField(message, 5, reader.readString());
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return EnumDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.EnumDescriptorProto = EnumDescriptorProto;
        (function (EnumDescriptorProto) {
            class EnumReservedRange extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("start" in data && data.start != undefined) {
                            this.start = data.start;
                        }
                        if ("end" in data && data.end != undefined) {
                            this.end = data.end;
                        }
                    }
                }
                get start() {
                    return pb_1.Message.getField(this, 1);
                }
                set start(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get end() {
                    return pb_1.Message.getField(this, 2);
                }
                set end(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new EnumReservedRange({});
                    if (data.start != null) {
                        message.start = data.start;
                    }
                    if (data.end != null) {
                        message.end = data.end;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.start != null) {
                        data.start = this.start;
                    }
                    if (this.end != null) {
                        data.end = this.end;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.start !== undefined)
                        writer.writeInt32(1, this.start);
                    if (this.end !== undefined)
                        writer.writeInt32(2, this.end);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EnumReservedRange();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.start = reader.readInt32();
                                break;
                            case 2:
                                message.end = reader.readInt32();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return EnumReservedRange.deserialize(bytes);
                }
            }
            EnumDescriptorProto.EnumReservedRange = EnumReservedRange;
        })(EnumDescriptorProto = protobuf.EnumDescriptorProto || (protobuf.EnumDescriptorProto = {}));
        class EnumValueDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    if ("number" in data && data.number != undefined) {
                        this.number = data.number;
                    }
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get number() {
                return pb_1.Message.getField(this, 2);
            }
            set number(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, EnumValueOptions, 3);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new EnumValueDescriptorProto({});
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.number != null) {
                    message.number = data.number;
                }
                if (data.options != null) {
                    message.options = EnumValueOptions.fromObject(data.options);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.number != null) {
                    data.number = this.number;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.number !== undefined)
                    writer.writeInt32(2, this.number);
                if (this.options !== undefined)
                    writer.writeMessage(3, this.options, () => this.options.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EnumValueDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            message.number = reader.readInt32();
                            break;
                        case 3:
                            reader.readMessage(message.options, () => message.options = EnumValueOptions.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return EnumValueDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.EnumValueDescriptorProto = EnumValueDescriptorProto;
        class ServiceDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    this.method = data.method;
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get method() {
                return pb_1.Message.getRepeatedWrapperField(this, MethodDescriptorProto, 2);
            }
            set method(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, ServiceOptions, 3);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ServiceDescriptorProto({
                    method: data.method.map(item => MethodDescriptorProto.fromObject(item))
                });
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.options != null) {
                    message.options = ServiceOptions.fromObject(data.options);
                }
                return message;
            }
            toObject() {
                const data = {
                    method: this.method.map((item) => item.toObject())
                };
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (this.method !== undefined)
                    writer.writeRepeatedMessage(2, this.method, (item) => item.serialize(writer));
                if (this.options !== undefined)
                    writer.writeMessage(3, this.options, () => this.options.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ServiceDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            reader.readMessage(message.method, () => pb_1.Message.addToRepeatedWrapperField(message, 2, MethodDescriptorProto.deserialize(reader), MethodDescriptorProto));
                            break;
                        case 3:
                            reader.readMessage(message.options, () => message.options = ServiceOptions.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ServiceDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.ServiceDescriptorProto = ServiceDescriptorProto;
        class MethodDescriptorProto extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("name" in data && data.name != undefined) {
                        this.name = data.name;
                    }
                    if ("input_type" in data && data.input_type != undefined) {
                        this.input_type = data.input_type;
                    }
                    if ("output_type" in data && data.output_type != undefined) {
                        this.output_type = data.output_type;
                    }
                    if ("options" in data && data.options != undefined) {
                        this.options = data.options;
                    }
                    if ("client_streaming" in data && data.client_streaming != undefined) {
                        this.client_streaming = data.client_streaming;
                    }
                    if ("server_streaming" in data && data.server_streaming != undefined) {
                        this.server_streaming = data.server_streaming;
                    }
                }
            }
            get name() {
                return pb_1.Message.getField(this, 1);
            }
            set name(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get input_type() {
                return pb_1.Message.getField(this, 2);
            }
            set input_type(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get output_type() {
                return pb_1.Message.getField(this, 3);
            }
            set output_type(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get options() {
                return pb_1.Message.getWrapperField(this, MethodOptions, 4);
            }
            set options(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            get client_streaming() {
                return pb_1.Message.getFieldWithDefault(this, 5, false);
            }
            set client_streaming(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get server_streaming() {
                return pb_1.Message.getFieldWithDefault(this, 6, false);
            }
            set server_streaming(value) {
                pb_1.Message.setField(this, 6, value);
            }
            static fromObject(data) {
                const message = new MethodDescriptorProto({});
                if (data.name != null) {
                    message.name = data.name;
                }
                if (data.input_type != null) {
                    message.input_type = data.input_type;
                }
                if (data.output_type != null) {
                    message.output_type = data.output_type;
                }
                if (data.options != null) {
                    message.options = MethodOptions.fromObject(data.options);
                }
                if (data.client_streaming != null) {
                    message.client_streaming = data.client_streaming;
                }
                if (data.server_streaming != null) {
                    message.server_streaming = data.server_streaming;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.name != null) {
                    data.name = this.name;
                }
                if (this.input_type != null) {
                    data.input_type = this.input_type;
                }
                if (this.output_type != null) {
                    data.output_type = this.output_type;
                }
                if (this.options != null) {
                    data.options = this.options.toObject();
                }
                if (this.client_streaming != null) {
                    data.client_streaming = this.client_streaming;
                }
                if (this.server_streaming != null) {
                    data.server_streaming = this.server_streaming;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.name === "string" && this.name.length)
                    writer.writeString(1, this.name);
                if (typeof this.input_type === "string" && this.input_type.length)
                    writer.writeString(2, this.input_type);
                if (typeof this.output_type === "string" && this.output_type.length)
                    writer.writeString(3, this.output_type);
                if (this.options !== undefined)
                    writer.writeMessage(4, this.options, () => this.options.serialize(writer));
                if (this.client_streaming !== undefined)
                    writer.writeBool(5, this.client_streaming);
                if (this.server_streaming !== undefined)
                    writer.writeBool(6, this.server_streaming);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MethodDescriptorProto();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.name = reader.readString();
                            break;
                        case 2:
                            message.input_type = reader.readString();
                            break;
                        case 3:
                            message.output_type = reader.readString();
                            break;
                        case 4:
                            reader.readMessage(message.options, () => message.options = MethodOptions.deserialize(reader));
                            break;
                        case 5:
                            message.client_streaming = reader.readBool();
                            break;
                        case 6:
                            message.server_streaming = reader.readBool();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return MethodDescriptorProto.deserialize(bytes);
            }
        }
        protobuf.MethodDescriptorProto = MethodDescriptorProto;
        class FileOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("java_package" in data && data.java_package != undefined) {
                        this.java_package = data.java_package;
                    }
                    if ("java_outer_classname" in data && data.java_outer_classname != undefined) {
                        this.java_outer_classname = data.java_outer_classname;
                    }
                    if ("java_multiple_files" in data && data.java_multiple_files != undefined) {
                        this.java_multiple_files = data.java_multiple_files;
                    }
                    if ("java_generate_equals_and_hash" in data && data.java_generate_equals_and_hash != undefined) {
                        this.java_generate_equals_and_hash = data.java_generate_equals_and_hash;
                    }
                    if ("java_string_check_utf8" in data && data.java_string_check_utf8 != undefined) {
                        this.java_string_check_utf8 = data.java_string_check_utf8;
                    }
                    if ("optimize_for" in data && data.optimize_for != undefined) {
                        this.optimize_for = data.optimize_for;
                    }
                    if ("go_package" in data && data.go_package != undefined) {
                        this.go_package = data.go_package;
                    }
                    if ("cc_generic_services" in data && data.cc_generic_services != undefined) {
                        this.cc_generic_services = data.cc_generic_services;
                    }
                    if ("java_generic_services" in data && data.java_generic_services != undefined) {
                        this.java_generic_services = data.java_generic_services;
                    }
                    if ("py_generic_services" in data && data.py_generic_services != undefined) {
                        this.py_generic_services = data.py_generic_services;
                    }
                    if ("php_generic_services" in data && data.php_generic_services != undefined) {
                        this.php_generic_services = data.php_generic_services;
                    }
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    if ("cc_enable_arenas" in data && data.cc_enable_arenas != undefined) {
                        this.cc_enable_arenas = data.cc_enable_arenas;
                    }
                    if ("objc_class_prefix" in data && data.objc_class_prefix != undefined) {
                        this.objc_class_prefix = data.objc_class_prefix;
                    }
                    if ("csharp_namespace" in data && data.csharp_namespace != undefined) {
                        this.csharp_namespace = data.csharp_namespace;
                    }
                    if ("swift_prefix" in data && data.swift_prefix != undefined) {
                        this.swift_prefix = data.swift_prefix;
                    }
                    if ("php_class_prefix" in data && data.php_class_prefix != undefined) {
                        this.php_class_prefix = data.php_class_prefix;
                    }
                    if ("php_namespace" in data && data.php_namespace != undefined) {
                        this.php_namespace = data.php_namespace;
                    }
                    if ("php_metadata_namespace" in data && data.php_metadata_namespace != undefined) {
                        this.php_metadata_namespace = data.php_metadata_namespace;
                    }
                    if ("ruby_package" in data && data.ruby_package != undefined) {
                        this.ruby_package = data.ruby_package;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get java_package() {
                return pb_1.Message.getField(this, 1);
            }
            set java_package(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get java_outer_classname() {
                return pb_1.Message.getField(this, 8);
            }
            set java_outer_classname(value) {
                pb_1.Message.setField(this, 8, value);
            }
            get java_multiple_files() {
                return pb_1.Message.getFieldWithDefault(this, 10, false);
            }
            set java_multiple_files(value) {
                pb_1.Message.setField(this, 10, value);
            }
            get java_generate_equals_and_hash() {
                return pb_1.Message.getField(this, 20);
            }
            set java_generate_equals_and_hash(value) {
                pb_1.Message.setField(this, 20, value);
            }
            get java_string_check_utf8() {
                return pb_1.Message.getFieldWithDefault(this, 27, false);
            }
            set java_string_check_utf8(value) {
                pb_1.Message.setField(this, 27, value);
            }
            get optimize_for() {
                return pb_1.Message.getFieldWithDefault(this, 9, FileOptions.OptimizeMode.SPEED);
            }
            set optimize_for(value) {
                pb_1.Message.setField(this, 9, value);
            }
            get go_package() {
                return pb_1.Message.getField(this, 11);
            }
            set go_package(value) {
                pb_1.Message.setField(this, 11, value);
            }
            get cc_generic_services() {
                return pb_1.Message.getFieldWithDefault(this, 16, false);
            }
            set cc_generic_services(value) {
                pb_1.Message.setField(this, 16, value);
            }
            get java_generic_services() {
                return pb_1.Message.getFieldWithDefault(this, 17, false);
            }
            set java_generic_services(value) {
                pb_1.Message.setField(this, 17, value);
            }
            get py_generic_services() {
                return pb_1.Message.getFieldWithDefault(this, 18, false);
            }
            set py_generic_services(value) {
                pb_1.Message.setField(this, 18, value);
            }
            get php_generic_services() {
                return pb_1.Message.getFieldWithDefault(this, 42, false);
            }
            set php_generic_services(value) {
                pb_1.Message.setField(this, 42, value);
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 23, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 23, value);
            }
            get cc_enable_arenas() {
                return pb_1.Message.getFieldWithDefault(this, 31, true);
            }
            set cc_enable_arenas(value) {
                pb_1.Message.setField(this, 31, value);
            }
            get objc_class_prefix() {
                return pb_1.Message.getField(this, 36);
            }
            set objc_class_prefix(value) {
                pb_1.Message.setField(this, 36, value);
            }
            get csharp_namespace() {
                return pb_1.Message.getField(this, 37);
            }
            set csharp_namespace(value) {
                pb_1.Message.setField(this, 37, value);
            }
            get swift_prefix() {
                return pb_1.Message.getField(this, 39);
            }
            set swift_prefix(value) {
                pb_1.Message.setField(this, 39, value);
            }
            get php_class_prefix() {
                return pb_1.Message.getField(this, 40);
            }
            set php_class_prefix(value) {
                pb_1.Message.setField(this, 40, value);
            }
            get php_namespace() {
                return pb_1.Message.getField(this, 41);
            }
            set php_namespace(value) {
                pb_1.Message.setField(this, 41, value);
            }
            get php_metadata_namespace() {
                return pb_1.Message.getField(this, 44);
            }
            set php_metadata_namespace(value) {
                pb_1.Message.setField(this, 44, value);
            }
            get ruby_package() {
                return pb_1.Message.getField(this, 45);
            }
            set ruby_package(value) {
                pb_1.Message.setField(this, 45, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new FileOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.java_package != null) {
                    message.java_package = data.java_package;
                }
                if (data.java_outer_classname != null) {
                    message.java_outer_classname = data.java_outer_classname;
                }
                if (data.java_multiple_files != null) {
                    message.java_multiple_files = data.java_multiple_files;
                }
                if (data.java_generate_equals_and_hash != null) {
                    message.java_generate_equals_and_hash = data.java_generate_equals_and_hash;
                }
                if (data.java_string_check_utf8 != null) {
                    message.java_string_check_utf8 = data.java_string_check_utf8;
                }
                if (data.optimize_for != null) {
                    message.optimize_for = data.optimize_for;
                }
                if (data.go_package != null) {
                    message.go_package = data.go_package;
                }
                if (data.cc_generic_services != null) {
                    message.cc_generic_services = data.cc_generic_services;
                }
                if (data.java_generic_services != null) {
                    message.java_generic_services = data.java_generic_services;
                }
                if (data.py_generic_services != null) {
                    message.py_generic_services = data.py_generic_services;
                }
                if (data.php_generic_services != null) {
                    message.php_generic_services = data.php_generic_services;
                }
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                if (data.cc_enable_arenas != null) {
                    message.cc_enable_arenas = data.cc_enable_arenas;
                }
                if (data.objc_class_prefix != null) {
                    message.objc_class_prefix = data.objc_class_prefix;
                }
                if (data.csharp_namespace != null) {
                    message.csharp_namespace = data.csharp_namespace;
                }
                if (data.swift_prefix != null) {
                    message.swift_prefix = data.swift_prefix;
                }
                if (data.php_class_prefix != null) {
                    message.php_class_prefix = data.php_class_prefix;
                }
                if (data.php_namespace != null) {
                    message.php_namespace = data.php_namespace;
                }
                if (data.php_metadata_namespace != null) {
                    message.php_metadata_namespace = data.php_metadata_namespace;
                }
                if (data.ruby_package != null) {
                    message.ruby_package = data.ruby_package;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.java_package != null) {
                    data.java_package = this.java_package;
                }
                if (this.java_outer_classname != null) {
                    data.java_outer_classname = this.java_outer_classname;
                }
                if (this.java_multiple_files != null) {
                    data.java_multiple_files = this.java_multiple_files;
                }
                if (this.java_generate_equals_and_hash != null) {
                    data.java_generate_equals_and_hash = this.java_generate_equals_and_hash;
                }
                if (this.java_string_check_utf8 != null) {
                    data.java_string_check_utf8 = this.java_string_check_utf8;
                }
                if (this.optimize_for != null) {
                    data.optimize_for = this.optimize_for;
                }
                if (this.go_package != null) {
                    data.go_package = this.go_package;
                }
                if (this.cc_generic_services != null) {
                    data.cc_generic_services = this.cc_generic_services;
                }
                if (this.java_generic_services != null) {
                    data.java_generic_services = this.java_generic_services;
                }
                if (this.py_generic_services != null) {
                    data.py_generic_services = this.py_generic_services;
                }
                if (this.php_generic_services != null) {
                    data.php_generic_services = this.php_generic_services;
                }
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                if (this.cc_enable_arenas != null) {
                    data.cc_enable_arenas = this.cc_enable_arenas;
                }
                if (this.objc_class_prefix != null) {
                    data.objc_class_prefix = this.objc_class_prefix;
                }
                if (this.csharp_namespace != null) {
                    data.csharp_namespace = this.csharp_namespace;
                }
                if (this.swift_prefix != null) {
                    data.swift_prefix = this.swift_prefix;
                }
                if (this.php_class_prefix != null) {
                    data.php_class_prefix = this.php_class_prefix;
                }
                if (this.php_namespace != null) {
                    data.php_namespace = this.php_namespace;
                }
                if (this.php_metadata_namespace != null) {
                    data.php_metadata_namespace = this.php_metadata_namespace;
                }
                if (this.ruby_package != null) {
                    data.ruby_package = this.ruby_package;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.java_package === "string" && this.java_package.length)
                    writer.writeString(1, this.java_package);
                if (typeof this.java_outer_classname === "string" && this.java_outer_classname.length)
                    writer.writeString(8, this.java_outer_classname);
                if (this.java_multiple_files !== undefined)
                    writer.writeBool(10, this.java_multiple_files);
                if (this.java_generate_equals_and_hash !== undefined)
                    writer.writeBool(20, this.java_generate_equals_and_hash);
                if (this.java_string_check_utf8 !== undefined)
                    writer.writeBool(27, this.java_string_check_utf8);
                if (this.optimize_for !== undefined)
                    writer.writeEnum(9, this.optimize_for);
                if (typeof this.go_package === "string" && this.go_package.length)
                    writer.writeString(11, this.go_package);
                if (this.cc_generic_services !== undefined)
                    writer.writeBool(16, this.cc_generic_services);
                if (this.java_generic_services !== undefined)
                    writer.writeBool(17, this.java_generic_services);
                if (this.py_generic_services !== undefined)
                    writer.writeBool(18, this.py_generic_services);
                if (this.php_generic_services !== undefined)
                    writer.writeBool(42, this.php_generic_services);
                if (this.deprecated !== undefined)
                    writer.writeBool(23, this.deprecated);
                if (this.cc_enable_arenas !== undefined)
                    writer.writeBool(31, this.cc_enable_arenas);
                if (typeof this.objc_class_prefix === "string" && this.objc_class_prefix.length)
                    writer.writeString(36, this.objc_class_prefix);
                if (typeof this.csharp_namespace === "string" && this.csharp_namespace.length)
                    writer.writeString(37, this.csharp_namespace);
                if (typeof this.swift_prefix === "string" && this.swift_prefix.length)
                    writer.writeString(39, this.swift_prefix);
                if (typeof this.php_class_prefix === "string" && this.php_class_prefix.length)
                    writer.writeString(40, this.php_class_prefix);
                if (typeof this.php_namespace === "string" && this.php_namespace.length)
                    writer.writeString(41, this.php_namespace);
                if (typeof this.php_metadata_namespace === "string" && this.php_metadata_namespace.length)
                    writer.writeString(44, this.php_metadata_namespace);
                if (typeof this.ruby_package === "string" && this.ruby_package.length)
                    writer.writeString(45, this.ruby_package);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FileOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.java_package = reader.readString();
                            break;
                        case 8:
                            message.java_outer_classname = reader.readString();
                            break;
                        case 10:
                            message.java_multiple_files = reader.readBool();
                            break;
                        case 20:
                            message.java_generate_equals_and_hash = reader.readBool();
                            break;
                        case 27:
                            message.java_string_check_utf8 = reader.readBool();
                            break;
                        case 9:
                            message.optimize_for = reader.readEnum();
                            break;
                        case 11:
                            message.go_package = reader.readString();
                            break;
                        case 16:
                            message.cc_generic_services = reader.readBool();
                            break;
                        case 17:
                            message.java_generic_services = reader.readBool();
                            break;
                        case 18:
                            message.py_generic_services = reader.readBool();
                            break;
                        case 42:
                            message.php_generic_services = reader.readBool();
                            break;
                        case 23:
                            message.deprecated = reader.readBool();
                            break;
                        case 31:
                            message.cc_enable_arenas = reader.readBool();
                            break;
                        case 36:
                            message.objc_class_prefix = reader.readString();
                            break;
                        case 37:
                            message.csharp_namespace = reader.readString();
                            break;
                        case 39:
                            message.swift_prefix = reader.readString();
                            break;
                        case 40:
                            message.php_class_prefix = reader.readString();
                            break;
                        case 41:
                            message.php_namespace = reader.readString();
                            break;
                        case 44:
                            message.php_metadata_namespace = reader.readString();
                            break;
                        case 45:
                            message.ruby_package = reader.readString();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return FileOptions.deserialize(bytes);
            }
        }
        protobuf.FileOptions = FileOptions;
        (function (FileOptions) {
            let OptimizeMode;
            (function (OptimizeMode) {
                OptimizeMode[OptimizeMode["SPEED"] = 1] = "SPEED";
                OptimizeMode[OptimizeMode["CODE_SIZE"] = 2] = "CODE_SIZE";
                OptimizeMode[OptimizeMode["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
            })(OptimizeMode = FileOptions.OptimizeMode || (FileOptions.OptimizeMode = {}));
        })(FileOptions = protobuf.FileOptions || (protobuf.FileOptions = {}));
        class MessageOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("message_set_wire_format" in data && data.message_set_wire_format != undefined) {
                        this.message_set_wire_format = data.message_set_wire_format;
                    }
                    if ("no_standard_descriptor_accessor" in data && data.no_standard_descriptor_accessor != undefined) {
                        this.no_standard_descriptor_accessor = data.no_standard_descriptor_accessor;
                    }
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    if ("map_entry" in data && data.map_entry != undefined) {
                        this.map_entry = data.map_entry;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get message_set_wire_format() {
                return pb_1.Message.getFieldWithDefault(this, 1, false);
            }
            set message_set_wire_format(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get no_standard_descriptor_accessor() {
                return pb_1.Message.getFieldWithDefault(this, 2, false);
            }
            set no_standard_descriptor_accessor(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 3, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get map_entry() {
                return pb_1.Message.getField(this, 7);
            }
            set map_entry(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new MessageOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.message_set_wire_format != null) {
                    message.message_set_wire_format = data.message_set_wire_format;
                }
                if (data.no_standard_descriptor_accessor != null) {
                    message.no_standard_descriptor_accessor = data.no_standard_descriptor_accessor;
                }
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                if (data.map_entry != null) {
                    message.map_entry = data.map_entry;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.message_set_wire_format != null) {
                    data.message_set_wire_format = this.message_set_wire_format;
                }
                if (this.no_standard_descriptor_accessor != null) {
                    data.no_standard_descriptor_accessor = this.no_standard_descriptor_accessor;
                }
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                if (this.map_entry != null) {
                    data.map_entry = this.map_entry;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.message_set_wire_format !== undefined)
                    writer.writeBool(1, this.message_set_wire_format);
                if (this.no_standard_descriptor_accessor !== undefined)
                    writer.writeBool(2, this.no_standard_descriptor_accessor);
                if (this.deprecated !== undefined)
                    writer.writeBool(3, this.deprecated);
                if (this.map_entry !== undefined)
                    writer.writeBool(7, this.map_entry);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MessageOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.message_set_wire_format = reader.readBool();
                            break;
                        case 2:
                            message.no_standard_descriptor_accessor = reader.readBool();
                            break;
                        case 3:
                            message.deprecated = reader.readBool();
                            break;
                        case 7:
                            message.map_entry = reader.readBool();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return MessageOptions.deserialize(bytes);
            }
        }
        protobuf.MessageOptions = MessageOptions;
        class FieldOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("ctype" in data && data.ctype != undefined) {
                        this.ctype = data.ctype;
                    }
                    if ("packed" in data && data.packed != undefined) {
                        this.packed = data.packed;
                    }
                    if ("jstype" in data && data.jstype != undefined) {
                        this.jstype = data.jstype;
                    }
                    if ("lazy" in data && data.lazy != undefined) {
                        this.lazy = data.lazy;
                    }
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    if ("weak" in data && data.weak != undefined) {
                        this.weak = data.weak;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get ctype() {
                return pb_1.Message.getFieldWithDefault(this, 1, FieldOptions.CType.STRING);
            }
            set ctype(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get packed() {
                return pb_1.Message.getField(this, 2);
            }
            set packed(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get jstype() {
                return pb_1.Message.getFieldWithDefault(this, 6, FieldOptions.JSType.JS_NORMAL);
            }
            set jstype(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get lazy() {
                return pb_1.Message.getFieldWithDefault(this, 5, false);
            }
            set lazy(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 3, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get weak() {
                return pb_1.Message.getFieldWithDefault(this, 10, false);
            }
            set weak(value) {
                pb_1.Message.setField(this, 10, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new FieldOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.ctype != null) {
                    message.ctype = data.ctype;
                }
                if (data.packed != null) {
                    message.packed = data.packed;
                }
                if (data.jstype != null) {
                    message.jstype = data.jstype;
                }
                if (data.lazy != null) {
                    message.lazy = data.lazy;
                }
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                if (data.weak != null) {
                    message.weak = data.weak;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.ctype != null) {
                    data.ctype = this.ctype;
                }
                if (this.packed != null) {
                    data.packed = this.packed;
                }
                if (this.jstype != null) {
                    data.jstype = this.jstype;
                }
                if (this.lazy != null) {
                    data.lazy = this.lazy;
                }
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                if (this.weak != null) {
                    data.weak = this.weak;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.ctype !== undefined)
                    writer.writeEnum(1, this.ctype);
                if (this.packed !== undefined)
                    writer.writeBool(2, this.packed);
                if (this.jstype !== undefined)
                    writer.writeEnum(6, this.jstype);
                if (this.lazy !== undefined)
                    writer.writeBool(5, this.lazy);
                if (this.deprecated !== undefined)
                    writer.writeBool(3, this.deprecated);
                if (this.weak !== undefined)
                    writer.writeBool(10, this.weak);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FieldOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.ctype = reader.readEnum();
                            break;
                        case 2:
                            message.packed = reader.readBool();
                            break;
                        case 6:
                            message.jstype = reader.readEnum();
                            break;
                        case 5:
                            message.lazy = reader.readBool();
                            break;
                        case 3:
                            message.deprecated = reader.readBool();
                            break;
                        case 10:
                            message.weak = reader.readBool();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return FieldOptions.deserialize(bytes);
            }
        }
        protobuf.FieldOptions = FieldOptions;
        (function (FieldOptions) {
            let CType;
            (function (CType) {
                CType[CType["STRING"] = 0] = "STRING";
                CType[CType["CORD"] = 1] = "CORD";
                CType[CType["STRING_PIECE"] = 2] = "STRING_PIECE";
            })(CType = FieldOptions.CType || (FieldOptions.CType = {}));
            let JSType;
            (function (JSType) {
                JSType[JSType["JS_NORMAL"] = 0] = "JS_NORMAL";
                JSType[JSType["JS_STRING"] = 1] = "JS_STRING";
                JSType[JSType["JS_NUMBER"] = 2] = "JS_NUMBER";
            })(JSType = FieldOptions.JSType || (FieldOptions.JSType = {}));
        })(FieldOptions = protobuf.FieldOptions || (protobuf.FieldOptions = {}));
        class OneofOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new OneofOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OneofOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return OneofOptions.deserialize(bytes);
            }
        }
        protobuf.OneofOptions = OneofOptions;
        class EnumOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("allow_alias" in data && data.allow_alias != undefined) {
                        this.allow_alias = data.allow_alias;
                    }
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get allow_alias() {
                return pb_1.Message.getField(this, 2);
            }
            set allow_alias(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 3, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new EnumOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.allow_alias != null) {
                    message.allow_alias = data.allow_alias;
                }
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.allow_alias != null) {
                    data.allow_alias = this.allow_alias;
                }
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.allow_alias !== undefined)
                    writer.writeBool(2, this.allow_alias);
                if (this.deprecated !== undefined)
                    writer.writeBool(3, this.deprecated);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EnumOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 2:
                            message.allow_alias = reader.readBool();
                            break;
                        case 3:
                            message.deprecated = reader.readBool();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return EnumOptions.deserialize(bytes);
            }
        }
        protobuf.EnumOptions = EnumOptions;
        class EnumValueOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 1, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new EnumValueOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.deprecated !== undefined)
                    writer.writeBool(1, this.deprecated);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EnumValueOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.deprecated = reader.readBool();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return EnumValueOptions.deserialize(bytes);
            }
        }
        protobuf.EnumValueOptions = EnumValueOptions;
        class ServiceOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 33, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 33, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new ServiceOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.deprecated !== undefined)
                    writer.writeBool(33, this.deprecated);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ServiceOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 33:
                            message.deprecated = reader.readBool();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ServiceOptions.deserialize(bytes);
            }
        }
        protobuf.ServiceOptions = ServiceOptions;
        class MethodOptions extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [999], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("deprecated" in data && data.deprecated != undefined) {
                        this.deprecated = data.deprecated;
                    }
                    if ("idempotency_level" in data && data.idempotency_level != undefined) {
                        this.idempotency_level = data.idempotency_level;
                    }
                    this.uninterpreted_option = data.uninterpreted_option;
                }
            }
            get deprecated() {
                return pb_1.Message.getFieldWithDefault(this, 33, false);
            }
            set deprecated(value) {
                pb_1.Message.setField(this, 33, value);
            }
            get idempotency_level() {
                return pb_1.Message.getFieldWithDefault(this, 34, MethodOptions.IdempotencyLevel.IDEMPOTENCY_UNKNOWN);
            }
            set idempotency_level(value) {
                pb_1.Message.setField(this, 34, value);
            }
            get uninterpreted_option() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption, 999);
            }
            set uninterpreted_option(value) {
                pb_1.Message.setRepeatedWrapperField(this, 999, value);
            }
            static fromObject(data) {
                const message = new MethodOptions({
                    uninterpreted_option: data.uninterpreted_option.map(item => UninterpretedOption.fromObject(item))
                });
                if (data.deprecated != null) {
                    message.deprecated = data.deprecated;
                }
                if (data.idempotency_level != null) {
                    message.idempotency_level = data.idempotency_level;
                }
                return message;
            }
            toObject() {
                const data = {
                    uninterpreted_option: this.uninterpreted_option.map((item) => item.toObject())
                };
                if (this.deprecated != null) {
                    data.deprecated = this.deprecated;
                }
                if (this.idempotency_level != null) {
                    data.idempotency_level = this.idempotency_level;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.deprecated !== undefined)
                    writer.writeBool(33, this.deprecated);
                if (this.idempotency_level !== undefined)
                    writer.writeEnum(34, this.idempotency_level);
                if (this.uninterpreted_option !== undefined)
                    writer.writeRepeatedMessage(999, this.uninterpreted_option, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MethodOptions();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 33:
                            message.deprecated = reader.readBool();
                            break;
                        case 34:
                            message.idempotency_level = reader.readEnum();
                            break;
                        case 999:
                            reader.readMessage(message.uninterpreted_option, () => pb_1.Message.addToRepeatedWrapperField(message, 999, UninterpretedOption.deserialize(reader), UninterpretedOption));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return MethodOptions.deserialize(bytes);
            }
        }
        protobuf.MethodOptions = MethodOptions;
        (function (MethodOptions) {
            let IdempotencyLevel;
            (function (IdempotencyLevel) {
                IdempotencyLevel[IdempotencyLevel["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
                IdempotencyLevel[IdempotencyLevel["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
                IdempotencyLevel[IdempotencyLevel["IDEMPOTENT"] = 2] = "IDEMPOTENT";
            })(IdempotencyLevel = MethodOptions.IdempotencyLevel || (MethodOptions.IdempotencyLevel = {}));
        })(MethodOptions = protobuf.MethodOptions || (protobuf.MethodOptions = {}));
        class UninterpretedOption extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.name = data.name;
                    if ("identifier_value" in data && data.identifier_value != undefined) {
                        this.identifier_value = data.identifier_value;
                    }
                    if ("positive_int_value" in data && data.positive_int_value != undefined) {
                        this.positive_int_value = data.positive_int_value;
                    }
                    if ("negative_int_value" in data && data.negative_int_value != undefined) {
                        this.negative_int_value = data.negative_int_value;
                    }
                    if ("double_value" in data && data.double_value != undefined) {
                        this.double_value = data.double_value;
                    }
                    if ("string_value" in data && data.string_value != undefined) {
                        this.string_value = data.string_value;
                    }
                    if ("aggregate_value" in data && data.aggregate_value != undefined) {
                        this.aggregate_value = data.aggregate_value;
                    }
                }
            }
            get name() {
                return pb_1.Message.getRepeatedWrapperField(this, UninterpretedOption.NamePart, 2);
            }
            set name(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            get identifier_value() {
                return pb_1.Message.getField(this, 3);
            }
            set identifier_value(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get positive_int_value() {
                return pb_1.Message.getField(this, 4);
            }
            set positive_int_value(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get negative_int_value() {
                return pb_1.Message.getField(this, 5);
            }
            set negative_int_value(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get double_value() {
                return pb_1.Message.getField(this, 6);
            }
            set double_value(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get string_value() {
                return pb_1.Message.getField(this, 7);
            }
            set string_value(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get aggregate_value() {
                return pb_1.Message.getField(this, 8);
            }
            set aggregate_value(value) {
                pb_1.Message.setField(this, 8, value);
            }
            static fromObject(data) {
                const message = new UninterpretedOption({
                    name: data.name.map(item => UninterpretedOption.NamePart.fromObject(item))
                });
                if (data.identifier_value != null) {
                    message.identifier_value = data.identifier_value;
                }
                if (data.positive_int_value != null) {
                    message.positive_int_value = data.positive_int_value;
                }
                if (data.negative_int_value != null) {
                    message.negative_int_value = data.negative_int_value;
                }
                if (data.double_value != null) {
                    message.double_value = data.double_value;
                }
                if (data.string_value != null) {
                    message.string_value = data.string_value;
                }
                if (data.aggregate_value != null) {
                    message.aggregate_value = data.aggregate_value;
                }
                return message;
            }
            toObject() {
                const data = {
                    name: this.name.map((item) => item.toObject())
                };
                if (this.identifier_value != null) {
                    data.identifier_value = this.identifier_value;
                }
                if (this.positive_int_value != null) {
                    data.positive_int_value = this.positive_int_value;
                }
                if (this.negative_int_value != null) {
                    data.negative_int_value = this.negative_int_value;
                }
                if (this.double_value != null) {
                    data.double_value = this.double_value;
                }
                if (this.string_value != null) {
                    data.string_value = this.string_value;
                }
                if (this.aggregate_value != null) {
                    data.aggregate_value = this.aggregate_value;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.name !== undefined)
                    writer.writeRepeatedMessage(2, this.name, (item) => item.serialize(writer));
                if (typeof this.identifier_value === "string" && this.identifier_value.length)
                    writer.writeString(3, this.identifier_value);
                if (this.positive_int_value !== undefined)
                    writer.writeUint64(4, this.positive_int_value);
                if (this.negative_int_value !== undefined)
                    writer.writeInt64(5, this.negative_int_value);
                if (this.double_value !== undefined)
                    writer.writeDouble(6, this.double_value);
                if (this.string_value !== undefined)
                    writer.writeBytes(7, this.string_value);
                if (typeof this.aggregate_value === "string" && this.aggregate_value.length)
                    writer.writeString(8, this.aggregate_value);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UninterpretedOption();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 2:
                            reader.readMessage(message.name, () => pb_1.Message.addToRepeatedWrapperField(message, 2, UninterpretedOption.NamePart.deserialize(reader), UninterpretedOption.NamePart));
                            break;
                        case 3:
                            message.identifier_value = reader.readString();
                            break;
                        case 4:
                            message.positive_int_value = reader.readUint64();
                            break;
                        case 5:
                            message.negative_int_value = reader.readInt64();
                            break;
                        case 6:
                            message.double_value = reader.readDouble();
                            break;
                        case 7:
                            message.string_value = reader.readBytes();
                            break;
                        case 8:
                            message.aggregate_value = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return UninterpretedOption.deserialize(bytes);
            }
        }
        protobuf.UninterpretedOption = UninterpretedOption;
        (function (UninterpretedOption) {
            class NamePart extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        this.name_part = data.name_part;
                        this.is_extension = data.is_extension;
                    }
                }
                get name_part() {
                    return pb_1.Message.getField(this, 1);
                }
                set name_part(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get is_extension() {
                    return pb_1.Message.getField(this, 2);
                }
                set is_extension(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new NamePart({
                        name_part: data.name_part,
                        is_extension: data.is_extension
                    });
                    return message;
                }
                toObject() {
                    const data = {
                        name_part: this.name_part,
                        is_extension: this.is_extension
                    };
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.name_part === "string" && this.name_part.length)
                        writer.writeString(1, this.name_part);
                    if (this.is_extension !== undefined)
                        writer.writeBool(2, this.is_extension);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NamePart();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.name_part = reader.readString();
                                break;
                            case 2:
                                message.is_extension = reader.readBool();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return NamePart.deserialize(bytes);
                }
            }
            UninterpretedOption.NamePart = NamePart;
        })(UninterpretedOption = protobuf.UninterpretedOption || (protobuf.UninterpretedOption = {}));
        class SourceCodeInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.location = data.location;
                }
            }
            get location() {
                return pb_1.Message.getRepeatedWrapperField(this, SourceCodeInfo.Location, 1);
            }
            set location(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new SourceCodeInfo({
                    location: data.location.map(item => SourceCodeInfo.Location.fromObject(item))
                });
                return message;
            }
            toObject() {
                const data = {
                    location: this.location.map((item) => item.toObject())
                };
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.location !== undefined)
                    writer.writeRepeatedMessage(1, this.location, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SourceCodeInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.location, () => pb_1.Message.addToRepeatedWrapperField(message, 1, SourceCodeInfo.Location.deserialize(reader), SourceCodeInfo.Location));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return SourceCodeInfo.deserialize(bytes);
            }
        }
        protobuf.SourceCodeInfo = SourceCodeInfo;
        (function (SourceCodeInfo) {
            class Location extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2, 6], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        this.path = data.path;
                        this.span = data.span;
                        if ("leading_comments" in data && data.leading_comments != undefined) {
                            this.leading_comments = data.leading_comments;
                        }
                        if ("trailing_comments" in data && data.trailing_comments != undefined) {
                            this.trailing_comments = data.trailing_comments;
                        }
                        this.leading_detached_comments = data.leading_detached_comments;
                    }
                }
                get path() {
                    return pb_1.Message.getField(this, 1);
                }
                set path(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get span() {
                    return pb_1.Message.getField(this, 2);
                }
                set span(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get leading_comments() {
                    return pb_1.Message.getField(this, 3);
                }
                set leading_comments(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get trailing_comments() {
                    return pb_1.Message.getField(this, 4);
                }
                set trailing_comments(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get leading_detached_comments() {
                    return pb_1.Message.getField(this, 6);
                }
                set leading_detached_comments(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new Location({
                        path: data.path,
                        span: data.span,
                        leading_detached_comments: data.leading_detached_comments
                    });
                    if (data.leading_comments != null) {
                        message.leading_comments = data.leading_comments;
                    }
                    if (data.trailing_comments != null) {
                        message.trailing_comments = data.trailing_comments;
                    }
                    return message;
                }
                toObject() {
                    const data = {
                        path: this.path,
                        span: this.span,
                        leading_detached_comments: this.leading_detached_comments
                    };
                    if (this.leading_comments != null) {
                        data.leading_comments = this.leading_comments;
                    }
                    if (this.trailing_comments != null) {
                        data.trailing_comments = this.trailing_comments;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.path !== undefined)
                        writer.writePackedInt32(1, this.path);
                    if (this.span !== undefined)
                        writer.writePackedInt32(2, this.span);
                    if (typeof this.leading_comments === "string" && this.leading_comments.length)
                        writer.writeString(3, this.leading_comments);
                    if (typeof this.trailing_comments === "string" && this.trailing_comments.length)
                        writer.writeString(4, this.trailing_comments);
                    if (this.leading_detached_comments !== undefined)
                        writer.writeRepeatedString(6, this.leading_detached_comments);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Location();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.path = reader.readPackedInt32();
                                break;
                            case 2:
                                message.span = reader.readPackedInt32();
                                break;
                            case 3:
                                message.leading_comments = reader.readString();
                                break;
                            case 4:
                                message.trailing_comments = reader.readString();
                                break;
                            case 6:
                                pb_1.Message.addToRepeatedField(message, 6, reader.readString());
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return Location.deserialize(bytes);
                }
            }
            SourceCodeInfo.Location = Location;
        })(SourceCodeInfo = protobuf.SourceCodeInfo || (protobuf.SourceCodeInfo = {}));
        class GeneratedCodeInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    this.annotation = data.annotation;
                }
            }
            get annotation() {
                return pb_1.Message.getRepeatedWrapperField(this, GeneratedCodeInfo.Annotation, 1);
            }
            set annotation(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new GeneratedCodeInfo({
                    annotation: data.annotation.map(item => GeneratedCodeInfo.Annotation.fromObject(item))
                });
                return message;
            }
            toObject() {
                const data = {
                    annotation: this.annotation.map((item) => item.toObject())
                };
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.annotation !== undefined)
                    writer.writeRepeatedMessage(1, this.annotation, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GeneratedCodeInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.annotation, () => pb_1.Message.addToRepeatedWrapperField(message, 1, GeneratedCodeInfo.Annotation.deserialize(reader), GeneratedCodeInfo.Annotation));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return GeneratedCodeInfo.deserialize(bytes);
            }
        }
        protobuf.GeneratedCodeInfo = GeneratedCodeInfo;
        (function (GeneratedCodeInfo) {
            class Annotation extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        this.path = data.path;
                        if ("source_file" in data && data.source_file != undefined) {
                            this.source_file = data.source_file;
                        }
                        if ("begin" in data && data.begin != undefined) {
                            this.begin = data.begin;
                        }
                        if ("end" in data && data.end != undefined) {
                            this.end = data.end;
                        }
                    }
                }
                get path() {
                    return pb_1.Message.getField(this, 1);
                }
                set path(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get source_file() {
                    return pb_1.Message.getField(this, 2);
                }
                set source_file(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get begin() {
                    return pb_1.Message.getField(this, 3);
                }
                set begin(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get end() {
                    return pb_1.Message.getField(this, 4);
                }
                set end(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Annotation({
                        path: data.path
                    });
                    if (data.source_file != null) {
                        message.source_file = data.source_file;
                    }
                    if (data.begin != null) {
                        message.begin = data.begin;
                    }
                    if (data.end != null) {
                        message.end = data.end;
                    }
                    return message;
                }
                toObject() {
                    const data = {
                        path: this.path
                    };
                    if (this.source_file != null) {
                        data.source_file = this.source_file;
                    }
                    if (this.begin != null) {
                        data.begin = this.begin;
                    }
                    if (this.end != null) {
                        data.end = this.end;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.path !== undefined)
                        writer.writePackedInt32(1, this.path);
                    if (typeof this.source_file === "string" && this.source_file.length)
                        writer.writeString(2, this.source_file);
                    if (this.begin !== undefined)
                        writer.writeInt32(3, this.begin);
                    if (this.end !== undefined)
                        writer.writeInt32(4, this.end);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Annotation();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.path = reader.readPackedInt32();
                                break;
                            case 2:
                                message.source_file = reader.readString();
                                break;
                            case 3:
                                message.begin = reader.readInt32();
                                break;
                            case 4:
                                message.end = reader.readInt32();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return Annotation.deserialize(bytes);
                }
            }
            GeneratedCodeInfo.Annotation = Annotation;
        })(GeneratedCodeInfo = protobuf.GeneratedCodeInfo || (protobuf.GeneratedCodeInfo = {}));
    })(protobuf = google.protobuf || (google.protobuf = {}));
})(google = exports.google || (exports.google = {}));
//# sourceMappingURL=descriptor.js.map