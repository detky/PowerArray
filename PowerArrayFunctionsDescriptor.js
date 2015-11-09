window.pa.auxiliaryFunctionsDescriptor = [
{
    Name: 'Like',
    Description: 'Search for one or more patterns in a string. Case sensitive.',
    Group: 'Comparisons of Content',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String
        ],
        Overloads: [
        {
            Example: 'Like(singleValue)',
            Description: 'return all elements containing the value of parameter "singleValue" on the desired string property',
            Parameters: [
                {
                    Name: 'singleValue',
                    Description: 'The value to search for',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: 'Like(value0[, value1][, value2][, value3][,etc])',
            Description: 'return all elements containing ALL values of ALL passed "value..." parameters. Unlimited parameters quantity',
            Parameters: [
                {
                    Name: 'value',
                    Description: 'The value to search for',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: 'Like(array)',
            Description: 'return all elements containing ALL values present on the "array" parameter',
            Parameters: [
                {
                    Name: 'array',
                    Description: 'array of values to search for',
                    Type: pa.utils.DataTypes.ArrayOfPrimitives
                }
            ]
        }
        ]
    }
    ]
},
{
    Name: 'NotLike',
    Description: 'Search for one or more exclusion patterns in a string. Case sensitive.',
    Group: 'Comparisons of Content',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String
        ],
        Overloads: [
        {
            Example: 'NotLike(singleValue)',
            Description: 'return all elements not containing the value of parameter "singleValue"',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: 'NotLike(value0[, value1][, value2][, value3][,etc])',
            Description: 'return all elements not containing ANY values of ALL passed "value..." parameters',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: 'NotLike(array)',
            Description: 'return all elements not containing ANY value present on the "array" parameter',
            Parameters: [
                {
                    Name: 'list',
                    Type: pa.utils.DataTypes.ArrayOfPrimitives
                }
            ]
        }
        ]
    }
    ]
}, {
    Name: 'LikeIgnoreCase',
    Description: 'Search for one or more patterns in a string. Case insensitive.',
    Group: 'Comparisons of Content',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String
        ],
        Overloads: [
        {
            Example: 'LikeIgnoreCase(singleValue)',
            Description: 'return all elements containing the value of parameter "singleValue" on the desired string property',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: '.Like(value0[, value1][, value2][, value3][,etc])',
            Description: 'return all elements containing ALL values of ALL passed "value..." parameters',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: 'LikeIgnoreCase(array)',
            Description: 'return all elements containing ALL values present on the "array" parameter',
            Parameters: [
                {
                    Name: 'array',
                    Type: pa.utils.DataTypes.ArrayOfPrimitives
                }
            ]
        }
        ]
    }
    ]
},
{
    Name: 'NotLikeIgnoreCase',
    Description: 'Search for one or more exclusion patterns in a string. Case insensitive.',
    Group: 'Comparisons of Content',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String
        ],
        Overloads: [
        {
            Example: 'NotLikeIgnoreCase(singleValue)',
            Description: 'return all elements not containing the value of parameter "singleValue"',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: 'NotLikeIgnoreCase(value0[, value1][, value2][, value3][,etc])',
            Description: 'return all elements not containing ANY values of ALL passed "value..." parameters',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: 'NotLikeIgnoreCase(array)',
            Description: 'return all elements not containing ANY value present on the "array" parameter',
            Parameters: [
                {
                    Name: 'list',
                    Type: pa.utils.DataTypes.ArrayOfPrimitives
                }
            ]
        }
        ]
    }
    ]
}, {
    Name: 'IsNaN',
    Description: 'Search for NaN values',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.IsNaN()',
                    Description: 'Return true if the corresponding value is a NaN',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsNotNaN',
    Description: 'Search for non NaN values',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.IsNotNaN()',
                    Description: 'Return true if the corresponding value is not a NaN',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsNotNull',
    Description: 'Search for non null values',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsNull()',
                    Description: 'Returns true if the corresponding value is not null',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsNull',
    Description: 'Search for null values',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsNull()',
                    Description: 'Returns true if the corresponding value is null',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsDefined',
    Description: 'Search for values that are different than undefined',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsDefined()',
                    Description: 'Returns true if the corresponding value is not === undefined',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsTrue',
    Description: 'Search for true values',
    Group: 'Comparisons of Equality',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.Any
            ],
            Overloads: [
                {
                    Example: '.IsTrue()',
                    Description: 'Returns true if the corresponding value is also true (value === true)',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsFalse',
    Description: 'Search for false values',
    Group: 'Comparisons of Equality',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.Any
            ],
            Overloads: [
                {
                    Example: '.IsFalse()',
                    Description: 'Returns true if the corresponding value is false (value === false)',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsFalsy',
    Description: 'Search for falsy values',
    Group: 'Truthiness / Falsyness',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsFalsy()',
                    Description: 'Returns true if the corresponding value is falsy (!value ? true : false)',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsTruthy',
    Description: 'Search for truthy values',
    Group: 'Truthiness / Falsyness',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsTruthy()',
                    Description: 'Returns true if the corresponding value is truthyy (value ? true : false)',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsEmpty',
    Description: 'Search for empty values',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.IsEmpty()',
                    Description: 'Returns true if the corresponding value is an empty string',
                    Parameters: []
                }
            ]
        }, {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects
            ],
            Overloads: [
                {
                    Example: '.IsEmpty()',
                    Description: 'Returns true if the corresponding value is an empty array',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsNotEmpty',
    Description: 'Search for non empty values',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.IsNotEmpty()',
                    Description: 'Returns true if the corresponding string value is not empty',
                    Parameters: []
                }
            ]
        }, {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects
            ],
            Overloads: [
                {
                    Example: '.IsNotEmpty()',
                    Description: 'Returns true if the corresponding value is a non-empty array',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsUndefined',
    Description: 'Search for values that are different than undefined',
    Group: 'Comparisons of Defined / Undefined / Null / NaN',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.RegExp,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.IsUndefined()',
                    Description: 'Returns true if the corresponding value is undefined (value === undefined)',
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'EqualTo2',
    Description: 'Search for values comparing with equality operator (==)',
    Group: 'Comparisons of Equality',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean
            ],
            Overloads: [
                {
                    Example: '.EqualTo2(value)',
                    Parameters: [
                        {
                            Name: 'value',
                            Description: 'Returns the result of an equality comparison (==) with the passed value',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'EqualTo3',
    Description: 'Search for values comparing with identity operator (===)',
    Group: 'Comparisons of Equality',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean
            ],
            Overloads: [
                {
                    Example: '.EqualTo3(value)',
                    Description: 'Returns the result of an identity comparison (===) with the passed value',
                    Parameters: [
                        {
                            Name: 'value',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'EqualTo',
    Description: 'Search for objects by comparing them with a passed object. Use a custom function or a default depp-object-comparison function',
    Group: 'Comparisons of Equality',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfObjects,
                window.pa.utils.DataTypes.Object
            ],
            Overloads: [
                {
                    Example: '.EqualTo(refObject, func)',
                    Description: 'Returns true if the function provided on parameter "func" returns true when executing func(refObject,objectToEvaluate)',
                    Parameters: [
                        {
                            Name: 'refObject',
                            Description: 'An object to compare with all items',
                            Type: pa.utils.DataTypes.Object
                        },
                        {
                            Name: 'func',
                            Description: 'A custom function that will be used for comparison. It should return a boolean value, and accept two parameters: \
                            the first one, will be always the originally passed refObject, the second will be the current item to be evaluated.',
                            Type: pa.utils.DataTypes.Function
                        }
                    ]
                },
                 {
                     Example: '.EqualTo(refObject, undefined, enforcePropsOrder, cyclic)',
                     Description: 'Returns true if the passed refObject is equal to the corresponding value. Deep object comparison possible',
                     Parameters: [
                         {
                             Name: 'refObject',
                             Description: 'An object to compare with all items',
                             Type: pa.utils.DataTypes.Object
                         },
                         {
                             Name: 'func',
                             Description: '',
                             Type: pa.utils.DataTypes.Function,
                             MustBeUndefined: true
                         },
                         {
                             Name: 'enforcePropsOrder',
                             Description: 'true to check if Object properties are provided in the same order',
                             Type: pa.utils.DataTypes.Boolean
                         },
                         {
                             Name: 'cyclic',
                             Description: 'true to check for cycles in cyclic objects',
                             Type: pa.utils.DataTypes.Boolean
                         }
                     ]
                 }
            ]
        }
    ]
}, {
    Name: 'GreaterThan',
    Description: 'Search for values that are bigger than a passed value',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.GreaterThan(value)',
                    Description: 'Returns true if the passed value is bigger than the evaluated value',
                    Parameters: [
                        {
                            Name: 'value',
                            Description: 'The value to compare with',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'SmallerThan',
    Description: 'Search for values that are smaller than a passed value',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.SmallerThan(value)',
                    Description: 'Returns true if the passed value is smaller than the evaluated value',
                    Parameters: [
                        {
                            Name: 'value',
                            Description: 'The value to compare with',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'Between',
    Description: 'Search for values that are between From/To values',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.Between(from, to)',
                    Description: 'Returns true if the value to be evaluated is equal or greather than the "from" parameter, and smaller or equal than the "to" parameter',
                    Parameters: [
                        {
                            Name: 'from',
                            Description: 'minimal accepted value',
                            Type: 'any'
                        },
                        {
                            Name: 'to',
                            Description: 'maximal accepted value',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'In',
    Description: 'Search for existence of certain value in an array or specific single values',
    Group: 'Comparison of Contained / not Contained',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.Boolean,
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: 'In(array)',
                    Description: 'Returns true if the value to be evaluated is included on the provided array',
                    Parameters: [
                        {
                            Name: 'array',
                            Description: 'array of primitive values to compare with',
                            Type: window.pa.utils.DataTypes.ArrayOfPrimitives
                        }
                    ]
                },
                {
                    Example: '.In(value0[, value1][, value2][, value3][,etc])',
                    Description: 'Returns true if the corresponding value is equal to one of the passed values. Unlimited parameters quantity',
                    Parameters: [
                        {
                            Name: 'value',
                            Description: 'primitive value to compare with',
                            Type: 'any',
                            Infinite: true
                        }
                    ]
                }
            ]
        }
    ]
},
{
    Name: 'NotIn',
    Description: 'Search for absence of certain value in an array or specific single values',
    Group: 'Comparison of Contained / not Contained',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date,
                window.pa.utils.DataTypes.Boolean
            ],
            Overloads: [
                {
                    Example: 'NotIn(array)',
                    Description: 'Returns true if the value to be evaluated is different than all items of the provided array',
                    Parameters: [
                        {
                            Name: 'array',
                            Description: 'array of primitive values to compare with',
                            Type: window.pa.utils.DataTypes.ArrayOfPrimitives
                        }
                    ]
                },
                {
                    Example: 'NotIn(value0[, value1][, value2][, value3][,etc])',
                    Description: 'Returns true if the corresponding value is different than all passed values. Unlimited parameters quantity',
                    Parameters: [
                        {
                            Name: 'value',
                            Description: 'primitive value to compare with',
                            Type: 'any',
                            Infinite: true
                        }
                    ]
                }
            ]
        }
    ]
},
{
    Name: 'StartsWith',
    Description: 'Search for string properties that starts with an specific string value',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: 'StartsWith(start)',
                    Description: 'Returns true if the corresponding string value starts with the value of parameter "start"',
                    Parameters: [
                        {
                            Name: 'start',
                            Description: 'string value to search for',
                            Type: window.pa.utils.DataTypes.String
                        }
                    ]
                }
            ]
        }
    ]
},
{
    Name: 'EndsWith',
    Description: 'Search for string properties that ends with an specific string value',
    Group: 'Comparisons of Content',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.EndsWith(end)',
                    Description: 'Returns true if the corresponding string value ends with the value of parameter "end"',
                    Parameters: [
                        {
                            Name: 'end',
                            Description: 'string value to search for',
                            Type: window.pa.utils.DataTypes.String

                        }
                    ]
                }
            ]
        }
    ]
},
{
    Name: 'Contains',
    Description: 'Search for arrays containing specific values',
    Group: 'Comparison of Contained / not Contained',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
            {
                Example: '.Contains(value)',
                Description: 'Returns true if the passed value is present on the corresponding array property',
                Parameters: [
                    {
                        Name: 'value',
                        Description: 'a primitive value to search for',
                        Type: 'any'
                    }
                ]
            }
        ]
    }, {
        TargetTypes: [
            window.pa.utils.DataTypes.ArrayOfObjects
        ],
        Overloads: [
        {
            Example: '.Contains(refObject, enforcePropsOrder, cyclic)',
            Description: 'Returns true if the passed refObject is present on the corresponding array property. Deep object comparison made by default function.',
            Parameters: [
            {
                Name: 'refObject',
                Description: 'object to compare with',
                Type: window.pa.utils.DataTypes.Object
            },
             {
                 Name: 'enforcePropsOrder',
                 Description: 'true to check if Object properties are provided in the same order',
                 Type: pa.utils.DataTypes.Boolean
             },
            {
                Name: 'cyclic',
                Description: 'true to check for cycles in cyclic objects',
                Type: pa.utils.DataTypes.Boolean
            }
            ]
        }
        ]
    }
    ]
}
];
