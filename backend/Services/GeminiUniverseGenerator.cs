using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ParallelUniverseSimulator.Api.Models;

namespace ParallelUniverseSimulator.Api.Services
{
    public class GeminiUniverseGenerator : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<GeminiUniverseGenerator> _logger;

        public GeminiUniverseGenerator(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiUniverseGenerator> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiKey = configuration["Gemini:ApiKey"] ?? string.Empty;
        }

        public async Task<UniverseResponse> GenerateUniverseReportAsync(string decision)
        {
            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                throw new InvalidOperationException("Gemini API key is not configured.");
            }

            string prompt = $$"""
            You are the Cosmic Timeline Scanner for the Parallel Universe Simulator.
            The user entered the following life decision or situation:
            "{{decision}}"

            You must scan the alternate realities and generate exactly 5 parallel universes and a reflective Spotify Wrapped summary.
            Return ONLY a valid JSON object matching the schema below. Keep descriptions deeply moving, emotionally resonant, mature, poetic, and philosophical. 

            Expected JSON schema:
            {
              "universeId": "#5-digit-number",
              "primaryTrait": "A cosmic trait showing the user's strength based on their decision (e.g., Courage, Resilience, Idealism, Integrity, Passion)",
              "reflectionQuote": "An original, deep, emotional philosophical quote on choices and time",
              "currentTimelineTitle": "A short, beautiful, poetic moniker for their current self (e.g., The Quiet Observer, The Steady Anchor)",
              "mostProbableAlternateTitle": "A short, beautiful, poetic moniker for their alternate self (e.g., The Bold Adventurer, The Cosmic Nomad)",
              "universes": [
                {
                  "name": "Current Universe",
                  "title": "A poetic timeline name (e.g., The Echo Chamber, The Safe Shore)",
                  "storySummary": "A highly evocative, emotional description (2-3 sentences) showing how their life is unfolding on this current path. Explain the stability, but also the subtle weight of wonder.",
                  "keyLesson": "A profound reflection on the lesson of this path.",
                  "emotionalTone": "A 2-word emotional descriptor (e.g., Melancholic & Stable)",
                  "probabilityScore": 0.52
                },
                {
                  "name": "Universe A: The Brave Choice",
                  "title": "A poetic timeline name (e.g., The Roaring Fire, The Trailblazer)",
                  "storySummary": "A deeply moving summary (2-3 sentences) of what happened if they took the boldest, most high-risk option. Show the heavy early struggles, the scars, and the raw triumph of personal evolution.",
                  "keyLesson": "A profound lesson about courage and leaps.",
                  "emotionalTone": "e.g., Exhilarating & Scorched",
                  "probabilityScore": 0.15
                },
                {
                  "name": "Universe B: The Safe Choice",
                  "title": "A poetic timeline name (e.g., The Quiet Nest, The Cozy Anchor)",
                  "storySummary": "A beautiful description (2-3 sentences) of choosing safety, family, stability, or comfort. Emphasize the warm satisfaction and emotional peace, but acknowledge the soft question of 'what if' that floats by on quiet evenings.",
                  "keyLesson": "A profound lesson about gratitude and peace.",
                  "emotionalTone": "e.g., Serene & Gentle",
                  "probabilityScore": 0.23
                },
                {
                  "name": "Universe C: The Unexpected Choice",
                  "title": "A poetic timeline name (e.g., The Mountain Symphony, The Whimsical Wand)",
                  "storySummary": "A surprising timeline (2-3 sentences) representing a complete, bizarre, or creative detour they never expected, like finding an artistic calling or a remote community that changed their values entirely.",
                  "keyLesson": "A profound lesson about finding joy in detours.",
                  "emotionalTone": "e.g., Whimsical & Rejuvenating",
                  "probabilityScore": 0.07
                },
                {
                  "name": "Universe D: The Butterfly Effect",
                  "title": "A poetic timeline name (e.g., The Airport Epiphany, The Dropped Letter)",
                  "storySummary": "A stunning description (2-3 sentences) of an extreme chain reaction triggered by a microscopic event related to their decision (e.g., spilling a tea, picking up a dropped coin). Show how it led to a completely different version of their life elsewhere in the world.",
                  "keyLesson": "A profound lesson about how small threads weave the cosmos.",
                  "emotionalTone": "e.g., Awe-Inspiring & Kinetic",
                  "probabilityScore": 0.03
                }
              ]
            }

            Guidelines:
            - Make the stories feel unique to the input: "{{decision}}".
            - Keep the probabilityScores floating numbers. The sum of all probabilities should be exactly 1.0 (e.g., 0.52 + 0.15 + 0.23 + 0.07 + 0.03 = 1.0).
            - The returned text MUST be ONLY the JSON object. Do not include markdown wraps (like ```json ... ```) or pre/post conversational text. Start with { and end with }.
            """;

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    responseMimeType = "application/json",
                    temperature = 0.8
                }
            };

            string jsonRequest = JsonSerializer.Serialize(requestBody);
            string url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={_apiKey}";

            _logger.LogInformation("Sending request to Gemini API...");

            using var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                string errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("Gemini API failed with status code {StatusCode}. Error: {Error}", response.StatusCode, errorContent);
                throw new HttpRequestException($"Gemini API call failed with status code {response.StatusCode}.");
            }

            string responseJson = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Successfully received response from Gemini API.");

            try
            {
                using var doc = JsonDocument.Parse(responseJson);
                var root = doc.RootElement;
                
                // Navigate Gemini response structure: candidates[0].content.parts[0].text
                var candidates = root.GetProperty("candidates");
                if (candidates.GetArrayLength() == 0)
                {
                    throw new Exception("No candidates returned from Gemini.");
                }

                var parts = candidates[0].GetProperty("content").GetProperty("parts");
                if (parts.GetArrayLength() == 0)
                {
                    throw new Exception("No parts returned in the response content.");
                }

                string rawJsonText = parts[0].GetProperty("text").GetString() ?? string.Empty;

                _logger.LogDebug("Raw JSON text from Gemini: {RawText}", rawJsonText);

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var universeResponse = JsonSerializer.Deserialize<UniverseResponse>(rawJsonText, options);
                if (universeResponse == null || universeResponse.Universes == null || universeResponse.Universes.Count == 0)
                {
                    throw new Exception("Deserialized object is null or missing universes.");
                }

                return universeResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to parse or deserialize Gemini API response.");
                throw new FormatException("The response from the AI model was not in the expected format.", ex);
            }
        }
    }
}
