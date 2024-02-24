using Microsoft.EntityFrameworkCore;

namespace BeerAPI.Models
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options): base(options){

        }
        public DbSet<Beer> Beers {get;set;}
        public DbSet<Brand> Brands {get;set;}

    }
}