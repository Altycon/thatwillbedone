

function AltyStorage(){

    function initialize(){
    
        if(!JSON.parse(localStorage.getItem('TWBD'))){

            localStorage.setItem('TWBD', JSON.stringify(
                [
                    { 
        
                        profile: { 
                            name: 'Guest',
                
                        },
                        settings: {
                            theme: null,
                            textType: null,
                            textColor: null,
                            backgroundColor:  null
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

        console.log(category)

        localStorage.setItem('TWBD', JSON.stringify(store));
    }

    function getItem(categoryName,property){

        const store = JSON.parse(localStorage.getItem('TWBD'));

        return store[0][categoryName][property]
    }

    return {
        initialize,
        updateItem,
        updateItems,
        getItem
    }

};

export const AltyLocalStorage = AltyStorage();