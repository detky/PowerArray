# PowerArray
Power Array extends the Array prototype by adding many additional features to filter, manipulate and sort complex arrays.

###How is implemented?
By loading the library, all arrays become many extra functions that are designed to simplify and reduce the code you have to write to interact with arrays in javascript. 

###What does this script changes on the Array prototype?
Nothing, it just add new functions and properties, and only if they not already exists. 

<h2>The basics in examples</h2>
The following examples assumes that the variable "people" is an array of objects. Each object represents a person and each object have some fields (id, name, lastname, age, address, etc.), and a method called getChilds(), that returns another array of people.
<h2>The Where function</h2>Where({conditions
<ul>
      <li><b>To search for people called 'Sherlock', you could use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock'});</code></br></br>
      </li>
      <li><b>To search for people called 'Sherlock Holmes', use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', lastname: 'Holmes'});</code></br> </br>
      </li>
</ul>
PowerArray adds also some auxiliar functions to avoid writing the same snippets over and over again. All they are accesible under the "pa" (window.pa) object. For example:
<ul>
      <li><b>To search for people called 'Sherlock' and also older than 33 years, use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33)});</code></br></br>
      </li>
      <li><b>To search for people called 'Sherlock', older than 33 years, and containing the characters 'H', 'l' in his lastname:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33), lastname : pa.Like(['H','l'])});</code></br><br>
      </li>
        <li><b>To repeat the last example, but searching for name and lastname case insensitive, use:</b><br>
            <code>var newArray = people.Where({name: pa.LikeIgnoreCase('Sherlock'), age : pa.biggerThan(33), lastname : pa.LikeIgnoreCase(['H','l'])});</code></br></br>
      </li>
</ul>

When using the Where() function to filter a big amount of data, you have to consider the performance impact the second possible parameter consider the order of the filter conditions you provide


I'll continue writting, sorry :)
