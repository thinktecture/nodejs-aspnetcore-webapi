using System.Collections.Generic;
using IdentityServer4.Core.Models;

namespace CustomerWebApi
{
    public static class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>() {
                new Client() {
                    ClientId = "sample-client",
                    ClientSecrets = new List<Secret>() {
                        new Secret("sample-secret".Sha256())
                    },

                    Flow = Flows.ResourceOwner,
                    AccessTokenType = AccessTokenType.Reference,
                    AllowedScopes = new List<string>() {
                        StandardScopes.OpenId.Name,
                        StandardScopes.Email.Name,
                        StandardScopes.OfflineAccess.Name,
                        "api"
                    }
                }
            };
        }
    }
}