window.pa.auxiliaryFunctionsDescriptor = [
{
    Name: 'Like',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String,
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
        {
            Example: '.Like(value)',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: '.Like(value0[, value1][, value2][, value3][,etc])',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: '.Like(list)',
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
},
{
    Name: 'NotLike',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String,
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
        {
            Example: '.NotLike(value)',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: '.NotLike(value0[, value1][, value2][, value3][,etc])',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: '.NotLike(list)',
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
},{
    Name: 'LikeIgnoreCase',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String,
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
        {
            Example: '.Like(value)',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: '.Like(value0[, value1][, value2][, value3][,etc])',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: '.Like(list)',
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
},
{
    Name: 'NotLikeIgnoreCase',
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.String,
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
        {
            Example: '.NotLike(value)',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String
                }
            ]
        },
        {
            Example: '.NotLike(value0[, value1][, value2][, value3][,etc])',
            Parameters: [
                {
                    Name: 'value',
                    Type: pa.utils.DataTypes.String,
                    Infinite: true
                }
            ]
        },
        {
            Example: '.NotLike(list)',
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
    Name: 'IsDefined',
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
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsTrue',
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
                    Example: '.IsTrue()',
                    Parameters: []
                }
            ]
        }
    ]
},{
    Name: 'IsFalse',
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
                    Example: '.IsFalse()',
                    Parameters: []
                }
            ]
        }
    ]
},{
    Name: 'IsFalsy',
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
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsTruthy',
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
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'IsUndefined',
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
                    Parameters: []
                }
            ]
        }
    ]
}, {
    Name: 'EqualTo2',
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
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'EqualTo3',
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
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfObjects
            ],
            Overloads: [
                {
                    Example: '.EqualTo(object, func)',
                    Parameters: [
                        {
                            Name: 'object',
                            Type: pa.utils.DataTypes.Object
                        },
                        {
                            Name: 'func',
                            Type: pa.utils.DataTypes.Function
                        }
                    ]
                },
                 {
                     Example: '.EqualTo(object, func, enforce_properties_order, cyclic)',
                     Parameters: [
                         {
                             Name: 'object',
                             Type: pa.utils.DataTypes.Object
                         },
                         {
                             Name: 'func',
                             Type: pa.utils.DataTypes.Function,
                             MustBeUndefined: true
                         },
                         {
                             Name: 'enforce_properties_order',
                             Type: pa.utils.DataTypes.Boolean
                         },
                         {
                             Name: 'cyclic',
                             Type: pa.utils.DataTypes.Boolean
                         }
                     ]
                 }
            ]
        }
    ]
}, {
    Name: 'GreaterThan',
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
    Name: 'SmallerThan',
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
    Name: 'Between',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.Between(from, to)',
                    Parameters: [
                        {
                            Name: 'from',
                            Type: 'any'
                        },
                        {
                            Name: 'to',
                            Type: 'any'
                        }
                    ]
                }
            ]
        }
    ]
}, {
    Name: 'In',
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.In(list)',
                    Parameters: [
                        {
                            Name: 'list',
                            Type: window.pa.utils.DataTypes.ArrayOfPrimitives
                        }
                    ]
                },
                {
                    Example: '.In(value0[, value1][, value2][, value3][,etc])',
                    Parameters: [
                        {
                            Name: 'value',
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
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.ArrayOfPrimitives,
                window.pa.utils.DataTypes.String,
                window.pa.utils.DataTypes.Number,
                window.pa.utils.DataTypes.Date
            ],
            Overloads: [
                {
                    Example: '.NotIn(list)',
                    Parameters: [
                        {
                            Name: 'list',
                            Type: window.pa.utils.DataTypes.ArrayOfPrimitives
                        }
                    ]
                },
                {
                    Example: '.NotIn(value0[, value1][, value2][, value3][,etc])',
                    Parameters: [
                        {
                            Name: 'value',
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
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.StartsWith(start)',
                    Parameters: [
                        {
                            Name: 'start',
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
    Targets: [
        {
            TargetTypes: [
                window.pa.utils.DataTypes.String
            ],
            Overloads: [
                {
                    Example: '.EndsWith(start)',
                    Parameters: [
                        {
                            Name: 'end',
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
    Targets: [
    {
        TargetTypes: [
            window.pa.utils.DataTypes.ArrayOfPrimitives
        ],
        Overloads: [
            {
                Example: '.Contains(value)',
                Parameters: [
                    {
                        Name: 'value',
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
            Example: '.Contains(value, enforce_properties_order, cyclic)',
            Parameters: [
            {
                Name: 'value',
                Type: window.pa.utils.DataTypes.Object
            },
            {
                Name: 'enforce_properties_order',
                Type: window.pa.utils.DataTypes.Boolean
            },
            {
                Name: 'cyclic',
                Type: window.pa.utils.DataTypes.Boolean
            }
            ]
        }
        ]
    }
    ]
}
];
