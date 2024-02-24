using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BeerAPI.Models;

namespace BeerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : Controller
    {
        List<Beer> beers = new List<Beer>{
            new Beer(){Id=1, Name= "Beer1", year = 1981},
            new Beer(){Id=2, Name= "Beer2", year = 1992},
            new Beer(){Id=3, Name= "Beer3", year = 1991},
            new Beer(){Id=4, Name= "Beer4", year = 1971},
        };

        [HttpGet]
        public bool GetLinqBeers(){
            var sum =0;
            beers.ForEach(
                Beer => {sum+=Beer.year;}
            );

            var list90 = new List<Beer>();
            beers.ForEach(
                beer => {
                    if(beer.year > 1990){
                        list90.Add(beer);
                    }
                }
            );


            Console.WriteLine(sum);

            var sum2 = beers.Sum(beer => beer.year);
            var list91 = beers.Where(beer => beer.year>1990);

            // beers.Select(beer => beer.Name);
            // beers.OrderByDescending(beer => beer.year);
            
            Console.WriteLine(sum2);
            
            return true;
        }
    }
}