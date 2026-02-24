1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: getElementById:Inside HTML tag can be declar a uniq cleare id  and it can be acces by js , very fast because every id is unique
getElementsByClassName: it access by the classsname , inside html css it find value or data by the css classname 
querySelector: its find the first html tag 
querySelectorAll: it can access id , class etc what matched it is very flexible . 


2. How do you create and insert a new element into the DOM?

Answer:const new = document.createElement('div');
new.textContent = "eta new div”;
parent.appendChild(new)

3. What is Event Bubbling? And how does it work?
   
Answer: Its like going upper like tree, from child to parents, to parents .its works by finding parent like a h3 tag inside a div and div insidea section and section insidea body, going up parents to parents

6. What is Event Delegation in JavaScript? Why is it useful?
   
Answer: In event delegation it can declare a one action and can run functions using this , in one action listening many functions can be run , its reduce the waste of memory 

8. What is the difference between preventDefault() and stopPropagation() methods?
   
Answer: preventDefault() its aa function what stops browser from browsers normal default behavior 
And stopPropagation() its a function what stops events bubbling it stop it from bubbling the event 

