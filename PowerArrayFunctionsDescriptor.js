window.pa.auxiliaryFunctionsDescriptor = [
    {
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
                        Parameters : [
                            {
                                Name: 'list',
                                Type: window.pa.utils.DataTypes.ArrayOfPrimitives,
                                Example: '.In(list)'
                            }
                        ]
                    },
                    {
                        Parameters : [
                            {
                                Name: 'value',
                                Type: 'any',
                                Example: '.In(value0, value1, value2, value3, etc.)'
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
                         Parameters: [
                             {
                                 Name: 'list',
                                 Type: window.pa.utils.DataTypes.ArrayOfPrimitives,
                                 Example: '.NotIn(list)'
                             }
                         ]
                     },
                     {
                         Parameters: [
                             {
                                 Name: 'value',
                                 Type: 'any',
                                 Example: '.NotIn(value0, value1, value2, value3, etc.)'
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
                         Parameters: [
                             {
                                 Name: 'start',
                                 Type: window.pa.utils.DataTypes.String,
                                 Example: '.StartsWith(start)'
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
                        Parameters: [
                            {
                                Name: 'end',
                                Type: window.pa.utils.DataTypes.String,
                                Example: '.EndsWith(start)'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
