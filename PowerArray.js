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

/*if (!Array.prototype.RunInWorker) {
 Array.prototype.RunInWorker = function (task, callback, keepOrder) {
 //var blobURL = URL.createObjectURL(new Blob([
 //    '(',
 //    function() {
 //        //Long-running work here

 //        var _array, _func, _len, l;
 //        //choto....puede q self en la siguiente linea este mal
 //        self.onmessage = function(paMessage) {
 //            switch (paMessage.action) {
 //            case pa.paEachParalellsHelper.actionKeys.Runeach:
 //                _array = paMessage.array;
 //                _func = paMessage.func;

 //                _len = _array.length;
 //                l = _len;

 //                while (l--) {
 //                    _func(this._array[l]);
 //                }

 //                self.postMessage({
 //                    event: pa.paEachParalellsHelper.eventKeys.RuneachDone
 //                });
 //                break;
 //            case pa.paEachParalellsHelper.actionKeys.TaskState:
 //                self.postMessage({
 //                    event: pa.paEachParalellsHelper.eventKeys.TaskState,
 //                    value: l * _len / 100
 //                });
 //                break;
 //            }
 //        };


 //    }.toString(),
 //    ')()'
 //], { type: 'application/javascript' }));


 //var w = new Worker(blobURL);


 var l = this.length;
 while (l--) {
 var w = new Worker("PowerArrayWorker.js");
 w.postMessage({
 //action: pa.paEachParalellsHelper.actionKeys.Runeach,
 array: this,
 func: task
 });
 //task.call(this[l], task);
 }
 if (callback) {
 callback();
 }
 return this;
 };
 }*/

if (!Array.prototype.RunEach) {
    Array.prototype.RunEach = function (task, context, callback) {
        var l = this.length;
        while (l--) {
            task.call((context) ? context : this[l], task);
        }
        if (callback) {
            callback();
        }
        return this;
    };
}

window.pa = window.pa || {
    paEachParalellsHelper: {
        CheckParalellTaskStates: function (paralellId) {
            var paralell = window.pa.paEachParalellsHelper.currentParalellIds[paralellId];
            if (paralell.CompletedTasks === paralell.TotalProcesses) {
                return true;
            }
            console.info('not yet');
            return false;
        },
        currentParalellIds: {},
        actionKeys: {
            Runeach: 'RunEach',
            TaskState: 'TaskState'
        },
        eventKeys: {
            RuneachDone: 'RuneachDone',
            TaskState: 'TaskStateResponse'
        }
    },
    paWhereHelper: {
        FillConditions: function (item, conditions) {
            var l = conditions.length, condition;
            while (l--) {
                condition = conditions[l];
                if (!condition.condition(item[condition.column]))
                    return false;
            }
            return true;
        }
    },

    biggerThan: function (value) {
        return function (val) {
            return val > value;
        };
    },
    smallerThan: function (value) {
        return function (val) {
            return val < value;
        };
    },
    EqualTo3: function (value) {
        return function (val) {
            return val === value;
        };
    },
    EqualTo2: function (value) {
        return function (val) {
            return val == value; // jshint ignore:line
        };
    },
    EqualTo: function (object, func) {
        return function (val) {
            return func(val, object);
        };
    }, Like: function (value) {
        if (!value.isArray) {
            //normal search, single string parameter
            return function (val) {
                return val.indexOf(value) > -1;
            };
        } else {
            //multiple search, parameters array

            return function (val) {
                var l = value.length;
                while(l--) {
                    if(val.indexOf(value[l]) === -1)
                        return false;
                }
                return  true;
            };
        }
    }, LikeIgnoreCase: function (value) {
        var valueCaseInsensitive='';
        if (!value.isArray) {
            //normal search, single string parameter
            valueCaseInsensitive = value.toUpperCase();
            return function (val) {
                return val.toUpperCase().indexOf(valueCaseInsensitive) > -1;
            };
        } else {
            //multiple search, parameters array

            return function (val) {
                var l = value.length;
                while(l--) {
                    valueCaseInsensitive = value[l].toUpperCase();
                    if(val.toUpperCase().indexOf(valueCaseInsensitive) === -1)
                        return false;
                }
                return  true;
            };
        }
    }
};

if (!Array.prototype.RunEachParalell) {
    Array.prototype.RunEachParalell = function (task, quantProcesses, callback) {
        if (!self.Worker) { //if no workers supported, switch to normal RunEach
            return this.RunEach(task, this, callback);
        }
        var that = this;
        var i, l = task.length, startFrom;
        var paralellId = "RunEachParalell_" + Math.floor((Math.random() * 1000000000) + 1);
        window.pa.paEachParalellsHelper.currentParalellIds[paralellId] = {
            CompletedTasks: 0,
            TotalProcesses: quantProcesses
        };

        var partsLength = parseInt(this.length / quantProcesses);
        var bkpQuantProcesses = quantProcesses;
        while (quantProcesses--) {
            //for (i = 0; i < quantProcesses; i++) {
            startFrom = bkpQuantProcesses - quantProcesses * partsLength;
            //console.log("startFrom " + startFrom);
            setTimeout(function () {
                that.slice(startFrom, startFrom + partsLength).RunInWorker(task, function () {
                    window.pa.paEachParalellsHelper.currentParalellIds[paralellId].CompletedTasks++;
                    if (window.pa.paEachParalellsHelper.CheckParalellTaskStates(paralellId)) {
                        if (callback) callback();
                    }
                });
            }, 0); // jshint ignore:line
        }
    };
}

if (!Array.prototype.isArray) {
    Array.prototype.isArray = true;
}

if (!Array.prototype.Where) {
    Array.prototype.Where = function (whereConditions, keepOrder) {
        var i, l = this.length, item, result = [], realConditions = [], fc;

        if (typeof whereConditions === 'object' && !(whereConditions.isArray)) {
            fc = window.pa.paWhereHelper.FillConditions
            //normal array of conditions
            for (var property in whereConditions) {
                if (whereConditions.hasOwnProperty(property)) {
                    realConditions.push({
                        column: property,
                        condition: whereConditions[property]
                    });
                }
            }
            if (keepOrder) {
                for (i = 0; i < l; i++) {
                    item = this[i];
                    if (fc(item, realConditions))
                        result.push(item);
                }
            } else {
                while (l--) {
                    item = this[l];
                    if (fc(item, realConditions))
                        result.push(item);
                }
            }
        } else {
            //it's something else, an EqualTo
            if (keepOrder) {
                for (i = 0; i < l; i++) {
                    item = this[i];
                    if (whereConditions(item))
                        result.push(item);
                }
            } else {
                while (l--) {
                    item = this[l];
                    if (whereConditions(item))
                        result.push(item);
                }
            }
        }
        return result;
    };
}
