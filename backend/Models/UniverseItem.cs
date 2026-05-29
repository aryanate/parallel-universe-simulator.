namespace ParallelUniverseSimulator.Api.Models
{
    public class UniverseItem
    {
        public string Name { get; set; } = string.Empty; // e.g. "Current Universe", "Universe A"
        public string Title { get; set; } = string.Empty; // e.g. "The Brave Choice"
        public string StorySummary { get; set; } = string.Empty;
        public string KeyLesson { get; set; } = string.Empty;
        public string EmotionalTone { get; set; } = string.Empty;
        public double ProbabilityScore { get; set; } // fictional probability, e.g. 0.35
    }
}
