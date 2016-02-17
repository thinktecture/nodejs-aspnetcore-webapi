using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4.Core;
using IdentityServer4.Core.Services.InMemory;

namespace CustomerWebApi
{
    public static class Users
    {
        public static List<InMemoryUser> Get()
        {
            return new List<InMemoryUser>() {
                new InMemoryUser() {
                    Subject = "sample-bob",
                    Username = "bob",
                    Password = "bob",
                    Claims = new Claim[] {
                        new Claim(Constants.ClaimTypes.Name, "Bob Smith"),
                        new Claim(Constants.ClaimTypes.GivenName, "Bob"),
                        new Claim(Constants.ClaimTypes.FamilyName, "Smith"),
                        new Claim(Constants.ClaimTypes.Email, "BobSmith@email.com"),
                        new Claim(Constants.ClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean)
                    }
                }
            };
        }
    }
}