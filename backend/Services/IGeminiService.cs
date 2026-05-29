using System.Threading.Tasks;
using ParallelUniverseSimulator.Api.Models;

namespace ParallelUniverseSimulator.Api.Services
{
    public interface IGeminiService
    {
        Task<UniverseResponse> GenerateUniverseReportAsync(string decision);
    }
}
