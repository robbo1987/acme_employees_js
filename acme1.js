const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  const findEmployeeByName = (name,employees) => {
    const employee = employees.find((emp) => emp.name===name)
    return employee;
  }
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  spacer('findManagerFor Shep Jr.')
  //given an employee and a list of employees, return the employee who is the manager
  const findManagerFor = (obj,employees) => {
    const manager = employees.find((emp) => obj.managerId === emp.id);
   
    return(manager)
  
  }
  console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  spacer('findCoworkersFor Larry')
  
  //given an employee and a list of employees, return the employees who report to the same manager

  const findCoworkersFor = (obj,employees) => {
    const coworker = employees.filter((emp) => obj.managerId === emp.managerId);
    return (coworker.filter((worker) => worker.id !== obj.id))
  }
  console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  
  spacer('');

 
  spacer('findManagementChain for moe')

  function findManagementChainForEmployee(employee, employees){
    if(employee.managerId === undefined) return []
    const manager = employees.filter((emp) => emp.id === employee.managerId)
    return [...findManagementChainForEmployee(manager[0], employees), manager]
  }
  
  
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');
  
  
  spacer('generateManagementTree')
  //this is the solution posted in slack, I wasnt able to get the answer but wanted this solution for my records//
  const generateManagementTree = employees => {
    let boss;
    //finds the boss of the company
    for (let i in employees) {
      if (!employees[i].managerId) {
        boss = employees[i];
      }
    }
  
    //assigns reports property to the boss and call the helper function to find the next people down the chain
    boss.reports = findMinionsForManager(employees, boss);
    
    //after all the iterations of the helper functions, assigns the org chart to 'companyHierarchy'
    const companyHierarchy = boss;
    return companyHierarchy;
  }
  
  const findMinionsForManager = (employees, manager) => {
    const subtree = [];
    employees
    //filters employees who report to the same manager
    .filter(person => person.managerId === manager.id)
  
    //assigns reports property to each employee and recursively calls the function to find their minions
    .forEach( person => {
      person.reports = findMinionsForManager(employees, person);
      return subtree.push(person);
    })
    return subtree;
  }
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/