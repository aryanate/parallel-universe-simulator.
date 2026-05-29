using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ParallelUniverseSimulator.Api.Models;
using ParallelUniverseSimulator.Api.Services;

namespace ParallelUniverseSimulator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UniverseController : ControllerBase
    {
        private readonly GeminiUniverseGenerator _geminiService;
        private readonly MockUniverseGenerator _mockService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UniverseController> _logger;

        public UniverseController(
            GeminiUniverseGenerator geminiService,
            MockUniverseGenerator mockService,
            IConfiguration configuration,
            ILogger<UniverseController> logger)
        {
            _geminiService = geminiService;
            _mockService = mockService;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] UniverseRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Decision))
            {
                return BadRequest(new { error = "Decision text cannot be empty." });
            }

            _logger.LogInformation("Received parallel universe request for decision: {DecisionLength} chars.", request.Decision.Length);

            string apiKey = _configuration["Gemini:ApiKey"] ?? string.Empty;
            bool useMock = string.IsNullOrWhiteSpace(apiKey) || apiKey.Equals("YOUR_GEMINI_API_KEY", StringComparison.OrdinalIgnoreCase);

            if (useMock)
            {
                _logger.LogWarning("Gemini API Key is not configured or set to placeholder. Using high-fidelity Mock fallback service.");
                var mockReport = await _mockService.GenerateUniverseReportAsync(request.Decision);
                return Ok(mockReport);
            }

            try
            {
                _logger.LogInformation("Calling live Gemini API service...");
                var liveReport = await _geminiService.GenerateUniverseReportAsync(request.Decision);
                return Ok(liveReport);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Live Gemini timeline scan failed. Triggering automatic failsafe fallback to Mock service.");
                try
                {
                    var fallbackReport = await _mockService.GenerateUniverseReportAsync(request.Decision);
                    return Ok(fallbackReport);
                }
                catch (Exception fallbackEx)
                {
                    _logger.LogCritical(fallbackEx, "Both live and mock timeline scans failed.");
                    return StatusCode(500, new { error = "Timeline scanner encountered a cosmic disturbance. Please try again.", details = fallbackEx.Message });
                }
            }
        }
    }
}
