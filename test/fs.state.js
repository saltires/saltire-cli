
// Node.js program to demonstrate the  
// fsPromises.stat() method  
    
// Import the filesystem module  
const fsPromises = require("fs").promises; 
(async () => { 
  try { 
    // Using the fsPromises.stat() method 
    const stats = await fsPromises.stat( 
          "GFG.txt"); 
    console.log(stats.isDirectory()); 
  }  
  catch (error) { 
    console.log(error); 
  } 
})();