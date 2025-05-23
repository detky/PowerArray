'use strict';
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
if (mainContainer.pa && console && console.warn) {
    console.warn('PowerArray => Cannot load, global variable "pa" already exists. Assuming that pa is already loaded => Trusting older instance');
} else {
    mainContainer.PowerArray = mainContainer.pa = function (object) {
        if (object.constructor === Array || object.paIsArray) {
            return new paArray(object);
        } else {
            //console.warn('PowerArray => The passed object is not natively an array. Trying to handle it as an array-like object...')

            if (
                ((mainContainer.ol !== undefined && ol.Collection) && object instanceof ol.Collection) || /** Detect openlayers collections created without modules (old versions) */
                (typeof object.getArray === 'function')) /** Detect openlayers collections created with modules (newer versions) */ {
                return paArray(object.getArray());
            }

            if (object.length === undefined) {
                throw new Error('PowerArray => The passed object is not an array, or usable as such.');
            }

            return new paArray(object);
        }
    };
    pa.mainContainer = mainContainer; //pa.mainContainer is a reference to the top element containing the application (window by browsers, global by Node);

    /*functions directly bound to the pa object: */
    mainContainer.pa.Range = function (from, to, step) {
        if (!pa.IsNumeric(from)) {
            throw new Error('PowerArray => Range fuction => The parameter "from" must be numeric. Wrong value is "' + from + '"');
        }
        if (!pa.IsNumeric(to)) {
            throw new Error('PowerArray => Range fuction => The parameter "to" must be numeric. Received value is "' + to + '"');
        }
        if (!pa.IsNumeric(step)) {
            throw new Error('PowerArray => Range fuction => The parameter "step" must be numeric. Received value is "' + step + '"');
        }

        from = parseFloat(from);
        to = parseFloat(to);
        step = parseFloat(step);

        var result = [], i, l, currVal = from;
        while (currVal < to) {
            result.push(currVal);
            currVal += step;
        }
        result.push(to);
        return result;
    };
    mainContainer.pa.config = {
        defaults: {
            defaultPromiseTimeout: 10000
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
        },
        IsArrayOfObjects: function (val) {
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
        AreWhereConditionsObjectsEqual: function (a, b) {
            if (pa.utils.isNullEmptyOrUndefined(a) && pa.utils.isNullEmptyOrUndefined(b)) return true; //if both are undefined, null, or empty, return a true.

            var comparableA = pa.utils.GetComparableConditionsObject(a);
            var comparableB = pa.utils.GetComparableConditionsObject(b);

            return pa.utils.Equals(comparableA, comparableB, false, false);
        },
        GetWCOFunctionValueHash: function (func) {
            let result = func.paParams.name + "(";
            if (func.paParams) {
                result += mainContainer.pa.utils.ArgumentsToArray(func.paParams)
                    .RunEach((param) => {
                        if (param === undefined) {
                            return '?und';
                        }
                        return param.toString();
                    }, false, true).join(',');
            } else {
                console.warn("PowerArray => GetWCOFunctionValueHash received a function that were not normalized (missing paParams). This is not necessary a problem, if you know why it is like that!")
                result = func.toString();
            }

            return result + ")";
        },
        GetComparableConditionsObject: function (wco) {
            var result = {};
            function iterate(obj, dest) {
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        switch (typeof obj[property]) {
                            case "object":
                                dest[property] = {};
                                iterate(obj[property], dest[property]);
                                break;
                            case "function":
                                dest[property] = mainContainer.pa.utils.GetWCOFunctionValueHash(obj[property]);
                                break;
                            default:
                                dest[property] = obj[property];
                        }
                    }
                }
            }

            for (var property in wco) {
                if (wco.hasOwnProperty(property)) {
                    switch (typeof wco[property]) {
                        case "object":
                            result[property] = {};
                            iterate(wco[property], result[property]);
                            break;
                        case "function":
                            result[property] = mainContainer.pa.utils.GetWCOFunctionValueHash(wco[property]);
                            break;
                        default:
                            result[property] = wco[property];
                    }
                }
            }
            return result;
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
     * evaluate if something is empty. Deppending on the passed object what it exactly search for:
     *      Numbers and Strings are evaluated against "", undefined and Null
     *      Objects having at least one own property returns false (also if the property is empty!)
     *      Arrays returns false if his length is > 0 or "what" is a function 
     *
     * @param what the element to evaluate
     * @returns {boolean}
     */
        isNullEmptyOrUndefined: function (what) {
            // null has to be evaluated before checking typeof

            if (what === null || what === undefined || what === '') {
                return true;
            }
            var t = typeof what;
            switch (t) {
                case "boolean":
                case "function":
                    return false;
            }

            //Array        
            if (what.paIsArray && what.length > 0)
                return false;

            //Object
            if (t === 'object') {
                var count = 0;
                for (var p in what) {
                    if (what.hasOwnProperty(p))
                        return false;
                }
                return true;
            }

            if (t === "number" && what === 0) {
                return false;
            }

            if (!what) {
                return true;
            }
            return (what + "").length === 0;
        },
        /**
        * Copy properties from a source object to a destination object
        * @param {Object} source source object
        * @param {Object} dest destination object
        * @param {Array<String>} propsList list of properties to copy. if falsy is passed, all properties will be copied.
        * @param {boolean} excludeEmptyProps avoid the copy of empty props to the target
        * @param {boolean} ignoreEmptyProps 
        * @returns {} 
        */
        CopyObjectProps: function (source, dest, propsList, excludeEmptyProps, nullOrUndefinedAsEmptyString) {
            if (!propsList) {
                for (var prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        if (nullOrUndefinedAsEmptyString) {
                            var sourceProp = source[prop]
                            dest[prop] = (pa.utils.isNullEmptyOrUndefined(sourceProp)) ? '' : sourceProp;
                        } else {
                            if (excludeEmptyProps && pa.utils.isNullEmptyOrUndefined(source[prop])) {
                                continue;
                            }
                            dest[prop] = source[prop];
                        }
                    }
                }

            } else {

                propsList.RunEach(function (prop) {
                    if (nullOrUndefinedAsEmptyString) {
                        var sourceProp = source[prop]
                        dest[prop] = (pa.utils.isNullEmptyOrUndefined(sourceProp)) ? '' : sourceProp;
                    } else {
                        if (excludeEmptyProps && pa.utils.isNullEmptyOrUndefined(source[prop])) {
                            return;
                        }
                        dest[prop] = source[prop];
                    }
                });
            }
        },
        Equals: function (a, b, enforce_properties_order, cyclic) {
            return mainContainer.pa.paWhereHelper.equals(a, b, enforce_properties_order, cyclic);
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
                case 'function':
                    return pa.utils.DataTypes.Function;
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
        ArgumentsToArray: function (args, from, to) {
            var i = from | 0, l = to || args.length, result = [];
            for (; i < l; i++) {
                result.push(args[i]);
            }
            return result;
        },
        /**
         * Generates a guid-like string
         * @param {*} prefix 
         * @param {*} sufix 
         * @param {string} separator character between guid char blocks
         */

        GenerateUuid: function (prefix, sufix, separator) {
            let localSeparator = (separator === undefined) ? '-' : separator;
            function getRandom4Chars() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return ((prefix !== undefined) ? prefix + localSeparator : '') +
                getRandom4Chars() + getRandom4Chars() +
                localSeparator + getRandom4Chars() + localSeparator + getRandom4Chars() +
                localSeparator + getRandom4Chars() + localSeparator + getRandom4Chars() + getRandom4Chars() + getRandom4Chars() +
                ((sufix !== undefined) ? localSeparator + sufix : '');
        },
        /**
         * Generates a guid-like string
         * @param {string} separator character between guid char blocks
         */
        GenerateGuid: function (separator) {

            let localSeparator = separator === undefined ? '-' : separator;
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() +
                localSeparator + s4() + localSeparator + s4() +
                localSeparator + s4() + localSeparator + s4() + s4() + s4();
        },
        PropsToArray: function (obj, valueProcessor) {
            var result = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    result.push({ property: prop, value: (valueProcessor) ? valueProcessor(obj[prop]) : obj[prop] });
                }
            }
            return result;
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

                
                const valueToEvaluate = condition.column ? item[condition.column] : item;
                if (!item || !condition.condition(valueToEvaluate)) { //if one condition is not fulfilled, just return false;
                    return false;
                }
            }
            return true;
        },


        ProcessConditionObject: function (whereConditions, keepOrder, isArrayOfConditions, justFirst, justIndexes) {
            //to call this function, "this" should be an array!
            var fc = mainContainer.pa.paWhereHelper.FillConditions,
                i, w, item, lw, assert, l, result = [], realConditionsArr = [];

            if (!isArrayOfConditions) {
                //whereConditions is not an array, but i need it in that form
                whereConditions = [whereConditions];
            }

            //Where conditions must be processed in order
            for (i = 0, l = whereConditions.length; i < l; i++) {
                var whereConditionObject = whereConditions[i], realConditions = [];
                if (typeof whereConditionObject === 'function') {
                    realConditions.push({
                        column: property,
                        condition: whereConditionObject
                    });
                } else {
                    for (var property in whereConditionObject) {
                        if (whereConditionObject.hasOwnProperty(property)) {
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
                realConditionsArr.push(realConditions);
                //whereConditionObject.realConditions = realConditions; //attach the result of this loop direct to the whereConditionObject
            }
            //Real conditions stored
            l = this.length;
            if (keepOrder) { //Anti DRY pattern ;( but as long as it still being small will continue this way to improve performance
                for (i = 0; i < l; i++) {
                    item = this[i];
                    for (w = 0, lw = whereConditions.length; w < lw; w++) {
                        assert = fc(item, realConditionsArr[w]);
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
                        assert = fc(item, realConditionsArr[w]);
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
    mainContainer.pa.Equals = mainContainer.pa.paWhereHelper.equals;

    mainContainer.pa.auxiliaryFunctions = {
        Contains: function (value, enforcePropsOrder, cyclic) {
            var result = function (val) {
                if (!val.paIsArray) {
                    throw new Error("PowerArray error => parameter val passed to Contains function should be an array.");
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
            result.paParams = arguments;
            result.paParams.name = "Contains";
            return result;
        },
        Between: function (from, to, excludeExactMatches) {
            var result;
            if (to < from) {
                console.warn("PowerArray warn => Parameters 'from' and 'to' passed to function Between() makes no sense: Parameter 'to' (" + to + ") should be greater than from (" + from + ")");
            }
            if (!excludeExactMatches) {
                result = function (val) {
                    return val >= from && val <= to;
                };
            } else {
                result = function (val) {
                    return val > from && val < to;
                };
            }

            result.paParams = arguments;
            result.paParams.name = "Between";
            return result;
        },
        EndsWith: function (value) {
            var value2 = value + '';
            var result = function (endsWithString) {

                endsWithString = endsWithString + '';
                return endsWithString.substr(endsWithString.length - (value2).length) === value2;
            };
            result.paParams = arguments;
            result.paParams.name = "EndsWith";
            return result;
        },
        NotEndsWith: function (value) {
            var value2 = value + '';
            var result = function (endsWithString) {

                endsWithString = endsWithString + '';
                return !(endsWithString.substr(endsWithString.length - (value2).length) === value2);
            };
            result.paParams = arguments;
            result.paParams.name = "NotEndsWith";
            return result;
        },
        StartsWith: function (value) {
            var value2 = value + '';
            var result = function (val) {
                val = val + '';
                return val.indexOf(value2) === 0;
            };
            result.paParams = arguments;
            result.paParams.name = "StartsWith";
            return result;
        },
        GreaterOrEqualThan: function (value) {
            var result = function (val) {
                return val >= value;
            };
            result.paParams = arguments;
            result.paParams.name = "GreaterOrEqualThan";
            return result;
        },
        GreaterThan: function (value) {
            var result = function (val) {
                return val > value;
            };
            result.paParams = arguments;
            result.paParams.name = "GreaterThan";
            return result;
        },
        SmallerOrEqualThan: function (value) {
            var result = function (val) {
                return val <= value;
            };
            result.paParams = arguments;
            result.paParams.name = "SmallerOrEqualThan";
            return result;
        },
        SmallerThan: function (value) {
            var result = function (val) {
                return val < value;
            };
            result.paParams = arguments;
            result.paParams.name = "SmallerThan";
            return result;
        },
        EqualTo3: function (value) {
            var result = function (val) {
                return val === value;
            };
            result.paParams = arguments;
            result.paParams.name = "EqualTo3";
            return result;
        },
        NotEqualTo3: function (value) {
            var result = function (val) {
                return val !== value;
            };
            result.paParams = arguments;
            result.paParams.name = "NotEqualTo3";
            return result;
        },
        EqualTo2: function (value) {
            var result = function (val) {
                // ReSharper disable once CoercedEqualsUsing
                return val == value; // jshint ignore:line
            };
            result.paParams = arguments;
            result.paParams.name = "EqualTo2";
            return result;
        },
        NotEqualTo2: function (value) {
            var result = function (val) {
                // ReSharper disable once CoercedEqualsUsing
                return val != value; // jshint ignore:line
            };
            result.paParams = arguments;
            result.paParams.name = "NotEqualTo2";
            return result;
        },
        IsUndefined: function () {
            var result = function (val) {
                return val === undefined;
            };
            result.paParams = arguments;
            result.paParams.name = "IsUndefined";
            return result;
        },
        IsDefined: function () {
            var result = function (val) {
                return val !== undefined;
            };

            result.paParams = arguments;
            result.paParams.name = "IsDefined";
            return result;
        },
        IsEmptyOrUndefined: function (val) {
            if (val === undefined) {
                return true;
            }

            if (val.paIsArray && val.length === 0) {
                return true
            }

            if ((val + '') === '')
                return true;

            return false;
        },
        In: function (list) {

            if (arguments.length > 1) {
                list = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                return list.indexOf(val) !== -1; // jshint ignore:line
            };
            result.paParams = arguments;
            result.paParams.name = "In";
            return result;
        },
        NotIn: function (list) {
            if (arguments.length > 1) {
                list = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                return list.indexOf(val) === -1; // jshint ignore:line
            };
            result.paParams = arguments;
            result.paParams.name = "NotIn";
            return result;
        },
        EqualTo: function (object, func, enforcePropsOrder, cyclic) {
            var result = function (val) {
                if (func) {
                    return func(val, object);
                } else {
                    return pa.paWhereHelper.equals(object, val, enforcePropsOrder, cyclic);
                }
            };
            result.paParams = arguments;
            result.paParams.name = "EqualTo";
            return result;
        },
        Like: function (value) {
            if (!value.paIsArray) {
                value = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                var l = value.length;
                while (l--) {
                    if (val.indexOf(value[l]) === -1) {
                        return false;
                    }
                }
                return true;
            };
            result.paParams = arguments;
            result.paParams.name = "Like";
            return result;
        },
        NotLike: function (value) {
            if (!value.paIsArray) {
                value = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                var l = value.length;
                while (l--) {
                    if (val.indexOf(value[l]) > -1) {
                        return false;
                    }
                }
                return true;
            };
            result.paParams = arguments;
            result.paParams.name = "NotLike";
            return result;
        },
        LikeIgnoreCase: function (value) {
            if (value === undefined)
                throw new Error("PowerArray Error => undefined was passed to LikeIgnoreCase");

            var valueCaseInsensitive = '';
            if (!value.paIsArray) {
                value = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                if (val === null || val === undefined)
                    return false;
                var l = value.length;
                while (l--) {
                    valueCaseInsensitive = value[l].toUpperCase();
                    if ((val+'').toUpperCase().indexOf(valueCaseInsensitive) === -1) {
                        return false;
                    }
                }
                return true;
            };
            result.paParams = arguments;
            result.paParams.name = "LikeIgnoreCase";
            return result;
        },
        NotLikeIgnoreCase: function (value) {
            var valueCaseInsensitive = '';
            if (!value.paIsArray) {
                value = Array.prototype.slice.call(arguments);
            }
            var result = function (val) {
                var l = value.length;
                while (l--) {
                    valueCaseInsensitive = value[l].toUpperCase();
                    if ((val+'').toUpperCase().indexOf(valueCaseInsensitive) > -1) {
                        return false;
                    }
                }
                return true;
            };
            result.paParams = arguments;
            result.paParams.name = "NotLikeIgnoreCase";
            return result;
        },
        IsTruthy: function () {
            var result = function (val) {
                return (val) ? true : false;
            };
            result.paParams = arguments;
            result.paParams.name = "IsTruthy";
            return result;
        },
        IsFalsy: function () {
            var result = function (val) {
                return (val) ? false : true;
            };
            result.paParams = arguments;
            result.paParams.name = "IsFalsy";
            return result;
        },
        IsTrue: function () {
            var result = function (val) {
                return val === true;
            };
            result.paParams = arguments;
            result.paParams.name = "IsTrue";
            return result;
        },
        IsFalse: function () {
            var result = function (val) {
                return val === false;
            }
            result.paParams = arguments;
            result.paParams.name = "IsFalse";
            return result;
        },

        IsEmpty: function () {
            var result = function (val) {
                return val === undefined || val === '' || val === null || val === 0 || (val.paIsArray && val.length === 0);
            }
            result.paParams = arguments;
            result.paParams.name = "IsEmpty";
            return result;
        },
        IsNotEmpty: function () {
            var result = function (val) {
                if (val === undefined || val === null) {
                    return false;
                }
                if (val.paIsArray) {
                    return val.length > 0;
                }

                return (val + "").length > 0;
            }
            result.paParams = arguments;
            result.paParams.name = "IsNotEmpty";
            return result;
        },
        IsNull: function () {
            var result = function (val) {
                return val === null;
            }
            result.paParams = arguments;
            result.paParams.name = "IsNull";
            return result;
        },
        IsNotNull: function () {
            var result = function (val) {
                return val !== null;
            }
            result.paParams = arguments;
            result.paParams.name = "IsNotNull";
            return result;
        },
        IsNaN: function () {
            var result = function (val) {
                return isNaN(val);
            }
            result.paParams = arguments;
            result.paParams.name = "IsNaN";
            return result;
        },
        IsNotNaN: function () {
            var result = function (val) {
                return !isNaN(val);
            }
            result.paParams = arguments;
            result.paParams.name = "IsNotNaN";
            return result;
        },
        IsNumeric: function () {
            var result = function (val) {
                return !isNaN(parseFloat(val)) && isFinite(val);
            };
            result.paParams = arguments;
            result.paParams.name = "IsNumeric";
            return result;
        },
        IsInteger: function () {
            var result = function (val) {
                return val === parseInt(val, 10);
            };
            result.paParams = arguments;
            result.paParams.name = "IsInteger";
            return result;
        }

    };

    mainContainer.pa.prototypedFunctions_Array = {
        /**
         * Attach a dictionary by an specific property and creates a function on the array
         * with the passed getterFuncName.
         * 
         * WARNING: This function does not care about data changes!
         *
         *  entitiesArray.attachIndex("findById", "ID");
         *  array.findById(31)
         * 
         * 
         */
        attachIndex: function (getterFuncName, fromProp, throwIfUndefinedOnGetter) {
            //build a cache
            var cache = {};
            this.RunEach(function (item) {
                if (throwIfUndefinedOnGetter && !item.hasOwnProperty(fromProp)) {
                    throw new Error("PowerArray error => the property '" + fromProp + "', that should be used to build an attached index (exposed as '" + getterFuncName + "') is not declared on at least one array item. This is not necessarly wrong, but consider to set the throwIfUndefinedOnGetter to false.");
                }
                cache[item[fromProp]] = item;
            })

            //attach the finder function
            this[getterFuncName] = function (id) {
                return cache[id];
            }

            this[getterFuncName + "_cache"] = cache;

            return cache;
        },
        getIndexByProperty: function (valueToSearchFor) {// jshint ignore:line
            /**
             * This function, evaluates properties (or function results) over each object on an array, and returns an
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
        GetPropertyFlat: function (property, keepOrder, includeDuplicates, includeUndefineds) { // jshint ignore:line
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
        GetSumByProperty: function (propertyName) {
            const propertyValues = this.GetPropertyFlat(propertyName, false, true, false);
            return this.reduce(function (pv, cv) { return pv + cv; }, 0);
        },
        GetAverageByProperty: function (propertyName) {
            const propertyValues = this.GetPropertyFlat(propertyName, false, true, false);
            const sum = propertyValues.reduce(function (pv, cv) { return pv + cv; }, 0);
            return sum / propertyValues.length;
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
        RunEach: function (task, callback, keepOrder) {// jshint ignore:line
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
        RunEachAsync: async function (task, keepOrder) {
            return new Promise((resolve, reject) => {
                try {
                    resolve(mainContainer.pa.prototypedFunctions_Array.RunEach.call(this, task, undefined, keepOrder));
                } catch (error) {
                    reject(error);
                }
            })
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
                                        console.warn('PowerArray => Error by sorting by ' + condition + ', all values has to be strings. Probably it\'s not the case!. Now casting to string, performance may be affected.');
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
                            var value = sortConditions[property+''].toUpperCase();

                            if (!mainContainer.pa.Sort._validSortConfigStrings.indexOf(sortConditions[property]) === -1) {
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
                            currentColumn = realConditions[i].column;
                            switch (realConditions[i].sortDirection) {
                                case mainContainer.pa.Sort.Ascending:
                                case mainContainer.pa.Sort.Asc:
                                case mainContainer.pa.Sort.AscendingIgnoringCase:
                                case mainContainer.pa.Sort.AscIgnoringCase:
                                    if (a[currentColumn] < b[currentColumn]) return -1;
                                    if (a[currentColumn] > b[currentColumn]) return 1;
                                case mainContainer.pa.Sort.Descending:
                                case mainContainer.pa.Sort.Desc:
                                case mainContainer.pa.Sort.DescendingIgnoringCase:
                                case mainContainer.pa.Sort.DescIgnoringCase:
                                    if (a[currentColumn] < b[currentColumn]) return 1;
                                    if (a[currentColumn] > b[currentColumn]) return -1;
                            }
                        }
                        return 0;

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
            if (typeof (whereConditions) === 'string') {
                //transform single match strings to an EqualTo3
                whereConditions = EqualTo3(whereConditions);
            }
            if (pa.prototypedFunctions_Array.First.call(this, whereConditions)) {
                return true;
            } else {
                return false;
            }
        },
        ExistsAny: function (arr) {
            if (!arr.paIsArray) {
                throw new Error('PowerArray => ExistsAny => Invalid parameter, array expected');
            }
            var l = arr.length;
            while (l--) {
                var valToCompare = arr[l];
                var func = EqualTo3;
                var valType = typeof valToCompare;
                if (valType === 'object' || valType.paIsArray) {
                    func = EqualTo;
                } else {
                    func = EqualTo3;
                }

                if (pa.prototypedFunctions_Array.Exists.call(this, func(valToCompare))) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
        Remove: function (whereConditions) {
            if (typeof (whereConditions) === 'string') {
                //transform single match strings to an EqualTo3
                whereConditions = EqualTo3(whereConditions);
            }
            var first = this.FirstIndex(whereConditions);
            while (first !== undefined) {
                this.splice(first, 1);
                first = this.FirstIndex(whereConditions);
            }
            return this;
        },
        Distinct: function (fieldName) {
            var val, l = this.length, results = [], item,
                type = pa.utils.GetTypeOf(this, true),
                types = pa.utils.DataTypes;

            if (type !== types.ArrayOfPrimitives && type !== types.ArrayOfObjects) {
                throw new Error("PowerArray => Distinct => Currently, the distinct function works only for arrays of primitive data.");
            }
            if (type !== types.ArrayOfObjects) {
                //it's a primitives array
                while (l--) {
                    val = this[l];
                    if (results.indexOf(val) === -1 && val !== undefined) {
                        results.push(val);
                    }
                }
            } else {
                //its an array of objects
                while (l--) {
                    item = this[l];
                    val = item[fieldName];
                    if (results.indexOf(val) === -1 && val !== undefined) {
                        results.push(val);
                    }
                }
            }

            return results;
        },
        /** Iterates an array and executes the function on each item as runeach does, but always returns the original array  */
        Iterate: function (func, keepOrder) {
            this.RunEach(func, undefined, keepOrder);
            return this;
        },
        /**returns a collection of the results of the execution of "func" in a given order */
        Collect: function (func, keepOrder) {
            return this.RunEach(func, undefined, keepOrder);
        },
        WhereIndexes: function (whereConditions, keepOrder, justFirst) {
            return this.Where(whereConditions, keepOrder, justFirst, true);
        },
        Where: function (whereConditions, keepOrder, justFirst, justIndexes) {// jshint ignore:line
            var i, l = this.length, item, result = [], tmp;
            justIndexes = (justIndexes) ? true : false; //just to avoid casting when comparing during loop
            const typeOfWhereConditions = (typeof whereConditions).toString();
            if (typeOfWhereConditions === 'object' && !(whereConditions.paIsArray)) {
                if (!Object.keys(whereConditions).length) // when the conditions-object is empty (no properties), then exit returning the same array
                    return this;

                //If It's an object, but not an array, it is a conditions object
                result = pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, false, justFirst, justIndexes);
            } else {

                //At this point, whereConditions could be a:
                //                                          => function (a custom function),
                //                                          => an pa.EqualTo,
                //                                          => an Array of condition-objects



                if (typeOfWhereConditions === 'string' || typeOfWhereConditions === 'number') {
                    tmp = pa.paWhereHelper.ProcessConditionObject.call(this, EqualTo3(whereConditions), keepOrder, false, justFirst, justIndexes);
                    if (justFirst)
                        return tmp;
                    result.push.apply(result, tmp);
                } else if (typeOfWhereConditions === 'undefined') {
                    var a = new Error("PowerArray => Where function => No condition object provided to function 'Where(whereConditions, keepOrder)'");
                    a.message = "InvalidWhereCondition";
                    throw a;
                } else if (whereConditions.paIsArray) {
                    //It's a conditions array
                    tmp = pa.paWhereHelper.ProcessConditionObject.call(this, whereConditions, keepOrder, true, justFirst, justIndexes);
                    if (justFirst)
                        return tmp;
                    result.push.apply(result, tmp);
                } else {
                    //whereConditions it's a function. It could be a custom function on the pa standard EqualTo (that works
                    //different than any other standard function)
                    if (keepOrder) {
                        for (i = 0; i < l; i++) {
                            item = this[i];
                            if (whereConditions(item, i)) {
                                if (justFirst) {
                                    return (justIndexes) ? i : item;
                                }
                                result.push(item);
                            }
                        }
                    } else {
                        while (l--) {
                            item = this[l];
                            if (whereConditions(item, l)) {
                                if (justFirst) {
                                    return (justIndexes) ? l : item;
                                }
                                result.push(item);
                            }
                        }
                    }
                }
            }
            if (justFirst) {
                if (result !== undefined) { //it is important to check with undefined! (0 is a valid result when justIndexes = true)
                    if (result.paIsArray) {
                        if (result.length > 0)
                            return result[0]
                        return undefined; // there is only one
                    }
                    return result;
                }
                return undefined;
            }
            return result;
        },
        Count: function (whereConditions) {
            if (arguments.length !== 1) {
                throw new Error('PowerArray => Count function => Invalid arguments. The only argument is a whereCondition or an array of whereConditions object.');
            }
            return pa.prototypedFunctions_Array.Where.call(this, whereConditions, false, false).length;
        },
        First: function (whereConditions) {// jshint ignore:line
            // if (typeof (whereConditions) === 'string') {
            //     //transform single match strings to an EqualTo3
            //     whereConditions = EqualTo3(whereConditions);
            // }
            if (arguments.length === 0) {
                return (this.length > 0) ? this[0] : undefined;
            }
            return pa.prototypedFunctions_Array.Where.call(this, whereConditions, true, true);
        },
        FirstIndex: function (whereConditions) {// jshint ignore:line
            if (typeof (whereConditions) === 'string') {
                //transform single match strings to an EqualTo3
                whereConditions = EqualTo3(whereConditions);
            }
            if (arguments.length === 0) {
                return (this.length > 0) ? 0 : undefined;
            }
            return pa.prototypedFunctions_Array.Where.call(this, whereConditions, true, true, true);
        },
        AttachIndex: function (getterName, fromProp) {
            return pa.prototypedFunctions_Array.attachIndex.call(this, getterName, fromProp);
        },
        Average: function () {
            //TODO: the same way to work as Max()
        },
        /**
         * Used to get min and max values of one or multiple properties of items in the array. Desired columns can be passed as parameter names. 
         * Usage: 
         *          const myArray = [{a:1, b: 4}, {a:2, b:5}, {a:3, b:6}]
         * 
         *          myArray.Bounds('a')     =================> {min: 1, max: 3}
         *          myArray.Bounds('a','b') =================> { a: {min: 1, max: 3}, b: { min: 4, max: 6}
         *          Bounds('a')             =================> {min: 1, max: 3}
         * 
         * 
         * @returns A
         */
        Bounds: function () {
            var l = this.length, alc, al = arguments.length, maxVal, result = {}, arrayItemValue, currentArgName = '';
            if (al === 0) {
                throw new Error("PowerArray => bounds => invalid params, please provide one or more target parameters");
            }
            alc = al;
            while (alc--) {
                currentArgName = arguments[alc];
                result[currentArgName] = { min: undefined, max: undefined };
            }
            while (l--) {
                alc = al;
                while (alc--) {
                    currentArgName = arguments[alc];
                    arrayItemValue = this[l][currentArgName];
                    if (result[currentArgName].max === undefined || (arrayItemValue !== undefined && arrayItemValue > result[currentArgName].max)) {
                        result[currentArgName].max = arrayItemValue;
                    }
                    if (result[currentArgName].min === undefined || (arrayItemValue !== undefined && arrayItemValue < result[currentArgName].min)) {
                        result[currentArgName].min = arrayItemValue;
                    }
                }
            }

            if(arguments.length === 1)
                return result[ arguments[0]]; //return only the result, in order to avoid the duplication of the property name when only using 1 prop.

            return result;

        },
        /**
         * Return max values of specified properties
         * @param {} target
         * @returns {}
         */
        Max: function () {
            var l = this.length, alc, al = arguments.length, maxVal, result = {}, arrayItemValue, currentArgName = '';
            if (al === 0) {
                throw new Error("PowerArray => Max => invalid params, please provide one or more target parameters");
            }
            alc = al;
            while (l--) {
                alc = al;
                while (alc--) {
                    currentArgName = arguments[alc];
                    arrayItemValue = this[l][currentArgName];
                    if (result[currentArgName] === undefined || (arrayItemValue !== undefined && arrayItemValue > result[currentArgName])) {
                        result[currentArgName] = arrayItemValue;
                    }
                }
            }

            if (al === 1) { //if only one max is expected, just return it
                return result[currentArgName];
            } else if (al > 1) {

            }
        },
        Skip: function (quantity) {
            return this.slice(quantity);
        },
        Take: function (count, skip) {
            skip = skip || 0;
            var i = 0 + skip, l = this.length, result = [], added = 0;
            for (; i < l && added < count; i++) {
                result.push(this[i]);
                added++;
            }
            return result;
        },
        /**
         * Returns a new array but inverted from arr.length-1 to 0
         * @param {*} skip quantity of parameters to skip (from right to left)
         * @param {*} maxCount optional maximal expected results length - the excedent will not be returned
         */
        Reverse: function (skip) {
            var newArr = [], skip = skip || 0, l = this.length - skip;
            while (l--) {
                newArr.push(this[l]);
            }
            return newArr;
        },
        Last: function () {
            var idx = this.length - 1;
            return (idx > -1) ? this[idx] : null;
        }
    };

    // ReSharper disable once WrongExpressionStatement
    mainContainer.pa.Sort = {
        Ascending: 'ASCENDING',
        Asc: 'ASC',
        AscendingIgnoringCase: 'ASCENDINGIGNORINGCASE',
        AscIgnoringCase: 'ASCIGNORINGCASE',
        Descending: 'DESCENDING',
        Desc: 'DESC',
        DescendingIgnoringCase: 'DESCENDINGIGNORINGCASE',
        DescIgnoringCase: 'DESCIGNORINGCASE'
    }
    var validSortingConf = [
        mainContainer.pa.Sort.Ascending,
        mainContainer.pa.Sort.Asc,
        mainContainer.pa.Sort.AscendingIgnoringCase,
        mainContainer.pa.Sort.AscIgnoringCase,
        mainContainer.pa.Sort.Descending,
        mainContainer.pa.Sort.Desc,
        mainContainer.pa.Sort.DescendingIgnoringCase,
        mainContainer.pa.Sort.DescIgnoringCase];

    mainContainer.pa.Sort._validSortConfigStrings = validSortingConf;
    mainContainer.Sort = mainContainer.pa.Sort;

    var paArray = function (array) {

        var newArray;
        if (array.paIsArray) {
            newArray = array.slice(0);
        } else {
            if (pa.utils.GetTypeOf(array) === pa.utils.DataTypes.String) {
                newArray = array.split('');
            } else {
                throw new Error('PowerArray => paArray error => Invalid data type passed to pa() or paArray() function. Allowed are arrays and strings');
            }
        }

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
}
if (isModule) {
    module.exports = mainContainer.pa;
}
