using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerAPI.Models
{
  public class Brand
  {
    public long Id { get; set; }
    public string Name {get; set; }
    public string Country {get;set;}

    public ICollection<Beer> Beers {get;set;}
    }
}