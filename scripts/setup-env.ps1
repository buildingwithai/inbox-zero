# Setup environment script for Inbox Zero
# This script helps set up a secure development environment

# Function to generate a secure random string
function New-SecureRandomString {
    param (
        [int]$Length = 32
    )
    $bytes = [System.Security.Cryptography.RandomNumberGenerator]::GetBytes($Length)
    return [Convert]::ToBase64String($bytes).Substring(0, $Length).Replace('/', '_').Replace('+', '-')
}

# Set the directory to the project root
$projectRoot = Split-Path -Parent $PSScriptRoot
$webAppPath = Join-Path $projectRoot "apps\web"

# Paths for the .env files
$envExampleFile = Join-Path $projectRoot ".env.example"
$envFile = Join-Path $webAppPath ".env"

# Create the web app directory if it doesn't exist
if (-not (Test-Path $webAppPath)) {
    New-Item -ItemType Directory -Path $webAppPath -Force | Out-Null
}

# Check if .env.example exists
if (-not (Test-Path $envExampleFile)) {
    Write-Error "Error: .env.example file not found at $envExampleFile"
    exit 1
}

# Check if .env already exists
if (Test-Path $envFile) {
    Write-Host ".env file already exists at $envFile" -ForegroundColor Yellow
    $choice = Read-Host "Do you want to regenerate secrets? (y/n)"
    if ($choice -ne 'y') {
        exit 0
    }
} else {
    # Copy .env.example to .env if it doesn't exist
    if (Test-Path $envExampleFile) {
        Copy-Item -Path $envExampleFile -Destination $envFile
        Write-Host "Created .env file from .env.example" -ForegroundColor Green
    } else {
        Write-Error "Error: .env.example file not found at $envExampleFile"
        exit 1
    }
}

# Generate secure values for required fields
$envContent = Get-Content $envFile -Raw

# Generate secrets if they don't exist or user wants to regenerate
$secretsToGenerate = @(
    @{ Name = "NEXTAUTH_SECRET"; Length = 32 },
    @{ Name = "INTERNAL_API_KEY"; Length = 32 },
    @{ Name = "API_KEY_SALT"; Length = 32 },
    @{ Name = "GOOGLE_ENCRYPT_SECRET"; Length = 32 },
    @{ Name = "GOOGLE_ENCRYPT_SALT"; Length = 16 },
    @{ Name = "TINYBIRD_ENCRYPT_SECRET"; Length = 32 },
    @{ Name = "TINYBIRD_ENCRYPT_SALT"; Length = 16 },
    @{ Name = "GOOGLE_PUBSUB_VERIFICATION_TOKEN"; Length = 32 },
    @{ Name = "UPSTASH_REDIS_TOKEN"; Length = 32 },
    @{ Name = "QSTASH_TOKEN"; Length = 32 },
    @{ Name = "QSTASH_CURRENT_SIGNING_KEY"; Prefix = "sig_" },
    @{ Name = "QSTASH_NEXT_SIGNING_KEY"; Prefix = "sig_" },
    @{ Name = "CRON_SECRET"; Length = 32 }
)

foreach ($secret in $secretsToGenerate) {
    $pattern = "(?m)^" + [regex]::Escape($secret.Name) + "=.*"
    $newValue = if ($secret.Prefix) {
        $secret.Prefix + (New-SecureRandomString -Length 16)
    } else {
        New-SecureRandomString -Length $secret.Length
    }
    
    if ($envContent -match $pattern) {
        $envContent = $envContent -replace $pattern, "$($secret.Name)=$newValue"
    } else {
        $envContent += "`n$($secret.Name)=$newValue"
    }
}

# Save the updated .env file
$envContent | Set-Content -Path $envFile -NoNewline

Write-Host "Environment setup complete!" -ForegroundColor Green
Write-Host "Please review the generated .env file at: $envFile" -ForegroundColor Cyan
Write-Host "Make sure to update any API keys and configuration values as needed." -ForegroundColor Cyan
