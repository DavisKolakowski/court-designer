# Environment Configuration

This document explains how to configure environment variables for the Court Designer application, particularly for Azure Static Web Apps deployment.

## Environment Variables

### Required Variables

- `VITE_QUOTE_EMAIL`: Email address where quote requests will be sent

## Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your local configuration:
   ```
   VITE_QUOTE_EMAIL=your-email@example.com
   ```

## Azure Static Web Apps Configuration

To configure environment variables in Azure Static Web Apps:

1. Go to the Azure Portal
2. Navigate to your Static Web App resource
3. Go to "Configuration" in the left sidebar
4. Click "Add" to add a new application setting
5. Add the following:
   - **Name**: `VITE_QUOTE_EMAIL`
   - **Value**: `your-production-email@example.com`

### Important Notes

- Environment variables in Azure Static Web Apps are available during build time
- Variables prefixed with `VITE_` are exposed to the client-side code
- Changes to environment variables require a new deployment to take effect

## Usage in Code

The application configuration is centralized in `src/config/app.ts`:

```typescript
import { appConfig } from '../config/app';

// Use the configured email
const mailto = `mailto:${appConfig.quoteEmail}?subject=${subject}&body=${body}`;
```

## Security Considerations

- The email address will be visible in the client-side code
- Only add environment variables that are safe to expose publicly
- Never add sensitive information like API keys or passwords to `VITE_` variables
