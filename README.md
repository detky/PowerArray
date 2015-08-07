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
This function allows you to get a subset of an existing array, by passing a [conditions-object](#WhereConditionsObject), a [custom function](#WhereCustomFunction), or an [standard pa-function](#WherePAStandardFunction) (an auxiliary PowerArray function).
 
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

<ul style="list-style:none"><li><table>
<tr>
	<td colspan=2><b>pa.biggerThan</b>(value)<br></td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		Compares the affected element with the passed Value. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is bigger than the passed value parameter, else false.
	</td>
</tr>
</table></li>
<li>
<table>
<tr>
	<td colspan=2><b>pa.biggerThan</b>(value)<br></td>
</tr>
<tr>
	<td>
		Param</td><td><b>value</b> - Type: String, Number, Boolean or Date<br>
		Compares the affected element with the passed Value. 
	</td>
</tr>
<tr>
	<td>
		Return</td><td><b>Boolean</b> - true if the evaluated value is bigger than the passed value parameter, else false.
	</td>
</tr>
</table>
</li></ul>

Each auxiliar to avoid writing the same snippets over and over again. All they are accesible under the "pa" (window.pa) object, [click here for a complete list](#WherePAStandardFunction).

>I'll continue writing, sorry :)

## License
The MIT License (MIT)

Copyright (c) 2013 Sebastian Menendez (sebastian.menendez[at]gmail.com)

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
SOFTWARE.
