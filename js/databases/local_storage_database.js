

function AltyStorage(){

    function initialize(){
    
        if(!JSON.parse(localStorage.getItem('TWBD'))){

            const now = Date.now().toString();

            localStorage.setItem('TWBD', JSON.stringify(
                [
                    { 
        
                        profile: { 
                            name: 'Today',
                            createdTimestamp: now,
                            modifiedTimestamp: now
                        },
                        settings: {
                            theme: null,
                            textType: null,
                            createdTimestamp: now,
                            modifiedTimestamp: now
                        }
                    }
                ]
            ));

            return true;
        }

        return false;
    }

    function updateItem(categoryName,property,value){

        const store = JSON.parse(localStorage.getItem('TWBD'));

        store[0][categoryName][property] = value;

        localStorage.setItem('TWBD', JSON.stringify(store));

    }

    function updateItems(categoryName,updates){

        const store = JSON.parse(localStorage.getItem('TWBD'));

        const category = store[0][categoryName];

        Object.keys(updates).forEach( prop => {

            category[prop] = updates[prop];

        });

        localStorage.setItem('TWBD', JSON.stringify(store));
    }

    function getItem(categoryName,property){

        const store = JSON.parse(localStorage.getItem('TWBD'));

        return store[0][categoryName][property]
    }

    function getCategory(categoryName){

        return JSON.parse(localStorage.getItem('TWBD'))[0][categoryName];
    }

    function deleteLocalStorage(){

        localStorage.removeItem('TWBD');
    }

    return {
        initialize,
        updateItem,
        updateItems,
        getItem,
        getCategory,
        deleteLocalStorage
    }

};

export const AltyLocalStorage = AltyStorage();