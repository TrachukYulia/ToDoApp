using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using ToDoApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Infrastructure.Data
{
    public class ToDoAppContext: DbContext
    {
    public DbSet<ToDoItem> ToDoItems { get; set; }
    public DbSet<Category> Category { get; set; }
    public ToDoAppContext(DbContextOptions<ToDoAppContext> options) : base(options)
    {
    }
    public ToDoAppContext() : base() { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
}
