 //method to capitalize each word in sentence
 const capitalize =(str)=> {
      return str
        .toLowerCase()
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" "); 

          //this.getMeteorites(`$where lower(name)=${this.input}`);