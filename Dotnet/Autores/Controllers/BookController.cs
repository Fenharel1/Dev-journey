using Autores.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Autores.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BookController : ControllerBase
  {
    private readonly AppDbContext context;

    public BookController(AppDbContext context)
    {
      this.context = context;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<Book>> getBook(int id){
      return await context.Book
        .Include(b => b.Autor)
        .FirstOrDefaultAsync(b => b.Id == id);
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<Book>> createBooko(Book book){
      var existAuthor = await context.Autor.AnyAsync(a => a.Id == book.AutorId);
      if(!existAuthor) return BadRequest($"No existe el autor con id: {book.AutorId}");

      context.Add(book);
      await context.SaveChangesAsync();
      return book;
    }
  }
}
