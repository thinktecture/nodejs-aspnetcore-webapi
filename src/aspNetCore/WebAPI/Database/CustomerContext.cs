using Microsoft.Data.Entity;

namespace CustomerWebApi
{
    public class CustomerContext : DbContext
    {
        public DbSet<CustomerModel> Customers { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<CustomerModel>()
                .HasKey(p => p.Id);
                
            modelBuilder.Entity<CustomerModel>()
                .Property(p => p.FirstName)
                .IsRequired();
                
              modelBuilder.Entity<CustomerModel>()
                .Property(p => p.LastName)
                .IsRequired();
        }
    }
}