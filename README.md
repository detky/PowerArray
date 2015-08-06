# PowerArray
Power Array extends the Array prototype by adding many additional features.

<b>What does this script changes on the Array prototype?</b><br>
Nothing, it just add new functions and properties, and only if they were not already used.

<h2>Short introduction</h2>
The following examples assumes that the variable "people" contains an array of objects. Each object represents a person and have some standard fields (id, name, age, address, etc.) and the function getChilds(), that returns another array of people.

<ul>
      <li><b>To search for people called 'Sherlock' (case sensitive), use:</b><br>
            <code>var peopleCalledCharly = people.Where({name: 'charles'});</code>
      </li>
      <li><b>To search for people called 'Sherlock Holmes' (case sensitive), use:</b><br>
            <code>var peopleCalledCharly = people.Where({name: 'Charles', lastname: 'Holmes'});</code>
      </li>
</ul>

I'll continue writting, sorry :)
