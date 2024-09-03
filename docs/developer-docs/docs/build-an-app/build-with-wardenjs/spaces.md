---
sidebar_position: 2
---

# Building Spaces in WardenJS

## Overview of Spaces in WardenJS

In **WardenJS**, a *Space* is a fundamental concept that represents a collection of users (referred to as owners) who manage a set of keys. *Spaces* are essential for organizing and managing access control within a blockchain application. Each *space* has a unique identifier, a creator, a list of owners, and optional rules that dictate how administrative and signing operations are handled within the space.

*Spaces* allow for modular and flexible management of permissions and operations, making them a powerful tool in complex blockchain applications where multiple users need to coordinate and manage shared resources securely.

**Key features of Spaces:**

- Unique identification
- Multiple owners
- Customizable rules for admin and sign operations
- Management of cryptographic keys

## Understanding the Space Interface

Before we dive into implementation, let's examine the `Space` interface:

```typescript
export interface Space {

  id: bigint; // Unique ID of the space.
  
  creator: string; // Address of the creator of the space.
  
  owners: string[]; // List of owners of the space.
  
  adminRuleId?: bigint; // (Optional) ID of the Rule to be applied to every admin operation.
  
  signRuleId?: bigint; // (Optional) ID of the Rule to be applied to every sign operation.
}
```

## Creating and Managing Spaces

### Creating a New Space

To create a new Space, you'll need to implement a function that initializes a Space object. Here's an example:

```typescript
function createSpace(creator: string, initialOwners: string[]): Space {
  return {
    id: generateUniqueId(), // Implement this function to generate a unique bigint
    creator,
    owners: initialOwners,
    adminRuleId: BigInt(0), // Default to 0, meaning no custom admin rule
    signRuleId: BigInt(0),  // Default to 0, meaning no custom sign rule
  };
}
```

### Adding and Removing Owners

Here is an example to implement functions to add and remove owners from a Space:

```typescript
function addSpaceOwner(space: Space, newOwner: string): Space {
  if (!space.owners.includes(newOwner)) {
    return {
      ...space,
      owners: [...space.owners, newOwner],
    };
  }
  return space;
}

function removeSpaceOwner(space: Space, ownerToRemove: string): Space {
  return {
    ...space,
    owners: space.owners.filter(owner => owner !== ownerToRemove),
  };
}
```

## Space Configuration and Customization

### Setting Custom Rules

Spaces can have custom rules for admin and sign operations. Implement functions to set these rules:

```typescript
function setAdminRule(space: Space, ruleId: bigint): Space {
  return {
    ...space,
    adminRuleId: ruleId,
  };
}

function setSignRule(space: Space, ruleId: bigint): Space {
  return {
    ...space,
    signRuleId: ruleId,
  };
}
```

### Understanding Rule Applications

- **Admin Rule:** Applies to operations like adding/removing owners and updating the space.
- **Sign Rule:** Applies to operations related to key management and signing.
- **Default behavior:** If no custom rule is set (rule Id is 0), the default rule allows any operation when at least one owner approves it.

## Serialization and Deserialization

**WardenJS** provides methods for encoding and decoding Space objects. Here's how to use them:

```typescript
import { Space } from 'wardenjs';

const encodedSpace = Space.encode(spaceObject).finish(); // Encoding a Space object to binary

const decodedSpace = Space.decode(binaryData); // Decoding a binary representation to a Space object
```

## Best Practices and Considerations

1. Always validate inputs when creating or modifying Spaces.
2. Implement proper access control to ensure only authorized users can modify a Space.
3. Consider implementing a caching mechanism for frequently accessed Spaces.
4. When setting custom rules, ensure the rule IDs correspond to valid, existing rules in your system.
5. Regularly audit Space ownership and permissions to maintain security.

## Conclusion

Implementing Spaces in **WardenJS** provides a robust framework for managing cryptographic operations with granular control. By understanding and correctly implementing the Space interface and its associated methods, you can create a secure and flexible key management system within the Warden protocol.

Remember to thoroughly test your implementation and consider all edge cases, especially when dealing with ownership changes and rule applications.
