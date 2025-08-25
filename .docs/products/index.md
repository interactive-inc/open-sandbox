---
icon: ""
schema: {}
---

# Products Overview

Claude Code Settings Manager system products

## Product Relationships

The system currently consists of a single integrated product:
- **claude-code-settings-gui**: Standalone web application for settings management
- All functionality is contained within this single product
- No external product dependencies or integrations at this time

Future potential products might include:
- CLI tool for command-line settings management
- VS Code extension for integrated settings editing
- Settings synchronization service

## Architecture Context

The product architecture follows a client-side web application model with:
- Single-page application (SPA) architecture
- Local file system access for settings import/export
- Browser-based storage for temporary data and presets
- MCP documentation server for specification management
- No backend services required for core functionality
