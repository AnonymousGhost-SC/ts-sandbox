// // 1. Advanced Type Constraints
// interface Identifiable<ID = number> {
//     id: ID;
// }

// // 2. Generic Constraints with Multiple Constraints
// interface Timestampable {
//     createdAt: Date;
//     updatedAt: Date;
// }

// // 3. Decorator for Logging (Experimental Feature)
// function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
    
//     descriptor.value = function(...args: any[]) {
//         console.log(`Calling method ${propertyKey} with args: ${JSON.stringify(args)}`);
//         const result = originalMethod.apply(this, args);
//         console.log(`Method ${propertyKey} returned: ${JSON.stringify(result)}`);
//         return result;
//     };

//     return descriptor;
// }

// // 4. Custom Error Class
// class RepositoryError extends Error {
//     constructor(message: string) {
//         super(message);
//         this.name = 'RepositoryError';
//     }
// }

// // 5. Advanced Repository with Multiple Constraints
// class Repository<T extends Identifiable & Partial<Timestampable>> {
//     // 6. Using Private Fields (ES2022 Feature)
//     #items: Map<T['id'], T> = new Map();

//     // 7. Method Overloading
//     add(item: T): T;
//     add(items: T[]): T[];
//     @LogMethod
//     add(itemOrItems: T | T[]): T | T[] {
//         if (Array.isArray(itemOrItems)) {
//             return itemOrItems.map(item => this.#addSingle(item));
//         }
//         return this.#addSingle(itemOrItems);
//     }

//     // 8. Private Method with Type Narrowing
//     #addSingle(item: T): T {
//         // Auto-generate timestamp if not provided
//         if (!item.createdAt) {
//             (item as Timestampable).createdAt = new Date();
//             (item as Timestampable).updatedAt = new Date();
//         }

//         // Ensure unique ID
//         const id = item.id ?? this.#generateUniqueId();
//         (item as Identifiable).id = id;

//         this.#items.set(id, item);
//         return item;
//     }

//     // 9. Generic Method with Conditional Types
//     findBy<K extends keyof T>(key: K, value: T[K]): T[] {
//         return Array.from(this.#items.values()).filter(item => item[key] === value);
//     }

//     // 10. Advanced Error Handling with Result Type
//     get(id: T['id']): { success: true, data: T } | { success: false, error: RepositoryError } {
//         const item = this.#items.get(id);
        
//         if (!item) {
//             return {
//                 success: false,
//                 error: new RepositoryError(`Item with id ${id} not found`)
//             };
//         }

//         return {
//             success: true,
//             data: item
//         };
//     }

//     // 11. Utility Method with Generics and Type Guards
//     transform<R>(transformer: (item: T) => R): R[] {
//         return Array.from(this.#items.values()).map(transformer);
//     }

//     // 12. Private Unique ID Generation
//     #generateUniqueId(): T['id'] {
//         // More sophisticated ID generation
//         return Math.random().toString(36).substr(2, 9) as T['id'];
//     }

//     // 13. Utility Methods with Advanced Types
//     getAll(): ReadonlyArray<T> {
//         return Array.from(this.#items.values());
//     }

//     // 14. Typed Iterator
//     *[Symbol.iterator](): Iterator<T> {
//         yield* this.#items.values();
//     }
// }

// // 15. Advanced Usage Example
// interface User extends Identifiable, Timestampable {
//     username: string;
//     email: string;
// }

// const userRepo = new Repository<User>();

// // Adding a user
// const user = userRepo.add({
//     username: 'adrian',
//     email: 'adrian@example.com'
// });

// // Finding users
// const adrianUsers = userRepo.findBy('username', 'adrian');

// // Error-safe retrieval
// const userResult = userRepo.get(user.id);
// if (userResult.success) {
//     console.log(userResult.data);
// } else {
//     console.error(userResult.error);
// }

// // Transforming users
// const usernames = userRepo.transform(user => user.username);

// // Iteration
// for (const user of userRepo) {
//     console.log(user);
// }