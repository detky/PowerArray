// JavaScript source code
if (!Array.prototype.getPropertyFlat) {
    Array.prototype.getPropertyFlat = function (property, keepOrder, includeDuplicates, includeUndefineds) { // jshint ignore:line
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
    Array.prototype.getByProperty = function (valueToSearchFor) {// jshint ignore:line
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
    Array.prototype.getIndexByProperty = function (valueToSearchFor) {// jshint ignore:line
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
                // ReSharper disable once CoercedEqualsUsing
                if (ia + 1 === la && tmpObj == valueToSearchFor) { // jshint ignore:line
                    return io;
                }
            }
        }
        return -1;
    };
}

if (!Array.prototype.getByProperty) {
    Array.prototype.getByProperty = function (valueToSearchFor) {// jshint ignore:line
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
    Array.prototype.RunEach = function (task, callback) {// jshint ignore:line
        var l = this.length;
        while (l--) {
            task(this[l]);
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
                //conditions can be functions or single values, if there are single values, they have to ve evaluated by
                //===. if they are functions everything should continue as by default
                if (typeof condition.condition !== 'function') { //transforms an explicit value into an === evaluation
                    condition.condition = pa.EqualTo3(condition.condition);
                }

                if (!condition.condition(item[condition.column])) {
                    return false;
                }
            }
            return true;
        },
        ProcessConditionObject: function (whereConditions, keepOrder, isArrayOfConditions) {
            //to call this function, "this" should be an array!
            var fc = window.pa.paWhereHelper.FillConditions,
                i, w, item, lw, assert, l = this.length, result = [];

            if (!isArrayOfConditions) {
                //whereConditions is not an array, but i need it in that form
                whereConditions = [whereConditions];
            }

            for (i = 0, l = whereConditions.length; i < l; i++) {
                var whereConditionObject = whereConditions[i], realConditions = [];
                for (var property in whereConditionObject) {
                    if (property !== 'realConditions' && whereConditionObject.hasOwnProperty(property)) {
                        //transform the keys into a better object with properties Column and Condition
                        realConditions.push({
                            column: property,
                            condition: whereConditionObject[property]
                        });
                    }
                }
                whereConditionObject.realConditions = realConditions; //attach the result of this loop direct to the whereConditionObject
            }
            l = this.length;
            if (keepOrder) {
                for (i = 0; i < l; i++) {
                    item = this[i];
                    //aca iterar por los objetos con condiciones, 
                    //y si uno se cumple, ya dar como positivo el item
                    //y no evaluar las demas. Las condiciones funcionan como OR
                    //Si una se cumple ya alcanza
                    for (w = 0, lw = whereConditions.length; w < lw; w++) {
                        assert = fc(item, whereConditions[w].realConditions);
                        if (assert) {
                            break;
                        }
                    }
                    if (assert) {
                        result.push(item);
                    }
                }
            } else {
                while (l--) {
                    item = this[l];
                    for (w = 0, lw = whereConditions.length; w < lw; w++) {
                        assert = fc(item, whereConditions[w].realConditions);
                        if (assert) {
                            result.push(item);
                            break;
                        }
                    }
                }
            }
            return result;
        }

    },

    BiggerThan: function (value) {
        return function (val) {
            return val > value;
        };
    },
    SmallerThan: function (value) {
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
    In: function (list) {
        return function (val) {
            return list.indexOf(val) !== -1; // jshint ignore:line
        };
    },
    NotIn: function (list) {
        return function (val) {
            return list.indexOf(val) === -1; // jshint ignore:line
        };
    }
    , EqualTo: function (object, func) {
        return function (val) {
            return func(val, object);
        };
    }, Like: function (value) {
        if (!value.paIsArray) {
            //normal search, single string parameter
            return function (val) {
                return val.indexOf(value) > -1;
            };
        } else {
            //multiple search, parameters array

            return function (val) {
                var l = value.length;
                while (l--) {
                    if (val.indexOf(value[l]) === -1) {
                        return false;
                    }
                }
                return true;
            };
        }
    }, NotLike: function (value) {
        if (!value.paIsArray) {
            //normal search, single string parameter
            return function (val) {
                return val.indexOf(value) === -1;
            };
        } else {
            //multiple search, parameters array

            return function (val) {
                var l = value.length;
                while (l--) {
                    if (val.indexOf(value[l]) > -1) {
                        return false;
                    }
                }
                return true;
            };
        }
    }, LikeIgnoreCase: function (value) {
        var valueCaseInsensitive = '';
        if (!value.paIsArray) {
            //normal search, single string parameter
            valueCaseInsensitive = value.toUpperCase();
            return function (val) {
                return val.toUpperCase().indexOf(valueCaseInsensitive) > -1;
            };
        } else {
            //multiple search, parameters array

            return function (val) {
                var l = value.length;
                while (l--) {
                    valueCaseInsensitive = value[l].toUpperCase();
                    if (val.toUpperCase().indexOf(valueCaseInsensitive) === -1) {
                        return false;
                    }
                }
                return true;
            };
        }
    }, NotLikeIgnoreCase: function (value) {
        var valueCaseInsensitive = '';
        if (!value.paIsArray) {
            //normal search, single string parameter
            valueCaseInsensitive = value.toUpperCase();
            return function (val) {
                return val.toUpperCase().indexOf(valueCaseInsensitive) === -1;
            };
        } else {
            //multiple search, parameters array
            return function (val) {
                var l = value.length;
                while (l--) {
                    valueCaseInsensitive = value[l].toUpperCase();
                    if (val.toUpperCase().indexOf(valueCaseInsensitive) > -1) {
                        return false;
                    }
                }
                return true;
            };
        }
    }
};

if (!Array.prototype.RunEachParalell) {
    Array.prototype.RunEachParalell = function (task, quantProcesses, callback) {// jshint ignore:line
        if (!self.Worker) { //if no workers supported, switch to normal RunEach
            return this.RunEach(task, this, callback);
        }
        var that = this, startFrom;
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
                        if (callback) {
                            callback();
                        }
                    }
                });
            }, 0); // jshint ignore:line
        }
    };
}

if (!Array.prototype.paIsArray) {
    Array.prototype.paIsArray = true;// jshint ignore:line
}

if (!Array.prototype.Where) {
    Array.prototype.Where = function (whereConditions, keepOrder) {// jshint ignore:line
        var i, l = this.length, item, result = [];
        if (typeof whereConditions === 'object' && !(whereConditions.paIsArray)) {
            //If It's an object, but not an array, it's an eplicit object with N filters
            result = pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, false);
        } else {
            //At this point, whereConditions could be a function (a custom function), an pa.EqualTo, OR an Array of condition-objects
            if (whereConditions.paIsArray) {
                //It's a conditions array
                result.push.apply(result, pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, true));
            } else {
                //whereConditions it's a function. It could be a custom function on the pa standard EqualTo (that works
                //different than any other standard function)
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
        }
        return result;
    };
}
