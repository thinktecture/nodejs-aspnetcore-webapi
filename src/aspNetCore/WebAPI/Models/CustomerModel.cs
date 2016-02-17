namespace CustomerWebApi
{
    /// <summary>
    /// Model representing a very simple customer
    /// </summary>
    public class CustomerModel
    {
        /// <summary>
        /// A unique key of a concrete customer
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The first name of customer
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The last name of a customer
        /// </summary>
        public string LastName { get; set; }
    }
}