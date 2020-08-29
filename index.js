const fs = require("fs");

module.exports = class EasyJsonDB {

    /**
     * @param {string} filePath The path of the json file used for the database.
     */
    constructor(filePath){

        /**
         * The path of the json file used as database.
         * @type {string}
         */
        this.jsonFilePath = filePath || "./db.json";

        /**
         * The data stored in the database.
         * @type {object}
         */
        this.data = {};

        if(!fs.existsSync(this.jsonFilePath)){
            fs.writeFileSync(this.jsonFilePath, "{}", "utf-8");
        } else {
            this.fetchDataFromFile();
        }
    }

    /**
     * Get data from the json file and store it in the data property.
     */
    fetchDataFromFile(){
        const savedData = JSON.parse(fs.readFileSync(this.jsonFilePath));
        if(typeof savedData === "object"){
            this.data = savedData;
        }
    }

    /**
     * Write data to the json file.
     */
    saveDataToFile(){
        fs.writeFileSync(this.jsonFilePath, JSON.stringify(this.data, null, 2), "utf-8");
    }

    /**
     * Get data for a key in the database
     * @param {string} key 
     */
    get(key){
        return this.data[key];
    }

    /**
     * Check if a key data exists.
     * @param {string} key 
     */
    has(key){
        return Boolean(this.data[key]);
    }
    
    /**
     * Set new data for a key in the database.
     * @param {string} key
     * @param {*} value 
     */
    set(key, value){
        this.data[key] = value;
        this.saveDataToFile();
    }

    /**
     * Delete data for a key from the database.
     * @param {string} key 
     */
    delete(key){
        delete this.data[key];
        this.saveDataToFile();
    }

    /**
     * Add a number to a key in the database.
     * @param {string} key 
     * @param {number} count 
     */
    add(key, count){
        if(!this.data[key]) this.data[key] = 0;
        this.data[key] += count;
        this.saveDataToFile();
    }

    /**
     * Subtract a number to a key in the database.
     * @param {string} key 
     * @param {number} count 
     */
    subtract(key, count){
        if(!this.data[key]) this.data[key] = 0;
        this.data[key] -= count;
        this.saveDataToFile();
    }

    /**
     * Push an element to a key in the database.
     * @param {string} key 
     * @param {*} element 
     */
    push(key, element){
        if (!this.data[key]) this.data[key] = [];
        this.data[key].push(element);
        this.saveDataToFile();
    }

    /**
     * Clear the database.
     */
    clear(){
        this.data = {};
        this.saveDataToFile();
    }

};
