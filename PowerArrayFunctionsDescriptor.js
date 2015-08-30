window.pa.auxiliaryFunctionsDescriptor = [
     {
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
                        Example: '.In(value0, value1, value2, value3, etc.)',
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
                        Example: '.NotIn(value0, value1, value2, value3, etc.)',
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
    }
];
