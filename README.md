PowerArray
===================
Working with Arrays in Javascript requires manual iteration, is error-prone, difficult to read and time-consuming. 

**What can PowerArray do for you?**

How many time you need to find out what is doing this code?

```javascript
var result = [];
for(var i = 0, l = peopleArray.length; i < l; i++) {
	var item = peopleArray[i];
	if(item.age > 18 && item.age < 70 && item.gender === 'M') {
		result.push(item);
	}
}
result.sort(function (a, b) {
    return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
})
```

And how long for this one? 

```javascript
var result = peopleArray
	.Where({ age: Between(18,70), gender: 'M'})
	.Sort({ lastName: Sort.AscendingIgnoringCase});
```

Both codes extract from **peopleArray** all men between 18 and 70 years of age.

That's what this library does: it simplifies your code. Makes it intuitive, more readable. Functional.

Power Array extends the Javascript Array prototype by adding many additional features to <b>[Filter](#filtering),</b><b> [Sort](#sorting) </b> and  <b>[Manipulate](#manipulation)</b> arrays in a compact and intuitive way. 



## License
The MIT License (MIT)

Copyright (c) 2015 Sebastian Menendez (sebastian.menendez[at]gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*
*
