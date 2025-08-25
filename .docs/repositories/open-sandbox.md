---
{}
---

# open-sandbox

Web-based GUI application for managing Claude Code settings files

## Responsibility

This repository provides a comprehensive settings management interface for Claude Code including:
- Visual form-based editing of .claude/settings.json files
- File upload and download functionality for settings
- Validation and error checking of configuration values
- Organized categorization of different setting types
- Real-time preview of JSON output
- Import/export capabilities for settings sharing

## Dependencies

Critical dependencies and external services:
- File System API for local file access
- Browser storage APIs for temporary data
- JSON parsing and validation libraries
- Form validation through Zod schemas
- UI component dependencies from shadcn/ui
- TanStack Router for navigation management

## Architecture Decisions

Key architectural patterns and technical choices:
- **Component-driven architecture**: Modular React components for each settings section
- **Type-safe forms**: React Hook Form with Zod validation for robust input handling
- **File-based routing**: TanStack Router with type-safe route definitions
- **Utility-first CSS**: Tailwind CSS v4 for rapid UI development
- **Modern build tooling**: Vite for fast development and optimized production builds
- **Documentation-driven development**: Integrated MCP tools for specification management
- **Monorepo structure**: Single repository containing application and documentation tools

## Context

This project was created to solve the pain points of manually editing Claude Code's complex JSON settings files. The GUI approach reduces errors, improves accessibility for non-technical users, and provides a better developer experience for Claude Code configuration management.