# PowerArray
Power Array extends the Array prototype by adding many additional features.

<b>What does this script changes on the Array prototype?</b><br>
Nothing, it just add new functions and properties, and only if they were not already used.

<h2>The basics, short introduction</h2>
The following examples assumes that the variable "people" contains an array of objects. Each object represents a person and have some standard fields (id, name, lastname, age, address, etc.) and the function getChilds(), that returns another array of people.
<ul>
      <li><b>To search for people called 'Sherlock' (case sensitive), use:</b><br>
            <code>var peopleCalledSherlock = people.Where({name: 'Sherlock'});</code>
      </li>
      <li><b>To search for people called 'Sherlock Holmes' (case sensitive), use:</b><br>
            <code>var peopleCalledSherlockHolmes = people.Where({name: 'Sherlock', lastname: 'Holmes'});</code> 
      </li>
</ul>
PowerArray adds also some auxiliar functions to avoid writing the same snippets over and over. All they are accesible under the pa object. For example:
<ul>
      <li><b>To search for people called 'Sherlock' (case sensitive) and also older than 33 years, use:</b><br>
            <code>var peopleCalledSherlock = people.Where({name: 'charles', age : pa.biggerThan(33)});</code>
      </li>
      <li><b>To search for people called 'Sherlock Holmes' (case sensitive), use:</b><br>
            <code>var peopleCalledSherlockHolmes = people.Where({name: 'Charles', lastname: 'Holmes'});</code>
      </li>
</ul>


I'll continue writting, sorry :)
