using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;
using System.Reflection.Emit;

namespace ToDoApp.Infrastructure.Data.EntityTypeConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(u => u.ToDoItems)
               .WithOne(ti => ti.User)
               .HasForeignKey(ti => ti.UserId)
               .OnDelete(DeleteBehavior.Cascade); 

            builder.HasMany(u => u.Categories)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict); 
            builder.Property(o => o.Username).IsRequired().HasMaxLength(999);
        }
    }
}
