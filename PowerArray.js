var mainContainer, module = module || undefined, isModule = false, isBrowser = true;
if (typeof module !== "undefined") {
    module.exports = {};
    isModule = true;
}

if (typeof window === 'object') {
  mainContainer = window;
} else {
  isBrowser = false;
  mainContainer = global;
}

mainContainer.pa = function (object) {
    if (object.constructor === Array || object.paIsArray) {
        return new paArray(object);
    } else {
        console.warn('PowerArray => The passed object does is not natively an array. Trying to handle it as an array-like object...')
        if ((mainContainer.ol !== undefined && ol.Collection) && object instanceof ol.Collection) {
            console.log('Compatible openlayers object detected (ol.Collection)');
            return paArray(object.getArray());
        }
        if (object.length === undefined) {
            throw new Error('PowerArray => The passed object is not an array, or usable as such.');
        }
        return new paArray(object);
    }
};
/*
functions directly bound to the pa object:

 */
pa.Range =  function(from, to, step) {
    var result = [], i, l, currVal = from;
    while (currVal < to) {
        result.push(currVal);
        currVal += step;
    }
    result.push(to);
    return result;
};
mainContainer.pa.config = {
  defaults : {
    defaultPromiseTimeout : 10000
  }
};
mainContainer.pa.utils = {}
mainContainer.pa.utils = {
    DataTypes: {
        String: 'String',
        Number: 'Number',
        Date: 'Date',
        Boolean: 'Boolean',
        Object: 'Object',
        ArrayOfObjects: 'ArrayOfObjects',
        ArrayOfPrimitives: 'ArrayOfPrimitives',
        RegExp: 'RegExp',
        Function: 'Function',
        Null: 'Null',
        Undefined: 'Undefined'
    }, IsArrayOfObjects: function (val) {
        var l;
        if (!val.paIsArray || val.length === undefined) {
            return false;
        }
        l = val.length;
        while (l--) {
            //TODO: this could fail in collections having objects but one undefined
            if (pa.utils.GetTypeOf(val[l]) !== pa.utils.DataTypes.Object) {
                return false;
            }
        }
        return true;
    },
    /**
     * Parses a string to boolean value. This function searches strictly for the strings "true", "True", "trUE", "falsE", etc.
     * @param str the string to be evaluated
     * @param throwIfNotMatch Boolean, if true, an exception will be raised if the string does not match. If false, null will be returned
     * @returns {*} boolean value if string matches, null if not
     */
    parseBoolean: function (str, throwIfNotMatch) {
        if (!pa.utils.isNullEmptyOrUndefined(str)) {
            var strU = str.toUpperCase();
            if (strU === "TRUE") {
                return true;
            }
            if (strU === "FALSE") {
                return false;
            }
        }

        if (throwIfNotMatch) {
            throw new Error("The string passed to function parseBoolean (" + str + ") doesn't match with any valid string");
        }

        return null;
    }, /**
     * evaluate if a number or a string is undefined "" or null and return true or false
     * @param what the element to evaluate
     * @returns {boolean}
     * @constructor
     */
    isNullEmptyOrUndefined: function (what) {
        // null has to be evaluated before checking typeof
        if (what === null) {
            return true;
        }
        var t = typeof what;
        if (t === "boolean") {
            return false;
        }

        if (t !== "number" && t !== "string" && t !== "undefined") {
            throw new Error("PowerArray => The function IsNullOrEmpty is designed to evaluate strings and numbers, but something different was provided (" + t + ")");
        }

        if (t === "number" && what === 0) {
            return false;
        }

        if (!what) {
            return true;
        }
        return (what + "").length === 0;
    },
    GetTypeOf: function (element, analyzeData) {

        if (element === null) {
            return pa.utils.DataTypes.Null;
        }

        if (element === undefined) {
            return pa.utils.DataTypes.Undefined;
        }
        var to = typeof element;
        switch (to) {
            case 'string':
                return pa.utils.DataTypes.String;
            case 'number':
                return pa.utils.DataTypes.Number;
            case 'boolean':
                return pa.utils.DataTypes.Boolean;
            case 'object':
                //check hidden types
                if (element instanceof String) {
                    return pa.utils.DataTypes.String;
                }

                if (element instanceof Date) {
                    return pa.utils.DataTypes.Date;
                }

                if (element instanceof Number) {
                    return pa.utils.DataTypes.Number;
                }

                if (element instanceof RegExp) {
                    return pa.utils.DataTypes.RegExp;
                }
                if (element.paIsArray) {
                    // If its an array of objects, it has to be handled different,
                    if (analyzeData && pa.utils.IsArrayOfObjects(element)) {
                        return pa.utils.DataTypes.ArrayOfObjects;
                    } else {
                        return pa.utils.DataTypes.ArrayOfPrimitives;
                    }
                }
                return pa.utils.DataTypes.Object;
            default:
                //any others
                throw new Error("PowerArray Error : Unknown Datatype!");
        }
    },
    /**
      * Determines whether a supplied value is a number.
      * @param number Any numeric value.
      */
    IsNumeric: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    IsInteger: function(num) {
        return num === parseInt(num, 10);
    },
    ArgumentsToArray: function (args, from, to) {
        var i = from | 0, l = to || args.length, result = [];
        for (; i < l; i++) {
            result.push(args[i]);
        }
        return result;
    },
    generateUid: function(prefix, sufix) {
        function getRandom4Chars() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return ((prefix !== undefined) ? prefix +'-'   : '') +
                  getRandom4Chars() + '-' +
                  getRandom4Chars() + '-' +
                  getRandom4Chars() +
                  getRandom4Chars() + ((sufix !== undefined) ? '-' + sufix : '');
    }
};

mainContainer.pa.paEachParalellsHelper = {
    CheckParalellTaskStates: function (paralellId) {
        var paralell = mainContainer.pa.paEachParalellsHelper.currentParalellIds[paralellId];
        return paralell.CompletedTasks === paralell.TotalProcesses;
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
};
mainContainer.pa.paEachInPartsHelper = {
    partsStates : {
      Initial : 0,
      Processing: 1,
      Done: 2
    },
    //returns true if the task is done
    checkPartsStateById: function (inPartsId) {
        var paralell = pa.paEachInPartsHelper.currentEachInPartsIds[inPartsId];
        return paralell.CompletedTasks === paralell.parts.length;
    },
    currentEachInPartsIds: {},
    getNewInPartsId : function() {
      var newPartsId = pa.utils.generateUid("RunEachInParts");
      pa.paEachInPartsHelper.currentEachInPartsIds[newPartsId] = { parts: [], CompletedTasks : 0 };
      return newPartsId;
    },
    registerPart: function(partsId, partialArray, task, partialArrayOrderInOriginalArray, keepOrder) {
      pa.paEachInPartsHelper.currentEachInPartsIds[partsId].parts.push({
        state: pa.paEachInPartsHelper.partsStates.Initial,
        partialArray : partialArray,
        task: task,
        partialArrayOrderInOriginalArray : partialArrayOrderInOriginalArray,
        result : undefined
      });
    },
    getNextPartToProcess: function(partsId) {
      return pa.paEachInPartsHelper.currentEachInPartsIds[partsId].parts.First({
          state : pa.paEachInPartsHelper.partsStates.Initial
      });
    },
    buildInPartsResult : function(partsId, keepOrder)  {
        var result =[], parts = pa.paEachInPartsHelper
                              .currentEachInPartsIds[partsId]
                              .parts
                              .Sort({
                                partialArrayOrderInOriginalArray: Sort.Ascending
                              });
        parts.RunEach(function(part) {
          result = result.concat.apply(result,part.result);
        }, undefined, keepOrder);
        return result;
    },
    execute : function(partsId, keepOrder, partsCallback, promise, delayBetweenParts) {
      var result;
      var nextPartToProcess = pa.paEachInPartsHelper.getNextPartToProcess(partsId);
      var somethingWrongTimeout = setTimeout(function() {
          promise.reject("Promise has timed out");
        },
        pa.config.defaults.defaultPromiseTimeout
      );

      nextPartToProcess.state = pa.paEachInPartsHelper.partsStates.Processing;
      nextPartToProcess.result = nextPartToProcess.partialArray.RunEach(nextPartToProcess.task, function(lastResult) {
        console.log("Starting to process part "+ nextPartToProcess.partialArrayOrderInOriginalArray);
        nextPartToProcess.state = pa.paEachInPartsHelper.partsStates.Done;
        pa.paEachInPartsHelper.currentEachInPartsIds[partsId].CompletedTasks++;

          if(pa.paEachInPartsHelper.checkPartsStateById(partsId)) {
            nextPartToProcess.result = lastResult; //this is because how the RunEach method works.
            console.log('task ' + partsId + ' is done!');
            result = pa.paEachInPartsHelper.buildInPartsResult(partsId, keepOrder);
            //if(promise)  {
              clearTimeout(somethingWrongTimeout);
              console.debug('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
              promise.resolve(result);
            //}
          } else {
            if(partsCallback) {
                partsCallback();
            }
            setTimeout(function(){
              pa.paEachInPartsHelper.execute(partsId, keepOrder, partsCallback, promise, delayBetweenParts);
            }, delayBetweenParts);
          }

        }, keepOrder);
      }
};
mainContainer.pa.paWhereHelper = {
    FillConditions: function (item, conditions) {
        var l = conditions.length, condition, result, subArray;
        while (l--) {
            condition = conditions[l];
            //conditions can be functions or single values, if there are single values, they have to ve evaluated by
            //===. if they are functions everything should continue as by default
            if (typeof condition.condition !== 'function') {
                //if the condition is an object, it's necessary to handle it different.
                //If that's the case we start internally another Where() call, but we know that we are
                //evaluating pro Where call just ONE item and it could be very expensive. TODO: optimize this somehow!
                if (mainContainer.pa.utils.GetTypeOf(condition.condition) === mainContainer.pa.utils.DataTypes.Object) {
                    var itemType = mainContainer.pa.utils.GetTypeOf(item[condition.column], true);

                    switch (itemType) {
                        case mainContainer.pa.utils.DataTypes.ArrayOfObjects:
                        case mainContainer.pa.utils.DataTypes.ArrayOfPrimitives:

                            result = item[condition.column].Where.call(item[condition.column], condition.condition, false, true);
                            //when sending true als "justFirst", Where() will return the first found element, not an array,
                            //because i'm sending true for performance reasons, it's necessary to evaluate the result with undefined
                            //instead of: "return result.length > 0;" it's now "return result !== undefined;"
                            if (result !== undefined) {
                                continue;
                            } else {
                                return false;
                            }
                            break;
                        case mainContainer.pa.utils.DataTypes.Object:
                            subArray = pa([item[condition.column]]);
                            result = subArray.Where.call(subArray, condition.condition, false, true);
                            if (result !== undefined) {//See previous comment about justFirst param
                                continue;
                            } else {
                                return false;
                            }
                    }
                }
                condition.condition = pa.EqualTo3(condition.condition); //transforms an explicit value into an === evaluation
            }

            if (!item || !condition.condition(item[condition.column])) { //if one condition is not fulfilled, just return false;
                return false;
            }
        }
        return true;
    },
    ProcessConditionObject: function (whereConditions, keepOrder, isArrayOfConditions, justFirst, justIndexes) {
        //to call this function, "this" should be an array!
        var fc = mainContainer.pa.paWhereHelper.FillConditions,
            i, w, item, lw, assert, l, result = [];

        if (!isArrayOfConditions) {
            //whereConditions is not an array, but i need it in that form
            whereConditions = [whereConditions];
        }

        //Where conditions must be processed in order
        for (i = 0, l = whereConditions.length; i < l; i++) {
            var whereConditionObject = whereConditions[i], realConditions = [];
            if(typeof whereConditionObject === 'function'){
              realConditions.push({
                  column: property,
                  condition: whereConditionObject
              });
            } else {
              for (var property in whereConditionObject) {
                  if (property !== 'realConditions' && whereConditionObject.hasOwnProperty(property)) {
                      //transform the keys into a better object with properties Column and Condition

                      //if whereConditionObject[property] is an array, that means that its a multi filter for a single column, for example: array.Where({age : [GreatherThan(33), BiggerThan(21)], otherField : '33'   });
                      if (whereConditionObject[property] && whereConditionObject[property].paIsArray) {
                          /** MULTIPLE CONDITIONS FOR A SINGLE PROPERTY. Pushed on the realconditions as an AND **/
                          whereConditionObject[property].RunEach(function (subCondition) {
                              realConditions.push({
                                  column: property,
                                  condition: subCondition
                              });
                          });
                      } else {
                          realConditions.push({
                              column: property,
                              condition: whereConditionObject[property]
                          });
                      }
                  }
              }
          }

            whereConditionObject.realConditions = realConditions; //attach the result of this loop direct to the whereConditionObject
        }
        //Real conditions stored
        l = this.length;
        if (keepOrder) { //Anti DRY pattern ;( but as long as it still being small will continue this way to improve performance
            for (i = 0; i < l; i++) {
                item = this[i];
                for (w = 0, lw = whereConditions.length; w < lw; w++) {
                    assert = fc(item, whereConditions[w].realConditions);
                    if (assert) {
                        break;
                    }
                }
                if (assert) {
                    if (justFirst) {
                        return (justIndexes) ? i : item;
                    }
                    result.push((justIndexes) ? i : item);
                }
            }
        } else {
            while (l--) {
                item = this[l];
                for (w = 0, lw = whereConditions.length; w < lw; w++) {
                    assert = fc(item, whereConditions[w].realConditions);
                    if (assert) {
                        if (justFirst) {
                            return (justIndexes) ? l : item;
                        }
                        result.push((justIndexes) ? l : item);
                        break;
                    }
                }
            }
        }

        if (justFirst) {
            //Because in the loops, any positive evaluation makes a return.
            //At this point there was no matches.
            return undefined;
        }

        return result;
    },
    // The following function is a copy of the of the value_equals utiliy of
    // the toubkal project.
    // https://github.com/detky/toubkal/blob/master/lib/util/value_equals.js
    equals: function (a, b, enforce_properties_order, cyclic) {
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
        return a === b       /* strick equality should be enough unless zero*/ // jshint ignore:line
            && a !== 0         /* because 0 === -0, requires test by _equals()*/   // jshint ignore:line
            || _equals(a, b) /* handles not strictly equal or zero values*/   // jshint ignore:line
        ;
        function _equals(a, b) {
            // a and b have already failed test for strict equality or are zero

            var s, l, p, x, y;

            // They should have the same toString() signature
            if ((s = toString.call(a)) !== toString.call(b)) return false; // jshint ignore:line

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
                    return a.source == b.source // jshint ignore:line
                        && a.global == b.global // jshint ignore:line
                        && a.ignoreCase == b.ignoreCase // jshint ignore:line
                        && a.multiline == b.multiline // jshint ignore:line
                        && a.lastIndex == b.lastIndex // jshint ignore:line
                    ;
                    // [object RegExp]

                case '[object Function]':
                    return false; // functions should be strictly equal because of closure context
                    // [object Function]

                case '[object Array]':
                    // intentionally duplicated bellow for [object Object]
                    if (cyclic && (x = reference_equals(a, b)) !== null) return x;  // jshint ignore:line

                    if ((l = a.length) != b.length) return false; // jshint ignore:line
                    // Both have as many elements

                    while (l--) {
                        if ((x = a[l]) === (y = b[l]) && x !== 0 || _equals(x, y)) continue; // jshint ignore:line

                        return false;
                    }

                    return true;
                    // [object Array]

                case '[object Object]':
                    // intentionally duplicated from above for [object Array]
                    if (cyclic && (x = reference_equals(a, b)) !== null) return x; // jshint ignore:line

                    l = 0; // counter of own properties

                    if (enforce_properties_order) {
                        var properties = [];

                        for (p in a) {
                            if (a.hasOwnProperty(p)) {
                                properties.push(p);

                                if ((x = a[p]) === (y = b[p]) && x !== 0 || _equals(x, y)) continue; // jshint ignore:line

                                return false;
                            }
                        }

                        // Check if 'b' has as the same properties as 'a' in the same order
                        for (p in b)
                            if (b.hasOwnProperty(p) && properties[l++] != p) // jshint ignore:line
                                return false; // jshint ignore:line
                    } else {
                        for (p in a) {
                            if (a.hasOwnProperty(p)) {
                                ++l;

                                if ((x = a[p]) === (y = b[p]) && x !== 0 || _equals(x, y)) continue; // jshint ignore:line

                                return false;
                            }
                        }

                        // Check if 'b' has as not more own properties than 'a'
                        for (p in b)
                            if (b.hasOwnProperty(p) && --l < 0) // jshint ignore:line
                                return false; // jshint ignore:line
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

            return (reference_equals = _reference_equals)(a, b); // jshint ignore:line

            function _reference_equals(a, b) {
                var l = object_references.length;

                while (l--)
                    if (object_references[l--] === b) // jshint ignore:line
                        return object_references[l] === a; // jshint ignore:line

                object_references.push(a, b);

                return null;
            } // _reference_equals()
        } // reference_equals()
    } // equals()
};


mainContainer.pa.auxiliaryFunctions = {
    Contains: function (value, enforcePropsOrder, cyclic) {
        return function (val) {
            if (!val.paIsArray) {
                throw new Error("PowerArray error => parameter val passed to Contains function should be an array, only they can 'contain' something.");
            }
            var l = val.length, isIndexable = false;
            var typeToEvaluate = typeof value;

            switch (typeToEvaluate) {
                case "number":
                case "string":
                case "boolean":
                    isIndexable = true;
                    break;
                default: //anything else
                    //duck type to exclude dates
                    if (typeof value.getMonth === 'function') {
                        isIndexable = true;
                        break;
                    }
                    isIndexable = false;
                    break;
            }
            if (isIndexable) {
                return val.indexOf(value) > -1;
            }

            while (l--) {
                if (pa.paWhereHelper.equals(val[l], value, enforcePropsOrder, cyclic)) {
                    return true;
                }
            }
            return false;

        };
    },
    Between: function (from, to, excludeExactMatches) {
        if (to < from) {
            console.warn("PowerArray warn => Parameters 'from' and 'to' passed to function Between() makes no sense: Parameter 'to' (" + to + ") should be greater than from (" + from + ")");
        }
        if (!excludeExactMatches) {
            return function (val) {
                return val >= from && val <= to;
            };
        } else {
            return function (val) {
                return val > from && val < to;
            };
        }
    },
    EndsWith: function (value) {
        var value2 = value + '';
        return function (endsWithString) {

            endsWithString = endsWithString + '';
            return endsWithString.substr(endsWithString.length - (value2).length) === value2;
        };
    },
    StartsWith: function (value) {
        var value2 = value + '';
        return function (val) {
            val = val + '';
            return val.indexOf(value2) === 0;
        };
    },
    GreaterOrEqualThan: function (value) {
        return function (val) {
            return val >= value;
        };
    },
    GreaterThan: function (value) {
        return function (val) {
            return val > value;
        };
    },
    SmallerOrEqualThan: function (value) {
        return function (val) {
            return val <= value;
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
    NotEqualTo3: function (value) {
        return function (val) {
            return val !== value;
        };
    },
    EqualTo2: function (value) {
        return function (val) {
            return val == value; // jshint ignore:line
        };
    },
    NotEqualTo2: function (value) {
        return function (val) {
            return val != value; // jshint ignore:line
        };
    },
    IsUndefined: function () {
        return function (val) {
            return val === undefined;
        };
    },
    IsDefined: function () {
        return function (val) {
            return val !== undefined;
        };
    },
    In: function (list) {
        //TODO: investigar si esta function pierde performance al no estar devolviendo una
        //funciï¿½n como todo el resto.

        if (arguments.length > 1) {
            list = Array.prototype.slice.call(arguments);
        }
        return function (val) {
            return list.indexOf(val) !== -1; // jshint ignore:line
        };
    },
    NotIn: function (list) {
        if (arguments.length > 1) {
            list = Array.prototype.slice.call(arguments);
        }
        return function (val) {
            return list.indexOf(val) === -1; // jshint ignore:line
        };
    },
    EqualTo: function (object, func, enforcePropsOrder, cyclic) {
        return function (val) {
            if (func) {
                return func(val, object);
            } else {
                return pa.paWhereHelper.equals(object, val, enforcePropsOrder, cyclic);
            }
        };
    },
    Like: function (value) {
        if (!value.paIsArray) {
            //normal search, single string parameter
            if (arguments.length > 1) {
                value = Array.prototype.slice.call(arguments);
            } else {
                value = [value];
            }
        }
        return function (val) {
            var l = value.length;
            while (l--) {
                if (val.indexOf(value[l]) === -1) {
                    return false;
                }
            }
            return true;
        };
    },
    NotLike: function (value) {
        if (!value.paIsArray) {
            //normal search, single string parameter
            if (arguments.length > 1) {
                value = Array.prototype.slice.call(arguments);
            } else {
                value = [value];
            }
        }
        return function (val) {
            var l = value.length;
            while (l--) {
                if (val.indexOf(value[l]) > -1) {
                    return false;
                }
            }
            return true;
        };
    },
    LikeIgnoreCase: function (value) {
        var valueCaseInsensitive = '';
        if (!value.paIsArray) {
            //normal search, single string parameter
            if (arguments.length > 1) {
                value = Array.prototype.slice.call(arguments);
            } else {
                value = [value];
            }
        }
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
    },
    NotLikeIgnoreCase: function (value) {
        var valueCaseInsensitive = '';
        if (!value.paIsArray) {
            //normal search, single string parameter
            if (arguments.length > 1) {
                value = Array.prototype.slice.call(arguments);
            } else {
                value = [value];
            }
        }
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
    },
    IsTruthy: function () {
        return function (val) {
            return (val) ? true : false;
        };
    },
    IsFalsy: function () {
        return function (val) {
            return (val) ? false : true;
        }
    },
    IsTrue: function () {
        return function (val) {
            return val === true;
        };
    },
    IsFalse: function () {
        return function (val) {
            return val === false;
        }
    },
    IsEmpty: function () {
        return function (val) {
            return val === undefined || val === '' || val === null || val === 0 || (val.paIsArray && val.length === 0);
        }
    },
    IsNotEmpty: function () {
        return function (val) {
            if (val === undefined || val === null) {
                return false;
            }
            return (val + "").length > 0;
        }
    },
    IsNull: function () {
        return function (val) {
            return val === null;
        }
    },
    IsNotNull: function () {
        return function (val) {
            return val !== null;
        }
    },
    IsNaN: function () {
        return function (val) {
            return isNaN(val);
        }
    },
    IsNotNaN: function () {
        return function (val) {
            return !isNaN(val);
        }
    }
};

mainContainer.pa.prototypedFunctions_Array = {
    getIndexByProperty: function (valueToSearchFor) {// jshint ignore:line
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
         *  var namedPaul = findDistinctValuesOnObjectCollectionByProperty(theCarsCollection, 'Paul', 'getPassengers()','name');
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
    },
    getPropertyFlat: function (property, keepOrder, includeDuplicates, includeUndefineds) { // jshint ignore:line
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
    },
    GetByProperty: function (valueToSearchFor) {// jshint ignore:line
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
         *  var passengersNamedPaul = carsArray.getByProperty('Paul', 'getPassengers()','name');
         *
         * @param objectsArray
         * @param valueToSearchFor
         * @returns {Array}
         */
        var objectsArray = this;
        var results = [];
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
    },
    /**
     * Executes a function (task) on each element of the array (this).
     * @param {} task       A function to execute. It will receive 3 parameters:
     *                          1) one array item
     *                          2) index of the passed item (param 1) on the original array.
     *                          3) the complete array. Warning, you should not change it. See it as read-only!
     *
     * @param {} callback   A callback function to be executed after processing all array items.
     *                      It will get as first parameter the results-array (that lately will be
     *                      returned as result of this function).
     *                       *****************************PLEASE READ**********************************
     *                      *** If the callback function returns something different than undefined, ***
     *                      ***      the results-array will be replaced with that return value       ***
     *                       **************************************************************************
     * @param {} keepOrder
     * @returns             array of the result of each executed task (keeping same position as on original
     *                      array, regardless order). Excepion: when the execution of the callback function
     *                      returns something different than undefined, that will be returned instead of the
     *                      . If not,
     */

      RunEach: function (task, callback, keepOrder, progress) {// jshint ignore:line
        var l = this.length, i = 0, result = new Array(this.length), tmp;
        if (!keepOrder) {
            while (l--) {
                result[l] = task(this[l], l, this);
            }
        } else {
            for (; i < l; i++) {
                result[i] = task(this[i], i, this);
            }
        }
        if (callback) {
            //if the callback function returns something,
            //the result will be overrided with that result.
            result = callback(result) || result;
        }
        return result;
    },
    RunEachInParts: function (task, keepOrder, partsCallback,  partsLength) {// jshint ignore:line
      var deferred = Q.defer();
      var that = this;
      setTimeout(function() {
                  if(!partsLength) {
                    deferred.reject('PowerArray => RunEachInParts => parameter partsLength is required.');
                  }
                  if(that.paIsArray === undefined) {
                    deferred.reject('PowerArray => RunEachInParts => this function should be executed by an array, but got something different:', this);
                    throw new Error('PowerArray => RunEachInParts => this function should be executed by an array, but got something different:');
                    return;
                  }
                  var myLength = that.length, result =[],
                  partsId = pa.paEachInPartsHelper.getNewInPartsId(),
                  partsQantDecimal = (myLength / partsLength),
                  partsQantInt = parseInt(partsQantDecimal),
                  partsQuantity = (partsQantInt === partsQantDecimal) ? partsQantInt : partsQantInt + 1 , l = partsQuantity,
                  partialArrays = [], startFrom, partialResults = new Array(partsQuantity),
                  executionsCounter = 0;

                  while (l--) {
                    startFrom = (l < 1) ? 0 : (l) * partsLength;
                    partialArrays.push(that.slice(startFrom, startFrom + partsLength));//one "portion" of the array to process
                  }
                  partialArrays.reverse();//bring it again to initial order.

                  partialArrays.RunEach(function(partialArray, i) {
                    pa.paEachInPartsHelper.registerPart(partsId, partialArray, task, i);
                  }, function(){
                    pa.paEachInPartsHelper.execute(partsId, keepOrder, partsCallback, deferred, 100);
                  });

      },0);
      return deferred.promise
    },
    RunEachParalell: function (task, callback, keepOrder, quantProcesses, requiredScripts) {// jshint ignore:line
        if (!self.Worker//if no workers supported,
            || this.length < 2) //or there is no enough data
        {
            return this.RunEach.call(this, task, callback);
        }

        try {
            /*var serializedTask = task.toString();
            if (!serializedTask) {
                console.warn("PowerArray => RunEachParalell => The passed task cannot be paralelized because it cannot be serialized. The process will continue, but will not run in paralell mode");
                return this.RunEach.call(this, task, callback);
            }*/
            JSON.stringify(task);
        } catch (e) {
            console.error("PowerArray => RunEachParalell => Unexpected error trying to serialize the passed task. Task aborted. Error => " +
                ((e.number) ? e.number : '') + " " + ((e.message) ? e.message : '')
                );
            return;
        }

        quantProcesses = quantProcesses || 3;
        var that = this, startFrom;
        var paralellId = "RunEachParalell_" + Math.floor((Math.random() * 1000000000) + 1);
        mainContainer.pa.paEachParalellsHelper.currentParalellIds[paralellId] = {
            CompletedTasks: 0,
            TotalProcesses: quantProcesses
        };
        var myLength = this.length;
        var partsLength = parseInt(myLength / quantProcesses);
        var result = new Array(myLength);
        while (quantProcesses--) {
            startFrom = (quantProcesses < 1) ? 0 : (quantProcesses) * partsLength;
            //console.log('starting from ', startFrom);
            var partialArray = that.slice(startFrom, startFrom + partsLength); //one "portion" of the array to process
            partialArray.RunTaskForSubsetInWorker(task, keepOrder, startFrom, partsLength, requiredScripts,
                function (partialResult, startIndexOnOriginalArray) {
                    //with the splice we add the first two parameters to use the partialResult as argument for following splice
                    partialResult.splice(0, 0, startIndexOnOriginalArray, partialResult.length);
                    result.splice.apply(result, partialResult);
                    mainContainer.pa.paEachParalellsHelper.currentParalellIds[paralellId].CompletedTasks++;
                    if (mainContainer.pa.paEachParalellsHelper.CheckParalellTaskStates(paralellId)) {
                        if (callback) {
                            //if the callback function returns something,
                            //the result will be overrided with that result.
                            result = callback(result) || result;
                        }
                        return result;
                    }
                });
        }
    },
    /*
    task => the function to run
    startIndexOnOriginalArray => which portion of the big array we are processing? this is the index of the first
                                 position of the sub-array (that we are getting as a part from a bigger array toprocess)
                                 on the original.
    partsLength => how big is each sub-array (we can't look at the .length here)
    requiredScripts => array with a list of the urls of the scripts that have to be loaded
    callback => as usual
    */
    RunTaskForSubsetInWorker: function (task, keepOrder, startIndexOnOriginalArray, partsLength, requiredScripts, callback) {
        var blobUrl = URL.createObjectURL(new Blob([
            'var _array, _func, _len, l; actionKeys, _result = [], indexInOriginalArray = -1;\
        var actionKeys = ' + JSON.stringify(pa.paEachParalellsHelper.actionKeys) + ';                                            \r\n\
        var eventKeys = ' + JSON.stringify(pa.paEachParalellsHelper.eventKeys) + ';                                            \r\n\
        var keepOrder = ' + keepOrder + ';                                            \r\n\
        var startIndexOnOriginalArray = ' + startIndexOnOriginalArray + ';\r\n' +
        ((requiredScripts) ? '//self.importScripts("' + requiredScripts.join('","') + '");' : '') + '                                            \r\n\
        var _func = ' + task.toString() + ';                                            \r\n\                                                                               \r\n\
                self.onmessage = function (msg) {                                            \r\n\
                   // console.info("worker got message ");\r\n\
                    var paMessage = msg.data, i=0;                                            \r\n\
                    switch (paMessage.action) {                                            \r\n\
                        case actionKeys.Runeach:                                            \r\n\
                            _array = paMessage.array;                                            \r\n\
                            _len = _array.length;                                            \r\n\
                            l = _len;                                            \r\n\
                            //console.log("startIndexOnOriginalArray:",startIndexOnOriginalArray, "length:",_len);                                                              \r\n\                                                                               \r\n\
                            //debugger; \r\n\
                            if(keepOrder) {                                                                \r\n\
                                    for(i=0;i<l;i++) {                                            \r\n\
                                        indexInOriginalArray = i + startIndexOnOriginalArray;                                            \r\n\
                                        _result.push(_func(_array[i], indexInOriginalArray));                                            \r\n\
                                    }                                                         \r\n\
                            } else {                                                                \r\n\
                                while (l--) {                                            \r\n\
                                    indexInOriginalArray = l + startIndexOnOriginalArray;                                            \r\n\
                                    _result.push(_func(_array[l], indexInOriginalArray));                                            \r\n\
                                }                                            \r\n\
                            }                                            \r\n\
                            self.postMessage({                                            \r\n\
                                event: eventKeys.RuneachDone,                                            \r\n\
                                result: _result,                                            \r\n\
                                startIndexOnOriginalArray: startIndexOnOriginalArray                                            \r\n\
                            });                                            \r\n\
                            break;                                            \r\n\
                        case actionKeys.TaskState:                                            \r\n\
                            self.postMessage({                                            \r\n\
                                event: eventKeys.TaskState,                                            \r\n\
                                value: l * _len / 100                                            \r\n\
                            });                                            \r\n\
                            break;                                            \r\n\
                    }                                            \r\n\
                };\r\n'
        ], { type: 'application/javascript' }));
        var w = new Worker(blobUrl);
        w.postMessage({
            action: pa.paEachParalellsHelper.actionKeys.Runeach,
            array: this
        });
        w.onmessage = function (e) {
            var msg = e.data;
            switch (msg.event) {
                case pa.paEachParalellsHelper.eventKeys.RuneachDone:
                    callback(msg.result, msg.startIndexOnOriginalArray);
                    w.terminate();
                    break;
                default:
                    console.error('PowerArray => RunTaskForSubsetInWorker => Unknown message received!');
            }

        };



    },

    Sort: function (sortConditions) { // jshint ignore:line
        var realConditions = [];
        var conditionType = typeof sortConditions;

        switch (conditionType) {
            case "string":
                //This call, with a first parameter of type string, should be "ASC" or "DESC"
                var condition = sortConditions.toUpperCase();
                switch (condition) {
                    case pa.Sort.Ascending:
                    case pa.Sort.Asc:
                        return this.sort(function (a, b) {
                            if (a < b) {
                                return -1;
                            } else if (a > b) {
                                return 1;
                            }
                            return 0;
                        });
                    case pa.Sort.AscendingIgnoringCase:
                    case pa.Sort.AscIgnoringCase:
                        return this.sort(function (a, b) {
                            try {
                                return a.toLowerCase().localeCompare(b.toLowerCase());
                            } catch (e) {
                                if (console && console.warn) {
                                    console.warn('PowerArray => Error trying to sort by ' + condition + '. When sorting by ' + condition + ', all values has to be strings. Probably it\'s not the case!. Now casting to string, performance may be affected.');
                                    a = a + '';
                                    b = b + '';
                                    return a.toLowerCase().localeCompare(b.toLowerCase());
                                }
                            }
                        });
                    case pa.Sort.Descending:
                    case pa.Sort.Desc:
                        return this.sort(function (a, b) {
                            if (a > b) {
                                return -1;
                            } else if (a < b) {
                                return 1;
                            }
                            return 0;
                        });
                    case pa.Sort.DescendingIgnoringCase:
                    case pa.Sort.DescIgnoringCase:
                        return this.sort(function (a, b) {
                            return (a.toLowerCase().localeCompare(b.toLowerCase())) * -1;
                        });
                    default:
                        throw new Error("PowerArray Error: Invalid sort condition. If you pass a first parameter of type String to the Sort function," +
                        " PowerArray assumes that you have a simple array on your hand (one dimension of primitives). Possible parameter values for function Sort " +
                        " in that situation, are: 1) To sort Ascending: 'Asc' and 'AscIgnoreCase' (aliases: 'Ascending', 'AscendingIgnoreCase'), and 2)" +
                        " To sort Descending: 'Desc','Descending' (aliases: 'Descending', 'DescendingIgnoreCase') ");
                }
                break;
            case "object":

                if (sortConditions instanceof RegExp) {
                    throw new Error("PowerArray Error: Invalid sortConditions object. A RegExp is not allowed as Sort Criterion!");
                }

                if (!sortConditions) {
                    if (sortConditions.hasOwnProperty('length')) {
                        throw new Error("PowerArray Error: Invalid sortConditions object");
                    }
                }

                for (var property in sortConditions) {
                    if (sortConditions.hasOwnProperty(property)) {

                        //transform the keys into a better object with properties Column and SortOrder
                        var value = sortConditions[property].toUpperCase();

                        if(!mainContainer.pa.Sort._validSortConfigStrings.indexOf(sortConditions[property]) === -1) {
                          throw new Error("PowerArray Configuration Error => Invalid sort direction for property " + property + ": '" + sortConditions[property] + "'");
                        }

                        realConditions.push({
                            column: property,
                            sortDirection: value
                        });
                    }
                }

                return this.sort(function (a, b) {
                    var result = 0, currentColumn, cycleValue;
                    for (var i = 0, l = realConditions.length; i < l; i++) {
                        cycleValue = 10 - i;
                        currentColumn = realConditions[i].column;
                        switch (realConditions[i].sortDirection) {
                            case mainContainer.pa.Sort.Ascending:
                            case mainContainer.pa.Sort.Asc:
                            case mainContainer.pa.Sort.AscendingIgnoringCase:
                            case mainContainer.pa.Sort.AscIgnoringCase:
                              if (a[currentColumn] < b[currentColumn]) {
                                    result -= cycleValue;
                                } else if (a[currentColumn] > b[currentColumn]) {
                                    result += cycleValue;
                                }
                                break;
                            case mainContainer.pa.Sort.Descending:
                            case mainContainer.pa.Sort.Desc:
                            case mainContainer.pa.Sort.DescendingIgnoringCase:
                            case mainContainer.pa.Sort.DescIgnoringCase:
                              if (a[currentColumn] < b[currentColumn]) {
                                    result += cycleValue;
                                } else if (a[currentColumn] > b[currentColumn]) {
                                    result -= cycleValue;
                                }
                                break;
                        }
                    }
                    return result;
                });
            case "undefined":
                //No parameters passed, sorting by default
                return this.sort();
            case "function":
                return this.sort(sortConditions); //simple forward to array.sort
            default:
                throw new Error("Unknown sortConditions object type (" + conditionType + ")");
        }
    },
    Exists: function (whereConditions) {
        if (pa.prototypedFunctions_Array.First.call(this, whereConditions)) {
            return true;
        } else {
            return false;
        }
    },
    Remove: function(whereConditions) {
        var first = this.FirstIndex(whereConditions);
        while(first !== undefined) {
            this.splice(first,1);
            first = this.FirstIndex(whereConditions);
        }
        return this;
    },
    //this primitive distinct version works only for array of primitives.
    Distinct: function() {
        var val, l = this.length, results = [];
        if (pa.utils.GetTypeOf(this) !== pa.utils.DataTypes.ArrayOfPrimitives) {
            throw new Error("PowerArray => Distinct => Currently, the distinct function works only for arrays of primitive data.");
        }
        while (l--) {
            val = this[l];
            if (results.indexOf(val) === -1 && val !== undefined) {
                results.push(val);
            }
        }
        return results;
    },
    WhereIndexes: function (whereConditions, keepOrder, justFirst) {
        return this.Where(whereConditions, keepOrder, justFirst, true);
    },
    Where: function (whereConditions, keepOrder, justFirst, justIndexes) {// jshint ignore:line
        var i, l = this.length, item, result = [];
        justIndexes = (justIndexes) ? true : false; //just to avoid casting when comparing during loop
        if (typeof whereConditions === 'object' && !(whereConditions.paIsArray)) {
            //If It's an object, but not an array, it's an explicit object with N filters
            result = pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, false, justFirst, justIndexes);
        } else {

            //At this point, whereConditions could be a:
            //                                          => function (a custom function),
            //                                          => an pa.EqualTo,
            //                                          => an Array of condition-objects

            if (typeof whereConditions === 'undefined') {
                var a = new Error("PowerArray => Where function => No condition object provided to function 'Where(whereConditions, keepOrder)'");
                a.message = "InvalidWhereCondition";
                throw a;
            } else if (whereConditions.paIsArray) {
                //It's a conditions array
                result.push.apply(result, pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, true, justFirst, justIndexes));
            } else {
                //whereConditions it's a function. It could be a custom function on the pa standard EqualTo (that works
                //different than any other standard function)
                if (keepOrder) {
                    for (i = 0; i < l; i++) {
                        item = this[i];
                        if (whereConditions(item)) {
                            if (justFirst) {
                                 return (justIndexes) ? i : item;
                            }
                            result.push(item);
                        }
                    }
                } else {
                    while (l--) {
                        item = this[l];
                        if (whereConditions(item)) {
                            if (justFirst) {
                              return (justIndexes) ? l : item;
                            }
                            result.push(item);
                        }
                    }
                }
            }
        }
        return result;
    },
    First: function (whereConditions) {// jshint ignore:line
        if (arguments.length === 0) {
            return (this.length > 0) ? this[0] : undefined;
        }
        return pa.prototypedFunctions_Array.Where.call(this, whereConditions, true, true);
    },
    FirstIndex: function (whereConditions) {// jshint ignore:line
        if (arguments.length === 0) {
            return (this.length > 0) ? 0 : undefined;
        }
        return pa.prototypedFunctions_Array.Where.call(this, whereConditions, true, true, true);
    },
    Average: function() {
        //TODO: the same way to work as Max()
    },
    /*Return an object containing min and max values of one or more propeties in an objects array */
    Bounds: function() {
      var l = this.length, alc, al = arguments.length, maxVal, result = {}, arrayItemValue, currentArgName='';
      if(al===0){
          throw new Error("PowerArray => Max => invalid params, please provide one or more target parameters");
      }
      alc = al;
      while (alc--) {
          currentArgName = arguments[alc];
          result[currentArgName] = { min: undefined, max: undefined};
      }
      while (l--) {
          alc = al;
          while (alc--) {
              currentArgName = arguments[alc];
              arrayItemValue = this[l][currentArgName];
              if (result[currentArgName].max === undefined || (arrayItemValue !== undefined && arrayItemValue > result[currentArgName].max)) {
                  result[currentArgName].max= arrayItemValue;
              }
              if (result[currentArgName].min === undefined || (arrayItemValue !== undefined && arrayItemValue < result[currentArgName].min)) {
                  result[currentArgName].min= arrayItemValue;
              }
          }
      }

      return result;

    },
    /**
     * Return max values of specified properties
     * @param {} target
     * @returns {}
     */
    Max: function() {
        var l = this.length, alc, al = arguments.length, maxVal, result = {}, arrayItemValue, currentArgName='';
        if(al===0){
            throw new Error("PowerArray => Max => invalid params, please provide one or more target parameters");
        }
        alc = al;
        while (alc) {
            //evaluate if the passed arguments are integers. this means that the collection has indexable objects (arrays or array like objects)

        }
        while (l--) {
            alc = al;
            while (alc--) {
                currentArgName = arguments[alc];
                arrayItemValue = this[l][currentArgName];
                if (result[currentArgName] === undefined || (arrayItemValue !== undefined && arrayItemValue > result[currentArgName])) {
                    result[currentArgName]= arrayItemValue;
                }
            }
        }

        if (al === 1) { //if only one max is expected, just return it
            return result[currentArgName];
        } else if (al > 1) {

        }
    }
};

// ReSharper disable once WrongExpressionStatement
mainContainer.pa.Sort = {
    Ascending : 'ASCENDING',
    Asc : 'ASC',
    AscendingIgnoringCase : 'ASCENDINGIGNORINGCASE',
    AscIgnoringCase : 'ASCIGNORINGCASE',
    Descending : 'DESCENDING',
    Desc : 'DESC',
    DescendingIgnoringCase : 'DESCENDINGIGNORINGCASE',
    DescIgnoringCase : 'DESCIGNORINGCASE',
}
if (mainContainer.Sort == undefined) {
    mainContainer.Sort = mainContainer.Sort || mainContainer.pa.Sort;
    mainContainer.pa.Sort._validSortConfigStrings = [
      mainContainer.pa.Sort.Ascending,
                mainContainer.pa.Sort.Asc,
                mainContainer.pa.Sort.AscendingIgnoringCase,
                mainContainer.pa.Sort.AscIgnoringCase,
                mainContainer.pa.Sort.Descending,
                mainContainer.pa.Sort.Desc,
                mainContainer.pa.Sort.DescendingIgnoringCase,
                mainContainer.pa.Sort.DescIgnoringCase];
    } else {
    console.warn('PowerArray warning! => property "Sort" already exists on parent scope. However, you can still using it but calling "pa.Sort" instead of only "Sort" on your conde."');
}


//this is intended to help IDE'S to understand the working way of powerarray. This will never be executed!
if (false) {
    Array.prototype.Where = function(WhereConditions, fuck) {

    };
}

var paArray = function (array) {
    if (!array.paIsArray) {
        throw new Error('PowerArray warning! => Invalid array passed to pa function"');
    }
    var newArray = array.slice(0);

    var functionsToAttach = mainContainer.pa.prototypedFunctions_Array;
    for (var currentFunctionName in functionsToAttach) {
        if (functionsToAttach.hasOwnProperty(currentFunctionName)) {
            newArray[currentFunctionName] = functionsToAttach[currentFunctionName]; // jshint ignore:line
        }
    }
    return newArray;
};

paArray.prototype.isArray = true;

//region "Initialization"
(function () {
    //Register all Pa auxiliary functions to make them accessible through the mainContainer object and mainContainer.pa object
    //If a mainContainer accessor is already taken and cannot be set, warn the user.
    var obj = mainContainer.pa.auxiliaryFunctions;
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            mainContainer.pa[p] = obj[p];
            if (!mainContainer[p]) {
                mainContainer[p] = obj[p];
            } else {
                console.warn('PowerArray warning! => property mainContainer.' + p + ' already exists. PowerArrayFunction pa.' + p + ' cannot register this function on mainContainer scope. However, you can still using it by calling "pa.' + p + '"');
            }
        }
    }

    if (!Array.prototype.paIsArray) {
        //TODO: this cannot stay like that ;(
        Array.prototype.paIsArray = true;// jshint ignore:line
    }

    //Register all Array prototype functions to make them accessible to each array.
    //If function name is already is already taken, warn the user and describe alternative usage way.
    var functionsToAttach = mainContainer.pa.prototypedFunctions_Array;
    for (var currentFunctionName in functionsToAttach) {
        if (functionsToAttach.hasOwnProperty(currentFunctionName)) {
            if (Array.prototype.hasOwnProperty(currentFunctionName)) {
                console.warn('PowerArray warning! => Array Prototype was modified by other library, and the function name ' + currentFunctionName +
                ' is already in use. PowerArray will NOT override the prototype method. However, you can still using the function ' + currentFunctionName +
                ' by surrounding your array with a pa constructor call, as following: pa(yourArrayName).' + currentFunctionName + "(...)");
            } else {
                //function name is free, go on:
                Array.prototype[currentFunctionName] = functionsToAttach[currentFunctionName]; // jshint ignore:line
            }
            // Attach all functions also to the paArray prototype, that is the wrapper for solve conflicts (pa(array))
            // from array prototype
            paArray.prototype[currentFunctionName] = functionsToAttach[currentFunctionName]; // jshint ignore:line
        }
    }
})();
if (isModule) {
    module.exports = mainContainer.pa;
}
/*
TODOS:
Write test and docs for:
  - Exists function
  - Standardfunctions: GreaterOrEqualThan and SmallerOrEqualThan
  - WhereIndexes function
  - FirstIndex function
  - Remove  function
  - new excludeExactMatches parameter in Between function
  - Distinct function. only implemented for array of primitives. document. tests.
*/
//endregion

/**TODO: hacer una funcion donde se haga una descripciÃ³n de las funciones prototipeadas para que cualquier IDE lo pueda
 * reconocer facilmente. La funciiÃ³n tiene que tener en la primera lÃ­nea unt throw que impida su ejecuciÃ³n por si cualquier cosa.
 * el objetivo del prototipo es solo que las ides puedan leer en texto plano y explÃ­cito la descripciÃ³n que queramos de la funciÃ³n
 *
      * /
      */
