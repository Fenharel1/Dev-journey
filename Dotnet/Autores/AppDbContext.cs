using System;
using Autores.Entities;
using Microsoft.EntityFrameworkCore;

namespace Autores;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Autor> Autor {get;set;}
    public DbSet<Book> Book {get;set;}
}
