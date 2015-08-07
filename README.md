# PowerArray
Power Array extends the native Array prototype by adding many additional features to  [filter](#filtering), manipulate, sort and extract subsets from complex arrays.

###How is implemented?
By loading the library, all arrays become many extra functions that are designed to simplify and reduce the code you have to write to interact with arrays in javascript. 

####What does this script changes on the Array prototype?
Nothing, it just add new functions and properties, and only if they not already exists. 

###Filtering basics <a name="filtering"></a>
Normally, to obtain a subset from any array, you have to loop, evaluate fields, collect possitive matches, etc. 
At the end you always have to write at least 10 or 20 lines, deppending on the complexity of the evaluations you have to do to find the items you're searching for. The PowerArray functions [Where](#WhereFunction) and "getByProperty", allows you to write complex operations into a single, readable, and intuitive statement.

<a name="WhereFunction"></a>
###The Where function
This function allows you to get a subset of an existing array, by passing a [conditions-object](#WhereConditionsObject), a [custom function](#WhereCustomFunction), or an [standard pa-function](#WherePAStandardFunction) (an auxiliary PowerArray function), to "filter" only the array elements you're interested in.
 
<table>
<tr>
	<td>Function</td><td><b>.Where</b>(whereConditions [,keepOrder])<br></td>
</tr>
<tr>
	<td>Param</td><td><b>whereConditions</b> - Type: Object, Function, or pa.EqualTo<br>
	One or more search criterions to be evaluated on each array element
</td>
</tr>
<tr>
	<td>Param</td><td><b>keepOrder</b> - Type: Boolean<br>
	Indicates if the order of the array items have to be mantained or not.
</td>
</tr>
</table>
 
To graphically explain how the function works, and how it could be used, i recommend you to take a look to the following basic examples

###Examples introduction
The following examples assumes that the variable "people" is an array of objects. Each object represents a person and each person-object have some fields (id, name, lastname, age, address, etc.), and also a method called getChilds(), that returns another array of people. Let's say:
<code><pre>
var people = [
			{id : 0, name: 'Max', lastname: 'Muster', age : 20, getChilds : function() { return [{......}]},
        	{id : 1, name: 'Juan', lastname: 'Perez', age : 31, getChilds : function() { return [{......}]},
            {id : 1, name: 'Sherlock', lastname: 'Holmes', age : 45, getChilds : function() { return [{......}]},
            etc.
}];
</pre></code>

There are many different ways to specify conditions, but the best way to understand the possibilities, is to see it in action

<ul>
      <li><b>To search for people called 'Sherlock', you could use:</b><br>
       <code>var newArray = people.Where({name: 'Sherlock'});</code></br></br>
      </li>
      <li><b>To search for people called 'Sherlock Holmes', use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', lastname:'Holmes'});</code></br> </br>
      </li>
</ul>

PowerArray adds also some auxiliar functions to avoid writing the same snippets over and over again. All they are accesible under the "pa" (window.pa) object, [click here for a complete list](#WherePAStandardFunction). For example:
<ul>
      <li><b>To search for people called 'Sherlock' and also older than 33 years, use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33)});</code></br></br>
      </li>
      <li><b>To search for peoplecalled 'Sherlock', older than 33 years, and containing the characters 'H', 'l' in his lastname:</b><br>
	  <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33), lastname : pa.Like
		(['H','l'])});</code></br><br>
      </li>
        <li><b>To repeat the last example, but searching for name and lastname case insensitive, use:</b><br>            <code>var newArray = people.Where({name: pa.LikeIgnoreCase('Sherlock'), age : pa.biggerThan(33), lastname : pa.LikeIgnoreCase(['H','l'])});</code></br></br>
      </li>
</ul>

When using the Where() function to filter a big amount of data, you have to consider the performance impact the second possible parameter 

consider the order of the filter conditions you provide


###Auxiliar functions / Standard PA Functions
PowerArray adds also some auxiliary functions (i call them Standard PA Functions) that can be used together with the [Where](#WhereFunction) function. The idea behind the auxiliar functions is to reduce the syntax complexity of the Where function, and to standarize many small tasks that normally are x times repeated in practically any JS project.
When the power array library loads, it stores all standard functions under the pa object (window.pa) and they can be accessed from everywhere with the prefix "pa".

#####Standard PA Functions list:

<ul style="list-style:none">
<table>
<tr>
	<td colspan=2><b>pa.BiggerThan</b>(value)<br>
	Evaluate if the value of the property to be evaluated is bigger than the passed value.
	</td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		The value to compare to 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is bigger than the passed value parameter, else false.
	</td>
</tr>
<tr>
	<td>
		Example</td><td><code>var subset = someArray.Where({age : pa.BiggerThan(18)})</code><br>Variable subset becomes an array of all people older than 18 years.</td>
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.SmallerThan</b>(value)<br>
	Evaluate if the value of the property to be evaluated is smaller than the passed value.
</td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		The value to compare to 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is smaller than the passed value parameter, else false.
	</td>
</tr>
<tr>
	<td>
		Example</td><td><code>var subset = someArray.Where({age : pa.SmallerThan(50)})</code><br>Variable subset becomes an array of all people younger than 50 years.</td>
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.EqualTo3</b>(value)<br>
	Checks if the property to be evaluated is equal to the value passed on parameter "value". 
	The evaluation is made by identity (===) operator (no type conversion is done)
</td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		The value to compare to
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is equal to the passed value, else false. 
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.EqualTo2</b>(value)<br></td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		Compares the affected element with the passed Value. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is equal to the passed value, else false. The evaluation is made by equality (==) operator
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.Like</b>(value)<br></td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String or Array of Strings<br>
		Searches the passed value(s) to be present in the corresponding property of the affected element. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the passed value is present on the affected element. If value is an array, true is only returned when all array positions are found. 
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.LikeIgnoreCase</b>(value)<br></td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String or Array of Strings<br>
		Searches the passed value(s) to be present in the corresponding property of the affected element. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - Similar to pa.Like, with the only difference that the strings are compared ignoring case. 
	</td>
</tr>
</table>
<table>
<tr>
	<td colspan=2><b>pa.EqualTo</b>(referenceObject, func)<br>Used to compare all array elements with a single object(referenceObject), throug a custom function(func)</td>
</tr>
<tr>
	<td>
		Param</td><td><b>referenceObject</b> - Type: Object<br>
		Searches the passed value(s) to be present in the corresponding property of the affected element. 
	</td>
</tr>
<tr>
	<td>
		Param</td><td><b>func</b> - Type: Function(a,b)<br>
		A custom function that will be called for each element on the array. It should return a boolean value, and accept two parameters that will be automatically passed: the first one, will be always the originally passed referenceObject, the second will be the current array item. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - Similar to pa.Like, with the only difference that the strings are compared ignoring case. 
	</td>
</tr>
</table>

</ul>

Each auxiliar to avoid writing the same snippets over and over again. All they are accesible under the "pa" (window.pa) object, [click here for a complete list](#WherePAStandardFunction).

>I'll continue writing, sorry :)

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
