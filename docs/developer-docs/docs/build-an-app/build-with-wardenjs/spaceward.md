---
sidebar_position: 3
---

# Understanding SpaceWard using WardenJS

This tutorial aims to provide a comprehensive explanation of how *SpaceWard* functions by leveraging **WardenJS.** We will walk through the various components of *SpaceWard*, explaining its purpose and how it integrates with **WardenJS** to create a cohesive, Blockchain-based application.

## Introduction to SpaceWard

[*SpaceWard*](../examples-of-oapps.md) is a decentralized application (dApp) designed to interact with Blockchain networks. It manages user authentication, asset tracking, and transaction management through various components that are implemented with the help of **WardenJS**. **WardenJS** provides the underlying framework for handling state management, API interactions, and utility functions within *SpaceWard.*

## Core Architecture and Setup

*SpaceWard's* architecture is built around React for the frontend and uses **WardenJS** to manage critical aspects such as state and API interactions. The core setup involves various React components that interact with **WardenJS** to ensure seamless user experience and data management.

### Spaces

Spaces are the core organizational units in *SpaceWard.* They represent groups of users who collectively manage cryptographic keys.

**WardenJS** provides functions to create, query, and manage Spaces used by *SpaceWard*:

```typescript
export interface MsgNewSpace {
  creator: string;
  adminRuleId: bigint;
  signRuleId: bigint;
  additionalOwners: string[];
}

export interface QuerySpaceByIdRequest {
  id: bigint;
}
```

### Keys

Keys are the cryptographic entities managed within Spaces.

**WardenJS** provides interfaces for key management used by *SpaceWard*:

```typescript
export interface Key {
  id: bigint;
  spaceId: bigint;
  keychainId: bigint;
  type: KeyType;
  publicKey: Uint8Array;
  ruleId: bigint;
}
```

### Keychains

Keychains are responsible for creating and managing keys.

**WardenJS** provides interfaces for Keychains used by *SpaceWard*:

```typescript
export interface Keychain {
  id: bigint;
  creator: string;
  description: string;
  admins: string[];
  writers: string[];
  fees?: KeychainFees;
}
```

### Requests (Key and Sign)

Requests are used to initiate key creation or signing operations.

**WardenJS** provides interfaces for both types of requests used by *SpaceWard*:

```typescript
export interface KeyRequest {
  id: bigint;
  creator: string;
  spaceId: bigint;
  keychainId: bigint;
  keyType: KeyType;
  status: KeyRequestStatus;
  rejectReason: string;
  ruleId: bigint;
}

export interface SignRequest {
  id: bigint;
  creator: string;
  keyId: bigint;
  dataForSigning: Uint8Array;
  status: SignRequestStatus;
  signedData?: Uint8Array;
  rejectReason?: string;
  encryptionKey: Uint8Array;
}
```

## WardenJS Functionality used in SpaceWard

### Query Functions

*SpaceWard* uses **WardenJS** to interact with the blockchain and fetch data about various entities such as Spaces, Keys, Keychains, and Requests. **WardenJS** provides structured query functions that *SpaceWard* uses to retrieve this information efficiently.

```typescript
export interface Query {
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  spaces(request?: QuerySpacesRequest): Promise<QuerySpacesResponse>;
  spaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse>;
  keyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse>;
  // ... other query methods
}
```

*SpaceWard* uses these query functions in its components and hooks. For instance, in a component that displays information about a specific Space, *SpaceWard* might use the `spaceById` query:

```typescript
function SpaceDetails({ spaceId }) {
  const { data: space, isLoading, error } = useSpaceById({ id: spaceId });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <h1>{space.name}</h1>
      {/* Display other space details */}
    </div>
  );
}
```

The `useSpaceById` hook would be implemented using **WardenJS's** query function, handling the asynchronous nature of the blockchain request and providing a convenient interface for React components.

### Transaction Composition

**WardenJS** provides utilities for composing blockchain transactions, which *SpaceWard* uses to create and send transactions for operations like creating new spaces, requesting keys, or updating existing entities.

```typescript
export const MessageComposer = {
  encoded: {
    newSpace(value: MsgNewSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value: MsgNewSpace.encode(value).finish()
      };
    },
    // ... other message composers
  },
  // ... other composition methods
};
```

*SpaceWard* uses these composition methods when it needs to send transactions to the blockchain. For example, when creating a new Space:

```typescript
function createNewSpace(spaceData) {
  const msg = MessageComposer.encoded.newSpace({
    creator: currentUserAddress,
    adminRuleId: BigInt(spaceData.adminRuleId),
    signRuleId: BigInt(spaceData.signRuleId),
    additionalOwners: spaceData.additionalOwners
  });

  // Use a blockchain client to send this transaction
  return sendTransaction(msg);
}
```

This approach ensures that the transaction is correctly formatted according to the blockchain's requirements.

### Type Definitions

**WardenJS** provides TypeScript definitions for all main entities in the system, which *SpaceWard* uses to ensure type safety throughout its codebase.

```typescript
export interface Space {
  id: bigint;
  creator: string;
  owners: string[];
  adminRuleId: bigint;
  signRuleId: bigint;
}
```

*SpaceWard* uses these types throughout its components and functions:

```typescript
function SpaceList({ spaces }: { spaces: Space[] }) {
  return (
    <ul>
      {spaces.map(space => (
        <li key={space.id.toString()}>
          {space.creator} - Owners: {space.owners.length}
        </li>
      ))}
    </ul>
  );
}
```

This usage of types helps catch errors at compile-time and provides better autocompletion in development environments.

### State Management

**WardenJS** offers hooks for managing global and persistent state, which *SpaceWard* uses to handle application-wide state efficiently.

```typescript
export function createGlobalState<T>(
  queryKey: unknown,
  initialData: T | null = null,
) {
  // Implementation...
}

export function createPersistantState<T>(
  queryKey: unknown,
  initialData: T | null = null,
) {
  // Implementation...
}
```

SpaceWard uses these to create state hooks for various features:

```typescript
// In a SpaceWard file
const useKeySettingsState = createPersistantState("key-settings", {
  settings: {}
});

function KeySettings() {
  const { data, setData } = useKeySettingsState();

  function updateSetting(key, value) {
    setData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  }

  // Render component using data.settings
}
```

This approach allows *SpaceWard* to manage complex state across the application while persisting certain data between sessions.

### Utility Functions

**WardenJS** provides various utility functions for common operations, which *SpaceWard* uses throughout its codebase for tasks like class name composition, child element validation, and data type checking.

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[]
}

export function isUint8Array(value: unknown): value is Uint8Array {
  return value instanceof Uint8Array
}
```

SpaceWard uses these utilities in various parts of its codebase:

```typescript
function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-blue-500 text-white rounded",
        className
      )}
      {...props}
    >
      {getValidChildren(children)}
    </button>
  );
}

function handleData(data: unknown) {
  if (isUint8Array(data)) {
    // Process Uint8Array data
  } else {
    // Handle other data types
  }
}
```

These utilities help *SpaceWard* maintain a clean and efficient codebase by providing reusable functions for common operations.

## Conclusion

SpaceWard is a sophisticated application that leverages WardenJS to handle critical functions such as authentication, state management, API interactions, and utility operations. By using WardenJS, SpaceWard ensures that these operations are managed efficiently, securely, and in a modular way.

Understanding how SpaceWard uses WardenJS can provide valuable insights into building similar decentralized applications. While this tutorial does not cover how to build SpaceWard from scratch, it offers a deep dive into the inner workings of the application and how WardenJS plays a pivotal role in its architecture.
