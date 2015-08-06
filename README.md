# PowerArray
Power Array extends the Array prototype by adding many additional features.

<b>What does this script changes on the Array prototype?</b><br>
Nothing, it just add new functions and properties, and only if they were not already used.

<h2>The basics, short introduction</h2>
The following examples assumes that the variable "people" contains an array of objects. Each object represents a person and have some standard fields (id, name, lastname, age, address, etc.) and the function getChilds(), that returns another array of people.
<ul>
      <li><b>To search for people called 'Sherlock', use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock'});</code></br></br>
      </li>
      <li><b>To search for people called 'Sherlock Holmes', use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', lastname: 'Holmes'});</code></br> </br>
      </li>
</ul>
PowerArray adds also some auxiliar functions to avoid writing the same snippets over and over. All they are accesible under the "pa" (window.pa) object. For example:
<ul>
      <li><b>To search for people called 'Sherlock' and also older than 33 years, use:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33)});</code></br></br>
      </li>
      <li><b>To search for people called 'Sherlock', older than 33, and having the characters 'H', 'l' on his lastname:</b><br>
            <code>var newArray = people.Where({name: 'Sherlock', age : pa.biggerThan(33), lastname : pa.Like(['H','l'])});</code></br><br>
      </li>
        <li><b>To repeat the last example, but searching for name and lastname case insensitive, use:</b><br>
            <code>var newArray = people.Where({name: pa.LikeIgnoreCase('Sherlock'), age : pa.biggerThan(33), lastname : pa.LikeIgnoreCase(['H','l'])});</code></br></br>
      </li>
</ul>


I'll continue writting, sorry :)
