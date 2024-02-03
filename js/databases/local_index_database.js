import { notify } from "../controller/notification_controller.js";

function INDEXDB(){

    let databaseName,
    version,
    openRequest,
    database,
    store,
    storeOptions;

    const allStoreNames = [];


    function initialize(indexDatabaseName,databaseVersion,commonStoreOptions,databaseStoreNames){

        databaseName = indexDatabaseName;

        version = databaseVersion;

        storeOptions = commonStoreOptions;

        databaseStoreNames.forEach( sname => allStoreNames.push(sname));

        console.log('Indexed Database initialized');

    }

    function handleRequestError(error){

        notify(`Request Error: ${error}`,'error');

        // console.warn(error);

        if(database) database.close();
    }

    
    function open(storeName,callback){

        //console.log('Opening indexedDB connection...');

        openRequest = indexedDB.open(databaseName,version);

        openRequest.onerror = function(error){

            notify(`IndexDB Open Request Error: ${error}`,'error');
                
            console.warn(error);
        };

        openRequest.onsuccess = function(event){

            //console.log('IndexedDB connected');

            database = event.target.result;

            database.onversionchange = function(){

                database.close();

                alert("Database is outdated, please reload the page.");

            };

            if(callback) callback();
        };

        openRequest.onupgradeneeded = function(event){

            database = event.target.result;

            console.log(`TWBD database updated from version ${event.oldVersion || 'NA'} to ${event.newVersion || database.version}`);

            if(!database.objectStoreNames.contains(storeName)){

                store = database.createObjectStore(storeName,storeOptions);

            }

            if(allStoreNames.length > 0){

                allStoreNames.forEach( sname => {

                    if(sname !== storeName && !database.objectStoreNames.contains(sname)){

                        database.createObjectStore(sname,storeOptions);
        
                    }
                })
            }
            
        }        
    }

    function makeTransaction(storeName,mode,callback){

        const transaction = database.transaction(storeName,mode);

        transaction.onerror = function(error){

            // notify(`Transaction Error: ${error}`,'error');
            
            console.warn(error);
        }

        transaction.oncomplete = function(event){

            //console.log('transaction completed');

            if(callback) callback();
        }

        return transaction;
    }

    function add(storeName, data, callback){

        open(storeName, ()=>{

            const store = makeTransaction(storeName,'readwrite').objectStore(storeName);

            const request = store.add(data);

            request.onerror = handleRequestError;

            request.onsuccess = function(event){

                if(callback) callback(event.target.result);

                //notify(`Successfully added data to ${storeName}s`);

                //console.log('Successfully added data to store.');

                database.close();

            }

        })
    };

    function update(storeName, data, callback){

        let result;

        open(storeName, ()=>{

            const store = makeTransaction(storeName,'readwrite').objectStore(storeName);

            const request = store.get(data.id);

            request.onerror = handleRequestError;

            request.onsuccess = function(event){

               result = event.target.result;

                Object.keys(data).forEach( prop => {

                    result[prop] = data[prop];

                });

                const requestUpdate = store.put(result);

                requestUpdate.onerror = handleRequestError;

                requestUpdate.onsuccess = function(){

                    if(callback) callback(result);

                    //notify(`Successfully updated ${storeName}s`);

                    //console.log('Successfully added data to store.');

                    database.close();

                }

            }

        })

    }

    function get(storeName, key, callback){

        open(storeName, ()=>{

            const transaction = database.transaction([storeName]);

            const store = transaction.objectStore(storeName);

            const request = store.get(key);

            request.onerror = handleRequestError;

            request.onsuccess = function(event){

                if(callback) callback(event.target.result);

                //notify(`Successfully retrieved ${storeName}`);

                //console.log('Successfully added data to store.');

                database.close();

            }

        })

    }

    function getAll(storeName, callback){

        open(storeName, ()=>{

            const transaction = database.transaction([storeName],'readonly');

            store = transaction.objectStore(storeName);

            const request = store.getAll();

            request.onerror = handleRequestError;

            request.onsuccess = function(event){

                if(callback) callback(event.target.result);

                console.log(`Successfully got "${storeName}s"`);

                database.close();

            }

        })
    }

    function deleteData(storeName,key,callback){

        open(storeName, ()=>{

            store = database.transaction([storeName],'readwrite').objectStore(storeName);

            const request = store.delete(key);

            request.onerror = handleRequestError;

            request.onsuccess = function(event){

                if(callback) callback(event.target.result);

                //notify(`Successfully deleted ${storeName}`);

                console.log(`Successfully deleted ${storeName}`);

                database.close();

            }

        })

    }

    function deleteDatabaseAndStores(){

        const DBDeleteRequest = window.indexedDB.deleteDatabase('TWBD');

        DBDeleteRequest.onerror = handleRequestError;

        DBDeleteRequest.onsuccess = () => {
            
            console.log('IndexedDB deleted');

        };

    }

    return {
        initialize,
        open,
        add,
        update,
        get,
        getAll,
        deleteData,
        deleteDatabaseAndStores
    }

};

export const AltyIDB = INDEXDB();