using System.Collections.Generic;
using IdentityServer4.Core.Models;

namespace CustomerWebApi
{
    public static class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            return new List<Scope>() {
                        StandardScopes.OpenId,
                        StandardScopes.Email,
                        StandardScopes.OfflineAccess,
                        new Scope() {
                            Name = "api",
                            DisplayName = "API",
                            Description = "Sample Web API",
                            Type = ScopeType.Resource,
                            ScopeSecrets = new List<Secret>() {
                                new Secret("apisecret".Sha256())
                            }
                        }
            };
        }
    }
}