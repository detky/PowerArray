var app = angular.module('app', []);
app.controller('PaBuilderController',
    function PaBuilderController($scope, $http, $timeout) {
        function PaBuilderController(scope, http, timeout) {
            this._scope = scope;
            this._scope.controller = this;
            this._scope.pa = window.pa;
            this._http = http;
            this._timeout = timeout;
            this._init();
            this.scrollToAnchor('up');
            this._descriptor = window.pa.auxiliaryFunctionsDescriptor;
            this.paPropertyLevelsSeparator = "_paPLS_";
            this._default_prop_path = '';
            this._lastWhereExpressionConditions = '';
            this._lastSortExpressionConditions = '';
        };

        PaBuilderController.prototype._init = function () {
            var self = this;
            this._JSONSourceState = {
                JsonNotLoaded: 'jsonNotLoaded',
                JsonLoaded: 'jsonLoaded',
                JsonParsed: 'jsonParsed'
            };
            this._createModel();
        }
        PaBuilderController.prototype._createModel = function () {
            this._model = {
                activeTab: "JSON",
                sourceType: "CUSTOM",
                tableHelpVisible: false,
                jsonUrl: '',
                loadJsonErrorMessage: '',
                parseJsonErrorMessage: '',
                jsonPlainText: '',
                state: this._JSONSourceState.JsonNotLoaded,
                jsonObject: null,
                jsonObjectPropsMatrix: null,
                selectedFunctionOverloads: {}
            };
            this._scope.model = this._model;
        };

        PaBuilderController.prototype.functionSelected = function (element) {
            //now, get the params that is's neccesary to show:
            element = $(element);
            var propName = element.attr('propname');
            var proppath = element.attr('proppath');
            var proptype = element.attr('proptype');

            var selectedFunction = $(element.find('option:selected')).attr('functionname');
            var tdArguments = $('td.argumentsTd[propname=' + propName + "][proppath=" + proppath + ']');

            if (selectedFunction === undefined) { //NO filter is the selection, clear everything
                tdArguments.html('');
                tdArguments.parent().removeClass('filteredRow');
                return;
            }

            tdArguments.attr('selectedFunction', selectedFunction);
            this.buildArgumentsForProperty(propName, proppath, proptype, selectedFunction);
        };

        PaBuilderController.prototype.buildArgumentsForProperty = function (prop, path, type, func) {
            if (path === '') path = this._default_prop_path;
            var tdArguments = $('td.argumentsTd[propname=' + prop + '][proppath=' + path + ']');
            tdArguments.parent().addClass('filteredRow');
            this._buildInitialFormForFilterByProperty(prop, path, type, func);
        };

        PaBuilderController.prototype._buildInitialFormForFilterByProperty = function (prop, path, type, func) {
            //if there are multiple targets
            var that = this;
            if (func === 'SINGLE') {
                this._model.selectedFunctionOverloads = {
                    prop: prop,
                    path: path,
                    type: type,
                    func: func,
                    selectedOverloadIndex: -1,
                    overloads: []
                }
                this.confirmOverloadSelection(func, type);
                return;
            } else if (func === 'CUSTOM_FUNCTION') {
                this._model.selectedFunctionOverloads = {
                    prop: prop,
                    path: path,
                    type: type,
                    func: func,
                    selectedOverloadIndex: -1,
                    overloads: []
                }
                this.confirmOverloadSelection(func, type);
                return;
            }

            var descriptors = this._descriptor.Where({
                Name: func,
                Targets: { TargetTypes: Contains(type) }
            });

            if (descriptors.length > 1) {
                if (console && console.warn) {
                    throw new Error('PowerArray => Multitarget not implemented yet, taking default[0]');
                }
            }

            var descriptor = descriptors[0];
            var targets = descriptor.Targets.Where({ TargetTypes: Contains(type) });
            if (targets.length > 1) {
                alert('Multitarget not yet implemented (2)');
            }

            this._model.selectedFunctionOverloads = {
                prop: prop,
                path: path,
                type: type,
                func: func,
                selectedOverloadIndex: -1,
                overloads: targets[0].Overloads //back to angular
            }

            if (targets[0].Overloads.length === 1) {
                //there are no multiple overloads, it makes no sense to use the popup, 
                //simulate the ok button directly here and return
                this._model.selectedFunctionOverloads.selectedOverloadIndex = 0;
                this.confirmOverloadSelection(false, type);
                return;
            }

            //reset the radios for select overload
            $('input.paBuilderParamSelectRadio').prop('checked', false);
            this._timeout(function () { //angular trigger
                $('#overlay').fadeIn(300, function () {
                    $('#overloadSelector').fadeIn(300);
                });
            });
        };

        PaBuilderController.prototype.cancelOverloadSelection = function () {
            $("select[id=cmbFunctionFor_" + this._model.selectedFunctionOverloads.prop + "][proppath=" + this._model.selectedFunctionOverloads.path + "]").val(-1);
            var tdArguments = $('td.argumentsTd[propname=' + this._model.selectedFunctionOverloads.prop + '][proppath=' + this._model.selectedFunctionOverloads.path + ']');
            tdArguments.parent().removeClass('filteredRow');

            $('#overloadSelector').fadeOut(300, function () {
                $('#overlay').fadeOut(300);
            });
        };

        PaBuilderController.prototype.setselectedOverloadIndexInModel = function (idx) {
            var self = this;
            this._timeout(function () {
                self._model.selectedFunctionOverloads.selectedOverloadIndex = idx;
            });
        };

        PaBuilderController.prototype.setInputAsInvalid = function (element, msg) {
            var ep = element.parent();
            var errorContainer = ep.find('div.validationError');
            var errorMessage = ep.find('span.errmessage');
            errorMessage.html(msg);
            errorContainer.show();
            element.addClass('has-error');
        };

        PaBuilderController.prototype.setInputAsValid = function (element) {
            var ep = element.parent();
            var errorContainer = ep.find('div.validationError');
            errorContainer.hide();
            element.removeClass('has-error');
        };

        PaBuilderController.prototype._validateArrayOfObjects = function (value) {
            var result = {};
            try {

                var obj = JSON.parse(value);
                if (pa.utils.IsArrayOfObjects(obj)) {
                    result.msg = '';
                    result.result = true;
                } else {
                    result.msg = 'Array of objects expected [{},{}, etc.]';
                    result.result = true;
                }

            } catch (e) {
                result.msg = e.message;
                result.result = false;
            }
            return result;
        };

        PaBuilderController.prototype._validateObject = function (value) {
            var result = {};
            try {

                var obj = JSON.parse(value);
                var t = pa.utils.GetTypeOf(obj);
                if (t === pa.utils.DataTypes.Object) {
                    result.msg = '';
                    result.result = true;
                } else {
                    result.msg = 'Expected object {prop:val}, found ' + t;
                    result.result = false;
                }

            } catch (e) {
                result.msg = e.message;
                result.result = false;
            }
            return result;
        };


        PaBuilderController.prototype._validateFunction = function (value, primitiveType) {
            var result = {};
            try {
                console.log("var testFunc " + value);
                eval("var testFunc = " + value);
                if (typeof testFunc !== 'function') {
                    result.msg = 'Invalid function declaration';
                    result.result = false;
                } else {
                    result.msg = '';
                    result.result = true;
                }
            } catch (e) {
                result.msg = 'Invalid Function => ' + e.message;
                result.result = false;
            }
            return result;
        };
        PaBuilderController.prototype._validateArrayOfPrimitives = function (value, primitiveType) {
            var result = {};
            try {

                var obj = JSON.parse(value), i, l;
                if (!obj.paIsArray) {
                    result.msg = 'Invalid array';
                    result.result = false;
                } else {
                    //if the type of teh primitive is number, check that all values be numbers
                    l = obj.length;
                    switch (primitiveType) {
                        case pa.utils.DataTypes.Number:
                            while (l--) {
                                if (!pa.utils.IsNumeric(obj[l])) {
                                    result.msg = 'Provided array contains invalid values (' + obj[l] + ')';
                                    result.result = false;
                                    break;
                                }
                            }
                    }

                    if (obj.length === 0) {
                        result.msg = 'The array cannot be empty';
                        result.result = false;
                    } else {
                        result.msg = '';
                        result.result = true;
                    }

                }

            } catch (e) {
                result.msg = 'Invalid Array => ' + e.message;
                result.result = false;
            }
            return result;
        };

        PaBuilderController.prototype.validateArgumentsField = function (element) {

            element = $(element);
            //TODO: coplete this cases
            var paramType = element.attr('paramType'); //the type of the selected overload
            var ownerTr = element.closest('tr.paBuilderPropertyContainerTr');
            var propType = ownerTr.attr('proptype'); //the type of the property we are filtering
            var elementValue = element.val();
            var result;
            if (elementValue === '') {
                window.paBuilderController.setInputAsInvalid(element, 'Field required');
                return;
            }

            if (paramType === 'any') {
                switch (propType) {
                    case pa.utils.DataTypes.Number:
                        paramType = pa.utils.DataTypes.Number;
                        break;
                    case pa.utils.DataTypes.Boolean:
                        paramType = pa.utils.DataTypes.Boolean;
                        break;
                    case pa.utils.DataTypes.ArrayOfPrimitives:
                        paramType = pa.utils.DataTypes.Any;
                        break;
                    default:
                        break;
                }
            }

            switch (paramType) {
                case window.pa.utils.DataTypes.String:
                    break;
                case window.pa.utils.DataTypes.Number:
                    if (!pa.utils.IsNumeric(elementValue)) {
                        window.paBuilderController.setInputAsInvalid(element, 'Invalid Number');
                        return;
                    }
                    break;
                case window.pa.utils.DataTypes.Date:
                    break;
                case window.pa.utils.DataTypes.Boolean:
                    if (pa.utils.parseBoolean(elementValue) === null) {
                        window.paBuilderController.setInputAsInvalid(element, 'Invalid boolean value');
                        return;
                    }
                    break;
                case window.pa.utils.DataTypes.Object:
                    if (!window.paBuilderController._validateObject(elementValue)) {
                        window.paBuilderController.setInputAsInvalid(element, 'Invalid object. Expected { prop0 : val0, etc}');
                        return;
                    }
                case window.pa.utils.DataTypes.ArrayOfObjects:
                    result = window.paBuilderController._validateArrayOfObjects(elementValue);
                    if (!result.result) {
                        window.paBuilderController.setInputAsInvalid(element, result.msg);
                        return;
                    }
                    break;
                case window.pa.utils.DataTypes.ArrayOfPrimitives:
                    result = window.paBuilderController._validateArrayOfPrimitives(elementValue, propType);
                    if (!result.result) {
                        window.paBuilderController.setInputAsInvalid(element, result.msg);
                        return;
                    }
                    break;
                case window.pa.utils.DataTypes.Function:
                    result = window.paBuilderController._validateFunction(elementValue, propType);
                    if (!result.result) {
                        window.paBuilderController.setInputAsInvalid(element, result.msg);
                        return;
                    }
                    break;
                case window.pa.utils.DataTypes.RegExp:
                    break;

            }

            window.paBuilderController.setInputAsValid(element);

        };


        PaBuilderController.prototype._generatePlaceHolderTextForCurrentOverloadAndParam = function (overloadParam, tdArguments) {
            var row = tdArguments.parent();
            //return row.attr('proptype');


            //TODO: complete this cases
            var paramType = overloadParam.Type; //the type of the selected overload
            var propType = row.attr('proptype'); //the type of the property we are filtering

            switch (paramType) { //param type that the used function expect:
                case pa.utils.DataTypes.ArrayOfObjects:
                    return "[ {obj1}, {obj2}, etc]";
                case pa.utils.DataTypes.ArrayOfPrimitives:
                    return "[" + propType + ", " + propType + ", etc]";
                case pa.utils.DataTypes.Object:
                    return "{\"prop1\" : \"value1\", \"prop1\" : \"value1\"}";
            }

            return propType; //paramType + "/" + 

        };

        var patternTrWithTextField = "<tr>\
                                          <td width='50%' style='text-align:right!important;vertical-align:top !important;padding-top:9px;'>{0}:</td>\
                                          <td width='50%' ><input type='text' id='{6}_{4}' list='{7}' class='form-control propTextField has-error ' \
                                                    style='display:inline-block;' placeHolder='{5}'\
                                                    paramType='{1}' paramInfinite='{2}' proptype={8} paramFieldIndex='{4}' paramTableId='{6}' class='has-error' \
                                                    onkeyup='window.paBuilderController.validateArgumentsField(this)'\
                                                    oninput='window.paBuilderController.validateArgumentsField(this)'\
                                                    />{3}\
                                                <div class='validationError'>\
                                                    <span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;<span  class='errmessage'>Field cannot be empty</span>\
                                                </div>\
                                            </td>\
                                          </tr>";

        var patternTrWithCheckboxField = "<tr>\
                                             <td width='50%' style='text-align:right!important;vertical-align:top !important;padding-top:9px;'>{0}:</td>\
                                            <td width='50%' style='text-align:left !important;'><input type='checkbox' style='width:50px;background:none;display:inline-block;margin-top:9px;' paramType='{1}' placeHolder='{5}' paramInfinite='{2}' paramFieldIndex='{4}' paramTableId='{6}'>{3}\
                                            </td>\
                                          </tr>";
        var patternTrWithNotNeccesaryParameter = "<tr>\
                                             <td width='50%' style='text-align:right!important;vertical-align:top !important;padding-top:9px;'>{0}:</td>\
                                             <td width='50%' style='color:#c6002a;padding-top:9px;'><input type='text' disabled value='undefined' class='form-control has-error' style='display:none;' placeHolder='{5}' paramType='{1}' paramInfinite='{2}' paramFieldIndex='{4}' paramTableId='{6}'>should be falsy for this overload{3}\
                                            </td>\
                                          </tr>";

        /**
         * 
         * @param {} tdArguments 
         * @param {} valueType contains SINGLE, CUSTOM_FUNCTION or a function name
         * @returns {} 
         */
        PaBuilderController.prototype.generateHtmlForTdArguments = function (tdArguments, valueType, proptype) { //proptype is only provided when isSingleValue is true
            //nehme ich isSingleValue
            var model = this._model.selectedFunctionOverloads;
            var selectedOverload = model.overloads[model.selectedOverloadIndex];

            var paramsLength = (valueType === 'SINGLE' || valueType === 'CUSTOM_FUNCTION') ? 1 : selectedOverload.Parameters.length;

            var paramsTableId = Math.floor((Math.random() * 1000000000) + 1);
            var result = "<table class=paramsTable id='" + paramsTableId + "'>";
            var param, placeHolderText = this._generatePlaceHolderTextForCurrentOverloadAndParam(((valueType === 'SINGLE' || valueType === 'CUSTOM_FUNCTION') ? { Type: proptype } : selectedOverload.Example), tdArguments);

            if (valueType === 'SINGLE') { //in this case, add a fake parameter to keep the next loop running without changes
                selectedOverload = {
                    Parameters: [
                        {
                            MustBeUndefined: false,
                            PlaceHolder: placeHolderText,
                            Type: proptype,
                            Name: 'explicit comparison',
                            Infinite: false
                        }
                    ]
                }
            } else if (valueType === 'CUSTOM_FUNCTION') { //in this case, add a fake parameter to keep the next loop running without changes
                selectedOverload = {
                    Parameters: [
                        {
                            MustBeUndefined: false,
                            PlaceHolder: 'function(item) {\r\n}',
                            //Type: proptype,
                            Type: pa.utils.DataTypes.Function,
                            Name: 'Custom function',
                            Infinite: false
                        }
                    ]
                }
            } else {
                result += "<tr><td colspan=2 style='border-bottom: solid 1px gray;'><span style='color:lightgray;'></span><b>" + selectedOverload.Example + "</b><br>" + selectedOverload.Description + "</td></tr>";
            }

            for (var i = 0; i < paramsLength; i++) {
                param = selectedOverload.Parameters[i];
                placeHolderText = param.PlaceHolder || this._generatePlaceHolderTextForCurrentOverloadAndParam(param, tdArguments);
                if (param.MustBeUndefined) { //the parameter must be undefined for the selected overload
                    result += patternTrWithNotNeccesaryParameter.format(param.Name, param.Type, 'false', '', i, placeHolderText, paramsTableId);
                } else if (param.Type === pa.utils.DataTypes.Boolean) {
                    result += patternTrWithCheckboxField.format('Value for <b>' + param.Name + '</b>', param.Type, 'false', '(checked = true)', i, placeHolderText, paramsTableId);
                } else {
                    if (param.Infinite) {
                        result += patternTrWithTextField.format('Value for <b>' + param.Name + i + '</b>', param.Type, 'true',
                            '&nbsp;<span class="glyphicon glyphicon-plus" \
                                     style="cursor:pointer" \
                                     ParamExpander="' + paramsTableId + '_expander_' + i + '" \
                                     onClick="window.paBuilderController.addArgumentToOverload(this,' + (i + 1) + ',\'' + paramsTableId + '\',\'' +
                            param.Name + '\',\'' + param.Type + '\',\'' + placeHolderText + '\');"></span>',
                            i, placeHolderText, paramsTableId, "", proptype);
                    } else {
                        result += patternTrWithTextField.format('Value for <b>' + param.Name + '</b>', param.Type, 'false', '', i, placeHolderText, paramsTableId, "", proptype);
                    }
                }
            }
            result += "</table>";
            return result;
        };

        PaBuilderController.prototype.addArgumentToOverload = function (clickedElement, nextParameterIndex, paramTableId, paramName, paramType, placeHolderText) {
            clickedElement = $(clickedElement);
            var datalist = $(clickedElement.parent().find('input[type=text]')[0]).attr('list');
            var paramTable = $('#' + paramTableId);
            //get last + icon and hide it
            var lastIcon = $('span.glyphicon[ParamExpander=' + paramTableId + '_expander_' + (nextParameterIndex - 1) + ']');
            lastIcon.css('display', 'none');
            paramTable.append(patternTrWithTextField.format('Value for <b>' + paramName + nextParameterIndex + '</b>', paramType, 'true',
                '&nbsp;<span class="glyphicon glyphicon-plus" \
                                     style="cursor:pointer" \
                                     ParamExpander="' + paramTableId + '_expander_' + nextParameterIndex + '" \
                                     onClick="window.paBuilderController.addArgumentToOverload(this,' + (nextParameterIndex + 1) + ',\'' + paramTableId + '\',\'' + paramName + '\',\'' + paramType + '\',\'' + placeHolderText + '\');"></span>',
                nextParameterIndex, placeHolderText, paramTableId, datalist));


        };

        PaBuilderController.prototype._buildAutocompleteList = function (autoCompleteListId, path, prop, expectedParamType, propType) {
            console.log('expectedParamType: ' + expectedParamType + " " + "propType: " + propType);
            var that = this;
            var dataListPattern = '<datalist id="{0}">{1}</datalist>';
            var optionPattern = '<option value="{0}">';
            var i, l, t, values = [], optionsHtml = "", itemVal;
            var arr = this._model.jsonObject;
            var self = this;
            var result;

            var func = function getValFromPath(item, path, prop, expectedParamType) {
                if (path === window.paBuilderController.paPropertyLevelsSeparator) {
                    return [item[prop]];
                }
                var steps = path.split(self.paPropertyLevelsSeparator).Where(IsNotEmpty()).Sort(), mi, ml;
                var tmpObj = item;
                if (!tmpObj) {
                    return [];
                }
                for (mi = 0, ml = steps.length; mi < ml; mi++) {
                    var newVal = tmpObj[steps[mi]];
                    if (!newVal) {
                        return [];
                    }
                    t = pa.utils.GetTypeOf(newVal, true);
                    if (t === pa.utils.DataTypes.ArrayOfObjects) {
                        var subPath = window.paBuilderController.paPropertyLevelsSeparator;
                        for (v = 1, x = steps.length; v < x; v++) {
                            subPath += steps[v] + that.paPropertyLevelsSeparator;
                        }
                        result = [];
                        //its an array of objects
                        var ll = newVal.length;
                        while (ll--) {
                            result.push.apply(result, func(newVal[ll], subPath, prop));
                        }
                        return result;
                    }
                    tmpObj = newVal;
                }
                if (!tmpObj) {
                    return [];
                }
                var r = tmpObj;
                if (r.paIsArray) {
                    t = pa.utils.GetTypeOf(r, true);
                    if (t === pa.utils.DataTypes.ArrayOfPrimitives) {
                        return r;
                    }

                    var subPath = window.paBuilderController.paPropertyLevelsSeparator;
                    for (v = 1, x = steps.length; v < x; v++) {
                        subPath += steps[v] + that.paPropertyLevelsSeparator;
                    }
                    var result = [];
                    //its an array of objects
                    var ll = r.length;
                    while (ll--) {
                        result.push.apply(result, func(r[ll], subPath, prop));
                    }

                } else {
                    result = [tmpObj[prop]];
                };

                return result;
            };

            for (i = 0, l = arr.length; i < l; i++) {
                itemVals = func(arr[i], path, prop, expectedParamType);
                for (var i2 = 0, l2 = itemVals.length; i2 < l2; i2++) {
                    if (values.indexOf(itemVals[i2]) === -1) {
                        values.push(itemVals[i2]);
                    }
                }
            }

            values = values.Sort("ASCENDINGIGNORECASE");
            for (i = 0, l = values.length; i < l; i++) {
                optionsHtml += optionPattern.format(values[i]);
            }

            result = dataListPattern.format(autoCompleteListId, optionsHtml);
            return result;
        };

        PaBuilderController.prototype.confirmOverloadSelection = function (valueType, propType) { //proptype is only considered when isSingleValue is SINGLE
            //nehme ich isSingleValue
            //Create the TD with parameters for selected overload
            var tdArguments = $('td.argumentsTd[propname=' + this._model.selectedFunctionOverloads.prop + "][proppath=" + this._model.selectedFunctionOverloads.path + ']');
            tdArguments.attr('selectedOverloadIndex', this._model.selectedFunctionOverloads.selectedOverloadIndex);
            tdArguments.html(this.generateHtmlForTdArguments(tdArguments, valueType, propType));

            //Create / Initialize autocomplete
            var autoCompleteListId, autoCompleteListHtml;
            var textboxesForAutoComplete = tdArguments.find('input.propTextField');
            var t, l = textboxesForAutoComplete.length, tParamType;

            while (l--) {
                t = $(textboxesForAutoComplete[l]);
                //choto
                tParamType = t.attr('paramType');
                tPropType = t.attr('proptype');
                /*if (tParamType === pa.utils.DataTypes.String && tParamType !== pa.utils.DataTypes.Any) {
                    continue;
                }*/
                autoCompleteListId = this._model.selectedFunctionOverloads.path + "_" + this._model.selectedFunctionOverloads.prop;
                autoCompleteListHtml = this._buildAutocompleteList(autoCompleteListId, this._model.selectedFunctionOverloads.path, this._model.selectedFunctionOverloads.prop, tParamType, tPropType);
                $('body').append(autoCompleteListHtml);
                t.attr('list', autoCompleteListId);
            }

            $('#overloadSelector').fadeOut(300, function () {
                $('#overlay').fadeOut(300);
            });
        };


        PaBuilderController.prototype.loadDataFromUrl = function (url) {
            var that = this;
            that._model.loadJsonErrorMessage = '';
            that._model.parseJsonErrorMessage = '';

            this._timeout(function () {
                that._http.get(url).
                    success(function (data, status, headers, config) {
                        that._model.State = that._JSONSourceState.JsonLoaded;
                        that._model.loadJsonErrorMessage = '';
                        //TODO: would be better to get plain text directly....
                        try {
                            that._model.jsonPlainText = JSON.stringify(data, null, 2);

                        } catch (x) {
                            that._model.loadJsonErrorMessage = x.toString();
                            that._model.State = that._JSONSourceState.JsonNotLoaded;
                            that._model.jsonPlainText = '';
                            that._model.loadJsonErrorMessage = status + "";
                        }
                    }).error(function (data, status, headers, config) {
                        that._model.State = that._JSONSourceState.JsonNotLoaded;
                        that._model.jsonPlainText = '';
                        that._model.loadJsonErrorMessage = status + "";
                    });
            }, 300);
        }

        PaBuilderController.prototype.loadExample = function () {
            this._model.sourceType = 'EXAMPLES';
            this.loadDataFromUrl('ProgrammersSkills.json');
        };

        PaBuilderController.prototype.scrollToAnchor = function (aid) {
            var aTag = $("a[name='" + aid + "']");
            $('html,body').animate({
                scrollTop: aTag.offset().top
            }, 'slow');
        };
        PaBuilderController.prototype.parseJsonInput = function () {
            var that = this;
            try {
                this._model.jsonObject = angular.fromJson(this._model.jsonPlainText);
                if (!this._model.jsonObject.paIsArray) {
                    this._model.parseJsonErrorMessage = "The provided text is a valid Json, but not a json array.";
                    this._model.jsonObject = null;
                    this._model.jsonObjectPropsMatrix = null;
                    return;
                }
                $('#tblBuilder').hide();
                $('#workingImg').show();
                $('#arrayCount').html(this._model.jsonObject.length);
                this.scrollToAnchor('builderStep');
                this._timeout(function () {
                    that._model.jsonObjectPropsMatrix = that.buildPropsMatrix(that._model.jsonObject);
                    that._model.parseJsonErrorMessage = '';
                }, 750);
            } catch (e) {
                this._model.parseJsonErrorMessage = e.toString();
                this._model.jsonObject = null;
            }
        };

        PaBuilderController.prototype.addInResults = function (prop, level, levelPath) {
            var result = [];
            prop.level = level;
            prop.path = (levelPath === '') ? this._default_prop_path : levelPath;
            result.push(prop);
            //name,type,childs

            var cl = prop.childs.length;
            //if (cl > 0) {
            level++;
            //}
            levelPath = levelPath + prop.name + this.paPropertyLevelsSeparator;
            for (var ci = 0; ci < cl; ci++) {
                var childs = this.addInResults(prop.childs[ci], level, levelPath);
                result.push.apply(result, childs);
            }
            //if (cl > 0) {
            level--;
            //}
            return result;
        };

        PaBuilderController.prototype.getFlatPropsWithChilds = function (propsTree, level, levelPath) {
            var i, ci, l, cl, currProp, result = [];

            if (level === undefined) level = 0;
            if (levelPath === undefined) levelPath = this._default_prop_path + this.paPropertyLevelsSeparator;

            for (i = 0, l = propsTree.length; i < l; i++) {
                currProp = propsTree[i];
                result.push.apply(result, this.addInResults(currProp, level, levelPath));
            }
            return result;


        };

        PaBuilderController.prototype.buildPropsMatrix = function (objArr) {
            var that = this;
            var propsTree = this.extractPropertiesFromObject4Matrix(objArr);
            var flats = this.getFlatPropsWithChilds(propsTree);
            $('#workingImg').fadeOut(300, function () {
                that._timeout(function () {
                    $('#tblBuilder').fadeIn(500);
                    $('#btnGetExpression').fadeIn(500);
                }, 300);
            });
            return {
                tree: propsTree,
                flats: flats
            };
        };


        PaBuilderController.prototype.getFuncParams = function (tdArguments, funcName, overloadIdx, proptype, propname, proppath) {
            var inputs = tdArguments.find('input'), i, l, result = '', overload;

            var singleValuePrefix = ""; //the ' before and after param values
            var parameterPrefix = ""; //the [] before and after array params 
            var parameterSufix = ""; //the [] before and after array params 

            //    overload = pa.auxiliaryFunctionsDescriptor.First({ Name: funcName }).Targets.First().Overloads[overloadIdx];

            //each input is a parameter OR there are infinite parameters

            for (i = 0, l = inputs.length; i < l; i++) {

                var input = $(inputs[i]);
                var inputValue = input.val();

                if (input.attr('type').toUpperCase() === 'CHECKBOX') {
                    inputValue = (inputValue.toUpperCase() === 'ON') ? "true" : "false";
                }

                //remove the ' for object that do not need it as arrays

                var paramType = $(input).attr("paramtype");

                if (funcName === 'CUSTOM_FUNCTION' ||
                    paramType === pa.utils.DataTypes.ArrayOfObjects ||
                    paramType === pa.utils.DataTypes.ArrayOfPrimitives ||
                    proptype === pa.utils.DataTypes.Number ||
                    proptype === pa.utils.DataTypes.Boolean) {
                    singleValuePrefix = '';
                } else {
                    singleValuePrefix = "'";
                }

                //Replace any ' present in the value with a \'
                //but only when it's not a custom function, that may use ' symbols.

                if (funcName !== 'CUSTOM_FUNCTION') {
                    inputValue = inputValue.replace(new RegExp("\'", "g"), "\\\'");
                }

                var paramAssignation = parameterPrefix + singleValuePrefix + inputValue + singleValuePrefix + parameterSufix;

                if (inputValue) {
                    result += paramAssignation + ((i + 1 < l) ? ", " : "");
                }

            }
            return result;
        };


        PaBuilderController.prototype.validateBuilderTable = function () {
            if (this.getInvalidBuilderFieldsQuantity === 0) {
                $('#conditionsError').fadeIn(500);
                return false;
            }
            if ($('tr.paBuilderPropertyContainerTr.filteredRow').length === 0) {
                $('#conditionsError2').fadeIn(500);
                return false;
            }
            return true;
        };

        PaBuilderController.prototype.getInvalidBuilderFieldsQuantity = function () {
            var invalidInputs = $('input.has-error');
            return invalidInputs.length;
        }

        PaBuilderController.prototype.gotoSorting = function () {

            if (!this.validateBuilderTable()) {
                return;
            }
            $('#conditionsError').hide();
            $('#conditionsError2').hide();

            this.buildSortingUls();


            this.scrollToAnchor("sortingStep");
        }


        PaBuilderController.prototype.generateDropdownHtmlForSortingProperty = function (propName, propPath, propType) {
            var dropDownPattern = '<select propName="{0}" propPath="{1}" class="form-control input-md">{2}</select>';
            var optionPattern = '<option value="{0}">{1}</option>';
            var possibleSort = '', possibleSorts = pa.auxiliarySortCriteriaDescriptor.Where({ TargetTypes: Contains(propType) }).Sort({ Name: 'Descending' });
            var l = possibleSorts.length, options = '';
            while (l--) {
                possibleSort = possibleSorts[l];
                options += optionPattern.format(possibleSort.Name, possibleSort.Name + " (" + possibleSort.Description + ")");
            }
            return dropDownPattern.format(propName, propPath, options);
        };

        PaBuilderController.prototype.buildSortingUls = function () {
            var result = '';
            var that = this;
            /**
           <li propname="{{prop.name}}" proppath="{{ prop.path }}" proptype="{{ prop.type }}" >
                        <span style="border-bottom: dashed lightgray 1px" ng-style="{'padding-left': (15 + (prop.level*20)) + 'px'}">
                            {{prop.name}} <span class="typeName">[{{prop.type}}]</span>
                        </span>
                    </li>
           */
            var liPattern = '<li propname="{0}" proppath="{2}" proptype="{3}" >\
                                <div class="row" style="margin: 3px; padding: 3px;padding-top:7px;border-radius:5px;border: dashed 1px gray;">\
                                    <div class="form-group" style="position: relative;width:100% !important;">\
                                      <label class="col-md-4 control-label" for="textinput">{1}<a><b>{0}</b>&nbsp;<span class="badge">{3}</span></a></label>  \
                                      <div class="col-md-7 sortedColumnControlsContainer" style="margin-top: -4px;">\
                                        {4}\
                                      </div>\
                                        <span class="glyphicon glyphicon-trash sortedPropertyremoveIcon col-md-1" onclick="window.paBuilderController.removeSelectedSortingColumn(this)"></span>\
                                    </div>\
                                </div>\
                                <!--<div class="alert alert-info" role="alert" style="position: relative;" >\
                                   <span class="glyphicon glyphicon-trash sortedPropertyremoveIcon" onclick="window.paBuilderController.removeSelectedSortingColumn(this)"></span>  \
                                   <div class="sortedColumnControlsContainer">{4}</div>\
                                   {1}<a><b>{0}</b>&nbsp;<span class="badge">{3}</span></a>\
                                </div>-->\
                            </li>';

            for (var i = 0, l = this._model.jsonObjectPropsMatrix.flats.length; i < l; i++) {
                var prop = this._model.jsonObjectPropsMatrix.flats[i];
                var pName = prop.path.split(window.paBuilderController.paPropertyLevelsSeparator).Where(IsNotEmpty());
                var dropDownHtml = this.generateDropdownHtmlForSortingProperty(prop.name, prop.path, prop.type);
                var pPath = '<span style="color:gray;">';
                n = pName.length;
                while (n--) {
                    if (pName[n] === '') continue;
                    pPath += pName[n] + ".";
                }
                pPath += '</span>';
                result += liPattern.format(prop.name, pPath, prop.path, prop.type, dropDownHtml); // (15 + (prop.level * 20)
            }
            $('#sortingUlSource').html(result);
            //$('#sortingUlDestination').empty();
            //$('#sortingUlDestination').empty();
            $('#alertNoItemsDragged').fadeIn(1000);

            //following names are not variables, but existing html ids

            Sortable.create(sortingUlSource, {
                group: {
                    name: 'source',
                    put: false,
                    pull: 'clone'
                },
                animation: 100,
                sort: false,
                filter: ".alreadySortedByColumn"
            });

            Sortable.create(sortingUlDestination, {
                group: {
                    name: 'destination',
                    put: ['source'],
                    pull: true
                },
                animation: 100,
                // Changed sorting within list
                /*onUpdate: function (evt) {
                    var itemEl = evt.item;  // dragged HTMLElement
                    // + indexes from onEnd
                    alert('resorted');
                },*/
                // Called by any change to the list (add / update / remove)
                onSort: function (/**Event*/evt) {
                    // same properties as onUpdate
                    /*var liItem = $(evt.item);
                    alert(liItem.attr("propname"));*/
                    that.sortingChanged(evt);
                }
            });

        };

        PaBuilderController.prototype.removeSelectedSortingColumn = function (element) {
            var li = $(element).closest('li');
            li.fadeOut(300);
            setTimeout(function () {
                li.remove();
                window.paBuilderController.sortingChanged();
            }, 700);

        };

        PaBuilderController.prototype.sortingChanged = function (evt) {
            /*
            var liItem = $(evt.item);
            alert(liItem.attr("propname"));
            */

            /* 1 - If there is nothing on the right side, show the message "please select" */

            var sortingLis = $('#sortingUlDestination li');

            if (sortingLis.length === 0) {
                $('#alertNoItemsDragged').fadeIn(1000);
            } else {
                $('#alertNoItemsDragged').fadeOut(1000);
            }

            /* 2 - remove all "alreadySortedByColumn" class from each property on the left panel. Those that are used will be restored on the next point */

            $('#sortingUlSource li').removeClass('alreadySortedByColumn');

            /* 3 - Check that the columns that already are on the right panel dont be selectable again*/

            var total = sortingLis.length;
            while (total--) {
                var li = $(sortingLis[total]);
                var pName = li.attr('propname'), pPath = li.attr('proppath');

                //Items already used:
                var usedPropertyLi = $('#sortingUlSource li[propname=' + pName + '][proppath=' + pPath + ']');
                if (usedPropertyLi.length > 0) {
                    $(usedPropertyLi).addClass('alreadySortedByColumn');
                }
            }

        };

        PaBuilderController.prototype.buildExpression = function() {
            var i, l, proptype, proppath, propname, funcName, overloadIdx;
            var conditions = [];

            if (!this.validateBuilderTable()) {
                return;
            }

            $('#conditionsError').hide();
            $('#conditionsError2').hide();

            var trs = $('tr.paBuilderPropertyContainerTr.filteredRow');

            for (i = 0, l = trs.length; i < l; i++) {
                var tr = $(trs[i]);
                var tdArguments = $(tr.find('td.argumentsTd'));

                funcName = tdArguments.attr('selectedfunction');
                overloadIdx = tdArguments.attr('selectedoverloadindex');
                proptype = tr.attr("proptype");
                proppath = tr.attr("proppath");
                propname = tr.attr("propname");
                conditions.push({
                    prop: propname,
                    filter: funcName,
                    params: this.getFuncParams(tdArguments, funcName, overloadIdx, proptype, propname, proppath),
                    path: proppath
                });
            }

            $('#conditionsError2').hide();


            this.scrollToAnchor('resultStep');

            var orderedPaths = [], lastPath = '';
            var result = [], condStr = "", pre = '', su = '', pathArr = [], lastPathArr = [], lastPath;

            for (i = 0, l = conditions.length; i < l; i++) {
                if (conditions[i].path !== lastPath) {
                    if (orderedPaths.indexOf(conditions[i].path) === -1) {
                        orderedPaths.push(conditions[i].path);
                        lastPath = conditions[i].path;
                    }
                }
            }
            lastPath = this._default_prop_path + this.paPropertyLevelsSeparator, countOpenPaths = 0;
            console.log(JSON.stringify(orderedPaths, null, 2));
            var openPaths = [];
            var spacer = '';
            var spacesPerLevel = 5;
            var getSpaces = function(howMany, str) {
                if (!str) str = ' ';
                var a = new Array(howMany + 1);
                return a.join(str);
            }

            for (i = 0, l = orderedPaths.length; i < l; i++) {
                var currPath = orderedPaths[i];
                var conditionsOnLevel = conditions.Where({ path: currPath });
                condStr = '';


                if (lastPath != currPath) { //if the path changed
                    lastPathArr = lastPath.split(window.paBuilderController.paPropertyLevelsSeparator).Where(IsNotEmpty(), true);
                    currPathArr = currPath.split(window.paBuilderController.paPropertyLevelsSeparator).Where(IsNotEmpty(), true);

                    //if (lastPath !== this._default_prop_path) { //and the new one is not root
                    //print all closing } as necessary
                    //to decide how many items should be closed, just look in the arrays and when they start to be differnt, 
                    //start closing until countOpenPaths is reached

                    for (var vi = 0, vl = countOpenPaths; vi < vl; vi++) {
                        if (lastPathArr[vi] !== currPathArr[vi]) {
                            result.push({ text: "}", level: countOpenPaths });
                            countOpenPaths--;
                        }
                    }
                    //print all openers { path if neccesary
                    //} else {
                    //do not have to close, only open is possible
                    for (var x = 0, y = currPathArr.length; x < y; x++) {
                        if (openPaths.indexOf(currPathArr[x]) === -1) { //do not open it if it's already open

                            if (x === 0 && i > 0) {
                                result[result.length - 1].text += ",";
                            }
                            result.push({ text: currPathArr[x] + ": {", level: countOpenPaths });
                            openPaths.push(currPathArr[x]);
                            countOpenPaths++;
                        } else {
                            result[result.length - 1].text += ",";
                        }
                    }
                    //}
                }

                for (var ci = 0, cl = conditionsOnLevel.length; ci < cl; ci++) {
                    var cond = conditionsOnLevel[ci];

                    switch (cond.filter) {
                    case "SINGLE":
                    case "CUSTOM_FUNCTION":
                        condStr = cond.prop + ": " + cond.params + ((ci + 1 < cl) ? ", " : "");
                        break;
                    default:
                        condStr = cond.prop + ": " + cond.filter + "(" + cond.params + ")" + ((ci + 1 < cl) ? ", " : "");
                        break;
                    }

                    result.push({ text: condStr, level: countOpenPaths });
                }

                lastPath = currPath;

            }
            if (countOpenPaths > 0) {
                while (countOpenPaths--) {
                    result.push({ text: "}", level: countOpenPaths });
                }
            }


            var plain = ""; //used for execution
            var beautyPlain = ""; //for display
            var beautyHtml = ""; //for display
            var marginPlain = getSpaces(29, ' ');
            var marginHtml = getSpaces(29, '&nbsp;');
            var marginHtmlEnd = getSpaces(27, '&nbsp;');

            for (i = 0, l = result.length; i < l; i++) {
                plain += result[i].text;
                beautyPlain += marginPlain + getSpaces(result[i].level * spacesPerLevel) + result[i].text + "\r\n";
                beautyHtml += marginHtml + getSpaces(result[i].level * spacesPerLevel, '&nbsp;') + result[i].text + "<br>";
            }

            /**
             PRODUCE THE SORT EXPRESSSION
             */

            var sortingExpression = this.generateSortExpression(getSpaces(27, '&nbsp;')), beautySort = '';

            this._lastWhereExpressionConditions = plain; //+ ".Sort({" + sortingExpression + "})";
            this._lastSortExpressionConditions = sortingExpression;
            while (this._lastSortExpressionConditions.indexOf('&nbsp;') > -1) {
                this._lastSortExpressionConditions = this._lastSortExpressionConditions.replace('&nbsp;', '');
            }

            if (sortingExpression) {
                beautySort = ".Sort({\r\n" + sortingExpression + "\r\n" + marginHtmlEnd + "})";
            }

            
            $('#resultConditions').html(beautyHtml);
            $('#resultConditionsPRE').html("\
\
var result = theArray.Where({\r\n" + beautyPlain + marginHtmlEnd + "}" + beautySort + ");\
\
");

        };


        PaBuilderController.prototype.generateSortExpression = function(prefixForEachLine) {
            var result = '', i, select,  li, lis = $('#sortingUlDestination li'), l,
                propName, propType, propPath;
            if (lis.length === 0) {
                return '';
            }

            //keep order
            for (i = 0, l = lis.length; i < l; i++) {
                li = $(lis[i]);
                select = $(li.find('select')); //will be always one
                result += prefixForEachLine + "\t" + li.attr('propName') + " : '" + select.val() + ((i+1 < l) ? "',\r\n" : "'");
            }
            return result;
        };

       
        PaBuilderController.prototype.runLastExpression = function () {

            var p = "var theResult = this._model.jsonObject.Where({" + this._lastWhereExpressionConditions + "})";
            if (this._lastSortExpressionConditions) {
                p += ".Sort({" + this._lastSortExpressionConditions.replace('&nbsp;', '') + "})";
            }
            p += ";";
            console.log(p);
            eval(p);


            var timeStart = performance.now();
            var jsonResult = JSON.stringify(theResult);
            var timeEnd = performance.now();

            var time = timeEnd - timeStart;

            $('#jsonResultMatchesCount').html(theResult.length);
            $('#jsonResultTimeTook').html("Expression execution took " + time + " ms.");

            this._buildResultsGrid(theResult);

            $("#jsonResult").jJsonViewer(jsonResult);
        };

        PaBuilderController.prototype._buildResultsGrid = function (arr) {
            var result = "<table width='100%' class='tblResults'>";
            var i, l, rowHeader = '<tr>';
            var props = this._model.jsonObjectPropsMatrix.tree;

            for (i = 0, l = props.length; i < l; i++) {
                rowHeader += "<th>" + props[i].name + " (" + props[i].type + ")</th>";
            }
            rowHeader += '</tr>';
            result += rowHeader;

            for (i = 0, l = arr.length; i < l; i++) {
                result += '<tr>';
                for (i2 = 0, l2 = props.length; i2 < l2; i2++) {
                    var val = arr[i][props[i2].name];
                    if (props[i2].type === pa.utils.DataTypes.Object || props[i2].type === pa.utils.DataTypes.ArrayOfObjects) {
                        val = JSON.stringify(val, null, 2);
                    }
                    if (val != null && val.length && val.length > 100) {
                        val = val.substr(0, 90) + "...";
                    }
                    result += "<td>" + val + "</td>";
                }
                result += '</tr>';
            }
            result += "</table>";
            $('#resultsGrid').html(result);
        };


        PaBuilderController.prototype.getFunctionGroupsForFiltersByType = function (targetType) {
            var tmp = window.pa.auxiliaryFunctionsDescriptor.Where({
                Targets: {
                    TargetTypes: Contains(targetType)
                }
            });
            return tmp.getPropertyFlat('Group', false, false, false);
        };

        PaBuilderController.prototype.getFunctionsAvailableFilters = function (targetType, group) {
            var lt, l = window.pa.auxiliaryFunctionsDescriptor.length;

            return window.pa.auxiliaryFunctionsDescriptor.Where([{
                Targets: {
                    TargetTypes: Contains(targetType)
                },
                Group: group
            }, {
                Targets: {
                    TargetTypes: Contains('any')
                }
            }]).Sort({
                Name: 'Asc'
            });
        };

        PaBuilderController.prototype.extractPropertiesFromObject4Matrix = function (objArr) {
            var obj = objArr;
            if (objArr.paIsArray) {
                obj = objArr[0];
            }
            var keys = this.getObjectOwnProperties(obj);
            var i, l, l2, result = [], currKey, tmpObj, t;
            l = keys.length;
            for (i = 0; i < l; i++) {
                currKey = keys[i];
                var currKeyType = pa.utils.GetTypeOf(obj[currKey], true);
                switch (currKeyType) {
                    case pa.utils.DataTypes.String:
                    case pa.utils.DataTypes.Number:
                    case pa.utils.DataTypes.Boolean:
                    case pa.utils.DataTypes.ArrayOfPrimitives:
                        result.push({ name: currKey, type: currKeyType, childs: [] });
                        break;
                    case pa.utils.DataTypes.Object:
                        result.push({ name: currKey, type: currKeyType, childs: this.extractPropertiesFromObject4Matrix(obj[currKey]) });
                        break;
                    case pa.utils.DataTypes.ArrayOfObjects:
                        var sampledObject = obj[currKey][0];
                        result.push({ name: currKey, type: currKeyType, childs: this.extractPropertiesFromObject4Matrix(sampledObject) });
                        break;
                    default:
                        //unknown type. Start iterating to find something, and only if nothing found let it as null
                        if (objArr.paIsArray) {
                            t = objArr.length;
                            while (t--) {
                                var val = objArr[t][currKey];
                                if (val !== undefined && val !== null) {
                                    currKeyType = pa.utils.GetTypeOf(val, true);
                                    var childs = [];
                                    if (currKeyType === pa.utils.DataTypes.Object || currKeyType === pa.utils.DataTypes.ArrayOfObjects) {
                                        childs = this.extractPropertiesFromObject4Matrix(val);
                                    }
                                    result.push({ name: currKey, type: currKeyType, childs: childs });
                                    break;
                                }
                            }
                        } else {
                            result.push({ name: currKey, type: pa.utils.DataTypes.String, childs: [] });
                        }
                }
            }
            //xxx3
            return result;
        };

        PaBuilderController.prototype.getObjectOwnProperties = function (obj) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        }
        var controllerInstance = new PaBuilderController($scope, $http, $timeout);
        window.paBuilderController = controllerInstance;

        return controllerInstance;
    });



/**
 * String format implementation as in c#
 */
if (!String.prototype.format) {
    String.prototype.format = function () {// jshint ignore:line
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

/*
TODOS:
 - the function Contains, does not offer the right autocomplete nor validation
 - 
*/
