using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Tender> Tenders { get; set; }
        public DbSet<PropertyValuation> PropertyValuations { get; set; }
        public DbSet<Report> Reports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Documents)
                .WithOne(d => d.Project)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Project>()
                .HasMany(p => p.Tenders)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Project>()
                .HasMany(p => p.PropertyValuations)
                .WithOne(pv => pv.Project)
                .HasForeignKey(pv => pv.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Create many-to-many relationship between Customer and Project
            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Projects)
                .WithMany();

            // Seed data
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Email = "admin@urbanrenewal.com", PasswordHash = "AQAAAAIAAYagAAAAELTTxu3CpQ5vBRyUQu8JxCuFdVr7aJ+L+x3BsJuHbAZq2mN87l32vJHeBgvJqS5vqw==", Role = "Administrator" }
            );
        }
    }
}
