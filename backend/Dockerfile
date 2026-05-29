# Stage 1: Build compilation
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["backend.csproj", "./"]
RUN dotnet restore "./backend.csproj"

# Copy remaining source code and publish release build
COPY . .
RUN dotnet publish "./backend.csproj" -c Release -o /app/publish

# Stage 2: Lightweight runtime packaging
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render/Koyeb dynamically assign a port via PORT environment variable.
# We configure ASP.NET Core to listen to port 8080 by default.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "backend.dll"]
