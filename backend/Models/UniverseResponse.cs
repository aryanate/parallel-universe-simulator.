using System.Collections.Generic;

namespace ParallelUniverseSimulator.Api.Models
{
    public class UniverseResponse
    {
        public string UniverseId { get; set; } = string.Empty;
        public string PrimaryTrait { get; set; } = string.Empty;
        public string ReflectionQuote { get; set; } = string.Empty;
        public string CurrentTimelineTitle { get; set; } = string.Empty;
        public string MostProbableAlternateTitle { get; set; } = string.Empty;
        public List<UniverseItem> Universes { get; set; } = new();
    }
}
