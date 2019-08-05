using System;
using Microsoft.EntityFrameworkCore;

namespace AspnetCoreApi.EF{
    public class SqlDBContext : DbContext {
        public SqlDBContext(DbContextOptions<SqlDBContext> options) : base(options)
        {

        }
        public DbSet<Person> Persons { get; set; }
    }
}
