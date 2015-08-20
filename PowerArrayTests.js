/// <reference path="PowerArray.js" />
fdescribe('PowerArrayTests', function () {

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

    describe('First (Wrapper from Where function)', function() {

        it('It should take less time to get a First() item, than the complete results using Where()', function() {
            var elements = createDummies(500);
            var tmp;
            tmp = window.performance.now();
            elements.Where({
                id : EndsWith("75")
            });
            var whereTime = window.performance.now() - tmp;
            //console.log("WhereTime : " + whereTime);
            tmp = window.performance.now();
            elements.First({
                id : EndsWith("75")
            });
            var firstTime = window.performance.now() - tmp;
            //console.log("firstTime : " + firstTime);
            expect(whereTime).toBeGreaterThan(firstTime);
        });

        it('should return the first item in the collection if no parameters passed', function(){
            //act;
            var elements = createDummies(500).First();
            //assert
            expect(elements).toBeDefined();
            expect(elements.id).toBe(0); //createDummies set first id to 0
        });

        it('should return first string', function() {
            //arrange
            var items = [0,2,4,83092,"a"]
            //act
            var elements = items.First();
            //assert
            expect(elements).toBeDefined();
            expect(elements).toBe(0); //createDummies set first id to 0
        });

        it('should return undefined', function() {
            //arrange
            var items = [];
            //act
            var elements = items.First();
            //assert
            expect(elements).toBeUndefined();

        });

    });

    describe('Where', function () {
        describe('Process multiple conditionsobject at once (whereConditions is an array)', function () {
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
                    var items =[
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
});
