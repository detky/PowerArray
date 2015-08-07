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
This function allows you to get a subset of an existing array, by passing an object containing the conditions that has to be checked on each array element. 
<table>
<tr>
	<td>Function</td><td><b>.Where</b>(whereConditions [,keepOrder])<br></td>
</tr>
<tr>
	<td>Param</td><td><b>whereConditions</b> - Type: Object<br>
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

PowerArray adds also some auxiliar functions to avoid writing the same snippets over and over again. All they are accesible under the "pa" (window.pa) object. For example:
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


I'll continue writting, sorry :)
