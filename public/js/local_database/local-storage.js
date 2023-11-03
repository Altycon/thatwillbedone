
/**
 *      THE TODO APP LOCAL STORAGE DATABASE
 * 
 */

export const AltyStorage = {

    getStore: function(storeName){

        return JSON.parse(localStorage.getItem(storeName)) || [];
    },
    setStore: function(storeName,newStore){
        
        localStorage.setItem(storeName, JSON.stringify(newStore));
    },
    deleteStore: function(storeName){

        localStorage.removeItem(storeName);
    },
    clearStore: function(storeName){

        const store = JSON.parse(localStorage.getItem(storeName)) || [];

        if(store.length > 0){

            localStorage.setItem(storeName, JSON.stringify([]));
        }
        
    },
    getItem: function(storeName, id){

        const store = JSON.parse(localStorage.getItem(storeName)) || [];

        const match = store.find( item => item.id === id);

        return match;
    },

    setItem: function(storeName, item){

        const store = JSON.parse(localStorage.getItem(storeName)) || [];

        store.push(item);

        localStorage.setItem(storeName, JSON.stringify(store));

        return store;
    },

    updateItem: function(storeName, id, updates){

        const store = JSON.parse(localStorage.getItem(storeName)) || [];

        const match = store.find( item => item.id === id );

        if(match){
    
            Object.keys(updates).forEach( prop => match[prop] = updates[prop]);
        }
    
        localStorage.setItem(storeName, JSON.stringify(store));
    
        return match;

    },

    deleteItem: function(storeName, id){

        const store = JSON.parse(localStorage.getItem(storeName)) || [];

        if(store.length < 1) return;

        const updatedStore = store.filter( item => item.id !== id);

        localStorage.setItem(storeName, JSON.stringify(updatedStore));
    }
};