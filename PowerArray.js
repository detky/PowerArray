// JavaScript source code
if (!Array.prototype.getPropertyFlat) {
    Array.prototype.getPropertyFlat = function (property, keepOrder, includeDuplicates, includeUndefineds) {
        var array = this;
        var result = [], t = array.length;
        if (keepOrder === true) {
            for (var i = 0; i < t; i++) {
                if (includeDuplicates || result.indexOf(array[i][property]) === -1) {
                    if (includeUndefineds === true || array[i][property] !== undefined) {
                        result.push(array[i][property]);
                    }
                }
            }
        } else {
            while (t--) {
                if (includeDuplicates || result.indexOf(array[t][property]) === -1) {
                    if (includeUndefineds === true || array[t][property] !== undefined) {
                        result.push(array[t][property]);
                    }
                }
            }
        }
        return result;
    };
}

if (!Array.prototype.getByProperty) {
    Array.prototype.getByProperty = function (valueToSearchFor) {
        /**
         * This function, evaluates properties (or function results) over each object on an array, and answers with an
         * array of the found elements that matches the specified condition. The condition is given by the parameters
         * provided after position 2. The only fixed parameters are the objects array and the value to search for.
         * You can provide so many parameters as you want. Each parameter means one level deeper to search for. For example:
         *
         *      let's say that you have a collection of "car" objects, having each car a function called "getPassengers"
         *      which answers with a collection of "people" objects, and each people have a property called "name".
         *
         *  To get an array of cars having a passenger called Paul, use as following:
         *
         *  var namedPaulPassengers = findDistinctValuesOnObjectCollectionByProperty(theCarsCollection, 'Paul', 'getPassengers()','name');
         *
         * @param objectsArray
         * @param valueToSearchFor
         * @returns {Array}
         */
        var objectsArray = this;
        var results = [];
        //if (!objectsArray) {
        //    return results;
        //}
        var ia, la = arguments.length; // ia = i for arguments; la = length for arguments
        var io, lo = objectsArray.length; // io = i for objects; lo = length for objects

        for (io = 0; io < lo; io++) { //iterate objects array
            var tmpObj = objectsArray[io];

            for (ia = 1; ia < la; ia++) { //iterate throw arguments to get the right property. Start from 1, to exclude the objectsArray self
                var arg = arguments[ia];
                var isFunc = arg.substring(arg.length - 2) === "()";
                var argName = (isFunc) ? arg.substr(0, arg.length - 2) : arg;
                tmpObj = (isFunc) ? tmpObj[argName]() : tmpObj[arg];
                if (ia + 1 === la && tmpObj === valueToSearchFor) {
                    results.push(objectsArray[io]);
                }
            }
        }
        return results;
    };
}

if (!Array.prototype.getIndexByProperty) {
    Array.prototype.getIndexByProperty = function (valueToSearchFor) {
        /**
         * This function, evaluates properties (or function results) over each object on an array, and answers with an
         * array of the found elements that matches the specified condition. The condition is given by the parameters
         * provided after position 2. The only fixed parameters are the objects array and the value to search for.
         * You can provide so many parameters as you want. Each parameter means one level deeper to search for. For example:
         *
         *      let's say that you have a collection of "car" objects, having each car a function called "getPassengers"
         *      which answers with a collection of "people" objects, and each people have a property called "name".
         *
         *  To get an array of cars having a passenger called Paul, use as following:
         *
         *  var namedPaulPassengers = findDistinctValuesOnObjectCollectionByProperty(theCarsCollection, 'Paul', 'getPassengers()','name');
         *
         * @param objectsArray
         * @param valueToSearchFor
         * @returns {number}
         */
        var objectsArray = this;
        //if (!objectsArray) {
        //    return -1;
        //}
        var ia, la = arguments.length; // ia = i for arguments; la = length for arguments
        var io, lo = objectsArray.length; // io = i for objects; lo = length for objects

        for (io = 0; io < lo; io++) { //iterate objects array
            var tmpObj = objectsArray[io];

            for (ia = 1; ia < la; ia++) { //iterate throw arguments to get the right property. Start from 1, to exclude the objectsArray self
                var arg = arguments[ia];
                var isFunc = arg.substring(arg.length - 2) === "()";
                var argName = (isFunc) ? arg.substr(0, arg.length - 2) : arg;
                tmpObj = (isFunc) ? tmpObj[argName]() : tmpObj[arg];
                // Converting comparison needed (e.g. string id vs integer id)
                if (ia + 1 === la && tmpObj == valueToSearchFor) { // jshint ignore:line
                    return io;
                }
            }
        }
        return -1;
    };
}