using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;

namespace ToDoApp.Infrastructure.Data.EntityTypeConfiguration
{
  
    public class ToDoItemConfiguration : IEntityTypeConfiguration<ToDoItem>
    {
        public void Configure(EntityTypeBuilder<ToDoItem> builder)
        {

            builder.HasOne(x => x.Category)
             .WithMany(x => x.ToDoItems)
             .HasForeignKey(x => x.CategoryId)
             .OnDelete(DeleteBehavior.Cascade);
            builder.Property(o => o.Name).IsRequired().HasMaxLength(999);
            builder.Property(o => o.IsDone).HasDefaultValue(false).IsRequired().HasMaxLength(999);
            builder.Property(o => o.DueDate).HasMaxLength(999);



        }
    }
}
