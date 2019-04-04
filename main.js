var data_promise = d3.json("https://ghibliapi.herokuapp.com/films");

data_promise.then(function(data){
  make_svg(data)
},
function(error){
  console.log(error);
})

var give_me = function(data){
  var name_column_relations = []
  data.forEach(function(d, parent_index){
    var categories = ['people', 'species', 'locations', 'vehicles']
    categories.forEach(function(category){
      d[category].forEach(function(d, i){
        var new_promise = d3.json(d);
        new_promise.then(function(new_data){

            if (new_data){
              if (new_data.length){
              new_data.forEach(function(character){
                name_column_relations.push([0, 0, 0]);
              })
            }else{
              var name = new_data.name;
              name_column_relations.push([0, 0, 0]);
            }
            }
          },
          function(error){
            console.log(error);
          })
          })
        })
        console.log("Done.")
      })
      return name_column_relations;
}

var make_svg = function(data){
  var table = d3.select('body')
               .append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody')
  var columns = [];
  var name_column_relations = give_me(data);
  console.log(name_column_relations.length);

  thead.selectAll('th')
       .data(Object.keys(data[0]))
       .enter()
       .append('th')
       .text(function(d, i){
         return d;
       })
  tbody.selectAll('tr')
       .data(data)
       .enter()
       .append('tr')
       .each(function(parentData, i){
         var current_row = d3.select(this);
         current_row.selectAll('td')
                    .data(Object.values(parentData))
                    .enter()
                    .append('td')
                    .text(function(d, i){
                      return d;
                    })
                    .attr('class', function(d, i){
                      return Object.keys(parentData)[i];
                    })
       })
}
