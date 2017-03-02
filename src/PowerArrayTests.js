/// <reference path="PowerArray.js" />
describe('PowerArrayTests', function () {

    function createDummies(quantity) {
        var result = [];
        for (var i = 0; i < quantity; i++) {
            result.push({
                Name: 'thename' + i,
                id: i,
                random: Math.floor((Math.random() * 1000000000) + 1)
            });
        }
        return result;
    }

    function createComplexDummies() {
        return [
            {
                "first": "Max",
                "last": "Muster",
                "age": 58,
                "city": "Berlin",
                "salary": 61390,
                "registered": true,
                "interests": ["Baseball", "Swimming", "Soccer", "Bowling"],
                "favorites": {
                    "color": "Red",
                    "sport": "Soccer",
                    "food": "Pizza"
                },
                "skills": [
                    {
                        "category": "JavaScript",
                        "tests": [
                            { "name": "One", "score": 63 },
                            { "name": "Two", "score": 63 }
                        ]
                    },
                    {
                        "category": "C#",
                        "tests": [
                            { "name": "One", "score": 51 },
                            { "name": "Two", "score": 93 }
                        ]
                    },
                    {
                        "category": "Node.js",
                        "tests": [
                            { "name": "One", "score": 70 },
                            { "name": "Two", "score": 51 }
                        ]
                    }
                ]
            },
            {
                "first": "Ana",
                "last": "Meier",
                "age": 59,
                "city": "Madrid",
                "salary": 65590,
                "registered": true,
                "interests": ["Astronomy"],
                "favorites": {
                    "color": "Blue",
                    "sport": "Swimming",
                    "food": "Chicken"
                },
                "skills": [
                    {
                        "category": "JavaScript",
                        "tests": [
                            { "name": "One", "score": 53 },
                            { "name": "Two", "score": 89 }
                        ]
                    },
                    {
                        "category": "C#",
                        "tests": [
                            { "name": "One", "score": 55 },
                            { "name": "Two", "score": 66 }
                        ]
                    },
                    {
                        "category": "Node.js",
                        "tests": [
                            { "name": "One", "score": 67 },
                            { "name": "Two", "score": 60 }
                        ]
                    }
                ]
            },

            {
                "first": "Roco",
                "last": "Müller",
                "age": 53,
                "city": "Paris",
                "salary": 84766,
                "registered": true,
                "interests": [],
                "favorites": {
                    "color": "Blue",
                    "sport": "Soccer",
                    "food": "Pizza"
                },
                "skills": [
                    {
                        "category": "JavaScript",
                        "tests": [
                            { "name": "One", "score": 100 },
                            { "name": "Two", "score": 85 }
                        ]
                    },
                    {
                        "category": "C#",
                        "tests": [
                            { "name": "One", "score": 56 },
                            { "name": "Two", "score": 97 }
                        ]
                    },
                    {
                        "category": "Node.js",
                        "tests": [
                            { "name": "One", "score": 51 },
                            { "name": "Two", "score": 68 }
                        ]
                    }
                ]
            },
            {
                "first": "Julian",
                "last": "Müller",
                "age": 46,
                "city": "Paris",
                "salary": 56930,
                "registered": false,
                "interests": ["Soccer"],
                "favorites": {
                    "color": "White",
                    "sport": "Baseball",
                    "food": "Chicken"
                },
                "skills": [
                    {
                        "category": "JavaScript",
                        "tests": [
                            { "name": "One", "score": 73 },
                            { "name": "Two", "score": 69 }
                        ]
                    },
                    {
                        "category": "C#",
                        "tests": [
                            { "name": "One", "score": 77 },
                            { "name": "Two", "score": 89 }
                        ]
                    },
                    {
                        "category": "Node.js",
                        "tests": [
                            { "name": "One", "score": 69 },
                            { "name": "Two", "score": 96 }
                        ]
                    }
                ]
            }];
    }

    describe('Initialization', function () {
        it('should register each auxiliary function on the window object and window.pa object', function () {
            var obj = window.pa.auxiliaryFunctions;
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    expect(window[p]).toBeDefined();
                    expect(typeof window[p]).toBe('function');
                    expect(window[p].toString()).toBe(window.pa[p].toString());
                }
            }
        });
    });

    describe('Sort', function () {
        var elements = [
            { id: 1, name: 'aac', group: 'b' },
            { id: 4, name: 'aaa', group: 'c' },
            { id: 10, name: 'baa', group: 'c' },
            { id: 5, name: 'aac', group: 'c' }
        ];

        it('Should sort by 1 property Descending', function () {
            //arrange


            //act
            var result = elements.Sort({
                name: 'Desc'
            });

            //assert
            expect(result).toBeDefined();
            expect(result.length).toBe(elements.length);
            expect(result[0].name).toBe('baa');
            expect(result[elements.length - 1].name).toBe('aaa');

        });

        it('Should sort by 1 property Ascending', function () {
            //arrange


            //act
            var result = elements.Sort({
                name: 'Asc'
            });

            //assert
            expect(result).toBeDefined();
            expect(result.length).toBe(elements.length);
            expect(result[0].name).toBe('aaa');
            expect(result[elements.length - 1].name).toBe('baa');

        });
        it('Should sort by more than one property', function () {
            //act
            var result = elements.Sort({
                group: 'Desc',
                id: 'Asc'
            });

            //assert
            expect(result).toBeDefined();
            expect(result.length).toBe(elements.length);
            expect(result[0].group).toBe('c');
            expect(result[1].group).toBe('c');
            expect(result[2].group).toBe('c');
            expect(result[3].group).toBe('b');
            expect(result[0].id).toBe(4);
            expect(result[1].id).toBe(5);
            expect(result[elements.length - 1].name).toBe('aac');
        });
        it('Should sort by more than one property II', function () {
            //act
            var result = elements.Sort({
                group: 'Asc',
                id: 'Desc'
            });

            //assert
            expect(result).toBeDefined();
            expect(result.length).toBe(elements.length);
            expect(result[0].group).toBe('b');
            expect(result[1].group).toBe('c');
            expect(result[2].group).toBe('c');
            expect(result[3].group).toBe('c');
            expect(result[0].id).toBe(1);
            expect(result[1].id).toBe(10);
            expect(result[elements.length - 1].name).toBe('aaa');
        });
    });

    describe('RunEach', function () {
        it('Should execute for each object', function () {

            var quantity = 100;
            var elements3 = createDummies(quantity);

            var counter = 0;

            elements3.RunEach(function () {
                counter++;
            });
            expect(counter).toBe(quantity);

        });

        it('should call the callback function', function () {

            var func = jasmine.createSpy('func');
            var counter = 0;
            createDummies(10).RunEach(function () {
                counter++;
            }, func);
            expect(func).toHaveBeenCalled();
            expect(counter).toBe(10);
        });

        it('should be chainable', function () {
            var counter = 0;
            var func = function () {
                counter++;
            };
            createDummies(10)
                .RunEach(func, undefined)
                .RunEach(func, undefined)
                .RunEach(func, undefined)
                .RunEach(func, undefined)
                .RunEach(func, undefined)
                .RunEach(func, undefined)
                .RunEach(func, undefined);

            expect(counter).toBe(70);
        });
    });

    describe('GetByProperty', function () {

        it('should find the 3 red elements', function () {
            var autos = [{ id: 1, color: 'red' }, { id: 2, color: 'red' }, { id: 3, color: 'blue' }, { color: 'red' }];

            var result = autos.GetByProperty('red', 'color');

            expect(result.length).toBe(3);
            expect(result[0].id).toBe(1);
            expect(result[1].id).toBe(2);
            expect(result[2].id).toBe(undefined); //The third red element does not have the property id
        });

        it('should find the 3 red elements on an array of objects by calling a function flat array', function () {
            var autos = [
                {
                    color: 'red', theFunc: function () {
                        return this.color;
                    }
                },
                {
                    color: 'red', theFunc: function () {
                        return this.color;
                    }
                },
                {
                    color: 'blue', theFunc: function () {
                        return this.color;
                    }
                },
                {
                    color: 'yellow', theFunc: function () {
                        return this.color;
                    }
                }
            ];

            var result = autos.GetByProperty('red', 'theFunc()');
            expect(result.length).toBe(2);
            result = autos.GetByProperty('blue', 'theFunc()');
            expect(result.length).toBe(1);
            result = autos.GetByProperty('purpure', 'theFunc()');
            expect(result.length).toBe(0);
        });

    });

    describe('First (Wrapper from Where function)', function () {

        it('It should take less time to get a First() item, than the complete results using Where()', function () {
            var elements = createDummies(500);
            var tmp;
            tmp = window.performance.now();
            elements.Where({
                id: EndsWith("75")
            });
            var whereTime = window.performance.now() - tmp;
            tmp = window.performance.now();
            elements.First({
                id: EndsWith("75")
            });
            var firstTime = window.performance.now() - tmp;
            expect(whereTime).toBeGreaterThan(firstTime);
        });

        it('should return the first item in the collection if no parameters passed', function () {
            //act;
            var elements = createDummies(500).First();
            //assert
            expect(elements).toBeDefined();
            expect(elements.id).toBe(0); //createDummies set first id to 0
        });

        it('should return first string', function () {
            //arrange
            var items = [0, 2, 4, 83092, "a"];
            //act
            var elements = items.First();
            //assert
            expect(elements).toBeDefined();
            expect(elements).toBe(0); //createDummies set first id to 0
        });

        it('should return undefined', function () {
            //arrange
            var items = [];
            //act
            var elements = items.First();
            //assert
            expect(elements).toBeUndefined();

        });

    });

    describe('Where', function () {
        describe('WhereCondition-Object with evaluation of deep nested objects', function () {
            it('should find an item by filtering by a sub-object at level 2', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                var result = elements.Where({ favorites: { color: 'Red' } });
                var result2 = elements.Where({ favorites: { color: 'Blue' } });
                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(1);
                expect(result[0].favorites.color).toBe('Red');

                expect(result2).toBeDefined();
                expect(result2.length).toBe(2);
                expect(result2[0].favorites.color).toBe('Blue');
                expect(result2[1].favorites.color).toBe('Blue');

            });
            it('should find an item by filtering by a sub-object that is an array of objects', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                var result = elements.Where({ skills: { category: 'JavaScript' } });
                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(4);
            });
            it('should find an item by filtering by a sub-object that is an array of objects combining evaluations over more than a property with primitives', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                //act
                var result = elements.Where({
                    skills: {
                        category: 'JavaScript',
                        tests: {
                            name: 'One',
                            score: 100
                        }
                    }
                });

                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(1);
            });


            it('should find an item by filtering by a sub-object that is an array of objects combining evaluations over more than a property with standard functions', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                //act
                var result = elements.Where({
                    skills: {
                        category: 'JavaScript',
                        tests: {
                            name: 'One',
                            score: pa.GreaterThan(70)
                        }
                    }
                });
                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(2);
            });
            it('should find an item by filtering by a sub-object and using standard functions', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                var result = elements.Where({ favorites: { color: pa.Like("e") } });
                var result2 = elements.Where({ favorites: { color: pa.Like("h") } });
                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(4);

                expect(result2).toBeDefined();
                expect(result2.length).toBe(1);
            });
            it('should find items by filtering with multiple condition-objects (OR) each by evaluating sub-objects ', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                var result = elements.Where([{ favorites: { color: 'Red' } }, { favorites: { color: 'White' } }]);

                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(2);
            });
            it('should get the same results when searching with a single conditions-object that use an IN (on a deep property) as when using two conditions-objects asking for same values', function () {
                //arrange
                var elements = createComplexDummies();
                //act

                var result = elements.Where([{ favorites: { color: 'Red' } }, { favorites: { color: 'White' } }]);
                var result2 = elements.Where({ favorites: { color: pa.In('Red', 'White') } });

                //assert
                expect(result).toBeDefined();
                expect(result2).toBeDefined();
                expect(result.length).toBe(2);
                expect(result2.length).toBe(2);
                expect(result[0]).toBe(result2[0]);
            });


        });
        describe('Process multiple condition-objects at once (whereConditions is an array)', function () {
            it('should search by 2 condition-objects', function () {
                //arrange
                var elements = createDummies(10);

                //act
                var result = elements.Where([{ id: 3 }, { id: pa.In([7, 9]) }], false);
                var result2 = elements.Where([{ id: 3 }, { id: pa.In([7, 9]) }], true);
                var result3 = elements.Where([{ id: 13 }, { id: pa.In([27, 19]) }], true);

                //assert
                expect(result).toBeDefined();
                expect(result2).toBeDefined();
                expect(result3).toBeDefined();

                expect(result.length).toBe(3);
                expect(result2.length).toBe(3);
                expect(result3.length).toBe(0);
            });
            it('should search by 2 condition-objects and return an empty array', function () {
                //arrange
                var elements = createDummies(10);

                //act
                var result3 = elements.Where([{ id: 13 }, { id: pa.In([27, 19]) }], true);

                //assert
                expect(result3).toBeDefined();
                expect(result3.length).toBe(0);
            });
            it('should return only one matching object when multiple conditions matches', function () {
                //arrange
                var elements = createDummies(10);

                //act
                var result = elements.Where([{ id: 3 }, { id: pa.In([7, 9, 3]) }], true);
                var result2 = elements.Where([{ id: 3 }, { id: pa.In([7, 9, 3]) }], false);

                //assert
                expect(result).toBeDefined();
                expect(result.length).toBe(3);
                expect(result2).toBeDefined();
                expect(result2.length).toBe(3);
            });
        });
        fdescribe('Process condition-objects with multiple conditions for a single property (a property of whereConditions is an array)', function () {
            it('should apply multiple simple filters for a property as an AND condition', function () {
                //arrange
                var items = [
                    { name: 'abb', age: 33 },
                    { name: 'abc', age: 43 },
                    { name: 'aaa', age: 53 },
                    { name: 'absdfasdc', age: 63 }
                ];
                var result = items.Where({
                    name: [
                        StartsWith('a'),
                        EndsWith('c')
                    ]
                });
                expect(result).toBeDefined();
                expect(result.length).toBe(2);
            });
            it('should apply multiple simple filters for a property as an AND condition also when deep object calls are used', function () {
                //arrange
                var items = createComplexDummies();

                var result = pa(items).Where({
                    skills: {
                        tests: [
                                IsDefined(),
                                {
                                    score: GreaterThan(76),
                                    name: 'One'
                                }
                        ]
                    }
                });
                expect(result).toBeDefined();
                expect(result.length).toBe(2);
            });
            it('should return no results because of impossible conditions', function () {
                //arrange
                var items = createComplexDummies();

                var result = pa(items).Where({
                    skills: {
                        tests: [
                            IsUndefined(),
                            {
                                score: GreaterThan(1),
                                name: 'One'
                            }
                        ]
                    }
                });
                expect(result).toBeDefined();
                expect(result.length).toBe(0);
            });
        });
        describe('passing a single primitive argument to where', function () {
            it('should find an exact object, comparing using === ', function () {
                var elements = [{ id: 1, name: 'peter', lastname: 'pan' }, { id: 2, name: 'paul', lastname: 'newman' }];
                var result = elements.Where({ name: 'peter' }, true);
                var result2 = elements.Where({ name: 'peter' }, false);
                expect(result).toBeDefined();
                expect(result.length).toBe(1);
                expect(result2).toBeDefined();
                expect(result2.length).toBe(1);
            });
            it('should find an exact object, comparing using === ', function () {
                var elements = [{ id: 1, name: 'peter', lastname: 'pan' }, { id: 2, name: 'paul', lastname: 'newman' }];
                var result = elements.Where({ name: 'peter', lastname: 'newman' }, true);
                var result2 = elements.Where({ name: 'paul', lastname: 'newman' }, true);
                var result3 = elements.Where({ name: 'peter', lastname: 'newman' }, false);
                var result4 = elements.Where({ name: 'paul', lastname: 'newman' }, false);

                expect(result.length).toBe(0);
                expect(result2.length).toBe(1);
                expect(result3.length).toBe(0);
                expect(result4.length).toBe(1);
            });
        });
        describe('Auxiliary functions / Standard pa functions', function () {
            describe('Contains', function () {
                it('should filter an array of numbers', function () {
                    //arrange
                    var elements = [
                        { name: 'a', categories: [1, 5, 83] },
                        { name: 'b', categories: [4, 5, 74] },
                        { name: 'c', categories: [6, 4, 9] }
                    ];

                    //act
                    var result1 = elements.Where({ categories: pa.Contains(1) });
                    var result2 = elements.Where({ categories: pa.Contains(5) });
                    var result3 = elements.Where({ categories: pa.Contains(95) });

                    //assert
                    expect(result1).toBeDefined();
                    expect(result2).toBeDefined();
                    expect(result3).toBeDefined();

                    expect(result1.length).toBe(1);
                    expect(result1[0].categories.indexOf(1)).toBeGreaterThan(-1);

                    expect(result2.length).toBe(2);
                    expect(result2[0].categories.indexOf(5)).toBeGreaterThan(-1);
                });

                it('should filter an array of strings ', function () {
                    //arrange
                    var elements = [
                        { name: 'a', categories: ["1", "5", "83"] },
                        { name: 'b', categories: ["4", "5", "74"] },
                        { name: 'c', categories: ["6", "4", "9"] }
                    ];

                    //act
                    var result1 = elements.Where({ categories: pa.Contains("1") });
                    var result2 = elements.Where({ categories: pa.Contains("5") });
                    var result3 = elements.Where({ categories: pa.Contains(95) });

                    //assert
                    expect(result1).toBeDefined();
                    expect(result2).toBeDefined();
                    expect(result3).toBeDefined();

                    expect(result1.length).toBe(1);
                    expect(result1[0].categories.indexOf("1")).toBeGreaterThan(-1);

                    expect(result2.length).toBe(2);
                    expect(result2[0].categories.indexOf("5")).toBeGreaterThan(-1);

                    expect(result3.length).toBe(0);
                });

                it('should filter an array of mixed things', function () {
                    //arrange
                    var elements = [
                        { name: 'a', categories: ["1", { a: 'a', b: 'b' }, new Date()] },
                        { name: 'b', categories: ["4", "5", 74] },
                        { name: 'c', categories: ["6", "4", ["a", null]] }
                    ];

                    //act
                    var result1 = elements.Where({ categories: pa.Contains("1") });
                    var result2 = elements.Where({ categories: pa.Contains("5") });
                    var result3 = elements.Where({ categories: pa.Contains(95) });
                    var result4 = elements.Where({ categories: pa.Contains(74) });
                    var result5 = elements.Where({ categories: pa.Contains({ a: 'a', b: 'b' }) });
                    var result6 = elements.Where({ categories: pa.Contains({ b: 'b', a: 'a' }) }); //other properties order as result5!!
                    var result7 = elements.Where({ categories: pa.Contains({ b: 'b', a: 'a' }, true) }); //other properties order as result5 with "check properties order set to true"!!

                    //assert
                    expect(result1).toBeDefined();
                    expect(result2).toBeDefined();
                    expect(result3).toBeDefined();
                    expect(result4).toBeDefined();
                    expect(result5).toBeDefined();
                    expect(result6).toBeDefined();

                    expect(result1.length).toBe(1);
                    expect(result1[0].categories.indexOf("1")).toBeGreaterThan(-1);

                    expect(result2.length).toBe(1);
                    expect(result2[0].categories.indexOf("5")).toBeGreaterThan(-1);

                    expect(result3.length).toBe(0);
                    expect(result4.length).toBe(1);
                    expect(result5.length).toBe(1);
                    expect(result6.length).toBe(1);
                    expect(result7.length).toBe(0);
                });

                it('should throw an error when used on non-array fields', function () {
                    //arrange
                    var elements = [
                        { name: 'a', categories: [1, 5, 83] },
                        { name: 'b', categories: [4, 5, 74] },
                        { name: 'c', categories: [6, 4, 9] }
                    ];

                    //act
                    expect(function () {
                        elements.Where({ name: pa.Contains(1) });
                    }).toThrow();
                });
            });
            describe('GreaterThan', function () {
                it('Should find bigger items (integer)', function () {
                    var quantity = 10;
                    var elements3 = createDummies(quantity);
                    var result = elements3.Where({ id: pa.GreaterThan(5) }, true);
                    var result2 = elements3.Where({ id: pa.GreaterThan(5) }, false);
                    expect(result.length).toBe(4);
                    expect(result2.length).toBe(4);
                });
                it('Should find bigger items (decimal + floats)', function () {
                    var elements = [{ id: 0.24 }, { id: 10.5 }];
                    var result = elements.Where({ id: pa.GreaterThan(0.2) }, true);
                    var result2 = elements.Where({ id: pa.GreaterThan(10.2) }, true);
                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(1);
                });
                it('Should find bigger items (dates)', function () {
                    //arrange
                    var elements = [{ date: new Date(2015, 11, 31, 0, 0, 0, 0) }, { date: new Date(2014, 11, 31, 0, 0, 0, 0) }];
                    //act
                    var result = elements.Where({ date: pa.GreaterThan(new Date(2014, 1, 6, 0, 0, 0, 0)) }, true);
                    var result2 = elements.Where({ date: pa.GreaterThan(new Date(2016, 1, 6, 0, 0, 0, 0)) }, true);
                    //assert
                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(0);
                });
            });
            describe('SmallerThan', function () {
                it('Should find smaller items (integer)', function () {
                    var quantity = 10;
                    var elements3 = createDummies(quantity);
                    var result = elements3.Where({ id: pa.SmallerThan(5) }, true);
                    expect(result.length).toBe(5);
                });
                it('Should find smaller items (decimal + floats)', function () {
                    var elements = [{ id: 0.24 }, { id: 10.5 }];
                    var result = elements.Where({ id: pa.SmallerThan(0.26) }, true);
                    var result2 = elements.Where({ id: pa.SmallerThan(30.87) }, true);
                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(2);
                });
                it('Should find smaller items (dates)', function () {
                    //arrange
                    var elements = [{ date: new Date(2015, 11, 31, 0, 0, 0, 0) }, { date: new Date(2014, 11, 31, 0, 0, 0, 0) }];
                    //act
                    var result = elements.Where({ date: pa.SmallerThan(new Date(2015, 11, 31, 0, 0, 0, 2)) }, true);
                    var result2 = elements.Where({ date: pa.SmallerThan(new Date(2014, 11, 31, 0, 0, 2, 0)) }, true);
                    //assert
                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(1);
                });
            });
            describe('Between', function () {
                it('Should throw an error if param TO is smaller than param FROM ', function () {
                    //arrange
                    var elements = [
                        { name: 'paul', age: 38 }, { name: 'john', age: 67 },
                        { name: 'xavier', age: 17 }, { name: 'martin', age: 47 },
                    ];

                    //assert
                    expect(function () {
                        elements.Where({ age: pa.Between(40, 20) }).Sort({ age: "Asc" });
                    }).toThrow();

                });
                it('Should find values within a range of numbers', function () {
                    //arrange
                    var elements = [
                        { name: 'paul', age: 38 }, { name: 'john', age: 67 },
                        { name: 'xavier', age: 17 }, { name: 'martin', age: 47 },
                    ];

                    //act
                    var results = elements.Where({ age: pa.Between(20, 40) }).Sort({ age: "Asc" });
                    var results2 = elements.Where({ age: pa.Between(30, 60) }).Sort({ age: "Desc" });

                    //assert
                    expect(results).toBeDefined();
                    expect(results.length).toBe(1);
                    expect(results[0].name).toBe('paul');

                    expect(results2).toBeDefined();
                    expect(results2.length).toBe(2);
                    expect(results2[0].name).toBe('martin');
                    expect(results2[results2.length - 1].name).toBe('paul');

                });

                it('Should also work as parameter passed directly to Where, to allow Between to be used on arrays of numbers', function () {
                    //arrange
                    var elements = [1, 4, 6, 21, 5663, 23, 9, 222, 444];

                    //act
                    var result = elements.Where(pa.Between(0, 50)).Sort(); //will be sorted alphabetically

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(6);
                    expect(result[0]).toBe(1);
                    expect(result[result.length - 1]).toBe(9);//sorted alphabetically!
                });

            });
            describe('EqualTo3', function () {

                it('should compare values using === and find exact results', function () {
                    //arrange
                    var items = [{ id: 1, otherThings: 'abcdefghijklm' }, { id: "1", otherThings: 'abcdefghijklm' }, {
                        id: 2,
                        otherThings: 'abcdefghijklm'
                    }];

                    //act
                    var result = items.Where({ id: pa.EqualTo3(1) });

                    expect(result.length).toBe(1);
                    expect(result[0].id).toBe(1);

                });

            });
            describe('EqualTo2', function () {

                it('should compare values using == and find results', function () {
                    //arrange
                    var items = [{ id: 1, otherThings: 'abcdefghijklm' }, { id: "1", otherThings: 'abcdefghijklm' }, {
                        id: 2,
                        otherThings: 'abcdefghijklm'
                    }];

                    //act
                    var result = items.Where({ id: pa.EqualTo2(1) });
                    var result2 = items.Where({ id: pa.EqualTo2("1") });

                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);

                });

            });
            describe('Like', function () {

                it('should return only the items containing (by indexof) an specific string in a property', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.Like("a") });
                    var result2 = items.Where({ name: pa.Like("aBc") });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(0);

                });

                it('should return only the items containing (by indexof) an specific string in a property, also when N arguments were passed', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.Like("a", "b") });
                    var result2 = items.Where({ name: pa.Like("aBc", "b") });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(0);

                });

                it('should return only the items containing (by indexof) different values', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.Like(["a", "b"]) });
                    var result2 = items.Where({ name: pa.Like(["d", "m"]) });
                    var result3 = items.Where({ name: pa.Like(["a", "z"]) });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(1);
                    expect(result3.length).toBe(0);

                });


            });
            describe('LikeIgnoreCase', function () {

                it('should return only the items containing (by indexof) an specific string in a property', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.LikeIgnoreCase("a") });
                    var result2 = items.Where({ name: pa.LikeIgnoreCase("aBc") });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(1);

                });
                it('should return only the items containing (by indexof) an specific string in a property, also when N arguments were passed', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.LikeIgnoreCase("a", "f") });
                    var result2 = items.Where({ name: pa.LikeIgnoreCase("aBc", "b", "c") });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(1);

                });

                it('should return only the items containing (by indexof) different values', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.LikeIgnoreCase(["a", "A"]) });
                    var result2 = items.Where({ name: pa.LikeIgnoreCase(["d", "M"]) });
                    var result3 = items.Where({ name: pa.LikeIgnoreCase(["a", "z"]) });

                    expect(result.length).toBe(1);
                    expect(result2.length).toBe(1);
                    expect(result3.length).toBe(0);

                });

            });
            describe('NotLike', function () {
                it('should return only the items not containing the passed string in a property value (by indexof)', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.NotLike("a") });
                    var result2 = items.Where({ name: pa.NotLike("abc") });

                    //assert
                    expect(result).toBeDefined();
                    expect(result2).toBeDefined();

                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);

                });
                it('should return only the items not containing the passed string in a property value (by indexof), also when N parameters were passed', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                        id: 2,
                        name: 'jklmnopqrst'
                    }];

                    //act
                    var result = items.Where({ name: pa.NotLike("a", "b") });
                    var result2 = items.Where({ name: pa.NotLike("abc") });

                    //assert
                    expect(result).toBeDefined();
                    expect(result2).toBeDefined();

                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);

                });
                it('should return only the items not containing any string of the passed array in a property value (by indexof)', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'abcdefgh' },
                        { id: "1", name: 'defghijklmn' },
                        { id: 2, name: 'jklmnopqrst' }
                    ];

                    //act
                    var result = items.Where({ name: pa.NotLike(["f", "n"]) });
                    var result2 = items.Where({ name: pa.NotLike(["d", "e"]) });
                    var result3 = items.Where({ name: pa.NotLike(["a", "z"]) });

                    expect(result.length).toBe(0);
                    expect(result2.length).toBe(1);
                    expect(result3.length).toBe(2);

                });
            });
            describe('NotLikeIgnoreCase', function () {
                it('should return only the items not containing the passed string in a property value (by indexof)', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'DEFGHIJKLMN' }, {
                        id: 2,
                        name: 'JKLMNOPQRST'
                    }];

                    //act
                    var result = items.Where({ name: pa.NotLikeIgnoreCase("A") });
                    var result2 = items.Where({ name: pa.NotLikeIgnoreCase("abc") });

                    //assert
                    expect(result).toBeDefined();
                    expect(result2).toBeDefined();

                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);

                });
                it('should return only the items not containing the passed string in a property value (by indexof), also when N parameters were passed', function () {
                    //arrange
                    var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'DEFGHIJKLMN' }, {
                        id: 2,
                        name: 'JKLMNOPQRST'
                    }];

                    //act
                    var result = items.Where({ name: pa.NotLikeIgnoreCase("A", "B", "c") });
                    var result2 = items.Where({ name: pa.NotLikeIgnoreCase("abc", "lsk") });

                    //assert
                    expect(result).toBeDefined();
                    expect(result2).toBeDefined();

                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);

                });
                it('should return only the items not containing any string of the passed array in a property value (by indexof)', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'abcdefgh' },
                        { id: "1", name: 'defghijklmn' },
                        { id: 2, name: 'jklmnopqrst' }
                    ];

                    //act
                    var result = items.Where({ name: pa.NotLikeIgnoreCase(["f", "n"]) });
                    var result2 = items.Where({ name: pa.NotLikeIgnoreCase(["d", "e"]) });
                    var result3 = items.Where({ name: pa.NotLikeIgnoreCase(["a", "z"]) });

                    //assert
                    expect(result.length).toBe(0);
                    expect(result2.length).toBe(1);
                    expect(result3.length).toBe(2);

                });
            });
            describe('IsDefined', function () {
                it('should evaluate if a primitive is undefined', function () {
                    //arrange
                    var a = [1, 2, 4, undefined, 55, 'ab'];
                    //act
                    var result = a.Where(IsDefined());

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(5);
                    expect(function () {
                        for (var i = 0, l = result.length; i < l; i++) {
                            if (result[i] === undefined) {
                                return false;
                            }
                        }
                        return true;
                    }()).toBe(true);
                });
                it('should evaluate if an array property is undefined', function () {
                    //arrange
                    var a = [{ a: 1 }, { b: 1 }, { a: 2 }];
                    //act
                    var result = a.Where({ a: IsDefined() }).Sort({ a: 'Desc' });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result[0].a).toBe(2);
                });
                it('should return consistent results when adding the lengths IsDefined and IsUndefined', function () {
                    //arrange
                    var a = [{ a: 1 }, { b: 1 }, { a: 2 }];
                    //act
                    var resultIs = a.Where({ a: IsDefined() });
                    var resultIsNot = a.Where({ a: IsUndefined() });
                    //assert
                    expect(resultIs.length + resultIsNot.length).toBe(a.length);

                });
            });
            describe('IsUndefined', function () {
                it('should evaluate if a primitive is undefined', function () {
                    //arrange
                    var a = [1, 2, 4, undefined, 55, 'ab'];
                    //act
                    var result = a.Where(IsDefined());

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(5);
                    expect(function () {
                        for (var i = 0, l = result.length; i < l; i++) {
                            if (result[i] === undefined) {
                                return false;
                            }
                        }
                        return true;
                    }()).toBe(true);
                });
                it('should evaluate if an array property is undefined', function () {
                    //arrange
                    var a = [{ a: 1 }, { b: 1 }, { a: 2 }];
                    //act
                    var result = a.Where({ a: IsDefined() }).Sort({ a: 'Desc' });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result[0].a).toBe(2);
                });
            });
            describe('In', function () {
                it('should work in the same way if receiving many parameters instead of an array', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }
                    ];
                    var items2 = createDummies(500);
                    //act
                    var result = items.Where({
                        id: pa.In(1, 2)
                    });
                    var result2 = items2.Where({
                        id: pa.In(134, 251, 525, 943)
                    });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);
                });
                it('should compare property with an array of primitives of elements', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }
                    ];
                    var items2 = createDummies(500);
                    //act
                    var result = items.Where({ id: pa.In([1, 2]) });
                    var result2 = items2.Where({ id: pa.In([134, 251, 525, 943]) });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result2.length).toBe(2);
                });
            });
            describe('NotIn', function () {
                it('should work in the same way if receiving many parameters instead of an array', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        {
                            id: "1", name: 'bbb'
                        },
                        {
                            id: 2, name: 'ccc'
                        }
                    ];
                    //act
                    var result = items.Where({ id: pa.NotIn(2, 4) });
                    var result2 = items.Where({ id: pa.NotIn(1, 3) });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    //The comparison for this case is made by ===, because of that
                    //it's not expected that the second item (id: "1") matches
                    expect(result2.length).toBe(2);
                });
                it('should compare property with an array of primitives of elements', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }
                    ];
                    //act
                    var result = items.Where({ id: pa.NotIn([2, 4]) });
                    var result2 = items.Where({ id: pa.NotIn([1, 3]) });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    //The comparison for this case is made by ===, because of that
                    //it's not expected that the second item (id: "1") matches
                    expect(result2.length).toBe(2);
                });
            });
            describe('EqualTo', function () {
                it('should compare objects by using default equalto implementation (equals function from toubkal project)', function () {
                    //arrange
                    var originalElement = {
                        id: 1,
                        name: 'asdf',
                        fTest: function () {
                            return 'ppp';
                        },
                        anArray: [1, 2, 3, 4, 5],
                        anObjectsArray: [{ a: 1, b: 2 }]
                    };

                    var elements = [
                        originalElement,
                        {
                            id: 1,
                            name: 'asdf',
                            fTest: function () {
                                return 'ppp';
                            },
                            anArray: [1, 2, 3, 4, 5],
                            anObjectsArray: [{ a: 1, b: 2222222222222222 }]
                        },
                        {
                            id: 1,
                            name: 'asdf',
                            fTest: function () {
                                return 'pppppppppppppppppppp';
                            },
                            anArray: [1, 2, 3, 4, 5],
                            anObjectsArray: [{ a: 1, b: 2 }]
                        }
                    ];

                    //act
                    var result = elements.Where(pa.EqualTo(originalElement));

                    //assert
                    expect(result.length).toBe(1);
                    var resultObj = result[0];
                    for (var prop in resultObj) {
                        if (resultObj.hasOwnProperty(prop)) {
                            //assert each object property
                            expect(resultObj[prop]).toBe(originalElement[prop]);
                        }
                    }


                });
                it('should compare values by using a custom function that returns true or false', function () {
                    //arrange
                    var objectToCompareTo = { id: 2, name: 'dd' };
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }];

                    var func = function (a, b) {
                        //return true if a.id === b.id OR the length of the name properties are similar
                        return a.id === b.id || a.name.length === b.name.length;
                    };

                    //act
                    var result = items.Where(pa.EqualTo(objectToCompareTo, func));
                    expect(result.length).toBe(2);

                });

            });
            describe('IsTruthy', function () {
                it('should return only truthy elements from array of objects', function () {
                    //arrange
                    var elements = [
                        { a: false, b: true, c: 1, d: [], e: [3] },
                        { a: "true", b: "true", c: 1, d: [], e: [false] },
                        { a: true, b: 33, c: 1, d: [], e: "sdf" }
                    ];

                    //act
                    var resulta = elements.Where({ a: pa.IsTruthy() });
                    var resultb = elements.Where({ b: pa.IsTruthy() });
                    var resultc = elements.Where({ c: pa.IsTruthy() });

                    //assert
                    expect(resulta).toBeDefined();
                    expect(resultb).toBeDefined();
                    expect(resultc).toBeDefined();

                    expect(resulta.length).toBe(2);
                    expect(resultb.length).toBe(3);
                    expect(resultc.length).toBe(3);

                });
                it('should return true if a truty value is found. Also in arrays of primitives', function () {
                    //arrange
                    var truthyElements = [[1], "a", 2, true, "true", false, 0];

                    //act
                    var resulta = truthyElements.Where(pa.IsTruthy());

                    //assert
                    expect(resulta.length).toBe(5);
                });
            });
            describe('IsFalsy', function () {
                it('should return only falsy elements from array of objects', function () {
                    //arrange
                    var elements = [
                        { a: false, b: true, c: 1, d: [], e: [3] },
                        { a: "true", b: "false", c: 1, d: [], e: [false] },
                        { a: true, b: 0, c: 0, d: [], e: "sdf" }
                    ];

                    //act
                    var resulta = elements.Where({ a: pa.IsFalsy() });
                    var resultb = elements.Where({ b: pa.IsFalsy() });
                    var resultc = elements.Where({ c: pa.IsFalsy() });

                    //assert
                    expect(resulta).toBeDefined();
                    expect(resultb).toBeDefined();
                    expect(resultc).toBeDefined();

                    expect(resulta.length).toBe(1);
                    expect(resultb.length).toBe(1);
                    expect(resultc.length).toBe(1);

                });
                it('should return true for each falsy element in arrays of primitives', function () {
                    //arrange
                    var truthyElements = [[1], "0", 2, true, "true", false, 0];

                    //act
                    var resulta = truthyElements.Where(pa.IsFalsy());

                    //assert
                    expect(resulta.length).toBe(2);
                });
            });
            describe('IsTrue', function () {
                it('should return only elements having true on property from an array of objects', function () {
                    //arrange
                    var elements = [
                        { a: false, b: true, c: 1, d: [], e: [3] },
                        { a: "true", b: "true", c: true, d: [], e: [false] },
                        { a: true, b: 33, c: 1, d: [], e: "sdf" }
                    ];

                    //act
                    var resulta = elements.Where({ a: pa.IsTrue() });
                    var resultb = elements.Where({ b: pa.IsTrue() });
                    var resultc = elements.Where({ c: pa.IsTrue() });

                    //assert
                    expect(resulta).toBeDefined();
                    expect(resultb).toBeDefined();
                    expect(resultc).toBeDefined();

                    expect(resulta.length).toBe(1);
                    expect(resultb.length).toBe(1);
                    expect(resultc.length).toBe(1);

                });
                it('should return true values from array of primitives', function () {
                    //arrange
                    var truthyElements = [[1], "a", 2, true, "true", false, 0];

                    //act
                    var resulta = truthyElements.Where(pa.IsTrue());

                    //assert
                    expect(resulta).toBeDefined();
                    expect(resulta.length).toBe(1);
                });
            });
            describe('IsFalse', function () {
                it('should return only false elements from array of objects', function () {
                    //arrange
                    var elements = [
                        { a: false, b: true, c: 1, d: [], e: [3] },
                        { a: "true", b: "false", c: 1, d: [], e: [false] },
                        { a: true, b: 0, c: false, d: [], e: "sdf" }
                    ];

                    //act
                    var resulta = elements.Where({ a: pa.IsFalse() });
                    var resultb = elements.Where({ b: pa.IsFalse() });
                    var resultc = elements.Where({ c: pa.IsFalse() });

                    //assert
                    expect(resulta).toBeDefined();
                    expect(resultb).toBeDefined();
                    expect(resultc).toBeDefined();

                    expect(resulta.length).toBe(1);
                    expect(resultb.length).toBe(0);
                    expect(resultc.length).toBe(1);

                });
                it('should return true for each fale element in arrays of primitives', function () {
                    //arrange
                    var truthyElements = [[1], "0", 2, true, "true", false, 0];

                    //act
                    var resulta = truthyElements.Where(pa.IsFalse());

                    //assert
                    expect(resulta.length).toBe(1);
                });
            });
            describe('IsEmpty', function () {
                it('should identify empty arrays on object properties', function () {
                    //arrange
                    var elements = [{ a: [], b: 'aaa' }, { a: 'asdf', b: 3 },
                        { a: 32, b: 23 }, { a: undefined, b: 'bbb' }];
                    //act
                    var result = elements.Where({ a: IsEmpty() }).Sort({ b: 'Asc' });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result[0].b).toBe('aaa');
                    expect(result[1].b).toBe('bbb');
                });
                it('should identify empty string items', function () {
                    //arrange
                    var elements = [{ a: '', b: 33 }, { a: 'asdf', b: 3 }, { a: 32, b: 23 }];
                    //act
                    var result = elements.Where({ a: IsEmpty() });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(1);
                    expect(result[0].b).toBe(33);
                });
                it('should identify empty string items also in arrays of primitives', function () {
                    //arrange
                    var elements = ["", "s", 32];
                    //act
                    var result = elements.Where(IsEmpty());
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(1);
                });
            });
            describe('IsNotEmpty', function () {
                it('should identify not-empty arrays on object properties', function () {
                    //arrange
                    var elements = [{ a: [], b: 33 }, { a: 'asdf', b: 3 }, { a: 32, b: 23 }, { a: undefined, b: 'sldkf' }];
                    //act
                    var result = elements.Where({ a: IsNotEmpty() }).Sort({ b: 'Asc' });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result[0].b).toBe(3);
                    expect(result[1].b).toBe(23);
                });
                it('should identify not-empty string items', function () {
                    //arrange
                    var elements = [{ a: '', b: 33 }, { a: 'asdf', b: 3 }, { a: 32, b: 23 }, { a: undefined, b: 'sldkf' }];
                    //act
                    var result = elements.Where({ a: IsNotEmpty() }).Sort({ b: 'Asc' });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                    expect(result[0].b).toBe(3);
                    expect(result[1].b).toBe(23);
                });
                it('should identify empty string items also in arrays of primitives', function () {
                    //arrange
                    var elements = ["", "s", 32];
                    //act
                    var result = elements.Where(IsNotEmpty());
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                });
            });
            describe('StartsWith', function () {
                it('should find properties starting with an specific string', function () {
                    //arrange
                    var elements = [{ a: 'asdf' }, { a: 'sdfj' }, { a: 'aaaaaaf' }];

                    //act
                    var result = elements.Where({ a: StartsWith('a') });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                });

                it('should return no results if no matches', function () {
                    //arrange
                    var elements = [{ a: 'xxasdf' }, { a: 'xxsdfj' }, { a: 'xxaaaaaaf' }];

                    //act
                    var result = elements.Where({ a: StartsWith('a') });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            });
            describe('EndsWith', function () {
                it('should find properties ending with an specific string', function () {
                    //arrange
                    var elements = [{ a: 'asdf' }, { a: 'sdfj' }, { a: 'aaaaaaf' }];

                    //act
                    var result = elements.Where({ a: EndsWith('f') });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                });

                it('should return no results if no matches', function () {
                    //arrange
                    var elements = [{ a: 'xxasdf' }, { a: 'xxsdfj' }, { a: 'xxaaaaaaf' }];

                    //act
                    var result = elements.Where({ a: EndsWith('a') });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(0);
                });
            });
            describe('IsNull', function () {
                it('should identify items having null on a property', function () {
                    //arrange
                    var elements = [
                        { a: 1, b: { b1: null } },
                        { a: 1, b: { b1: 'something' } }
                    ];

                    //act
                    var result = elements.Where({ b: { b1: IsNull() } });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(1);
                });
                it('should identify null items also on a primitive array', function () {
                    //arrange
                    var elements = [1, 2, 3, "s", null, new Date(), null];

                    //act
                    var result = elements.Where(IsNull());

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(2);
                });
            });
            describe('IsNotNull', function () {
                it('should identify items having not null values on a property', function () {
                    //arrange
                    var elements = [
                        {
                            a: 1,
                            b: {
                                b1: null
                            }
                        },
                        {
                            a: 2,
                            b: {
                                b1: 'something'
                            }
                        }
                    ];

                    //act
                    var result = elements.Where({
                        b: {
                            b1: IsNotNull()
                        }
                    });

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(1);
                    expect(result[0].a).toBe(2);
                });
                it('should identify not null items also on a primitive array', function () {
                    //arrange
                    var elements = [1, 2, 3, "s", null, new Date(), null];

                    //act
                    var result = elements.Where(IsNotNull());

                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(5);
                });
            });
            describe('IsNaN', function () {
                it('should identify NAN values on a property of an array of objects', function () {
                    //arrange
                    var elements = [
                        { a: '3,1' }, //NAN
                        { a: '3.1' }, //Not NAN
                        { a: 3 }, //Not NAN
                        { a: '0' } //Not NAN
                    ];
                    //act
                    var result = elements.Where({
                        a: IsNaN()
                    });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(1);
                });
            });
            describe('IsNaN', function () {
                it('should identify NAN values on a property of an array of objects', function () {
                    //arrange
                    var elements = [
                        { a: '3,1' }, //NAN
                        { a: '3.1' }, //Not NAN
                        { a: 3 }, //Not NAN
                        { a: '0' } //Not NAN
                    ];
                    //act
                    var result = elements.Where({
                        a: IsNotNaN()
                    });
                    //assert
                    expect(result).toBeDefined();
                    expect(result.length).toBe(3);
                });
            });
            describe('Custom function evaluating single field, inside whereConditionsObject', function () {

                it('should compare values by using a custom function that returns true or false', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }];

                    var func = function (a) {
                        return a === 'aa';
                    };

                    //act
                    var result = items.Where({ name: func });
                    expect(result.length).toBe(1);
                    expect(result[0].name).toBe('aa');

                });

            });
            describe('Custom evaluator function', function () {

                it('should evaluate each item by using a custom function', function () {
                    //arrange
                    var items = [
                        { id: 1, name: 'aa' },
                        { id: "1", name: 'bbb' },
                        { id: 2, name: 'ccc' }];

                    var func = function (a) {
                        return a.id === 1;
                    };

                    //act
                    var result = items.Where(func);
                    expect(result.length).toBe(1);

                });

            });
            describe('Where combinations', function () {

                describe('Explicit value + custom function', function () {
                    it('should return only one object', function () {

                        var elements = [
                            { a: 'aaaa', b: { b1: 'b1', c: { xxx: 33 } } },
                            { a: 'aaa2', b: { b1: 'b1', c: { xxx: 99 } } }
                        ];

                        var result = elements.Where({
                            a: 'aaaa',
                            b: function (myB) {
                                return myB.c.xxx === 33;
                            }
                        });

                        expect(result.length).toBe(1);
                        expect(result[0].b.c.xxx).toBe(33);
                    });
                });

                describe('Like => EqualTo3 combined, Like => EqualTo3 combined', function () {

                    it('should return only the items containing (by indexof) an specific string in a property', function () {
                        //arrange
                        var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                            id: 2,
                            name: 'jklmnopqrst'
                        }];

                        //act
                        var result3 = items.Where({ name: pa.Like("a"), id: pa.EqualTo3(2) }); //pa.EqualTo3(2)});
                        var result4 = items.Where({ name: pa.Like("t"), id: pa.EqualTo3(2) });

                        expect(result3.length).toBe(0);
                        expect(result4.length).toBe(1);
                    });
                });
                describe('LikeIgnoreCase => EqualTo3 combined, LikeIgnoreCase => EqualTo3 combined', function () {

                    it('should return only the items containing (by indexof) an specific string in a property', function () {
                        //arrange
                        var items = [{ id: 1, name: 'abcdefgh' }, { id: "1", name: 'defghijklmn' }, {
                            id: 2,
                            name: 'jklmnopqrst'
                        }];

                        //act
                        var result3 = items.Where({ name: pa.LikeIgnoreCase("A"), id: pa.EqualTo3(2) });
                        var result4 = items.Where({ name: pa.LikeIgnoreCase("T"), id: pa.EqualTo3(2) });

                        expect(result3.length).toBe(0);
                        expect(result4.length).toBe(1);

                    });

                });
            });
        });
        describe('pa.utils', function () {
            describe('isNullEmptyOrUndefined', function () {
                it('should return true for null', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(null)).toBe(true);
                });

                it('should return false for true', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(true)).toBe(false);
                });

                it('should return false for false', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(false)).toBe(false);
                });

                it('should return true for undefined', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(undefined)).toBe(true);
                });

                it('should return true for nothing', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined()).toBe(true);
                });

                it('should return false for non-empty string', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined("moo")).toBe(false);
                });

                it('should return false for non-empty number', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(12345)).toBe(false);
                });
                it('should return false for 0 number', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined(0)).toBe(false);
                });
                it('should return false for 0 string', function () {
                    // assert
                    expect(pa.utils.isNullEmptyOrUndefined('0')).toBe(false);
                });
                //it('should throw error for non-number and non-string', function () {
                //    // assert
                //    expect(function () {
                //        pa.utils.isNullEmptyOrUndefined({});
                //    }).toThrow(new Error());
                //});
            });
            describe('parseBoolean', function () {

                it('should return true for true', function () {
                    // assert
                    expect(pa.utils.parseBoolean("true", false)).toBe(true);
                });

                it('should return true for TRUE', function () {
                    // assert
                    expect(pa.utils.parseBoolean("TRUE", false)).toBe(true);
                });

                it('should return true for True', function () {
                    // assert
                    expect(pa.utils.parseBoolean("True", false)).toBe(true);
                });

                it('should return true for trUE', function () {
                    // assert
                    expect(pa.utils.parseBoolean("trUE", false)).toBe(true);
                });

                it('should return false for true', function () {
                    // assert
                    expect(pa.utils.parseBoolean("false", false)).toBe(false);
                });

                it('should return false for FALSE', function () {
                    // assert
                    expect(pa.utils.parseBoolean("FALSE", false)).toBe(false);
                });

                it('should return false for True', function () {
                    // assert
                    expect(pa.utils.parseBoolean("False", false)).toBe(false);
                });

                it('should return false for trUE', function () {
                    // assert
                    expect(pa.utils.parseBoolean("faLSE", false)).toBe(false);
                });

                it('should return null for invalid bool', function () {
                    // assert
                    expect(pa.utils.parseBoolean("moo", false)).toBe(null);
                });

                it('should return null for null', function () {
                    // assert
                    expect(pa.utils.parseBoolean(null, false)).toBe(null);
                });

                it('should return null for undefined', function () {
                    // assert
                    expect(pa.utils.parseBoolean(undefined, false)).toBe(null);
                });

                it('should throw error for invalid bool if error enabled', function () {
                    // assert
                    expect(function () {
                        pa.utils.parseBoolean("moo", true);
                    }).toThrow(new Error("The string passed to function parseBoolean (moo) doesn't match with any valid string"));
                });
            });
        });
    });


});
