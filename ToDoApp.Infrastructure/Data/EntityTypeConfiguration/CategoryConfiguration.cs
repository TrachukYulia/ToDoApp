using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;
using AutoMapper.Internal.Mappers;

namespace ToDoApp.Infrastructure.Data.EntityTypeConfiguration
{
  
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(o => o.Name).HasMaxLength(100).IsRequired();
            builder.Property(o => o.Icon).HasDefaultValue("list").IsRequired();
            builder.Property(o => o.Priority).HasDefaultValue(3).IsRequired();



        }
    }
}
