import * as $protobuf from "protobufjs";
/** Namespace ics23. */
export namespace ics23 {
  /** HashOp enum. */
  enum HashOp {
    NO_HASH = 0,
    SHA256 = 1,
    SHA512 = 2,
    KECCAK = 3,
    RIPEMD160 = 4,
    BITCOIN = 5,
    SHA512_256 = 6,
  }

  /**
   * LengthOp defines how to process the key and value of the LeafOp
   * to include length information. After encoding the length with the given
   * algorithm, the length will be prepended to the key and value bytes.
   * (Each one with it's own encoded length)
   */
  enum LengthOp {
    NO_PREFIX = 0,
    VAR_PROTO = 1,
    VAR_RLP = 2,
    FIXED32_BIG = 3,
    FIXED32_LITTLE = 4,
    FIXED64_BIG = 5,
    FIXED64_LITTLE = 6,
    REQUIRE_32_BYTES = 7,
    REQUIRE_64_BYTES = 8,
  }

  /** Properties of an ExistenceProof. */
  interface IExistenceProof {
    /** ExistenceProof key */
    key?: Uint8Array | null;

    /** ExistenceProof value */
    value?: Uint8Array | null;

    /** ExistenceProof leaf */
    leaf?: ics23.ILeafOp | null;

    /** ExistenceProof path */
    path?: ics23.IInnerOp[] | null;
  }

  /**
   * ExistenceProof takes a key and a value and a set of steps to perform on it.
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
   */
  class ExistenceProof implements IExistenceProof {
    /**
     * Constructs a new ExistenceProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IExistenceProof);

    /** ExistenceProof key. */
    public key: Uint8Array;

    /** ExistenceProof value. */
    public value: Uint8Array;

    /** ExistenceProof leaf. */
    public leaf?: ics23.ILeafOp | null;

    /** ExistenceProof path. */
    public path: ics23.IInnerOp[];

    /**
     * Creates a new ExistenceProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ExistenceProof instance
     */
    public static create(
      properties?: ics23.IExistenceProof
    ): ics23.ExistenceProof;

    /**
     * Encodes the specified ExistenceProof message. Does not implicitly {@link ics23.ExistenceProof.verify|verify} messages.
     * @param message ExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ExistenceProof message, length delimited. Does not implicitly {@link ics23.ExistenceProof.verify|verify} messages.
     * @param message ExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes an ExistenceProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.ExistenceProof;

    /**
     * Decodes an ExistenceProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.ExistenceProof;

    /**
     * Verifies an ExistenceProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an ExistenceProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ExistenceProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.ExistenceProof;

    /**
     * Creates a plain object from an ExistenceProof message. Also converts values to other types if specified.
     * @param message ExistenceProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.ExistenceProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ExistenceProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a NonExistenceProof. */
  interface INonExistenceProof {
    /** NonExistenceProof key */
    key?: Uint8Array | null;

    /** NonExistenceProof left */
    left?: ics23.IExistenceProof | null;

    /** NonExistenceProof right */
    right?: ics23.IExistenceProof | null;
  }

  /** Represents a NonExistenceProof. */
  class NonExistenceProof implements INonExistenceProof {
    /**
     * Constructs a new NonExistenceProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.INonExistenceProof);

    /** NonExistenceProof key. */
    public key: Uint8Array;

    /** NonExistenceProof left. */
    public left?: ics23.IExistenceProof | null;

    /** NonExistenceProof right. */
    public right?: ics23.IExistenceProof | null;

    /**
     * Creates a new NonExistenceProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NonExistenceProof instance
     */
    public static create(
      properties?: ics23.INonExistenceProof
    ): ics23.NonExistenceProof;

    /**
     * Encodes the specified NonExistenceProof message. Does not implicitly {@link ics23.NonExistenceProof.verify|verify} messages.
     * @param message NonExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.INonExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified NonExistenceProof message, length delimited. Does not implicitly {@link ics23.NonExistenceProof.verify|verify} messages.
     * @param message NonExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.INonExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a NonExistenceProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NonExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.NonExistenceProof;

    /**
     * Decodes a NonExistenceProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NonExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.NonExistenceProof;

    /**
     * Verifies a NonExistenceProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a NonExistenceProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NonExistenceProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.NonExistenceProof;

    /**
     * Creates a plain object from a NonExistenceProof message. Also converts values to other types if specified.
     * @param message NonExistenceProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.NonExistenceProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this NonExistenceProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a CommitmentProof. */
  interface ICommitmentProof {
    /** CommitmentProof exist */
    exist?: ics23.IExistenceProof | null;

    /** CommitmentProof nonexist */
    nonexist?: ics23.INonExistenceProof | null;

    /** CommitmentProof batch */
    batch?: ics23.IBatchProof | null;

    /** CommitmentProof compressed */
    compressed?: ics23.ICompressedBatchProof | null;
  }

  /** Represents a CommitmentProof. */
  class CommitmentProof implements ICommitmentProof {
    /**
     * Constructs a new CommitmentProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ICommitmentProof);

    /** CommitmentProof exist. */
    public exist?: ics23.IExistenceProof | null;

    /** CommitmentProof nonexist. */
    public nonexist?: ics23.INonExistenceProof | null;

    /** CommitmentProof batch. */
    public batch?: ics23.IBatchProof | null;

    /** CommitmentProof compressed. */
    public compressed?: ics23.ICompressedBatchProof | null;

    /** CommitmentProof proof. */
    public proof?: "exist" | "nonexist" | "batch" | "compressed";

    /**
     * Creates a new CommitmentProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CommitmentProof instance
     */
    public static create(
      properties?: ics23.ICommitmentProof
    ): ics23.CommitmentProof;

    /**
     * Encodes the specified CommitmentProof message. Does not implicitly {@link ics23.CommitmentProof.verify|verify} messages.
     * @param message CommitmentProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ICommitmentProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CommitmentProof message, length delimited. Does not implicitly {@link ics23.CommitmentProof.verify|verify} messages.
     * @param message CommitmentProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ICommitmentProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CommitmentProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CommitmentProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.CommitmentProof;

    /**
     * Decodes a CommitmentProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CommitmentProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.CommitmentProof;

    /**
     * Verifies a CommitmentProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CommitmentProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CommitmentProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.CommitmentProof;

    /**
     * Creates a plain object from a CommitmentProof message. Also converts values to other types if specified.
     * @param message CommitmentProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.CommitmentProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this CommitmentProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a LeafOp. */
  interface ILeafOp {
    /** LeafOp hash */
    hash?: ics23.HashOp | null;

    /** LeafOp prehashKey */
    prehashKey?: ics23.HashOp | null;

    /** LeafOp prehashValue */
    prehashValue?: ics23.HashOp | null;

    /** LeafOp length */
    length?: ics23.LengthOp | null;

    /** LeafOp prefix */
    prefix?: Uint8Array | null;
  }

  /**
   * LeafOp represents the raw key-value data we wish to prove, and
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
   */
  class LeafOp implements ILeafOp {
    /**
     * Constructs a new LeafOp.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ILeafOp);

    /** LeafOp hash. */
    public hash: ics23.HashOp;

    /** LeafOp prehashKey. */
    public prehashKey: ics23.HashOp;

    /** LeafOp prehashValue. */
    public prehashValue: ics23.HashOp;

    /** LeafOp length. */
    public length: ics23.LengthOp;

    /** LeafOp prefix. */
    public prefix: Uint8Array;

    /**
     * Creates a new LeafOp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LeafOp instance
     */
    public static create(properties?: ics23.ILeafOp): ics23.LeafOp;

    /**
     * Encodes the specified LeafOp message. Does not implicitly {@link ics23.LeafOp.verify|verify} messages.
     * @param message LeafOp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ILeafOp,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified LeafOp message, length delimited. Does not implicitly {@link ics23.LeafOp.verify|verify} messages.
     * @param message LeafOp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ILeafOp,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a LeafOp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LeafOp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.LeafOp;

    /**
     * Decodes a LeafOp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LeafOp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.LeafOp;

    /**
     * Verifies a LeafOp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LeafOp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LeafOp
     */
    public static fromObject(object: { [k: string]: any }): ics23.LeafOp;

    /**
     * Creates a plain object from a LeafOp message. Also converts values to other types if specified.
     * @param message LeafOp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.LeafOp,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this LeafOp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of an InnerOp. */
  interface IInnerOp {
    /** InnerOp hash */
    hash?: ics23.HashOp | null;

    /** InnerOp prefix */
    prefix?: Uint8Array | null;

    /** InnerOp suffix */
    suffix?: Uint8Array | null;
  }

  /**
   * InnerOp represents a merkle-proof step that is not a leaf.
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
   */
  class InnerOp implements IInnerOp {
    /**
     * Constructs a new InnerOp.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IInnerOp);

    /** InnerOp hash. */
    public hash: ics23.HashOp;

    /** InnerOp prefix. */
    public prefix: Uint8Array;

    /** InnerOp suffix. */
    public suffix: Uint8Array;

    /**
     * Creates a new InnerOp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns InnerOp instance
     */
    public static create(properties?: ics23.IInnerOp): ics23.InnerOp;

    /**
     * Encodes the specified InnerOp message. Does not implicitly {@link ics23.InnerOp.verify|verify} messages.
     * @param message InnerOp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IInnerOp,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified InnerOp message, length delimited. Does not implicitly {@link ics23.InnerOp.verify|verify} messages.
     * @param message InnerOp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IInnerOp,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes an InnerOp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns InnerOp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.InnerOp;

    /**
     * Decodes an InnerOp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns InnerOp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.InnerOp;

    /**
     * Verifies an InnerOp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an InnerOp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns InnerOp
     */
    public static fromObject(object: { [k: string]: any }): ics23.InnerOp;

    /**
     * Creates a plain object from an InnerOp message. Also converts values to other types if specified.
     * @param message InnerOp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.InnerOp,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this InnerOp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a ProofSpec. */
  interface IProofSpec {
    /** ProofSpec leafSpec */
    leafSpec?: ics23.ILeafOp | null;

    /** ProofSpec innerSpec */
    innerSpec?: ics23.IInnerSpec | null;

    /** ProofSpec maxDepth */
    maxDepth?: number | null;

    /** ProofSpec minDepth */
    minDepth?: number | null;
  }

  /**
   * ProofSpec defines what the expected parameters are for a given proof type.
   * This can be stored in the client and used to validate any incoming proofs.
   *
   * verify(ProofSpec, Proof) -> Proof | Error
   *
   * As demonstrated in tests, if we don't fix the algorithm used to calculate the
   * LeafHash for a given tree, there are many possible key-value pairs that can
   * generate a given hash (by interpretting the preimage differently).
   * We need this for proper security, requires client knows a priori what
   * tree format server uses. But not in code, rather a configuration object.
   */
  class ProofSpec implements IProofSpec {
    /**
     * Constructs a new ProofSpec.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IProofSpec);

    /** ProofSpec leafSpec. */
    public leafSpec?: ics23.ILeafOp | null;

    /** ProofSpec innerSpec. */
    public innerSpec?: ics23.IInnerSpec | null;

    /** ProofSpec maxDepth. */
    public maxDepth: number;

    /** ProofSpec minDepth. */
    public minDepth: number;

    /**
     * Creates a new ProofSpec instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProofSpec instance
     */
    public static create(properties?: ics23.IProofSpec): ics23.ProofSpec;

    /**
     * Encodes the specified ProofSpec message. Does not implicitly {@link ics23.ProofSpec.verify|verify} messages.
     * @param message ProofSpec message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IProofSpec,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified ProofSpec message, length delimited. Does not implicitly {@link ics23.ProofSpec.verify|verify} messages.
     * @param message ProofSpec message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IProofSpec,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a ProofSpec message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProofSpec
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.ProofSpec;

    /**
     * Decodes a ProofSpec message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProofSpec
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.ProofSpec;

    /**
     * Verifies a ProofSpec message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ProofSpec message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProofSpec
     */
    public static fromObject(object: { [k: string]: any }): ics23.ProofSpec;

    /**
     * Creates a plain object from a ProofSpec message. Also converts values to other types if specified.
     * @param message ProofSpec
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.ProofSpec,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this ProofSpec to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of an InnerSpec. */
  interface IInnerSpec {
    /** InnerSpec childOrder */
    childOrder?: number[] | null;

    /** InnerSpec childSize */
    childSize?: number | null;

    /** InnerSpec minPrefixLength */
    minPrefixLength?: number | null;

    /** InnerSpec maxPrefixLength */
    maxPrefixLength?: number | null;

    /** InnerSpec emptyChild */
    emptyChild?: Uint8Array | null;

    /** InnerSpec hash */
    hash?: ics23.HashOp | null;
  }

  /** Represents an InnerSpec. */
  class InnerSpec implements IInnerSpec {
    /**
     * Constructs a new InnerSpec.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IInnerSpec);

    /** InnerSpec childOrder. */
    public childOrder: number[];

    /** InnerSpec childSize. */
    public childSize: number;

    /** InnerSpec minPrefixLength. */
    public minPrefixLength: number;

    /** InnerSpec maxPrefixLength. */
    public maxPrefixLength: number;

    /** InnerSpec emptyChild. */
    public emptyChild: Uint8Array;

    /** InnerSpec hash. */
    public hash: ics23.HashOp;

    /**
     * Creates a new InnerSpec instance using the specified properties.
     * @param [properties] Properties to set
     * @returns InnerSpec instance
     */
    public static create(properties?: ics23.IInnerSpec): ics23.InnerSpec;

    /**
     * Encodes the specified InnerSpec message. Does not implicitly {@link ics23.InnerSpec.verify|verify} messages.
     * @param message InnerSpec message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IInnerSpec,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified InnerSpec message, length delimited. Does not implicitly {@link ics23.InnerSpec.verify|verify} messages.
     * @param message InnerSpec message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IInnerSpec,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes an InnerSpec message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns InnerSpec
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.InnerSpec;

    /**
     * Decodes an InnerSpec message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns InnerSpec
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.InnerSpec;

    /**
     * Verifies an InnerSpec message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an InnerSpec message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns InnerSpec
     */
    public static fromObject(object: { [k: string]: any }): ics23.InnerSpec;

    /**
     * Creates a plain object from an InnerSpec message. Also converts values to other types if specified.
     * @param message InnerSpec
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.InnerSpec,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this InnerSpec to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a BatchProof. */
  interface IBatchProof {
    /** BatchProof entries */
    entries?: ics23.IBatchEntry[] | null;
  }

  /** Represents a BatchProof. */
  class BatchProof implements IBatchProof {
    /**
     * Constructs a new BatchProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IBatchProof);

    /** BatchProof entries. */
    public entries: ics23.IBatchEntry[];

    /**
     * Creates a new BatchProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BatchProof instance
     */
    public static create(properties?: ics23.IBatchProof): ics23.BatchProof;

    /**
     * Encodes the specified BatchProof message. Does not implicitly {@link ics23.BatchProof.verify|verify} messages.
     * @param message BatchProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IBatchProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified BatchProof message, length delimited. Does not implicitly {@link ics23.BatchProof.verify|verify} messages.
     * @param message BatchProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IBatchProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a BatchProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BatchProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.BatchProof;

    /**
     * Decodes a BatchProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BatchProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.BatchProof;

    /**
     * Verifies a BatchProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a BatchProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BatchProof
     */
    public static fromObject(object: { [k: string]: any }): ics23.BatchProof;

    /**
     * Creates a plain object from a BatchProof message. Also converts values to other types if specified.
     * @param message BatchProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.BatchProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this BatchProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a BatchEntry. */
  interface IBatchEntry {
    /** BatchEntry exist */
    exist?: ics23.IExistenceProof | null;

    /** BatchEntry nonexist */
    nonexist?: ics23.INonExistenceProof | null;
  }

  /** Represents a BatchEntry. */
  class BatchEntry implements IBatchEntry {
    /**
     * Constructs a new BatchEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.IBatchEntry);

    /** BatchEntry exist. */
    public exist?: ics23.IExistenceProof | null;

    /** BatchEntry nonexist. */
    public nonexist?: ics23.INonExistenceProof | null;

    /** BatchEntry proof. */
    public proof?: "exist" | "nonexist";

    /**
     * Creates a new BatchEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BatchEntry instance
     */
    public static create(properties?: ics23.IBatchEntry): ics23.BatchEntry;

    /**
     * Encodes the specified BatchEntry message. Does not implicitly {@link ics23.BatchEntry.verify|verify} messages.
     * @param message BatchEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.IBatchEntry,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified BatchEntry message, length delimited. Does not implicitly {@link ics23.BatchEntry.verify|verify} messages.
     * @param message BatchEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.IBatchEntry,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a BatchEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BatchEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.BatchEntry;

    /**
     * Decodes a BatchEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BatchEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.BatchEntry;

    /**
     * Verifies a BatchEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a BatchEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BatchEntry
     */
    public static fromObject(object: { [k: string]: any }): ics23.BatchEntry;

    /**
     * Creates a plain object from a BatchEntry message. Also converts values to other types if specified.
     * @param message BatchEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.BatchEntry,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this BatchEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a CompressedBatchProof. */
  interface ICompressedBatchProof {
    /** CompressedBatchProof entries */
    entries?: ics23.ICompressedBatchEntry[] | null;

    /** CompressedBatchProof lookupInners */
    lookupInners?: ics23.IInnerOp[] | null;
  }

  /** Represents a CompressedBatchProof. */
  class CompressedBatchProof implements ICompressedBatchProof {
    /**
     * Constructs a new CompressedBatchProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ICompressedBatchProof);

    /** CompressedBatchProof entries. */
    public entries: ics23.ICompressedBatchEntry[];

    /** CompressedBatchProof lookupInners. */
    public lookupInners: ics23.IInnerOp[];

    /**
     * Creates a new CompressedBatchProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompressedBatchProof instance
     */
    public static create(
      properties?: ics23.ICompressedBatchProof
    ): ics23.CompressedBatchProof;

    /**
     * Encodes the specified CompressedBatchProof message. Does not implicitly {@link ics23.CompressedBatchProof.verify|verify} messages.
     * @param message CompressedBatchProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ICompressedBatchProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CompressedBatchProof message, length delimited. Does not implicitly {@link ics23.CompressedBatchProof.verify|verify} messages.
     * @param message CompressedBatchProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ICompressedBatchProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CompressedBatchProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompressedBatchProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.CompressedBatchProof;

    /**
     * Decodes a CompressedBatchProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompressedBatchProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.CompressedBatchProof;

    /**
     * Verifies a CompressedBatchProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CompressedBatchProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompressedBatchProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.CompressedBatchProof;

    /**
     * Creates a plain object from a CompressedBatchProof message. Also converts values to other types if specified.
     * @param message CompressedBatchProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.CompressedBatchProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this CompressedBatchProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a CompressedBatchEntry. */
  interface ICompressedBatchEntry {
    /** CompressedBatchEntry exist */
    exist?: ics23.ICompressedExistenceProof | null;

    /** CompressedBatchEntry nonexist */
    nonexist?: ics23.ICompressedNonExistenceProof | null;
  }

  /** Represents a CompressedBatchEntry. */
  class CompressedBatchEntry implements ICompressedBatchEntry {
    /**
     * Constructs a new CompressedBatchEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ICompressedBatchEntry);

    /** CompressedBatchEntry exist. */
    public exist?: ics23.ICompressedExistenceProof | null;

    /** CompressedBatchEntry nonexist. */
    public nonexist?: ics23.ICompressedNonExistenceProof | null;

    /** CompressedBatchEntry proof. */
    public proof?: "exist" | "nonexist";

    /**
     * Creates a new CompressedBatchEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompressedBatchEntry instance
     */
    public static create(
      properties?: ics23.ICompressedBatchEntry
    ): ics23.CompressedBatchEntry;

    /**
     * Encodes the specified CompressedBatchEntry message. Does not implicitly {@link ics23.CompressedBatchEntry.verify|verify} messages.
     * @param message CompressedBatchEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ICompressedBatchEntry,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CompressedBatchEntry message, length delimited. Does not implicitly {@link ics23.CompressedBatchEntry.verify|verify} messages.
     * @param message CompressedBatchEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ICompressedBatchEntry,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CompressedBatchEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompressedBatchEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.CompressedBatchEntry;

    /**
     * Decodes a CompressedBatchEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompressedBatchEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.CompressedBatchEntry;

    /**
     * Verifies a CompressedBatchEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CompressedBatchEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompressedBatchEntry
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.CompressedBatchEntry;

    /**
     * Creates a plain object from a CompressedBatchEntry message. Also converts values to other types if specified.
     * @param message CompressedBatchEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.CompressedBatchEntry,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this CompressedBatchEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a CompressedExistenceProof. */
  interface ICompressedExistenceProof {
    /** CompressedExistenceProof key */
    key?: Uint8Array | null;

    /** CompressedExistenceProof value */
    value?: Uint8Array | null;

    /** CompressedExistenceProof leaf */
    leaf?: ics23.ILeafOp | null;

    /** CompressedExistenceProof path */
    path?: number[] | null;
  }

  /** Represents a CompressedExistenceProof. */
  class CompressedExistenceProof implements ICompressedExistenceProof {
    /**
     * Constructs a new CompressedExistenceProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ICompressedExistenceProof);

    /** CompressedExistenceProof key. */
    public key: Uint8Array;

    /** CompressedExistenceProof value. */
    public value: Uint8Array;

    /** CompressedExistenceProof leaf. */
    public leaf?: ics23.ILeafOp | null;

    /** CompressedExistenceProof path. */
    public path: number[];

    /**
     * Creates a new CompressedExistenceProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompressedExistenceProof instance
     */
    public static create(
      properties?: ics23.ICompressedExistenceProof
    ): ics23.CompressedExistenceProof;

    /**
     * Encodes the specified CompressedExistenceProof message. Does not implicitly {@link ics23.CompressedExistenceProof.verify|verify} messages.
     * @param message CompressedExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ICompressedExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CompressedExistenceProof message, length delimited. Does not implicitly {@link ics23.CompressedExistenceProof.verify|verify} messages.
     * @param message CompressedExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ICompressedExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CompressedExistenceProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompressedExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.CompressedExistenceProof;

    /**
     * Decodes a CompressedExistenceProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompressedExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.CompressedExistenceProof;

    /**
     * Verifies a CompressedExistenceProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CompressedExistenceProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompressedExistenceProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.CompressedExistenceProof;

    /**
     * Creates a plain object from a CompressedExistenceProof message. Also converts values to other types if specified.
     * @param message CompressedExistenceProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.CompressedExistenceProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this CompressedExistenceProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a CompressedNonExistenceProof. */
  interface ICompressedNonExistenceProof {
    /** CompressedNonExistenceProof key */
    key?: Uint8Array | null;

    /** CompressedNonExistenceProof left */
    left?: ics23.ICompressedExistenceProof | null;

    /** CompressedNonExistenceProof right */
    right?: ics23.ICompressedExistenceProof | null;
  }

  /** Represents a CompressedNonExistenceProof. */
  class CompressedNonExistenceProof implements ICompressedNonExistenceProof {
    /**
     * Constructs a new CompressedNonExistenceProof.
     * @param [properties] Properties to set
     */
    constructor(properties?: ics23.ICompressedNonExistenceProof);

    /** CompressedNonExistenceProof key. */
    public key: Uint8Array;

    /** CompressedNonExistenceProof left. */
    public left?: ics23.ICompressedExistenceProof | null;

    /** CompressedNonExistenceProof right. */
    public right?: ics23.ICompressedExistenceProof | null;

    /**
     * Creates a new CompressedNonExistenceProof instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CompressedNonExistenceProof instance
     */
    public static create(
      properties?: ics23.ICompressedNonExistenceProof
    ): ics23.CompressedNonExistenceProof;

    /**
     * Encodes the specified CompressedNonExistenceProof message. Does not implicitly {@link ics23.CompressedNonExistenceProof.verify|verify} messages.
     * @param message CompressedNonExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: ics23.ICompressedNonExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified CompressedNonExistenceProof message, length delimited. Does not implicitly {@link ics23.CompressedNonExistenceProof.verify|verify} messages.
     * @param message CompressedNonExistenceProof message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: ics23.ICompressedNonExistenceProof,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a CompressedNonExistenceProof message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CompressedNonExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): ics23.CompressedNonExistenceProof;

    /**
     * Decodes a CompressedNonExistenceProof message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CompressedNonExistenceProof
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): ics23.CompressedNonExistenceProof;

    /**
     * Verifies a CompressedNonExistenceProof message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a CompressedNonExistenceProof message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CompressedNonExistenceProof
     */
    public static fromObject(object: {
      [k: string]: any;
    }): ics23.CompressedNonExistenceProof;

    /**
     * Creates a plain object from a CompressedNonExistenceProof message. Also converts values to other types if specified.
     * @param message CompressedNonExistenceProof
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: ics23.CompressedNonExistenceProof,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this CompressedNonExistenceProof to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}
