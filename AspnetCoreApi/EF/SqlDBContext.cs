using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace AspnetCoreApi.EF{
    public class SqlDBContext : DbContext {
        public SqlDBContext(DbContextOptions<SqlDBContext> options) : base(options)
        {

        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Grade> Grades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            // modelBuilder.Entity<Person>()
            //     .Property(b => b.PersonId)
            //     .ValueGeneratedOnAdd();

        }

        public static readonly LoggerFactory MyLoggerFactory
            = new LoggerFactory(new[] {new ConsoleLoggerProvider((_, __) => true, true)});
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
            .UseLoggerFactory(MyLoggerFactory);
    }
}
