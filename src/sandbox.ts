interface Identity {
    id?: number;
}

class Repository<T extends Identity> {
    private tArr: Array<T>;

    constructor() {
        this.tArr = new Array<T>();
    }

    // Type guard using type predicate
    private typeGuard(instance: unknown): instance is T {
        return instance !== null && 
               typeof instance === 'object' && 
               'id' in instance;
    }

    add(instance: T): T {
        // Use optional chaining and nullish coalescing
        instance.id = instance.id ?? Math.floor(Math.random() * 1000000);
        this.tArr.push(instance);
        return instance;
    }

    get(id: number): T | undefined {
        return this.tArr.find(element => element.id === id);
    }

    // Delete and return deleted object
    delete(id: number): T | undefined {
        const index = this.tArr.findIndex(element => element.id === id);
        
        if (index !== -1) {
            // Splice returns an array of deleted elements
            const [deletedObject] = this.tArr.splice(index, 1);
            return deletedObject;
        }
        
        return undefined;
    }

    // Additional useful methods
    getAll(): T[] {
        return [...this.tArr]; // Return a copy to prevent direct mutation
    }

    update(id: number, updateData: Partial<T>): T | undefined {
        const index = this.tArr.findIndex(element => element.id === id);
        
        if (index !== -1) {
            // Merge existing object with update data
            this.tArr[index] = { ...this.tArr[index], ...updateData };
            return this.tArr[index];
        }
        
        return undefined;
    }
}

interface User extends Identity {
    username: string;
    email?: string;
}

// Usage example
const UserRepo = new Repository<User>();
const user = UserRepo.add({
    username: 'Adrian'
});
console.log(user.id); // Randomly generated ID
const foundUser = UserRepo.get(user.id!);
UserRepo.delete(user.id!);