using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ParallelUniverseSimulator.Api.Models;

namespace ParallelUniverseSimulator.Api.Services
{
    public class MockUniverseGenerator : IGeminiService
    {
        private static readonly Random _random = new();

        public Task<UniverseResponse> GenerateUniverseReportAsync(string decision)
        {
            if (string.IsNullOrWhiteSpace(decision))
            {
                decision = "I decided to take the path less traveled.";
            }

            string cleanDecision = decision.ToLower();
            string category = DetermineCategory(cleanDecision);

            UniverseResponse response = category switch
            {
                "romance" => GenerateRomanceReport(decision),
                "moving" => GenerateMovingReport(decision),
                "business" => GenerateBusinessReport(decision),
                "career" => GenerateCareerReport(decision),
                _ => GenerateGeneralReport(decision)
            };

            return Task.FromResult(response);
        }

        private static string DetermineCategory(string decision)
        {
            if (ContainsAny(decision, "love", "feelings", "confess", "ask out", "crush", "date", "marry", "propose", "relationship", "break up", "ex", "never told", "her", "him"))
            {
                return "romance";
            }
            if (ContainsAny(decision, "move", "city", "country", "town", "apartment", "house", "abroad", "relocate", "travel", "fly", "flight", "nation"))
            {
                return "moving";
            }
            if (ContainsAny(decision, "business", "startup", "company", "founded", "product", "hustle", "venture", "freelance", "own boss", "agency"))
            {
                return "business";
            }
            if (ContainsAny(decision, "job", "career", "work", "quit", "resign", "promoted", "boss", "interview", "hired", "salary", "office", "employee"))
            {
                return "career";
            }
            return "general";
        }

        private static bool ContainsAny(string source, params string[] keywords)
        {
            foreach (var keyword in keywords)
            {
                if (source.Contains(keyword)) return true;
            }
            return false;
        }

        private static string GenerateId() => $"#{_random.Next(10000, 99999)}";

        private static UniverseResponse GenerateRomanceReport(string decision)
        {
            return new UniverseResponse
            {
                UniverseId = GenerateId(),
                PrimaryTrait = "Emotional Courage",
                ReflectionQuote = "The heart has its reasons which reason knows nothing of. Every unsaid word is a universe waiting to be born.",
                CurrentTimelineTitle = "The Silent Guardian",
                MostProbableAlternateTitle = "The Bold Romantic",
                Universes = new List<UniverseItem>
                {
                    new() {
                        Name = "Current Universe",
                        Title = "The Echo Chamber",
                        StorySummary = $"You chose to stay in the comfort zone regarding your feelings. By choosing silence, you preserved the existing stability, but the quiet question of 'what if' lingers in the background of your daily life like a soft acoustic melody.",
                        KeyLesson = "Some silences protect us, but they also keep us in the waiting room of our own lives.",
                        EmotionalTone = "Melancholic & Reflective",
                        ProbabilityScore = 0.45
                    },
                    new() {
                        Name = "Universe A: The Brave Choice",
                        Title = "The Bold Romantic",
                        StorySummary = $"You gathered your courage and confessed your feelings fully. It triggered an intense, beautiful confession in return. You embarked on a whirlwind romance that, although filled with vulnerabilities, taught you the raw beauty of being truly seen.",
                        KeyLesson = "Vulnerability is not winning or losing; it is having the courage to show up when you can't control the outcome.",
                        EmotionalTone = "Exhilarating & Passionate",
                        ProbabilityScore = 0.15
                    },
                    new() {
                        Name = "Universe B: The Safe Choice",
                        Title = "The Safe Haven",
                        StorySummary = $"You chose the path of emotional preservation. You locked away the feelings and built a strong, unbreakable friendship instead. You are now a constant, reliable presence in their life, finding peace in the platonic safety.",
                        KeyLesson = "Stability is valuable, but we must be sure we aren't trading deep connection for simple safety.",
                        EmotionalTone = "Warm & Peaceful",
                        ProbabilityScore = 0.25
                    },
                    new() {
                        Name = "Universe C: The Unexpected Choice",
                        Title = "The Cosmic Comedian",
                        StorySummary = $"You tried to confess, but the timing was hilariously wrong. A sudden rainstorm forced you both into an antique bookshop. While waiting, you started laughing at the absurdity and realized you both share a dream of opening a coffee shop. You became business partners and, eventually, soulmates.",
                        KeyLesson = "When life ruins your plans, it is often preparing a better path for you.",
                        EmotionalTone = "Whimsical & Heartwarming",
                        ProbabilityScore = 0.10
                    },
                    new() {
                        Name = "Universe D: The Butterfly Effect",
                        Title = "The Traveler's Thread",
                        StorySummary = $"Because you chose not to speak that day, you decided to take a solitary weekend trip to clear your mind. On the train, you sat next to a brilliant graphic designer from Spain. A shared map sparked a conversation, leading you to relocate to Barcelona and build an entirely new life of creative adventure.",
                        KeyLesson = "A closed door in one room forces us to walk down corridors we never knew existed.",
                        EmotionalTone = "Adventurous & Uplifting",
                        ProbabilityScore = 0.05
                    }
                }
            };
        }

        private static UniverseResponse GenerateMovingReport(string decision)
        {
            return new UniverseResponse
            {
                UniverseId = GenerateId(),
                PrimaryTrait = "Adaptability",
                ReflectionQuote = "You are not a tree; if you do not like where you are, move. Every skyline we choose changes the rhythm of our breathing.",
                CurrentTimelineTitle = "The Rooted Soul",
                MostProbableAlternateTitle = "The Urban Nomad",
                Universes = new List<UniverseItem>
                {
                    new() {
                        Name = "Current Universe",
                        Title = "The Anchored Heart",
                        StorySummary = $"You chose to stay close to your roots. Your daily routine is wrapped in the comforting predictability of familiar streets and long-time friends. You have built a deep sanctuary, though you occasionally look at maps with a curious sigh.",
                        KeyLesson = "Roots give us stability, but we must make sure they don't lock us in place.",
                        EmotionalTone = "Cozy & Nostalgic",
                        ProbabilityScore = 0.50
                    },
                    new() {
                        Name = "Universe A: The Brave Choice",
                        Title = "The Urban Nomad",
                        StorySummary = $"You packed your bags and moved to a bustling metropolis overseas. The early months were brutal, filled with language barriers and isolation. But you adapted, discovered a fierce independence, and now run a local cultural hub in the heart of the city.",
                        KeyLesson = "Growth and comfort do not coexist. True home is found inside your own resilience.",
                        EmotionalTone = "Empowering & Vibrant",
                        ProbabilityScore = 0.15
                    },
                    new() {
                        Name = "Universe B: The Safe Choice",
                        Title = "The Suburb Sanctuary",
                        StorySummary = $"You moved, but chose a nearby city that balanced adventure with proximity to family. You bought a small, beautiful house, adopted a pet, and established a quiet work-life balance that gives you the peace to pursue hobbies.",
                        KeyLesson = "Balance is not something you find, it is something you create.",
                        EmotionalTone = "Serene & Balanced",
                        ProbabilityScore = 0.20
                    },
                    new() {
                        Name = "Universe C: The Unexpected Choice",
                        Title = "The Mountain Mystic",
                        StorySummary = $"You planned to move to the big city, but a temporary stopover at a mountain village captured your soul. You canceled your lease, rented a small cabin, and learned woodworking. You now live off-grid, supplying beautiful custom furniture to travelers.",
                        KeyLesson = "Sometimes the detour is the destination.",
                        EmotionalTone = "Rustic & Peaceful",
                        ProbabilityScore = 0.10
                    },
                    new() {
                        Name = "Universe D: The Butterfly Effect",
                        Title = "The Airport Epiphany",
                        StorySummary = $"A delayed flight during your relocation led to you sharing a coffee with an eco-architect at the airport. Intrigued by your background, they offered you a position in an experimental green-city project in Scandinavia. You are now designing the sustainable cities of tomorrow.",
                        KeyLesson = "The universe speaks in coincidences; our job is to pay attention.",
                        EmotionalTone = "Inspiring & Futuristic",
                        ProbabilityScore = 0.05
                    }
                }
            };
        }

        private static UniverseResponse GenerateBusinessReport(string decision)
        {
            return new UniverseResponse
            {
                UniverseId = GenerateId(),
                PrimaryTrait = "Self-Reliance",
                ReflectionQuote = "The best way to predict the future is to create it. Starting is the hardest part, but the water is only cold until you jump.",
                CurrentTimelineTitle = "The Safe Strategist",
                MostProbableAlternateTitle = "The Disruptive Founder",
                Universes = new List<UniverseItem>
                {
                    new() {
                        Name = "Current Universe",
                        Title = "The Side-Hustle Scholar",
                        StorySummary = $"You kept your stable day job and pursued your startup idea as a hobby. You have zero financial anxiety, but the slow progress sometimes makes you feel like you're driving with the handbrake pulled.",
                        KeyLesson = "Prudence keeps you safe, but fear can masquerade as caution.",
                        EmotionalTone = "Comfortable & Contemplative",
                        ProbabilityScore = 0.40
                    },
                    new() {
                        Name = "Universe A: The Brave Choice",
                        Title = "The Disruptive Founder",
                        StorySummary = $"You handed in your resignation and went full-time on your business. You endured two years of dry bank accounts and constant rejection, but your pivot paid off. Today, you lead a thriving company with a team that shares your vision.",
                        KeyLesson = "Failure is information. The only real defeat is giving up on the lessons.",
                        EmotionalTone = "Exhilarating & Triumphant",
                        ProbabilityScore = 0.15
                    },
                    new() {
                        Name = "Universe B: The Safe Choice",
                        Title = "The Equity Partner",
                        StorySummary = $"Instead of going solo, you joined an early-stage startup as a key employee with equity. You gained the startup excitement with a regular paycheck, helping scale someone else's dream while securing your personal finances.",
                        KeyLesson = "Collaboration is often more powerful than isolation. You don't have to carry the whole mountain.",
                        EmotionalTone = "Collaborative & Steady",
                        ProbabilityScore = 0.30
                    },
                    new() {
                        Name = "Universe C: The Unexpected Choice",
                        Title = "The Accidental Author",
                        StorySummary = $"Your business failed catastrophically within six months. To cope, you wrote an incredibly raw, honest blog series about what went wrong. The articles went viral, leading to a major book deal. You are now a top public speaker and advisor on business resilience.",
                        KeyLesson = "Your scars are your credentials. People connect with your honesty, not your perfection.",
                        EmotionalTone = "Authentic & Rejuvenating",
                        ProbabilityScore = 0.10
                    },
                    new() {
                        Name = "Universe D: The Butterfly Effect",
                        Title = "The Pitch Deck Mistake",
                        StorySummary = $"You sent your investor pitch deck to the wrong email address—a retired local schoolteacher. Touched by your passion, she introduced you to her son, who happened to be a major venture capitalist. They fully funded your company, launching a global tech brand.",
                        KeyLesson = "Serendipity favors the active mind. Keep casting your nets.",
                        EmotionalTone = "Miraculous & Groundbreaking",
                        ProbabilityScore = 0.05
                    }
                }
            };
        }

        private static UniverseResponse GenerateCareerReport(string decision)
        {
            return new UniverseResponse
            {
                UniverseId = GenerateId(),
                PrimaryTrait = "Ambition",
                ReflectionQuote = "Choose a job you love, and you will never have to work a day in your life. But choose a path of growth, and you will never stop evolving.",
                CurrentTimelineTitle = "The Steady Builder",
                MostProbableAlternateTitle = "The Career Pivot Expert",
                Universes = new List<UniverseItem>
                {
                    new() {
                        Name = "Current Universe",
                        Title = "The Corporate Cornerstone",
                        StorySummary = $"You decided to remain in your current career track. You are respected, highly competent, and secure. However, at 5 PM, when you shut your laptop, you occasionally wonder if there's a more creative spark waiting to be lit.",
                        KeyLesson = "Comfort is a beautiful place, but nothing ever grows there.",
                        EmotionalTone = "Stable & Curious",
                        ProbabilityScore = 0.55
                    },
                    new() {
                        Name = "Universe A: The Brave Choice",
                        Title = "The Career Pivot Expert",
                        StorySummary = $"You quit your field entirely and went back to school for design and creative tech. It was terrifying starting from scratch at entry level, but today your work is nominated for international awards, and you wake up eager to create.",
                        KeyLesson = "It is never too late to be who you might have been.",
                        EmotionalTone = "Inspired & Courageous",
                        ProbabilityScore = 0.10
                    },
                    new() {
                        Name = "Universe B: The Safe Choice",
                        Title = "The Internal Escalator",
                        StorySummary = $"You stayed at your company but transitioned to a new department. It provided a fresh set of challenges without losing your seniority or benefits. You've struck a perfect compromise between novelty and safety.",
                        KeyLesson = "Change doesn't always require a demolition. Sometimes a renovation is enough.",
                        EmotionalTone = "Satisfied & Pragmatic",
                        ProbabilityScore = 0.25
                    },
                    new() {
                        Name = "Universe C: The Unexpected Choice",
                        Title = "The Forest Ranger",
                        StorySummary = $"During your job search, you took a temporary gig as a wilderness park manager. The quiet of the redwoods spoke to you. You resigned from corporate life entirely. You now manage eco-lodges, waking up to the smell of pine every morning.",
                        KeyLesson = "Success is defined by the quality of your days, not the length of your resume.",
                        EmotionalTone = "Zen & Organic",
                        ProbabilityScore = 0.07
                    },
                    new() {
                        Name = "Universe D: The Butterfly Effect",
                        Title = "The LinkedIn Typo",
                        StorySummary = $"A typo in your LinkedIn headline ('Disruptive Thinker' became 'Disruptive Tinker') caught the eye of an unconventional CEO of an automation lab. She hired you to facilitate creative 'play' workshops for engineers, leading to you patented three hit consumer products.",
                        KeyLesson = "Our quirks and accidents are often our greatest assets.",
                        EmotionalTone = "Playful & Successful",
                        ProbabilityScore = 0.03
                    }
                }
            };
        }

        private static UniverseResponse GenerateGeneralReport(string decision)
        {
            return new UniverseResponse
            {
                UniverseId = GenerateId(),
                PrimaryTrait = "Mindful Exploration",
                ReflectionQuote = "In the tapestry of time, no thread is wasted. Every decision is a step toward finding who you truly are.",
                CurrentTimelineTitle = "The Thoughtful Pilgrim",
                MostProbableAlternateTitle = "The Bold Innovator",
                Universes = new List<UniverseItem>
                {
                    new() {
                        Name = "Current Universe",
                        Title = "The Balanced Path",
                        StorySummary = $"You chose a path of deliberate moderation regarding '{decision}'. You are navigating life with a healthy blend of safety and growth, building security while keeping your eyes open to subtle daily opportunities.",
                        KeyLesson = "Steady progress is still progress. Cherish the ground you stand on.",
                        EmotionalTone = "Reflective & Grounded",
                        ProbabilityScore = 0.50
                    },
                    new() {
                        Name = "Universe A: The Brave Choice",
                        Title = "The Bold Innovator",
                        StorySummary = $"You threw caution to the wind and chose the most extreme, courageous interpretation of your decision. You leaped before you looked, finding your wings on the way down. You are now living an intense, highly dynamic life of constant creation.",
                        KeyLesson = "Only those who risk going too far can possibly find out how far one can go.",
                        EmotionalTone = "Empowered & Radiant",
                        ProbabilityScore = 0.15
                    },
                    new() {
                        Name = "Universe B: The Safe Choice",
                        Title = "The Harmonizer",
                        StorySummary = $"You chose the option that maximized emotional peace and community support. You chose to protect your energy and cultivate deep relationships, establishing a lifestyle that acts as a warm shelter in stormy times.",
                        KeyLesson = "Protecting your peace is not a retreat; it is an act of self-respect.",
                        EmotionalTone = "Peaceful & Loving",
                        ProbabilityScore = 0.20
                    },
                    new() {
                        Name = "Universe C: The Unexpected Choice",
                        Title = "The Creative Maverick",
                        StorySummary = $"You took a sharp, whimsical turn that defied standard logic. You started pursuing a completely obscure passion that everyone warned you was a waste of time. Today, that passion has unlocked a tight-knit global community of deep friends and unique opportunities.",
                        KeyLesson = "Follow your curiosity, for it is the compass of the soul.",
                        EmotionalTone = "Curious & Enlivening",
                        ProbabilityScore = 0.10
                    },
                    new() {
                        Name = "Universe D: The Butterfly Effect",
                        Title = "The Ripple Effect",
                        StorySummary = $"A tiny choice you made while thinking about '{decision}'—smiling at a stranger or stopping to read a poster—triggered an incredible chain reaction. You were introduced to a circle of thinkers who inspired you to write an essay that was translated into six languages.",
                        KeyLesson = "We are all nodes in an invisible web. Never underestimate the power of a small action.",
                        EmotionalTone = "Awe-Inspiring & Dreamy",
                        ProbabilityScore = 0.05
                    }
                }
            };
        }
    }
}
