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

if (!Array.prototype.GetByProperty) {
    Array.prototype.GetByProperty = function (valueToSearchFor) {// jshint ignore:line
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

if (!Array.prototype.GetByProperty) {
    Array.prototype.GetByProperty = function (valueToSearchFor) {// jshint ignore:line
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
        },
        // The following function is a copy of the of the value_equals utiliy of
        // the toubkal project. 
        // https://github.com/detky/toubkal/blob/master/lib/util/value_equals.js
        //
        /* -----------------------------------------------------------------------------------------
           equals( a, b [, enforce_properties_order, cyclic] )
   
           Returns true if a and b are deeply equal, false otherwise.
   
           Parameters:
             - a (Any type): value to compare to b
             - b (Any type): value compared to a
   
           Optional Parameters:
             - enforce_properties_order (Boolean): true to check if Object properties are provided
               in the same order between a and b
     
             - cyclic (Boolean): true to check for cycles in cyclic objects
   
           Implementation:
             'a' is considered equal to 'b' if all scalar values in a and b are strictly equal as
             compared with operator '===' except for these two special cases:
               - 0 === -0 but are not equal.
               - NaN is not === to itself but is equal.
     
             RegExp objects are considered equal if they have the same lastIndex, i.e. both regular
             expressions have matched the same number of times.
     
             Functions must be identical, so that they have the same closure context.
     
             "undefined" is a valid value, including in Objects
     
             106 automated tests.
     
             Provide options for slower, less-common use cases:
     
               - Unless enforce_properties_order is true, if 'a' and 'b' are non-Array Objects, the
                 order of occurence of their attributes is considered irrelevant:
                   { a: 1, b: 2 } is considered equal to { b: 2, a: 1 }
       
               - Unless cyclic is true, Cyclic objects will throw:
                   RangeError: Maximum call stack size exceeded
        */
        equals: function (a, b, enforce_properties_order, cyclic) {
            return a === b       // strick equality should be enough unless zero
              && a !== 0         // because 0 === -0, requires test by _equals()
              || _equals(a, b) // handles not strictly equal or zero values
            ;
            function _equals(a, b) {
                // a and b have already failed test for strict equality or are zero

                var s, l, p, x, y;

                // They should have the same toString() signature
                if ((s = toString.call(a)) !== toString.call(b)) return false;

                switch (s) {
                    default: // Boolean, Date, String
                        return a.valueOf() === b.valueOf();

                    case '[object Number]':
                        // Converts Number instances into primitive values
                        // This is required also for NaN test bellow
                        a = +a;
                        b = +b;

                        return a ?         // a is Non-zero and Non-NaN
                            a === b
                          :                // a is 0, -0 or NaN
                            a === a ?      // a is 0 or -O
                            1 / a === 1 / b    // 1/0 !== 1/-0 because Infinity !== -Infinity
                          : b !== b        // NaN, the only Number not equal to itself!
                        ;
                        // [object Number]

                    case '[object RegExp]':
                        return a.source == b.source
                          && a.global == b.global
                          && a.ignoreCase == b.ignoreCase
                          && a.multiline == b.multiline
                          && a.lastIndex == b.lastIndex
                        ;
                        // [object RegExp]

                    case '[object Function]':
                        return false; // functions should be strictly equal because of closure context
                        // [object Function]

                    case '[object Array]':
                        if (cyclic && (x = reference_equals(a, b)) !== null) return x; // intentionally duplicated bellow for [object Object]

                        if ((l = a.length) != b.length) return false;
                        // Both have as many elements

                        while (l--) {
                            if ((x = a[l]) === (y = b[l]) && x !== 0 || _equals(x, y)) continue;

                            return false;
                        }

                        return true;
                        // [object Array]

                    case '[object Object]':
                        if (cyclic && (x = reference_equals(a, b)) !== null) return x; // intentionally duplicated from above for [object Array]

                        l = 0; // counter of own properties

                        if (enforce_properties_order) {
                            var properties = [];

                            for (p in a) {
                                if (a.hasOwnProperty(p)) {
                                    properties.push(p);

                                    if ((x = a[p]) === (y = b[p]) && x !== 0 || _equals(x, y)) continue;

                                    return false;
                                }
                            }

                            // Check if 'b' has as the same properties as 'a' in the same order
                            for (p in b)
                                if (b.hasOwnProperty(p) && properties[l++] != p)
                                    return false;
                        } else {
                            for (p in a) {
                                if (a.hasOwnProperty(p)) {
                                    ++l;

                                    if ((x = a[p]) === (y = b[p]) && x !== 0 || _equals(x, y)) continue;

                                    return false;
                                }
                            }

                            // Check if 'b' has as not more own properties than 'a'
                            for (p in b)
                                if (b.hasOwnProperty(p) && --l < 0)
                                    return false;
                        }

                        return true;
                        // [object Object]
                } // switch toString.call( a )
            } // _equals()

            /* -----------------------------------------------------------------------------------------
               reference_equals( a, b )
               
               Helper function to compare object references on cyclic objects or arrays.
               
               Returns:
                 - null if a or b is not part of a cycle, adding them to object_references array
                 - true: same cycle found for a and b
                 - false: different cycle found for a and b
               
               On the first call of a specific invocation of equal(), replaces self with inner function
               holding object_references array object in closure context.
               
               This allows to create a context only if and when an invocation of equal() compares
               objects or arrays.
            */
            function reference_equals(a, b) {
                var object_references = [];

                return (reference_equals = _reference_equals)(a, b);

                function _reference_equals(a, b) {
                    var l = object_references.length;

                    while (l--)
                        if (object_references[l--] === b)
                            return object_references[l] === a;

                    object_references.push(a, b);

                    return null;
                } // _reference_equals()
            } // reference_equals()
        } // equals()
    }, auxiliaryFunctions: {
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
        }, EqualTo: function (object, func) {
            return function (val) {
                if (func) {
                    return func(val, object);
                } else {
                    return pa.paWhereHelper.value_equals(object, val);
                }
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
                        if (whereConditions(item)) {
                            result.push(item);
                        }
                    }
                } else {
                    while (l--) {
                        item = this[l];
                        if (whereConditions(item)) {
                            result.push(item);
                        }
                    }
                }
            }
        }
        return result;
    };
}

(function () {
    //Register all Pa auxiliary functions to make them accessible through the window object and window.pa object
    //If a window accessor is already taken and cannot be set, warn the user.
    var obj = window.pa.auxiliaryFunctions;
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            window.pa[p] = obj[p];
            if (!window[p]) {
                window[p] = obj[p];
            } else {
                console.warn('property window.' + p + ' already exists. PowerArrayFunction pa.' + p + ' cannot register this function on window scope. However, you can still using it by calling "pa.' + p + '"');
            }
        }
    }
})();
