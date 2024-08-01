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
using System.Reflection.PortableExecutable;

namespace ToDoApp.Infrastructure.Data
{
    public class ToDoAppContext: DbContext
    {
    public DbSet<ToDoItem> ToDoItems { get; set; }
    public DbSet<Category> Category { get; set; }
    public DbSet<User> Users { get; set; }

    public ToDoAppContext(DbContextOptions<ToDoAppContext> options) : base(options)
    {
    }
    public ToDoAppContext() : base() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           // modelBuilder.Entity<ToDoItem>()
           //     .HasOne(fi => fi.Category)
           //     .WithMany(f => f.ToDoItems)
           //     .HasForeignKey(fi => fi.CategoryId);

           // modelBuilder.Entity<User>()
           //.HasMany(u => u.ToDoItems)
           //.WithOne(t => t.User)
           //.HasForeignKey(t => t.UserId);

           // modelBuilder.Entity<User>()
           //     .HasMany(u => u.Categories)
           //     .WithOne(c => c.User)
           //     .HasForeignKey(c => c.UserId);
         //   DataSeed(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        private void DataSeed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "My Day", Priority = 1, Icon = "wb_sunny" },
                new Category { Id = 2, Name = "Important", Priority = 1, Icon = "star" },
                new Category { Id = 3, Name = "Tasks", Priority = 1, Icon = "task" },
                new Category { Id = 4, Name = "Planned", Priority = 2, Icon = "event" },
                new Category { Id = 5, Name = "Groceries", Priority = 2, Icon = "shopping_cart" }
                );

        }
        }
}
